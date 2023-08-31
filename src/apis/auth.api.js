import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
} from 'firebase/auth';
import { auth } from '../firebase.js';
import { deleteUserData } from './user.api.js';

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

const deleteUserAccount = async () => {
  try {
    const user = auth.currentUser;
    await deleteUser(user);
    await deleteUserData();
  } catch (error) {
    console.log("Can't delete user" + error);
  }
};

export { signup, signin, signout, deleteUserAccount };
