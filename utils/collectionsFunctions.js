import { collection, deleteDoc, getDocs, query, runTransaction, where } from 'firebase/firestore';

const deleteCollection = async (e, collectionId, collectionTitle) => {
  e.preventDefault();
  try {
    await runTransaction(firestore, async (transaction) => {
      let array = [];
      let res;
      const q = query(
        collection(firestore, 'projects'),
        where('collections', '==', collectionTitle)
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        res = {
          ...doc.data(),
          id: doc.id,
          timestamp: doc.data().timestamp.toDate().toLocaleDateString(),
        };
        array.push(res);
      });
      setSearchResult(array);
      if (array.length == 0) {
        console.log('No projects to update');
      } else {
        array.forEach((project) => {
          console.log(project.id);
          transaction.update(doc(firestore, 'projects', project.id), {
            collections: null,
          });
        });
      }
    });

    const collectionRef = doc(firestore, 'collections', collectionId);
    await deleteDoc(collectionRef);
    router.push('/projects');
  } catch (error) {
    console.log(error);
  }
};

const removeProjectFromCollection = (e, slug, projectId) => {
  e.preventDefault();
  try {
    
  } catch (error) {
    
  }
};

const addProjectToCollection = (e, slug, projectId) => {
  e.preventDefault();
  try {
    
  } catch (error) {
    
  }
};

export { deleteCollection, removeProjectFromCollection, addProjectToCollection };
