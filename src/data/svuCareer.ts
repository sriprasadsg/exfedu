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
  { student: "Kamatam Meghana", batch: batchTwo, organisation: "SM Smartygen Media Networks Pvt Ltd", designation: "AI Engineer" },
  { student: "Muthyala Bharadwaj", batch: batchTwo, organisation: "SM Smartygen Media Networks Pvt Ltd", designation: "AI Engineer" },
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
/** Internships page programme update (client, 3 November 2026): text-only announcement that
 * sits below the introduction and above the internship records. No poster artwork was approved
 * for this update, so nothing here renders an image. Batch detail is deliberately kept as quiet
 * supporting record information rather than a heading, chip or highlighted label. */
export const svuInternshipUpdate = {
  heading: "Advancing Skills in Generative AI",
  status: "Enrolled",
  recordNote: "Batch 3",
  summary: "Exfedu proudly celebrates the enrolment of 15 MSDS students in the 15-Day DEF-SPACE Advanced Generative AI Internship 2026, offered by Bharat Space Education Research Centre, New Delhi. Students will undertake four projects during this online internship and receive an internship certificate upon successful completion.",
  highlights: ["15 Students Enrolled", "15 Days", "4 Planned Projects", "Online"],
  /** Spelling preserved exactly as supplied (client, 3 November 2026). */
  students: [
    "Badhur Ammulya",
    "Bandi Govardan Reddy",
    "Chinnabarugu Malliswar",
    "Damerla Nanditha",
    "Guttireddy Vishnukanth Reddy",
    "Jayampu Veera Maheswari",
    "Kanipakam Sasikiran Reddy",
    "Kankanala Nishanth",
    "Kondredi Geethanjali",
    "Koneti Vamsi Krishna",
    "M Jayalakshmi",
    "Meenakshi Keerthi",
    "P Ramya Krishna",
    "Pulivarthi Dharmika Sayee",
    "Telapalli Sai Sukrutha",
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