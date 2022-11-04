import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

export const getFileFromStorage = async (userId, projectId) => {
  let trackArray = [];

  const downloadUrl = await getDownloadURL(
    ref(storage, `files/${userId}/${projectId}/1`)
  )
    .then((url) => {
      trackArray.push(url);
    })
    .catch((error) => {
      if (error.code === 'storage/object-not-found') {
        trackArray.push('');
        return Promise.resolve('');
      } else {
        return Promise.reject(error);
      }
    });

  const downloadUrl2 = await getDownloadURL(
    ref(storage, `files/${userId}/${projectId}/2`)
  )
    .then((url) => {
      trackArray.push(url);
    })
    .catch((error) => {
      if (error.code === 'storage/object-not-found') {
        trackArray.push('');
        return Promise.resolve('');
      } else {
        return Promise.reject(error);
      }
    });

  const downloadUrl3 = await getDownloadURL(
    ref(storage, `files/${userId}/${projectId}/3`)
  )
    .then((url) => {
      trackArray.push(url);
    })
    .catch((error) => {
      if (error.code === 'storage/object-not-found') {
        trackArray.push('');
        return Promise.resolve('');
      } else {
        return Promise.reject(error);
      }
    });

  const downloadUrl4 = await getDownloadURL(
    ref(storage, `files/${userId}/${projectId}/4`)
  )
    .then((url) => {
      trackArray.push(url);
    })
    .catch((error) => {
      if (error.code === 'storage/object-not-found') {
        trackArray.push('');
        return Promise.resolve('');
      } else {
        return Promise.reject(error);
      }
    });
  return trackArray;
};
