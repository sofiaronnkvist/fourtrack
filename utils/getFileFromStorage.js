import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

export const getFileFromStorage = async (userId) => {
  // const filePath = `files/${userId}/${trackNo}/test`;
  // const storageRef = ref(storage, filePath);
  let trackArray = [];

  const downloadUrl = await getDownloadURL(
    ref(storage, `files/${userId}/1/test`)
  )
    .then((url) => {
      // const track = url;
      trackArray.push(url);
      // return url;
    })
    .catch((error) => {
      if (error.code === 'storage/object-not-found') {
        console.log(`tack Id 1: nope`);
        trackArray.push('');
        return Promise.resolve('');
      } else {
        return Promise.reject(error);
      }
    });

  const downloadUrl2 = await getDownloadURL(
    ref(storage, `files/${userId}/2/test`)
  )
    .then((url) => {
      // const track = url;
      trackArray.push(url);
      // return url;
    })
    .catch((error) => {
      if (error.code === 'storage/object-not-found') {
        console.log(`tack Id 2: nope`);
        trackArray.push('');
        return Promise.resolve('');
      } else {
        return Promise.reject(error);
      }
    });

  const downloadUrl3 = await getDownloadURL(
    ref(storage, `files/${userId}/3/test`)
  )
    .then((url) => {
      // const track = url;
      trackArray.push(url);
      // return url;
    })
    .catch((error) => {
      if (error.code === 'storage/object-not-found') {
        console.log(`tack Id 3: nope`);
        trackArray.push('');
        return Promise.resolve('');
      } else {
        return Promise.reject(error);
      }
    });

  const downloadUrl4 = await getDownloadURL(
    ref(storage, `files/${userId}/4/test`)
  )
    .then((url) => {
      // const track = url;
      trackArray.push(url);
      // return url;
    })
    .catch((error) => {
      if (error.code === 'storage/object-not-found') {
        // console.log(`tack Id 4: nope`);
        trackArray.push('');
        return Promise.resolve('');
      } else {
        return Promise.reject(error);
      }
    });

  return trackArray;
};
