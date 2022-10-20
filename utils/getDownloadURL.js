// import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
// import { storage } from './firebase';
// import { useAuth } from '../context/AuthContext';

// export const getFileFromStorage = (path) => {
//   const filePath = `files/${userId}/${trackNo}/test`;
//   const storageRef = ref(storage, filePath);
//   const track = '';

//   export getDownloadURL(ref(storage, `files/${userId}/${trackNo}/test`))
//     .then((url) => {
//       // console.log('found file');
//       console.log(`filepath no ${trackNo} in getFileFromStorage: ${url}`);
//       track = url;
//       //   return track;
//     })
//     .catch((error) => {
//       if (error.code === 'storage/object-not-found') {
//         console.log(`tack Id ${trackNo}: nope`);
//         return Promise.resolve(false);
//       } else {
//         return Promise.reject(error);
//       }
//     });

//   return track;

//   //   checkIfFileExists(`files/${userId}/${trackNo}/test`);

//   //   function checkIfFileExists(filePath) {
//   //     const storageRef = ref(storage, filePath);

//   //     getDownloadURL(storageRef)
//   //       .then((url) => {
//   //         console.log('found file');
//   //         return url;
//   //       })
//   //       .catch((error) => {
//   //         if (error.code === 'storage/object-not-found') {
//   //           console.log('nope');
//   //           return Promise.resolve(false);
//   //         } else {
//   //           return Promise.reject(error);
//   //         }
//   //       });
//   //     }
//   //     return checkIfFileExists

//   //   const storageFile = `files/${userId}/${trackNo}/test`;
//   //   storageFile.exists().then((exists) => {
//   //     if (exists[0]) {
//   //       console.log('File exists');
//   //     } else {
//   //       console.log('File does not exist');
//   //     }
//   //   });

//   //   getDownloadURL(ref(storage, `files/${userId}/${trackNo}/test`)).then(
//   //     (url) => {
//   //       console.log(`filepath in getFileFromStorage: ${url}`);
//   //       track = url;
//   //     }
//   //   );
// };
