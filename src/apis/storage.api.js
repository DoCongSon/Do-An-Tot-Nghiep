import { getDownloadURL, getStorage, ref, uploadString } from 'firebase/storage';

const storage = getStorage();

// Data URL string
const uploadDataURL = async ({ data, path }) => {
  const storageRef = ref(storage, path);
  try {
    const snapshot = await uploadString(storageRef, data, 'data_url');
    const url = await getDownloadURL(snapshot.ref);
    return url;
  } catch (e) {
    console.log(e);
  }
};

export { uploadDataURL };
