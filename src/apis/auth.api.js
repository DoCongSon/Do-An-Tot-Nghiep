import axios from 'axios';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase.js';

const signup = async ({ email, password }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("can't sign up", { errorCode, errorMessage });
  }
};

const signin = async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("can't sign in", { errorCode, errorMessage });
  }
};

const signout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log("Can't sign out" + error);
  }
};

const deleteUserAccount = async ({ authToken, uidToDelete }) => {
  const cloudFunctionUrl =
    'https://us-central1-do-an-tot-nghiep-dcs.cloudfunctions.net/deleteUserAccount';
  try {
    const headers = {
      Authorization: `Bearer ${authToken}`,
      AccessControl0AllowOrigin: '*',
      AccessControlAllowMethods: 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    };

    const response = await axios.delete(cloudFunctionUrl, {
      headers: headers,
      data: {
        uid: uidToDelete,
      },
    });

    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};

export { signup, signin, signout, deleteUserAccount };
