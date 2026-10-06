// Category ke hisaab se updates filter karne ke buttons

export default function CategoryFilter({ categories, active, setActive, counts }) {
  return (
    <div className="filters">
      <button className={active === "all" ? "filter on" : "filter"} onClick={() => setActive("all")}>
        All <span>{counts.all}</span>
      </button>
      {categories.map((c) => (
        <button key={c} className={active === c ? "filter on" : "filter"} onClick={() => setActive(c)} disabled={!counts[c]}>
          {c} <span>{counts[c] || 0}</span>
        </button>
      ))}
    </div>
  );
}
