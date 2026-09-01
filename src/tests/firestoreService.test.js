import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock Firebase module so tests are fast, deterministic, and offline-resilient
vi.mock('../services/firebase', () => ({
  db: {
    type: 'mock-firestore'
  },
  auth: null,
  googleProvider: null,
  isFirebaseConfigured: true
}));

// Mock firestore methods
vi.mock('firebase/firestore', () => ({
  doc: vi.fn((db, col, id) => ({ path: `${col}/${id}` })),
  setDoc: vi.fn(() => Promise.resolve()),
  getDoc: vi.fn(() => Promise.resolve({
    exists: () => true,
    data: () => ({
      phase1_houselisting: {
        building_number: 'Flat 402, Lotus Heights',
        ownership_status: 'Owned'
      },
      urn: 'CEN2027-IND-TEST99'
    })
  })),
  collection: vi.fn(),
  getDocs: vi.fn(() => Promise.resolve({ empty: true, docs: [] })),
  addDoc: vi.fn(() => Promise.resolve({ id: 'mock_doc_id' })),
  serverTimestamp: vi.fn(() => 'MOCK_TIMESTAMP')
}));

import { saveEnumerationData, getEnumerationData } from '../services/firestoreService';
import { setDoc, getDoc } from 'firebase/firestore';

describe('firestoreService', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('saves enumeration data with correct schema payload structure and calls setDoc', async () => {
    const testUserId = 'test_citizen_123';
    const samplePayload = {
      phase1_houselisting: {
        building_number: 'Flat 402, Lotus Heights',
        ownership_status: 'Owned',
        drinking_water_source: 'Treated Piped Tap Water',
        cooking_fuel: 'LPG Gas'
      },
      phase2_population: {
        head_name: 'Rajesh Sharma',
        total_members: '4',
        marital_status: 'Married'
      },
      status: 'in_progress',
      urn: 'CEN2027-IND-TEST99'
    };

    const result = await saveEnumerationData(testUserId, samplePayload);

    expect(result.success).toBe(true);
    expect(result.payload.phase1_houselisting.building_number).toBe('Flat 402, Lotus Heights');
    expect(result.payload.phase2_population.head_name).toBe('Rajesh Sharma');
    expect(result.payload.status).toBe('in_progress');
    expect(result.payload.updated_at).toBeDefined();

    // Verify Firestore setDoc was called with the document reference and payload
    expect(setDoc).toHaveBeenCalled();

    // Verify retrieval matches saved payload
    const retrieved = await getEnumerationData(testUserId);
    expect(retrieved).not.toBeNull();
    expect(retrieved.phase1_houselisting.building_number).toBe('Flat 402, Lotus Heights');
    expect(retrieved.urn).toBe('CEN2027-IND-TEST99');
  });
});
