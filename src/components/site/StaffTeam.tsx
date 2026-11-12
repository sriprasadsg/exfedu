import { adminTeamGroups } from "@/data/adminTeam";

export const StaffTeam = () => (
  <div className="staff-team">
    {adminTeamGroups.map((g) => (
      <section key={g.title} className="staff-group" aria-label={g.title}>
        <h2 className="staff-group-title">{g.title}</h2>
        <ul className="staff-grid">
          {g.people.map((p) => (
            <li key={p.name} className="staff-card">
              <div className="staff-photo"><img src={p.photo} alt={`${p.name}, ${p.role}`} width={600} height={720} loading="lazy" /></div>
              <h3 className="staff-name">{p.name}</h3>
              <p className="staff-role">{p.role}</p>
            </li>
          ))}
        </ul>
      </section>
    ))}
  </div>
);
export default StaffTeam;
