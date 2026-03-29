function NewsCard({ title, description, source, onClick }) {
  return (
    <div onClick={onClick} className="card">
      <p className="source">{source}</p>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export default NewsCard;
