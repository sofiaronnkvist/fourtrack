import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from './firebase';
import { useAuth } from '../context/AuthContext';

export const getFileFromStorage = async (userId, trackNo) => {
  const filePath = `files/${userId}/${trackNo}/test`;
  const storageRef = ref(storage, filePath);

  const url1 = await getDownloadURL(storageRef)
    .then((url) => {
      // console.log('found file');
      // console.log(`filepath no ${trackNo} in getFileFromStorage: ${url}`);
      const track = url;
      return track;
    })
    .catch((error) => {
      if (error.code === 'storage/object-not-found') {
        console.log(`tack Id ${trackNo}: nope`);
        return Promise.resolve('');
      } else {
        return Promise.reject(error);
      }
    });

  return url1;
};

