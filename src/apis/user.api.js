import {
  setDoc,
  doc,
  updateDoc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
} from 'firebase/firestore';
import { db } from '../firebase.js';

const addUser = async ({
  name,
  age,
  sex,
  address,
  phoneNumber,
  dateOfBirth,
  QRCodeUrl,
  userId,
}) => {
  try {
    await setDoc(doc(db, 'users', userId), {
      name,
      age,
      sex,
      address,
      phoneNumber,
      dateOfBirth,
      QRCodeUrl,
      dataPatient: [],
    });
    console.log('User written with ID: ', userId);
  } catch (e) {
    console.error('Error adding user: ', e);
  }
};

const updateUser = async ({ userId, data }) => {
  const userRef = doc(db, 'users', userId);
  try {
    await updateDoc(userRef, data);
  } catch (e) {
    console.error('Error updating user: ', e);
  }
};

const getUser = async (userId) => {
  const userRef = doc(db, 'users', userId);
  try {
    const user = await getDoc(userRef);
    if (user.exists()) {
      return user.data();
    } else {
      // doc.data() will be undefined in this case
      return null;
    }
  } catch (e) {
    console.error('Error updating user: ', e);
  }
};

const getAllUser = async () => {
  try {
    const q = query(collection(db, 'users'));
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach(
      (doc) => {
        if (doc.data().name) data.push({ ...doc.data(), userId: doc.id });
      }
      // doc.data() is never undefined for query doc snapshots
    );
    return data;
  } catch (error) {}
};

const queryUser = async (name) => {
  if (name === '') return [];
  try {
    const q = query(collection(db, 'users'));
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().name && doc.data().name.toLowerCase().includes(name.toLowerCase())) {
        data.push({ ...doc.data(), userId: doc.id });
      }
      // doc.data() is never undefined for query doc snapshots
    });
    return data;
  } catch (error) {}
};

export { addUser, updateUser, getUser, getAllUser, queryUser };
