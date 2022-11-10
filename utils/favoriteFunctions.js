import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from './firebase';

const makeFavorite = async (e, projectId) => {
  e.preventDefault();
  try {
    const projectRef = doc(firestore, 'projects', projectId);
    await updateDoc(projectRef, {
      favorite: true,
    });
    console.log('Added it as a favorite');
  } catch (error) {
    console.log(error);
  }
};

const removeFavorite = async (e, projectId) => {
  e.preventDefault();
  try {
    const projectRef = doc(firestore, 'projects', projectId);
    await updateDoc(projectRef, {
      favorite: false,
    });
    console.log('Removed it as a favorite');
  } catch (error) {
    console.log(error);
  }
};

export { makeFavorite, removeFavorite };
