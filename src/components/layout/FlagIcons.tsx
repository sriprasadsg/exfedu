// Small country flags for the footer headquarters list (client, 4 November 2026:
// "plus country flags in small size"). Drawn inline so the site carries no flag
// asset and never relies on an emoji font. Decorative: the country name sits
// beside each flag as real text.
type FlagProps = { code: "US" | "IN" };

const UsFlag = () => (
  <>
    <rect width="24" height="16" fill="#ffffff" />
    {[0, 2, 4, 6, 8, 10, 12].map((i) => (
      <rect key={i} y={(i * 16) / 13} width="24" height={16 / 13} fill="#b22234" />
    ))}
    <rect width="9.6" height={(7 * 16) / 13} fill="#3c3b6e" />
    {[...Array(6)].map((_, i) => (
      <circle key={i} cx={1.7 + (i % 3) * 3.1} cy={i < 3 ? 2.3 : 5.7} r="0.48" fill="#ffffff" />
    ))}
  </>
);

const IndiaFlag = () => (
  <>
    <rect width="24" height="16" fill="#ffffff" />
    <rect width="24" height={16 / 3} fill="#ff9933" />
    <rect y={(2 * 16) / 3} width="24" height={16 / 3} fill="#138808" />
    <g stroke="#000080" strokeWidth="0.32">
      {[0, 45, 90, 135].map((a) => (
        <line key={a} x1="12" y1="6" x2="12" y2="10" transform={`rotate(${a} 12 8)`} />
      ))}
    </g>
    <circle cx="12" cy="8" r="2.05" fill="none" stroke="#000080" strokeWidth="0.4" />
    <circle cx="12" cy="8" r="0.45" fill="#000080" />
  </>
);

export const CountryFlag = ({ code }: FlagProps) => (
  <svg viewBox="0 0 24 16" className="footer-flag" aria-hidden="true" focusable="false">
    {code === "US" ? <UsFlag /> : <IndiaFlag />}
  </svg>
);
