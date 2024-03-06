export default function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.block.row}${turn.block.col}`}>
          {turn.player} selected {turn.block.row},{turn.block.col}
        </li>
      ))}
    </ol>
  );
}
