export const profile = {
  name: "Manish Kandel",
  initials: "MK",
  role: "Full-Stack Web Developer & Python Automation Specialist",
  location: "Kathmandu, Nepal",
  phone: "+977 9741661534",
  email: "manishkandel44@icloud.com",
  github: "https://github.com/dev-manish13",
  githubUsername: "dev-manish13",
  bio: "Full-Stack Web Developer & Python Automation Specialist. I build React web applications, Node.js REST APIs, and automated Python scripts.",
  avatar: "/profile.jpg",
  resume: "/resume.pdf",
};

export const socialLinks = [
  {
    label: "GitHub",
    href: profile.github,
    icon: "GithubMark",
  },
  {
    label: "Email",
    href: `mailto:${profile.email}`,
    icon: "Mail",
  },
  {
    label: "Phone",
    href: `tel:${profile.phone.replace(/\s+/g, "")}`,
    icon: "Phone",
  },
  // TODO: Add LinkedIn, X/Twitter, and other social links in PORTFOLIO_TODO.md
];
