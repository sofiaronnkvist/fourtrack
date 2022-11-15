import { ref, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './firebase';

export const deleteFileFromStorage = async (userId, projectId, trackno) => {
  console.log('in delete func');

  const desertRef = ref(storage, `files/${userId}/${projectId}/${trackno}`);

  deleteObject(desertRef)
    .then(() => {
      console.log('gone!');
    })
    .catch((error) => {
      console.log(error);
    });
};
