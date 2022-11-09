import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

export default function Favorite({ favorite }) {
  const OutlinedStar = () => {
    return <AiOutlineStar size={'20px'}></AiOutlineStar>;
  };

  const FillStar = () => {
    return <AiFillStar size={'20px'}></AiFillStar>;
  };

  const checkFavorite = (favorite) => {
    if (favorite == true) {
      return FillStar();
    } else {
      return OutlinedStar();
    }
  };
  return <>{checkFavorite(favorite)}</>;
}
