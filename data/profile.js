export const SITE_URL = "https://kandelmanish.com.np";

// Single source of truth for the navbar brand and job title: the navbar,
// page titles, Open Graph tags, OG image and JSON-LD all read from here.
export const BRAND = "manish.dev";

export const profile = {
  name: "Manish Kandel",
  role: "Full-Stack Developer & Python Automation Specialist",
  location: "Kathmandu, Nepal",
  locality: "Kathmandu",
  country: "Nepal",
  // Base64-encoded so the number never appears as plain text in the HTML or
  // the JS bundle; the contact page decodes it when the visitor asks for it.
  phoneEncoded: "Kzk3NyA5NzQxNjYxNTM0",
  email: "manishkandel.co@gmail.com",
  github: "https://github.com/dev-manish13",
  githubUsername: "dev-manish13",
  // TODO: replace with your personal LinkedIn profile URL
  linkedin: "https://www.linkedin.com",
  bio: "Full-Stack Developer & Python Automation Specialist building React web applications, Node.js REST APIs, and automated data pipelines.",
  avatar: "/profile.jpg",
  avatarAlt: "Portrait of Manish Kandel, full-stack developer in Kathmandu",
  resume: "/resume.pdf",
};

export const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`;

export const timeline = [
  {
    heading: "Work experience",
    items: [
      {
        title: "Birgunj Bazar Pvt. Ltd.",
        role: "Frontend Developer Intern",
        period: "Sep 2025 – Dec 2025",
        points: [
          "Developed responsive frontend web components, catalog interfaces, and storefront features.",
        ],
      },
    ],
  },
  {
    heading: "Education & certifications",
    items: [
      {
        title: "Triton International College, Tribhuvan University",
        place: "Balkumari, Kathmandu",
        role: "Bachelor of Computer Applications (BCA)",
        period: "2021 – 2026",
      },
      {
        title: "National College of Computer Studies (NCCS)",
        place: "Paknajol, Kathmandu",
        role: "+2 Management",
        period: "2018 – 2020",
      },
      {
        title: "freeCodeCamp",
        role: "Front End Development Certification",
      },
    ],
  },
];

export const skillGroups = [
  { category: "Frontend", items: ["React", "Next.js", "JavaScript", "Tailwind CSS"] },
  { category: "Backend & Tools", items: ["Node.js", "Express", "MySQL", "Git"] },
  { category: "Python & Automation", items: ["Python", "BeautifulSoup4"] },
];
