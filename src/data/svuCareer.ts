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
  ...["G Mohana Priya", "Bandarupalli Madhuri", "K Vinay", "Myleri Deepa", "Naguru Navya Nikitha", "Sumanth G V", "Talupula Keerthi", "M Sreelekha", "Jonnalagadda Sahithya"].map(student => ({ student, batch: batchOne, organisation: "NARL, Gadanki" })),
  { student: "P Prabhas Raj", batch: batchOne, organisation: "SHAR, Sriharikota" },
  { student: "Vemuri Bharath Kumar", batch: batchOne, organisation: "Vikram Sarabhai Space Centre, Thiruvananthapuram" },
];
export const filterSvuCareerRecords = (records: SvuCareerRecord[], query: string, batch: string) => records.filter(record =>
  (batch === "all" || record.batch === batch) && `${record.student} ${record.batch} ${record.organisation} ${record.designation ?? ""}`.toLowerCase().includes(query.trim().toLowerCase())
);