function PersonaCard({ title, description, onClick }) {
  return (
    <div onClick={onClick} className="card">
      <h2 style={{ color: "#f97316" }}>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export default PersonaCard;
