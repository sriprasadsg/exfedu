import innovation from "@/assets/svu-innovation-hub.png";
import summitStudents from "@/assets/svu-paniit-students.jpg";
import summitDelegation from "@/assets/svu-paniit-delegation.jpg";

/** Featured achievement story (client-approved, 4 Nov 2026). */
export const svuFeaturedAchievement = {
  title: "SVU\u2013Exafluence MS Data Science Students Win First Prize at Quantum Hackathon Semi-Finals",
  standfirst: "Applying quantum computing and data science to financial market forecasting.",
  paragraphs: [
    "Students from the MS Data Science programme offered through Sri Venkateswara University and Exafluence Education secured first prize in the semi-finals of the AP Quantum Hackathon 2025 for their project, \u201cQuantum Wave Forecast.\u201d",
    "Competing against approximately 50 teams from Tirupati, Nellore and Kadapa districts, the team developed a hybrid quantum\u2013classical model to predict FTSE\u00A0100 market trends. The project combined Quantum Fourier Transform, a Variational Quantum Classifier and Explainable AI.",
    "Our students were congratulated by SVU\u2019s Vice-Chancellor, Prof. Apparao, along with the Registrar and faculty members.",
  ],
};
export const svuAchievements = [
  { title: "Ideas to Impact", text: "Students presented their product at the Ratan Tata Innovation Hub, International Institute of Digital Technologies, Tirupati, showcasing practical innovation and potential social impact." },
];
export const svuEvents = [
  { title: "PanIIT Andhra Pradesh Summit 2026", text: "M Jayalakshmi and Telapalli Sai Sukrutha, M.S. Data Science students, participated on 3 October 2026 at Dr. B.R. Ambedkar Kala Vedika, Vijayawada, exploring emerging technology and the DeepTech ecosystem." },
  { title: "Python & Professional Readiness Sessions", text: "Python training, free soft-skills sessions and mock interviews support technical knowledge, communication, aptitude and interview preparation." },
];
export const svuGallery = [
  { src: innovation, caption: "Student innovation presentation, Tirupati" },
  { src: summitStudents, caption: "M.S. Data Science students at PanIIT Andhra Pradesh Summit 2026" },
  { src: summitDelegation, caption: "PanIIT Andhra Pradesh Summit 2026 delegation" },
];
export const svuResearchMetrics = [
  { value: 13, label: "Published research papers", context: "MSDS batch 2023–2025" },
  { value: 46, label: "Student publication certificates", context: "Journal publications" },
  { value: 37, label: "Conference papers presented", context: "REVA, CMR and KLH conferences" },
  { value: 73, label: "Conference publication certificates", context: "Separate conference record" },
];
export const svuConferencePapers = [
  { student: "Vemuri Bharath Kumar", conference: "ICTIS 2026 · Bangkok", title: "MSDS 2023–2025 research presentation" },
  { student: "Kamasani Vishnu Vardhan Reddy", conference: "TIBS 2026 · Manila", title: "A Hybrid Retrieval Architecture for Intelligent Campus Assistants: Combining Semantic Search with Factual Consistency" },
  { student: "Veeravalli Sri Satya", conference: "TIBS 2026 · Manila", title: "Gesture Controlled Interface for Smart Devices using MediaPipe and Android Debug Bridge" },
  { student: "Nagala Mouna Meghana", conference: "TIBS 2026 · Manila", title: "Multimodal Orchestrator for Real-Time Cognitive Mirroring in Social Anxiety" },
  { student: "B Matthew Mineeth", conference: "TIBS 2026 · Manila", title: "A Hybrid Multi-Agent Framework with Reinforcement Learning for Personalized Financial Planning and Asset Allocation" },
  { student: "Mathyam Supriya", conference: "ICDAI 2026 · West Bengal", title: "MediExplain: An Explainable AI System for Health Report Interpretation and Specialist Guidance" },
];
export const svuPublications = [
  ["AI agents for sustainable brand content creation", "708"],
  ["AI for green HRM: Promoting eco-conscious workplace practices and carbon footprint reduction", "688"],
  ["AI in employee wellness and sustainable work-life balance in the digital age", "695"],
  ["AI in green marketing: Driving sustainable consumer behaviour through personalization", "714"],
  ["AI-enabled ethical consumerism in modern brand strategies", "764"],
  ["Auto skill navigator: Pioneering personalized learning and skill development", "689"],
  ["Cloud-based accounting solutions for paperless, environmentally friendly practices", "707"],
  ["Ethical AI in lending and credit scoring for sustainable communities", "709"],
  ["Ethical AI in recruitment and sustainable workforce planning", "690"],
  ["From data to delight: Predictive analytics for optimizing hospitality service ratings", "741"],
  ["From theory to transaction: How AI and blockchain are redefining banking operations", "686"],
  ["Neuromarketing for sustainable product adoption & eco-friendly consumer behaviour", "712"],
  ["Remote work optimization: Reducing environmental impact while enhancing productivity", "715"],
].map(([title, id]) => ({ title, href: `https://www.allcommercejournal.com/special-issue/2025.v6.i2S.${id}` }));
export const svuFaculty = [
  { name: "Anjan Babu", role: "Professor & Coordinator", expertise: "SVU Computer Science professor and coordinator for industry-integrated Data Science programmes." },
  { name: "Malaya Rout", role: "Faculty", expertise: "Vice President at Exafluence; AI, ML and industry data solutions." },
  { name: "Gopinath Kesavan", role: "Faculty", expertise: "AI, cloud-scale solutions, automation and centres of excellence." },
  { name: "Padmanayaki", role: "Assistant Professor", expertise: "Computer Science, Artificial Intelligence and Data Science." },
  { name: "Lalitha", role: "Assistant Professor", expertise: "Analytics, AI and big data." },
  { name: "Kumar Armugam", role: "Faculty", expertise: "NLP, Computer Vision, Generative AI and multi-cloud technologies." },
  { name: "Sasank Majeti", role: "Faculty", expertise: "Data analytics, Python, R, SQL, Power BI, Tableau and deep learning." },
  { name: "Sreeram Babu Bojja", role: "Faculty", expertise: "Communication, life skills and creative writing." },
  { name: "Venkat Prasad Reddy", role: "Faculty", expertise: "Banking and healthcare AI, NLP, Agentic AI and Computer Vision." },
  { name: "Poonam Talati", role: "Faculty", expertise: "Programming, web development and database management." },
  { name: "Babu", role: "Faculty", expertise: "Agile, DevOps, DevSecOps, cloud, SRE and software quality." },
  { name: "Abhishek Kumar Ram", role: "Faculty", expertise: "DBMS, SQL, data processing and analytics." },
];
export const svuSupport: { name: string; role?: string; expertise: string }[] = [
  { name: "Neelakanteswara Pagadala", expertise: "AI/ML research, Industrial IoT and student project mentoring." },
  { name: "Saiteja Minchala", expertise: "Data Science, AI and software development." },
  { name: "Nynaru Teja", expertise: "Full-stack development, AI and MSDS academic assistance." },
  { name: "Sudeepthi Mahajanam", expertise: "Generative AI, NLP, cloud deployments and LLM evaluation." },
  { name: "Santharajupalli Umapathi", expertise: "Python, AI, Computer Vision and RAG applications." },
  { name: "A Rohith Sai", role: "Technical Support", expertise: "" },
  { name: "G Kiran Kumar", role: "Technical Support", expertise: "" },
];
export const svuBrochureReview = "The supplied programme brochure is held for review: its ISO wording must identify Exafluence Global Analytics Private Limited and must not imply educational accreditation.";
export const svuReviewedCurricula: Record<string, string[]> = {
  "masters-data-science": ["Data analysis and visualisation", "Machine learning and big data management", "AI, Generative AI and Quantum Technologies", "Hands-on projects and case studies"],
  "pg-diploma-data-science": ["Statistical techniques for Data Science", "Python programming", "Fundamentals of Machine Learning", "Big Data Analytics, NoSQL and Hadoop"],
  "python-ai-ml-genai": ["Intelligent agents and problem-solving", "Python programming and Data Science", "Generative AI and Deep Learning", "Machine learning algorithms", "Responsible AI and optimisation"],
  "data-visualization": ["Python, statistics, NumPy and Pandas", "Matplotlib and Seaborn", "Excel and SQL", "Tableau and Power BI", "Machine Learning and Generative AI visualisations"],
  "cloud-technologies": ["Cloud infrastructure and computing essentials", "AWS, Google Cloud and Azure", "Multi-cloud automation", "Cloud applications and optimisation", "Multi-cloud Machine Learning and Generative AI", "Cloud resilience"],
};

export const svuProjects = [
  {
    "student": "ABBURI SRAVANI",
    "title": "Smart Attendance System Using Real-Time Facial Recognition and Deformation Handling"
  },
  {
    "student": "BALLOLU VASAVI",
    "title": "Interactive Data Lineage Tracker for Source-to-Target Mapping"
  },
  {
    "student": "BANDARUPALLI MADHURI",
    "title": "Business-Aligned Machine Learning Model Validator"
  },
  {
    "student": "CHENNUPATI BHAVANI",
    "title": "Prediction based system on water management"
  },
  {
    "student": "DASARI SAIKEERTHI",
    "title": "Intelligent Campus Assistance Chatbot"
  },
  {
    "student": "G MOHANA PRIYA",
    "title": "AI-Driven Heart Transplant Rejection Predictor"
  },
  {
    "student": "GOUTHUKATLA GOKUL SAI",
    "title": "GenAI-Based ETL Workflow Automation Tool"
  },
  {
    "student": "JONNALAGADDA SAHITHYA",
    "title": "AI-Based Data Quality Monitor and Fix Recommendation Engine"
  },
  {
    "student": "K MOUNIKA",
    "title": "Conversational Assistant for ETL Querying and Debuggings"
  },
  {
    "student": "K VINAY",
    "title": "Carbon footprint calculator app"
  },
  {
    "student": "KONATHALAPALLI KRISHNA KISHORE",
    "title": "AI-Based Transformation Rule Generator for Data Pipelines"
  },
  {
    "student": "KONDAM UMESH",
    "title": "AI-based Clinical Consultation Summarizer"
  },
  {
    "student": "KONDURU SIVA NAGA PRASAD",
    "title": "You tube Sentiment based product analysis"
  },
  {
    "student": "M R C V HRUDAY BABU",
    "title": "Conversational Stock Research Agent using LLM + MCP"
  },
  {
    "student": "M SREELEKHA",
    "title": "Smart Data Mapping Assistant (GenAI Optimized)"
  },
  {
    "student": "MYLERI DEEPA",
    "title": "Smart CPT & ICD Code Suggestion Engine"
  },
  {
    "student": "NAGURU NAVYA NIKITHA",
    "title": "Derma Health"
  },
  {
    "student": "P PRABHAS RAJ",
    "title": "MAUSAM: Advanced Weather Forecasting System"
  },
  {
    "student": "PAMUDURTHI SOWJANYA",
    "title": "AI-Driven Predictive Maintenance and Failure Forecasting System for Industrial Equipment"
  },
  {
    "student": "PODURI SRI CHIRANJEEVIKANAKABHUSHNAM",
    "title": "Downtime Reduction due to Foreign Particles Entrapment at Pulp Mill using DL/CV"
  },
  {
    "student": "PRAVALLIKA RAJYALAKSHMI C",
    "title": "AI-Driven Retail Inventory Analytics Platform for Real-Time Stock Tracking, Predictive Insights, Intelligent Product Placement, and Profit-Optimized Bundling with Dynamic Pricing"
  },
  {
    "student": "RAMESH LEELA KRISHNA",
    "title": "Design and develop an AI-powered system that delivers an OCD (Obsessive-Compulsive Disorder) questionnaire-based survey, collects responses from users, and automatically generates a personalized report highlighting OCD symptom patterns, severity levels, and possible recommendations based on standardized psychological assessment criteria"
  },
  {
    "student": "S MAHESH",
    "title": "Build an AI-powered chatbot that takes a list of symptoms from the user and predicts the most likely disease(s) they may have. The chatbot should also suggest potential next steps (like consulting a doctor or taking rest) based on the prediction"
  },
  {
    "student": "SUMANTH G V",
    "title": "Smart Cart : An AI-Driven Dish-to-ingredients cart generator with optimized price and  brand recommendation"
  },
  {
    "student": "TALUPULA KEERTHI",
    "title": "Gesture-Controlled Interface for Smart Devices Using OpenCV"
  },
  {
    "student": "TAMIDALAPATI MUNI POOJITHA",
    "title": "Predictive Demand forecasting Analysis"
  },
  {
    "student": "VEMURI BHARATH KUMAR",
    "title": "Quantum-Guided Healthcare Data Augmentation with GenAI Recommendations"
  },
  {
    "student": "YARAM LAKSHMI NISOKA",
    "title": "Parking Detection System using AI and Computer Vision"
  },
  {
    "student": "B Bhargavi",
    "title": "Clinical Trial Eligibility Decision Support Web Application"
  },
  {
    "student": "B Matthew Mineeth",
    "title": "Advisor System for Personal Financial and Investment Planning with Visual Dashboards"
  },
  {
    "student": "C Keerthana Joy",
    "title": "Personalized Clothing Recommendation System for E-Commerce"
  },
  {
    "student": "Giddaluru Jai Sankar",
    "title": "FHIR Patient Embedding Generator for Patient Similarity"
  },
  {
    "student": "Kamasani Vishnuvardhan Reddy",
    "title": "INTELLIGENT CAMPUS ASSISTANT CHATBOT"
  },
  {
    "student": "Kamatam Meghana",
    "title": "LLM-Based Prior Authorization Form Generator"
  },
  {
    "student": "Kinnera Priyadarshini",
    "title": "Automated GitHub Pull Request Review and Risk Analysis System"
  },
  {
    "student": "Mathyam Supriya",
    "title": "AI-Powered Health Report Interpreter and Visual Assistant"
  },
  {
    "student": "Muthyala Bharadwaj",
    "title": "Explainable 3D Chest CT Imaging System for Lung Nodule Detection"
  },
  {
    "student": "Muvvala Rajeswari",
    "title": "Conversational Equity Research and Stock Analysis System Using Financial Data and LLMs"
  },
  {
    "student": "Nagala Mouna Meghana",
    "title": "AI Cognitive Mirror for Social Anxiety"
  },
  {
    "student": "Peruvailu Kamal",
    "title": "Multi-Modal Pulmonary Fibrosis Diagnosis System"
  },
  {
    "student": "Ragineni Anjali",
    "title": "Real time skill gap generative agent for hyper personalized upskilling in digital workflows"
  },
  {
    "student": "Ragineni Kiran Kumar",
    "title": "Market-Aware Price Monitoring and Optimization System for Retail Analytics"
  },
  {
    "student": "Sri Tulasi Satya Saketh Raprolu",
    "title": "Story Forge: A Multi-Modal AI Assistant for Creative Narrative Generation"
  },
  {
    "student": "Sure Tharun Kumar",
    "title": "Genomics-Driven Personalized Treatment Recommendation System for Parkinson’s Disease"
  },
  {
    "student": "Veeravalli Sri Satya",
    "title": "Gesture-Controlled Interface for Smart Devices Using OpenCV"
  },
  {
    "student": "Vuppala Srivalli",
    "title": "Spatio-Temporal Analysis for DeepFake Detection – A Hybrid Deep Learning Framework for DeepFake Video Classification"
  },
  {
    "student": "Y Sreevidya",
    "title": "HEDIS / CareGaps Measure Score Explainer Bot"
  }
];
