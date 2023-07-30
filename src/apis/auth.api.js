import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
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
    const userCredential = signInWithEmailAndPassword(auth, email, password);
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

export { signup, signin, signout };