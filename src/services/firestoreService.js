import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc, collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { dummyStates } from '../data/dummyStates';
import { dummyMisinformation } from '../data/dummyMisinformation';

const LOCAL_STORAGE_KEY_PREFIX = 'census_2027_';

/**
 * Save or update citizen enumeration data under /enumerations/{userId}
 */
export async function saveEnumerationData(userId, data) {
  if (!userId) return { success: false, error: 'User ID missing' };

  const payload = {
    ...data,
    updated_at: new Date().toISOString(),
  };

  // Always save locally first for instant offline responsiveness
  try {
    const existing = JSON.parse(localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}enum_${userId}`) || '{}');
    const merged = { ...existing, ...payload };
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}enum_${userId}`, JSON.stringify(merged));
  } catch (err) {
    console.error("Local storage error:", err);
  }

  // If Firebase db is connected, sync to Firestore collection
  if (db) {
    try {
      const docRef = doc(db, 'enumerations', userId);
      await setDoc(docRef, {
        ...payload,
        firestore_synced_at: serverTimestamp()
      }, { merge: true });
      return { success: true, synced: true, source: 'firestore' };
    } catch (err) {
      console.warn("Firestore sync warning (falling back to local cache):", err);
      return { success: true, synced: false, source: 'local' };
    }
  }

  return { success: true, synced: false, source: 'local' };
}

/**
 * Fetch citizen enumeration record
 */
export async function getEnumerationData(userId) {
  if (!userId) return null;

  // Try Firestore first if available
  if (db) {
    try {
      const docRef = doc(db, 'enumerations', userId);
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
    const local = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}enum_${userId}`);
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
    claim_text: claimData.claimText,
    verdict: "UNDER REVIEW",
    verdict_hi: "जांच जारी है",
    is_false: true,
    fact_explanation: "This reported claim has been submitted to the Census 2027 Fact-Check Directorate for verification.",
    fact_explanation_hi: "यह रिपोर्ट जनगणना 2027 फैक्ट-चेक निदेशालय को सत्यापन के लिए भेज दी गई है।",
    source_url: claimData.sourcePlatform || "Citizen Report",
    category: "Community Report",
    created_at: new Date().toISOString()
  };

  // Save to local cache
  try {
    const existing = JSON.parse(localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}reported_flags`) || '[]');
    existing.unshift(newFlag);
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}reported_flags`, JSON.stringify(existing));
  } catch (err) {
    console.error("Error saving reported flag locally:", err);
  }

  // Save to Firestore if available
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
