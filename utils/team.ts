export default () => {
  type Team = {
    name: string;
    subName: string;
    icon: string;
    navDescription?: string;
    description?: string;
  };

  const teams: Team[] = [
    { name: "None", subName: "Marketing and Economy", icon: "i-lucide-chart-candlestick" },
    { name: "Cybersecurity", subName: "Web", icon: "i-lucide-shield-ban" },
    { name: "Cybersecurity", subName: "App", icon: "i-lucide-shield-ban" },
    // { name: "AI", subName: "Machine Learning", icon: "i-lucide-bot" },
    // { name: "AI", subName: "Computer Vision", icon: "i-lucide-bot" },
    // { name: "AI", subName: "Natural Language Processing", icon: "i-lucide-bot" },
    { name: "None", subName: "AI", icon: "i-lucide-bot" },
    { name: "None", subName: "Web", icon: "i-lucide-layout-template"},
    { name: "Web", subName: "Frontend", icon: "i-lucide-layout-template" },
    { name: "Web", subName: "Backend", icon: "i-lucide-layout-template" },
    { name: "None", subName: "Design", icon: "i-lucide-layout-template" },
    { name: "App", subName: "Desktop", icon: "i-lucide-layout-panel-left" },
    { name: "App", subName: "Embedded", icon: "i-lucide-layout-panel-left" },
    { name: "None", subName: "Game", icon: "i-lucide-gamepad-2" },
    { name: "Game", subName: "Animation", icon: "i-lucide-gamepad-2" },
    { name: "NoneHR", subName: "Human Resources", icon: "i-lucide-users" },
    { name: "NoneCP", subName: "Competitive Programming", icon: "i-lucide-code" },
    { name: "NoneCP", subName: "Học thuật", icon: "i-lucide-book" },
    { name: "None", subName: "Media", icon: "i-lucide-video" }
  ];

  const navLookup: Record<string, string> = {
    None: "Nghiên cứu và phát triển các giải pháp tiếp thị/game",
    NoneHR: "Quản lý nhân sự và phát triển đội ngũ",
    NoneCP: "Tham gia các cuộc thi lập trình và thiết kế các bài toán, tài liệu cho các cuộc thi.",
    Cybersecurity: "Nghiên cứu và phát triển các giải pháp bảo mật",
    AI: "Nghiên cứu và phát triển các giải pháp AI",
    Web: "Nghiên cứu và phát triển các giải pháp web",
    App: "Nghiên cứu và phát triển các giải pháp ứng dụng",
    Media: "Nghiên cứu và phát triển các giải pháp truyền thông",
  };

  const descLookup: Record<string, string> = {
    "None-Marketing and Economy":
      "Chiến lược và thực hiện các kế hoạch tiếp thị cho sản phẩm.",
    "None-Game": "Thiết kế và phát triển các trò chơi giải trí.",
    "Game-Animation": "Nghiên cứu và phát triển các giải pháp hoạt hình cho trò chơi.",
    "Cybersecurity-Web": "Nghiên cứu và phát triển các giải pháp bảo mật cho web.",
    "Cybersecurity-App":
      "Nghiên cứu và phát triển các giải pháp bảo mật cho ứng dụng.",
    // "AI-Machine Learning": "Xây dựng các mô hình học máy để phân tích dữ liệu.",
    // "AI-Computer Vision": "Phát triển các mô hình thị giác máy tính cho nhận diện hình ảnh.",
    // "AI-Natural Language Processing": "Xây dựng các mô hình xử lý ngôn ngữ tự nhiên cho chatbot và phân tích văn bản.",
    "None-AI": "Nghiên cứu và phát triển các giải pháp AI",
    "None-Web": "Nghiên cứu và phát triển các giải pháp web",
    "Web-Frontend": "Xây dựng giao diện người dùng cho ứng dụng web.",
    "Web-Backend": "Phát triển API và quản lý cơ sở dữ liệu cho ứng dụng web.",
    "None-Design": "Thiết kế trải nghiệm người dùng và giao diện cho ứng dụng web.",
    "App-Desktop": "Xây dựng ứng dụng cho máy tính để bàn.",
    "App-Embedded": "Phát triển phần mềm nhúng cho các thiết bị IoT.",
    "NoneHR-Human Resources": "Quản lý nhân sự và phát triển đội ngũ.",
    "NoneCP-Competitive Programming": "Tham gia các cuộc thi lập trình và thiết kế các bài toán, tài liệu cho các cuộc thi.",
    "NoneCP-Học thuật": "Nghiên cứu và phát triển các giải pháp học thuật.",
    "None-Media": "Nghiên cứu và phát triển các giải pháp truyền thông.",
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
