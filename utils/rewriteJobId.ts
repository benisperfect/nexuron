export default (jobId: string) => {
  switch (jobId) {
    case "marketing":
      return "MaE";
    case "game":
      return "Game";
    case "cybersecurity-web":
      return "CS-Web";
    case "cybersecurity-app":
      return "CS-App";
    case "ai-ml":
      return "AI-ML";
    case "ai-cv":
      return "AI-CV";
    case "ai-nlp":
      return "AI-NLP";
    case "web-frontend":
      return "Web-Frontend";
    case "web-backend":
      return "Web-Backend";
    case "web-ui_ux":
      return "Web-UIUX";
    case "app-desktop":
      return "App-Desktop";
    case "app-embedded":
      return "App-Embedded";
    default:
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid jobId",
      });
  }
};
