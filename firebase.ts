
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Data Persistence Layer
export const addPatientRequest = async (data: any) => {
  return await addDoc(collection(db, 'patient_requests'), {
    ...data,
    createdAt: Timestamp.now()
  });
};

export const registerVolunteer = async (data: any) => {
  return await addDoc(collection(db, 'volunteers'), {
    ...data,
    createdAt: Timestamp.now()
  });
};

export const submitMessage = async (data: any) => {
  return await addDoc(collection(db, 'messages'), {
    ...data,
    createdAt: Timestamp.now()
  });
};

export const getPatientRequests = async () => {
  const q = query(collection(db, 'patient_requests'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getAllVolunteers = async () => {
  const querySnapshot = await getDocs(collection(db, 'volunteers'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getAllMessages = async () => {
  const querySnapshot = await getDocs(collection(db, 'messages'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
