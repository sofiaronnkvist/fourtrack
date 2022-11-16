import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { makeFavorite, removeFavorite } from '../../utils/favoriteFunctions';
import { useState } from 'react';
import styled from 'styled-components';

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
        <StarButton
          type='submit'
          name='Like button'
          onClick={(e) => clickToFavorite(e, projectId)}
        >
          <AiOutlineStar size={'20px'}></AiOutlineStar>
        </StarButton>
      );
    } else {
      return (
        <StarButton
          type='submit'
          name='Unlike button'
          onClick={(e) => clickToUnmakeFavorite(e, projectId)}
        >
          <AiFillStar size={'20px'}></AiFillStar>
        </StarButton>
      );
    }
  };

  return <>{Star(projectId)}</>;
}

const StarButton = styled.button`
  border: 0;
  padding: 0;
  background-color: transparent;
  display: flex;
  cursor: pointer;
`;
