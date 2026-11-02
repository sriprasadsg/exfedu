export type SvuCareerRecord = { student: string; batch: string; organisation: string; designation?: string };
const batchOne = "I · 2023–2025";
const batchTwo = "II · 2024–2026";
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
/** Internships introduction (client, 2 November 2026): exact approved website
 * wording. Batch and year detail stays inside the records and the batch filter —
 * never in the heading, the subtitle or these paragraphs. */
export const svuInternshipIntroduction = {
  subtitle: "Applying knowledge. Building experience. Advancing with confidence.",
  paragraphs: [
    "Exfedu proudly celebrates its students who have secured internships at NARL, Gadanki; SHAR, Sriharikota; and Vikram Sarabhai Space Centre, Thiruvananthapuram.",
    "These opportunities connect academic preparation with research and technical practice, helping students apply their knowledge, strengthen problem-solving skills and experience professional working environments.",
  ],
};
export const filterSvuCareerRecords = (records: SvuCareerRecord[], query: string, batch: string) => records.filter(record =>
  (batch === "all" || record.batch === batch) && `${record.student} ${record.batch} ${record.organisation} ${record.designation ?? ""}`.toLowerCase().includes(query.trim().toLowerCase())
);