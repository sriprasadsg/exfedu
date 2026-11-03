export type SvuCareerRecord = { student: string; batch: string; organisation: string; designation?: string };
const batchOne = "2023–2025";
const batchTwo = "2024–2026";
export const svuPlacements: SvuCareerRecord[] = [
  { student: "G V Sumanth", batch: batchOne, organisation: "Exafluence Global Analytics Pvt Ltd", designation: "Associate Data Scientist" },
  { student: "Yaram Lakshmi Nisoka", batch: batchOne, organisation: "Exafluence Global Analytics Pvt Ltd", designation: "Associate Data Scientist" },
  { student: "Jonnalagadda Sahithya", batch: batchOne, organisation: "Exafluence Global Analytics Pvt Ltd", designation: "Associate Data Scientist" },
  { student: "K Vinay", batch: batchOne, organisation: "Exafluence Global Analytics Pvt Ltd", designation: "Associate Data Scientist" },
  { student: "Vemuri Bharath Kumar", batch: batchOne, organisation: "Exafluence Global Analytics Pvt Ltd", designation: "Associate Data Scientist" },
  { student: "Veeravalli Sri Satya", batch: batchTwo, organisation: "Exafluence Global Analytics Pvt Ltd", designation: "Data Scientist – Trainee" },
  { student: "Sri Tulasi Satya Saketh Raprolu", batch: batchTwo, organisation: "Exafluence Global Analytics Pvt Ltd", designation: "Data Scientist – Trainee" },
  { student: "K Mounika", batch: batchOne, organisation: "SRAYS Solutions", designation: "Trainee" },
  { student: "Muvvala Rajeswari", batch: batchTwo, organisation: "SRAYS Solutions", designation: "Trainee" },
  { student: "Kamatam Meghana", batch: batchTwo, organisation: "SM Smartygen Media Networks Pvt Ltd (Shortfundly)", designation: "AI Engineer" },
  { student: "Muthyala Bharadwaj", batch: batchTwo, organisation: "SM Smartygen Media Networks Pvt Ltd (Shortfundly)", designation: "AI Engineer" },
];
export const svuInternships: SvuCareerRecord[] = [
  ...["G Mohana Priya", "Bandarupalli Madhuri", "K Vinay", "Myleri Deepa", "Naguru Navya Nikitha", "G V Sumanth", "Talupula Keerthi", "M Sreelekha", "Jonnalagadda Sahithya"].map(student => ({ student, batch: batchOne, organisation: "NARL, Gadanki" })),
  { student: "P Prabhas Raj", batch: batchOne, organisation: "SHAR, Sriharikota" },
  { student: "Vemuri Bharath Kumar", batch: batchOne, organisation: "Vikram Sarabhai Space Centre, Thiruvananthapuram" },
];
/** Internships introduction (client, 2 November 2026, revised later the same day):
 * exact approved website wording. Batch and year detail stays inside the records
 * and the batch filter — never in the heading, the subtitle or these paragraphs. */
export const svuInternshipIntroduction = {
  subtitle: "From academic foundations to research and industry experience.",
  paragraphs: [
    "Exfedu proudly celebrates its students who have secured internships at NARL, Gadanki; SHAR, Sriharikota; and Vikram Sarabhai Space Centre, Thiruvananthapuram. Their achievements reflect an important step towards applying technical knowledge beyond the classroom.",
    "These internships provide opportunities to engage with practical challenges, develop analytical thinking and gain experience in research and professional environments.",
  ],
};
/** Display order (client, 2 November 2026): batch-wise first, then alphabetical by
 * student name. Batch rank comes from the batch's starting year, so 2023–2025 always
 * precedes 2024–2026 (client, 3 November 2026: the roman prefix is no longer shown).
 * Records themselves are never altered. */
export const svuBatchRank = (batch: string) => Number(batch.match(/\d{4}/)?.[0] ?? 0);
export const sortSvuCareerRecords = (records: SvuCareerRecord[]) => [...records].sort((a, b) =>
  svuBatchRank(a.batch) - svuBatchRank(b.batch) || a.student.localeCompare(b.student, undefined, { sensitivity: "base" })
);
export const filterSvuCareerRecords = (records: SvuCareerRecord[], query: string, batch: string) => sortSvuCareerRecords(records.filter(record =>
  (batch === "all" || record.batch === batch) && `${record.student} ${record.batch} ${record.organisation} ${record.designation ?? ""}`.toLowerCase().includes(query.trim().toLowerCase())
));