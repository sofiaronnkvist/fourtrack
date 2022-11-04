import { ref, deleteObject } from 'firebase/storage';
import { storage } from './firebase';
import { doc, deleteDoc } from "firebase/firestore";
import { firestore } from '../utils/firebase';


export const deleteFolderFromStorage = async (userId, projectId) => {
  console.log('in delete func');
  //   const desertRef = ref(storage, `files/${userId}/${projectId}/1`);

  deleteObject(ref(storage, `files/${userId}/${projectId}/1`))
    .then(() => {
      console.log('gone!');
    })
    .catch((error) => {
      console.log(error);
    });
  deleteObject(ref(storage, `files/${userId}/${projectId}/2`))
    .then(() => {
      console.log('gone!');
    })
    .catch((error) => {
      console.log(error);
    });
  deleteObject(ref(storage, `files/${userId}/${projectId}/3`))
    .then(() => {
      console.log('gone!');
    })
    .catch((error) => {
      console.log(error);
    });
  deleteObject(ref(storage, `files/${userId}/${projectId}/4`))
    .then(() => {
      console.log('gone!');
    })
    .catch((error) => {
      console.log(error);
    });

    await deleteDoc(doc(firestore, "projects", `${projectId}`));

};
