import styled from 'styled-components';
import { GrSearch } from 'react-icons/gr';
import { FiBell } from 'react-icons/fi';
import UserDropDown from '../UserDropDown/UserDropDown';
import ProjectModal from '../Modals/ProjectModal/ProjectModal';

const TopBar = () => {
  return (
    <TopBarWrapper>
      <div>
        <SearchField>
          <GrSearch size='17px' />
          <StyledInput type='text' />
        </SearchField>
      </div>
      <RightSection>
        <ProjectModal />
        <FiBell
          size='20px'
          style={{ marginLeft: '20px', marginRight: '20px' }}
        />
        <UserDropDown />
      </RightSection>
    </TopBarWrapper>
  );
};
export default TopBar;
const TopBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1050px;
  height: 133px;
  border-bottom: 1px solid lightgray;
`;

const SearchField = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  border: 1px solid black;
  border-radius: 4px;
  width: 200px;
  height: 34px;
`;
const RightSection = styled.div`
  display: flex;
  align-items: center;
`;
const StyledInput = styled.input`
  border: none;
  width: 195px;
  height: 30px;
  outline: none;
  padding-left: 5px;
`;
