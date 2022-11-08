import { ref, deleteObject } from 'firebase/storage';
import { storage } from './firebase';
import { doc, deleteDoc, updateDoc, deleteField } from 'firebase/firestore';
import { firestore } from '../utils/firebase';

export const DeleteFolderFromStorage = async (userId, projectId, ownerId) => {
  const deleteFolder = (projectId, ownerId, trackNo) => {
    deleteObject(ref(storage, `files/${ownerId}/${projectId}/${trackNo}`))
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };
  if (ownerId === userId) {
    deleteFolder(projectId, ownerId, 1);
    deleteFolder(projectId, ownerId, 2);
    deleteFolder(projectId, ownerId, 3);
    deleteFolder(projectId, ownerId, 4);

    await deleteDoc(doc(firestore, 'projects', `${projectId}`));
  } else {
    const ref = doc(firestore, 'projects', `${projectId}`);
    await updateDoc(ref, {
      colab_uid: deleteField(),
    });
    alert('You have now left this project.');
  }
};
