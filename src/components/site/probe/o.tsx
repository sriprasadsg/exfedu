export const O = ({ items, content }: { items?: string[]; content?: string }) => (
  <section>{items?.length ? <ul>{items.map(item => <li key={item}>{item}</li>)}</ul> : <p>{content || "x"}</p>}</section>
);
