function KeyPlayers({ players }) {
  return (
    <div className="section-box">
      <h2 className="section-title">Key Players</h2>

      <div className="grid grid-2">
        {players?.length > 0 ? (
          players.map((player, index) => (
            <div key={index} className="player-box">
              <h3>{player.name}</h3>
              <p>
                <strong>Role:</strong> {player.role}
              </p>
              <p style={{ marginTop: "8px" }}>
                <strong>Impact:</strong> {player.impact}
              </p>
            </div>
          ))
        ) : (
          <p className="section-text">No key players available.</p>
        )}
      </div>
    </div>
  );
}

export default KeyPlayers;
