import { setDoc, doc, updateDoc } from 'firebase/firestore';
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

export { addUser, updateUser };
