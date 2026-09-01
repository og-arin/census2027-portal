import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { saveEnumerationData, getEnumerationData } from '../services/firestoreService';
import { phase1Questions, phase2Questions } from '../data/formSchema';

const CensusDataContext = createContext();

export function CensusDataProvider({ children }) {
  const { currentUser } = useAuth();
  
  const [phase1Data, setPhase1Data] = useState({});
  const [phase2Data, setPhase2Data] = useState({});
  const [currentPhase, setCurrentPhase] = useState('phase1');
  const [status, setStatus] = useState('not_started'); // 'not_started' | 'in_progress' | 'phase1_completed' | 'completed'
  const [urn, setUrn] = useState('');
  const [completedAt, setCompletedAt] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  // Load existing data when user changes
  useEffect(() => {
    async function loadData() {
      if (currentUser?.uid) {
        const data = await getEnumerationData(currentUser.uid);
        if (data) {
          setPhase1Data(data.phase1_houselisting || {});
          setPhase2Data(data.phase2_population || {});
          setStatus(data.status || 'not_started');
          setUrn(data.urn || '');
          setCompletedAt(data.completed_at || null);
          if (data.status === 'phase1_completed') {
            setCurrentPhase('phase2');
          }
        }
      }
    }
    loadData();
  }, [currentUser?.uid]);

  // Update a single answer field
  const updateAnswer = async (phase, field, value) => {
    setIsSaving(true);
    let newPhase1 = { ...phase1Data };
    let newPhase2 = { ...phase2Data };

    if (phase === 'phase1') {
      newPhase1[field] = value;
      setPhase1Data(newPhase1);
    } else {
      newPhase2[field] = value;
      setPhase2Data(newPhase2);
    }

    const newStatus = status === 'not_started' ? 'in_progress' : status;
    setStatus(newStatus);

    // Save to Firestore / local storage
    if (currentUser?.uid) {
      await saveEnumerationData(currentUser.uid, {
        phase1_houselisting: newPhase1,
        phase2_population: newPhase2,
        status: newStatus,
        urn: urn || generateUrn(currentUser.uid),
        created_at: new Date().toISOString()
      });
      setLastSaved(new Date());
    }
    setIsSaving(false);
  };

  // Complete Phase 1
  const completePhase1 = async () => {
    setStatus('phase1_completed');
    setCurrentPhase('phase2');
    if (currentUser?.uid) {
      await saveEnumerationData(currentUser.uid, {
        phase1_houselisting: phase1Data,
        phase2_population: phase2Data,
        status: 'phase1_completed',
      });
      setLastSaved(new Date());
    }
  };

  // Final Completion of Phase 2 (Generate URN & Certificate)
  const completeFinalEnumeration = async () => {
    const generatedUrn = urn || generateUrn(currentUser?.uid || 'GUEST');
    const timestamp = new Date().toISOString();
    setUrn(generatedUrn);
    setStatus('completed');
    setCompletedAt(timestamp);

    if (currentUser?.uid) {
      await saveEnumerationData(currentUser.uid, {
        phase1_houselisting: phase1Data,
        phase2_population: phase2Data,
        status: 'completed',
        urn: generatedUrn,
        completed_at: timestamp
      });
      setLastSaved(new Date());
    }
    return generatedUrn;
  };

  // Reset entire form
  const resetEnumeration = async () => {
    setPhase1Data({});
    setPhase2Data({});
    setCurrentPhase('phase1');
    setStatus('not_started');
    setUrn('');
    setCompletedAt(null);

    if (currentUser?.uid) {
      await saveEnumerationData(currentUser.uid, {
        phase1_houselisting: {},
        phase2_population: {},
        status: 'not_started',
        urn: '',
        completed_at: null
      });
      setLastSaved(new Date());
    }
  };

  // Calculate completion percentage
  const getPhase1Progress = () => {
    const total = phase1Questions.length;
    const filled = Object.keys(phase1Data).length;
    return Math.min(100, Math.round((filled / total) * 100));
  };

  const getPhase2Progress = () => {
    const total = phase2Questions.length;
    const filled = Object.keys(phase2Data).length;
    return Math.min(100, Math.round((filled / total) * 100));
  };

  const getTotalProgress = () => {
    const total = phase1Questions.length + phase2Questions.length;
    const filled = Object.keys(phase1Data).length + Object.keys(phase2Data).length;
    return Math.min(100, Math.round((filled / total) * 100));
  };

  return (
    <CensusDataContext.Provider value={{
      phase1Data,
      phase2Data,
      currentPhase,
      setCurrentPhase,
      status,
      urn,
      completedAt,
      isSaving,
      lastSaved,
      updateAnswer,
      completePhase1,
      completeFinalEnumeration,
      resetEnumeration,
      getPhase1Progress,
      getPhase2Progress,
      getTotalProgress
    }}>
      {children}
    </CensusDataContext.Provider>
  );
}

function generateUrn(seed = '') {
  const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
  const year = new Date().getFullYear();
  return `CEN${year}-IND-${randomSuffix}`;
}

export const useCensusData = () => useContext(CensusDataContext);
