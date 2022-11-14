import styled from 'styled-components';

export default function DeleteButton({ handleclick, text }) {
  return <DeleteBtn onClick={handleclick}>{text}</DeleteBtn>;
}
const DeleteBtn = styled.button`
position: absolute;
top: 0px;
left: 1069px;
z-index: 99;
`;
