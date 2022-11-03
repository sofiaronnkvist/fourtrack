export default function Button({ handleclick, text }) {
  return <button onClick={handleclick}>{text}</button>;
}
