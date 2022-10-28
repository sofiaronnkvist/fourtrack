import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

export const deleteFileFromStorage = async (userId, projectId, trackno) => {
  console.log('in delete func');
  await deleteObject(ref(storage, `files/${userId}/${projectId}/${trackno}/test`))
    .then(() => {console.log('gone!');})
    .catch((error) => {
      if (error.code === 'storage/object-not-found') {
        return Promise.resolve('');
      } else {
        return Promise.reject(error);
      }
    });
};
