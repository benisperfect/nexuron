export default () => {
  type Team = {
    name: string;
    subName: string;
    icon: string;
    navDescription?: string;
    description?: string;
  };

  const teams: Team[] = [
    { name: "None", subName: "Marketing", icon: "i-lucide-chart-candlestick" },
    { name: "Cybersecurity", subName: "Web", icon: "i-lucide-shield-ban" },
    { name: "Cybersecurity", subName: "App", icon: "i-lucide-shield-ban" },
    { name: "AI", subName: "ML", icon: "i-lucide-bot" },
    { name: "AI", subName: "CV", icon: "i-lucide-bot" },
    { name: "AI", subName: "NLP", icon: "i-lucide-bot" },
    { name: "Web", subName: "Frontend", icon: "i-lucide-layout-template" },
    { name: "Web", subName: "Backend", icon: "i-lucide-layout-template" },
    { name: "Web", subName: "Ui_Ux", icon: "i-lucide-layout-template" },
    { name: "App", subName: "Desktop", icon: "i-lucide-layout-panel-left" },
    { name: "App", subName: "Embedded", icon: "i-lucide-layout-panel-left" },
    { name: "None", subName: "Game", icon: "i-lucide-gamepad-2" },
  ];

  const navLookup: Record<string, string> = {
    None: "General roles outside core tech categories",
    Cybersecurity: "Protect systems against digital threats",
    AI: "Build and train intelligent models",
    Web: "Create and optimize web platforms",
    App: "Develop desktop & embedded software",
  };

  const descLookup: Record<string, string> = {
    "None-Marketing":
      "Promote our products, run campaigns, and engage audiences.",
    "None-Game": "Design and produce engaging game-dev experiences.",
    "Cybersecurity-Web": "Harden and monitor web servers, APIs and front-ends.",
    "Cybersecurity-App":
      "Secure mobile and desktop applications against exploits.",
    "AI-ML": "Research and implement novel machine-learning algorithms.",
    "AI-CV": "Build computer-vision pipelines to interpret visual data.",
    "AI-NLP": "Design natural-language models for text understanding.",
    "Web-Frontend": "Craft responsive, accessible user interfaces.",
    "Web-Backend": "Build scalable APIs, databases and server-side logic.",
    "Web-Ui_Ux": "Design intuitive flows and wireframes for web apps.",
    "App-Desktop": "Develop cross-platform desktop applications.",
    "App-Embedded": "Write firmware and control code for embedded devices.",
  };

  return teams.map((t) => {
    const key = `${t.name}-${t.subName}`;
    return {
      ...t,
      navDescription: navLookup[t.name],
      description: descLookup[key]!,
    };
  });
};
