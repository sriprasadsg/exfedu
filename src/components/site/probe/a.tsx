export const A = ({ items, sub, note }: { items?: string[]; sub?: { label: string; items: string[] }; note?: string }) =>
  <section>{items?.length ? <ul>{items.map(i => <li key={i}>{i}</li>)}</ul> : <p>x</p>}{sub && <div className="s"><h3>{sub.label}</h3><ul>{sub.items.map(i => <li key={i}>{i}</li>)}</ul></div>}{note && <p className="n">{note}</p>}</section>;
