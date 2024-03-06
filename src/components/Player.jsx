import { useState } from "react";

export default function Player({ name, symbol, isActive }) {
  const [editable, setEditable] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  return (
    <li className={isActive ? 'active': undefined}>
      <span className="player">
        {editable ? (
          <input
            required
            type="text"
            onChange={(event) => setPlayerName(event.target.value)}
            value={playerName}
          />
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={() => setEditable((editable) => !editable)}>
        {editable ? "Save" : "Edit"}
      </button>
    </li>
  );
}
