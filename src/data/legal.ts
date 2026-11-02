// Privacy Policy and Terms & Conditions, from the client-supplied document
// "Exfedu_Privacy_Policy_and_Terms_Conditions.pdf" (2 November 2026).
// Draft-only bracketed fields from the source are omitted until the client
// confirms them; no entity names, dates or legal details are invented.

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
}

export interface LegalDocument {
  path: string;
  title: string;
  tagline: string;
  lastUpdated: string;
  intro: string[];
  sections: LegalSection[];
}

export const privacyPolicy: LegalDocument = {
  path: "/privacy-policy",
  title: "Privacy Policy",
  tagline: "Your information, handled with care.",
  lastUpdated: "3 November 2026",
  intro: [
    "Exafluence Education (Exfedu), an Edtech Division of Exafluence Inc., USA, respects your privacy. This policy explains how personal information is collected, used and protected when you visit our website, submit an enquiry or interact with our educational services.",
    "Entity responsible for this website and your personal information: Exafluence Education (Exfedu), Edtech Division of Exafluence Inc., USA.",
  ],
  sections: [
    {
      heading: "1. Information We Collect",
      paragraphs: ["Depending on your interaction with us, we may collect:"],
      list: [
        "Contact information: Name, email address, telephone number and location.",
        "Academic and professional information: Qualifications, institution, organisation, role and programme interests that you provide.",
        "Enquiry information: Messages, requests and correspondence with our team.",
        "Application information: Details and documents requested through an authorised application process.",
        "Technical information: IP address, browser, device information and website activity, where collected through our website systems.",
      ],
    },
    {
      heading: "2. How We Use Your Information",
      paragraphs: [
        "We use information to respond to enquiries, provide programme guidance, support applications and enrolment, administer programmes, communicate requested information and service updates, maintain website functionality and security, improve services, and meet applicable legal and record-keeping obligations. Promotional communications are handled separately from essential service communications, with consent where required. You may opt out of promotional messages at any time.",
      ],
    },
    {
      heading: "3. Sharing Your Information",
      paragraphs: [
        "Where necessary for the purpose explained to you, information may be shared with authorised Exfedu personnel and relevant Exafluence entities; the institution or programme collaborator involved in your enquiry or application; service providers supporting hosting, communications, applications or learning delivery; and authorities where legally required.",
        "Sharing is limited to information relevant to the purpose. Enquiring about one programme does not automatically authorise sharing across the entire collaboration network.",
      ],
    },
    {
      heading: "4. Cookies and Website Technologies",
      paragraphs: [
        "This website does not use analytics, advertising or marketing cookies, and no optional tracking technologies operate on it. Only essential technical storage needed for the website to function and keep your browsing session working is used; it does not track you across other websites.",
        "You can manage or clear this storage at any time through your browser settings.",
      ],
    },
    {
      heading: "5. Information Security and Retention",
      paragraphs: [
        "We use appropriate technical and organisational safeguards to protect personal information. No online system can guarantee complete security.",
        "Information is retained for as long as reasonably necessary for the stated purpose, applicable legal requirements and legitimate record-keeping needs. It is then deleted or anonymised as appropriate.",
      ],
    },
    {
      heading: "6. International Processing",
      paragraphs: [
        "Where information is processed outside your country, we apply safeguards required by applicable law.",
      ],
    },
    {
      heading: "7. Your Privacy Choices",
      paragraphs: [
        "Depending on applicable law, you may have rights to request access, correction or deletion of information, withdraw consent and raise a privacy complaint. Contact contact@exafluence.com to make a request. We may need to verify your identity.",
        "Withdrawing consent does not affect processing lawfully undertaken before withdrawal. Some information may need to be retained to meet legal obligations.",
      ],
    },
    {
      heading: "8. Student Photographs and Achievements",
      paragraphs: [
        "Student names, photographs, project work, testimonials, internship details and placement achievements may be featured with appropriate permission or another lawful basis. For corrections or concerns about published student information, contact contact@exafluence.com.",
      ],
    },
    {
      heading: "9. Children's Privacy",
      paragraphs: [
        "Where an applicant or learner is a child under applicable law, we follow relevant requirements for parental or guardian involvement and consent. Contact us if you believe a child's information has been submitted without the necessary authorisation.",
      ],
    },
    {
      heading: "10. External Websites",
      paragraphs: [
        "Our website may link to universities, collaborators and external platforms. Their privacy policies govern information collected directly through those services.",
      ],
    },
    {
      heading: "11. Policy Updates",
      paragraphs: [
        "We may update this policy to reflect changes in our services or data practices. The revised version will display an updated date. Additional notice or consent will be provided where required.",
      ],
    },
    {
      heading: "12. Contact Us",
      paragraphs: ["Privacy queries and grievances: contact@exafluence.com"],
    },
  ],
};

export const termsAndConditions: LegalDocument = {
  path: "/terms-and-conditions",
  title: "Terms & Conditions",
  tagline: "Clear information for using our website and exploring our programmes.",
  lastUpdated: "3 November 2026",
  intro: [
    "These Terms & Conditions govern your use of the Exafluence Education (Exfedu) website, operated by Exafluence Education (Exfedu), Edtech Division of Exafluence Inc., USA. Programme enrolment is also subject to the specific terms provided by the relevant institution or programme provider.",
  ],
  sections: [
    {
      heading: "1. Website Use",
      paragraphs: [
        "You may use this website to explore programmes, review educational information and submit genuine enquiries. You must not submit false or unauthorised information, attempt to access restricted systems or other users' information, upload harmful material, disrupt operations, or misuse website content, forms or communication channels.",
      ],
    },
    {
      heading: "2. Programme Information",
      paragraphs: [
        "Programme pages describe learning opportunities, eligibility, delivery methods, duration and other relevant details. We aim to keep this information accurate. Confirm essential details with the authorised admissions team before applying or making payment.",
        "Material changes affecting enrolled learners will be communicated in accordance with applicable programme terms and law.",
      ],
    },
    {
      heading: "3. Applications and Admissions",
      paragraphs: [
        "Submitting an enquiry or application does not guarantee admission. Admission is subject to eligibility criteria, selection processes, document verification, seat availability and institutional requirements. Applicants are responsible for accurate information and authentic documents.",
      ],
    },
    {
      heading: "4. Collaborations and Awarding Institutions",
      paragraphs: [
        "Exfedu works with academic institutions and technology organisations on specified educational activities. Each organisation's responsibilities, delivery arrangements and the issuer of any qualification or certificate are defined in the relevant programme information and enrolment documents.",
        "An organisation's logo does not mean it awards or endorses every programme on this website.",
      ],
    },
    {
      heading: "5. Fees, Payments, Cancellations and Refunds",
      paragraphs: [
        "Applicable fees, payment schedules, taxes, cancellation conditions and refund rules will be provided before enrolment or payment. Refund requests are handled under the policy applicable to the programme and responsible institution, subject to applicable law. Payments should be made only through officially communicated channels.",
      ],
    },
    {
      heading: "6. Learning, Assessment and Certification",
      paragraphs: [
        "Learners must meet the attendance, participation, assessment and academic requirements specified for their programme. Certificates, qualifications or completion records are issued only when the relevant requirements are satisfied. The issuing organisation and award type will be stated in the programme documentation.",
      ],
    },
    {
      heading: "7. Internships, Placements and Career Outcomes",
      paragraphs: [
        "Published internship and placement records describe individual student achievements. They do not guarantee similar outcomes for every learner. Selection, employment, job roles and compensation depend on individual performance, eligibility, organisational requirements and recruitment decisions. Any included career support will be described in the programme's approved terms.",
      ],
    },
    {
      heading: "8. Intellectual Property",
      paragraphs: [
        "Website content, illustrations, educational materials and branding belong to Exfedu or their respective owners. You may view website material for personal information. Reproduction, commercial redistribution or modification requires permission unless permitted by law or a stated licence. Collaborator names and logos remain the property of their respective owners.",
      ],
    },
    {
      heading: "9. Information You Submit",
      paragraphs: [
        "You must have the necessary permission to submit documents, photographs or other materials. Submitting an enquiry or application does not, by itself, grant permission to use your photograph, testimonial or work for marketing. Such use is addressed separately. Personal information is handled as described in our Privacy Policy.",
      ],
    },
    {
      heading: "10. External Links and Services",
      paragraphs: [
        "Links to third-party websites are provided for relevant information or services. Those websites operate under their own terms and privacy policies. Exfedu is responsible for its own representations and services; third-party providers are responsible for theirs.",
      ],
    },
    {
      heading: "11. Website Availability and Responsibility",
      paragraphs: [
        "We take reasonable care to maintain the website, but access may occasionally be interrupted by maintenance, technical faults or circumstances beyond our reasonable control. Nothing in these terms excludes liability that cannot lawfully be excluded or limits rights available under applicable law.",
      ],
    },
    {
      heading: "12. Updates to These Terms",
      paragraphs: [
        "Updated terms will be published with a revised date. Material changes affecting existing enrolments will be handled through the applicable agreement and notification process.",
      ],
    },
    {
      heading: "13. Governing Law and Disputes",
      paragraphs: [
        "Please first direct concerns to contact@exafluence.com so we can seek a resolution. This does not restrict your right to approach a competent authority or court.",
      ],
    },
    {
      heading: "14. Contact Us",
      paragraphs: [
        "Exafluence Education — website and programme queries: contact@exafluence.com",
      ],
    },
  ],
};

export const legalDocuments: LegalDocument[] = [privacyPolicy, termsAndConditions];
