import { doc, addDoc, collection, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const addMedicalRecord = async (userId, { date, doctor, symptom, diagnostic, prescription }) => {
  try {
    await addDoc(collection(db, `users/${userId}/medicalRecords`), {
      date,
      doctor,
      symptom,
      diagnostic,
      prescription,
    });
  } catch (error) {
    console.error('Error adding medical record: ', error);
  }
};

const deleteMedicalRecord = async (userId, medicalRecordId) => {
  try {
    await deleteDoc(doc(db, `users/${userId}/medicalRecords`, medicalRecordId));
  } catch (error) {
    console.error('Error deleting medical record: ', error);
  }
};

const updateMedicalRecord = async (userId, medicalRecordId, medicalRecord) => {
  try {
    await updateDoc(doc(db, `users/${userId}/medicalRecords`, medicalRecordId), medicalRecord);
  } catch (error) {
    console.error('Error updating medical record: ', error);
  }
};

export { addMedicalRecord, deleteMedicalRecord, updateMedicalRecord };
