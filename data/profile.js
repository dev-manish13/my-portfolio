export const profile = {
  name: "Manish Kandel",
  role: "Full-Stack Developer & Python Automation Specialist",
  location: "Kathmandu, Nepal",
  phone: "+977 9741661534",
  email: "manishkandel.co@gmail.com",
  github: "https://github.com/dev-manish13",
  githubUsername: "dev-manish13",
  // TODO: replace with your personal LinkedIn profile URL
  linkedin: "https://www.linkedin.com",
  bio: "Full-Stack Developer & Python Automation Specialist building React web applications, Node.js REST APIs, and automated data pipelines.",
  avatar: "/profile.jpg",
  resume: "/resume.pdf",
};

export const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`;

export const timeline = [
  {
    heading: "Work & Experience",
    items: [
      {
        title: "Birgunj Bazar Pvt. Ltd.",
        role: "Frontend Developer Intern",
        period: "Sep 2025 – Dec 2025",
        points: [
          "Developed responsive frontend web components, catalog interfaces, and storefront features.",
        ],
      },
      {
        title: "freeCodeCamp",
        role: "Front End Development Certification",
        period: "Certification",
      },
    ],
  },
  {
    heading: "Education",
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
    ],
  },
];

export const skillGroups = [
  { category: "Frontend", items: ["React", "JavaScript", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Express", "MySQL"] },
  { category: "Python & Automation", items: ["Python", "BeautifulSoup4"] },
  { category: "Tools", items: ["Git"] },
];
