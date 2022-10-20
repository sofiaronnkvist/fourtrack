import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

export const getFileFromStorage = async (userId, trackNo) => {
  const filePath = `files/${userId}/${trackNo}/test`;
  const storageRef = ref(storage, filePath);

  const downloadUrl = await getDownloadURL(storageRef)
    .then((url) => {
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

  return downloadUrl;
};
