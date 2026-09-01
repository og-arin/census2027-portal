import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc, collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { dummyStates } from '../data/dummyStates';
import { dummyMisinformation } from '../data/dummyMisinformation';
import { sanitizeInput } from '../utils/sanitize';

const LOCAL_STORAGE_KEY_PREFIX = 'census_2027_';

/**
 * Sanitize object fields recursively before storage
 */
function sanitizePayload(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  const sanitized = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value);
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      sanitized[key] = sanitizePayload(value);
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
}

/**
 * Save or update citizen enumeration data under /enumerations/{userId}
 */
export async function saveEnumerationData(userId, data) {
  if (!userId) return { success: false, error: 'User ID missing' };

  const sanitizedUserId = sanitizeInput(userId);
  const cleanData = sanitizePayload(data);

  const payload = {
    ...cleanData,
    updated_at: new Date().toISOString(),
  };

  // Always save locally first for instant offline responsiveness
  try {
    const existing = JSON.parse(localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}enum_${sanitizedUserId}`) || '{}');
    const merged = { ...existing, ...payload };
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}enum_${sanitizedUserId}`, JSON.stringify(merged));
  } catch (err) {
    console.error("Local storage error:", err);
  }

  // If Firebase db is connected, sync to Firestore collection
  if (db) {
    try {
      const docRef = doc(db, 'enumerations', sanitizedUserId);
      await setDoc(docRef, {
        ...payload,
        firestore_synced_at: serverTimestamp()
      }, { merge: true });
      return { success: true, synced: true, source: 'firestore', payload };
    } catch (err) {
      console.warn("Firestore sync warning (falling back to local cache):", err);
      return { success: true, synced: false, source: 'local', payload };
    }
  }

  return { success: true, synced: false, source: 'local', payload };
}

/**
 * Fetch citizen enumeration record
 */
export async function getEnumerationData(userId) {
  if (!userId) return null;
  const sanitizedUserId = sanitizeInput(userId);

  // Try Firestore first if available
  if (db) {
    try {
      const docRef = doc(db, 'enumerations', sanitizedUserId);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return snapshot.data();
      }
    } catch (err) {
      console.warn("Firestore fetch warning:", err);
    }
  }

  // Fallback to local storage
  try {
    const local = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}enum_${sanitizedUserId}`);
    if (local) {
      return JSON.parse(local);
    }
  } catch (err) {
    console.error("Local storage read error:", err);
  }

  return null;
}

/**
 * Fetch state survey timelines from /states/
 */
export async function getStatesData() {
  if (db) {
    try {
      const colRef = collection(db, 'states');
      const snapshot = await getDocs(colRef);
      if (!snapshot.empty) {
        return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      }
    } catch (err) {
      console.warn("Firestore states fetch warning:", err);
    }
  }
  return dummyStates;
}

/**
 * Fetch verified misinformation flags from /misinformation_flags/
 */
export async function getMisinformationFlags() {
  let localClaims = [];
  try {
    const stored = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}reported_flags`);
    if (stored) {
      localClaims = JSON.parse(stored);
    }
  } catch (err) {
    console.error("Error reading local claims:", err);
  }

  if (db) {
    try {
      const colRef = collection(db, 'misinformation_flags');
      const snapshot = await getDocs(colRef);
      if (!snapshot.empty) {
        const firestoreFlags = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        return [...localClaims, ...firestoreFlags];
      }
    } catch (err) {
      console.warn("Firestore misinformation fetch warning:", err);
    }
  }

  return [...localClaims, ...dummyMisinformation];
}

/**
 * Submit user report for suspicious misinformation
 */
export async function reportMisinformationClaim(claimData) {
  const newFlag = {
    id: `flag_${Date.now()}`,
    claim_text: sanitizeInput(claimData.claimText || ''),
    verdict: "UNDER REVIEW",
    verdict_hi: "जांच जारी है",
    is_false: true,
    fact_explanation: "This reported claim has been submitted to the Census 2027 Fact-Check Directorate for verification.",
    fact_explanation_hi: "यह रिपोर्ट जनगणना 2027 फैक्ट-चेक निदेशालय को सत्यापन के लिए भेज दी गई है।",
    source_url: sanitizeInput(claimData.sourcePlatform || "Citizen Report"),
    category: "Community Report",
    created_at: new Date().toISOString()
  };

  try {
    const existing = JSON.parse(localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}reported_flags`) || '[]');
    existing.unshift(newFlag);
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}reported_flags`, JSON.stringify(existing));
  } catch (err) {
    console.error("Error saving reported flag locally:", err);
  }

  if (db) {
    try {
      const colRef = collection(db, 'misinformation_flags');
      await addDoc(colRef, {
        ...newFlag,
        firestore_created_at: serverTimestamp()
      });
      return { success: true, id: newFlag.id };
    } catch (err) {
      console.warn("Firestore add claim warning:", err);
    }
  }

  return { success: true, id: newFlag.id };
}
