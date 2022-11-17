import styled from 'styled-components';

export default function DeleteButton({ handleclick, text }) {
  return <DeleteBtn onClick={handleclick}>{text}</DeleteBtn>;
}
const DeleteBtn = styled.button`
  position: absolute;
  top: 5px;
  left: 1180px;
  z-index: 6;
  background-color: transparent;
  border: none;
`;
