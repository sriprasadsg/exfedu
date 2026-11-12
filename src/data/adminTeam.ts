import kLavanya from "@/assets/admin-team/k-lavanya.jpg";
import tVijayKumar from "@/assets/admin-team/t-vijay-kumar.jpg";
import vPavanKumar from "@/assets/admin-team/v-pavan-kumar.jpg";
import pParthibhan from "@/assets/admin-team/p-parthibhan.jpg";
import sAbdulHaque from "@/assets/admin-team/s-abdul-haque.jpg";
import cVenkataSuresh from "@/assets/admin-team/c-venkata-suresh.jpg";
import srilekha from "@/assets/admin-team/srilekha.jpg";
import tejashwini from "@/assets/admin-team/tejashwini.jpg";

export type StaffMember = { name: string; role: string; photo: string };
export type StaffGroup = { title: string; people: StaffMember[] };

/** Names and designations come from the client's photo filenames (12 Nov 2026).
 * Kept apart from faculty and technical support so no profile is listed twice. */
export const adminTeamGroups: StaffGroup[] = [
  { title: "Administration", people: [
    { name: "T Vijay Kumar", role: "Senior Admin", photo: tVijayKumar },
    { name: "V Pavan Kumar", role: "Admin & Finance Executive", photo: vPavanKumar },
    { name: "K Lavanya", role: "Student Desk", photo: kLavanya },
  ] },
  { title: "Support Team", people: [
    { name: "P Parthibhan", role: "General Manager – EdTech", photo: pParthibhan },
    { name: "S Abdul Haque", role: "Senior Business Development Executive", photo: sAbdulHaque },
    { name: "C Venkata Suresh", role: "Business Development Executive", photo: cVenkataSuresh },
    { name: "Srilekha", role: "Counsellor", photo: srilekha },
    { name: "Tejashwini", role: "Telecaller", photo: tejashwini },
  ] },
];
