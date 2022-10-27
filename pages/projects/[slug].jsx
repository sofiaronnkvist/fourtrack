import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import { firestore } from '../../utils/firebase';

export default function Project({ res }) {
  const { user } = useAuth();
  console.log(res);
  return <h1>{res.title}</h1>;
}

export async function getServerSideProps(ctx) {
  const slug = ctx.query.slug;
  let res;
  const ref = collection(firestore, 'projects');
  const projectsQuery = query(ref, where('title', '==', slug));
  const querySnapshot = await getDocs(projectsQuery);
  querySnapshot.forEach((doc) => {
    res = (doc.id, ' => ', doc.data());
  });

  return { props: { res } };
}
