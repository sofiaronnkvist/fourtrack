import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { makeFavorite, removeFavorite } from '../../utils/favoriteFunctions';
import router from 'next/router';
import { useState, useEffect } from 'react';
import { async } from '@firebase/util';

export default function Favorite({ favorite, projectId }) {
  const [favoriteStar, setFavoriteStar] = useState(favorite);

  const Star = (projectId) => {
    const clickToFavorite = async (e, projectId) => {
      await makeFavorite(e, projectId);
      setFavoriteStar(true);
    };

    const clickToUnmakeFavorite = async (e, projectId) => {
      await removeFavorite(e, projectId);
      setFavoriteStar(false);
    };

    if (favoriteStar == false) {
      return (
        <button onClick={(e) => clickToFavorite(e, projectId)}>
          <AiOutlineStar size={'20px'}></AiOutlineStar>
        </button>
      );
    } else {
      return (
        <button onClick={(e) => clickToUnmakeFavorite(e, projectId)}>
          <AiFillStar size={'20px'}></AiFillStar>
        </button>
      );
    }
  };

  return <>{Star(projectId)}</>;
}
