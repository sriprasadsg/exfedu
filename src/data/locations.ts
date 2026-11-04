// Client brief, 4 November 2026: the footer replaces the single office line with a
// headquarters list. Wording, phone numbers and PIN codes are reproduced as supplied.
export type FooterOffice = {
  label: string;
  lines: string[];
  phone?: string;
};

export type FooterCountry = {
  code: "US" | "IN";
  name: string;
  offices: FooterOffice[];
};

export const headquartersLabel = "Headquarters";

export const footerLocations: FooterCountry[] = [
  {
    code: "US",
    name: "USA",
    offices: [
      {
        label: "Texas",
        lines: ["400 Stonebrook Pkwy, #905", "Frisco, Texas - 75036"],
        phone: "Ph: +1 7328373764",
      },
      {
        label: "New Jersey",
        lines: ["5 Independence Way", "Princeton, New Jersey - 08540"],
      },
    ],
  },
  {
    code: "IN",
    name: "India",
    offices: [
      {
        label: "Corporate Address - Tirupati",
        lines: ["#210, Ecco Greens Tech Hub", "Upadhyaya Nagar, Tirupati - 517507"],
        phone: "Phone: 0877 - 222675",
      },
      {
        label: "Registered Address - Bangalore",
        lines: ["HM Towers, 5th floor, Brigade Road Off", "MG Road, Bangalore - 560001"],
      },
    ],
  },
];
