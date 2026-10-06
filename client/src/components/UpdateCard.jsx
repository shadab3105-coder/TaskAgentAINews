// Ek update (news) ka card

export default function UpdateCard({ update }) {
  return (
    <article className="update">
      <span className={`tag ${update.category}`}>{update.category}</span>
      <h4>
        <a href={update.link} target="_blank" rel="noreferrer">{update.title}</a>
      </h4>
      <p className="meta">
        <strong>{update.company}</strong> · {new Date(update.date).toLocaleDateString()} · {update.sources.slice(0, 3).join(", ")}
        {update.sources.length > 1 && ` (+${update.sources.length - 1} more covering this)`}
      </p>
    </article>
  );
}
