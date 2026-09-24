export const scriptSource = `class Developer:
    def __init__(self):
        self.name = "Manish Kandel"
        self.role = "Full-Stack Web Developer"
        self.location = "Kathmandu, Nepal"
        self.status = "Available for freelance / full-time"
        self.skills = [
            "React", "Node.js", "Express", "MySQL",
            "Python", "BeautifulSoup4", "Automation",
        ]

    def contact(self):
        return {
            "email": "manishkandel44@icloud.com",
            "phone": "+977 9741661534",
            "github": "github.com/dev-manish13",
        }

if __name__ == "__main__":
    dev = Developer()
    dev.run()`;

export const outputLines = [
  { text: "$ python developer_info.py", type: "command" },
  { text: "Booting developer_info.py ...", type: "muted" },
  { text: "Loading profile ▸ OK", type: "info" },
  { text: "", type: "blank" },
  { text: "name       : Manish Kandel", type: "data" },
  { text: "role       : Full-Stack Web Developer & Python Automation Specialist", type: "data" },
  { text: "location   : Kathmandu, Nepal", type: "data" },
  { text: "", type: "blank" },
  { text: "skills     : [React, Node.js, Express, MySQL, Tailwind CSS]", type: "data" },
  { text: "             [Python, BeautifulSoup4, Requests, Automation]", type: "data" },
  { text: "", type: "blank" },
  { text: "status     : Available for freelance / full-time", type: "success" },
  { text: "email      : manishkandel44@icloud.com", type: "data" },
  { text: "github     : github.com/dev-manish13", type: "data" },
  { text: "", type: "blank" },
  { text: "Process finished with exit code 0", type: "muted" },
];
