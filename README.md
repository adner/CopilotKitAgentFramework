# CopilotKit Agent Framework Project 🚀

Building beautiful, dynamic AI-powered UIs shouldn't be hard—and this project proves it. This is a CopilotKit integration powered by the **Microsoft Agent Framework**, combining a .NET backend with a sleek Next.js frontend to deliver adaptive, generative user interfaces that respond intelligently to user requests.

## 🎥 See It In Action

Check out this video demo on LinkedIn showing the project in action:  
👉 [**Dynamic AI User Interfaces with Microsoft Agent Framework**](https://www.linkedin.com/posts/andreasadner_dynamic-ai-user-interfaces-with-microsoft-activity-7398088200042315776-ygSA?utm_source=share&utm_medium=member_desktop)

---

## 🌱 Where It All Began

This project started with the **Microsoft Agent Framework quickstart template for CopilotKit**—a solid foundation for building AI-powered experiences.

📚 **Docs:** [https://docs.copilotkit.ai/microsoft-agent-framework/quickstart](https://docs.copilotkit.ai/microsoft-agent-framework/quickstart)

You can spin up the same starting point with:
```bash
npx copilotkit@latest create -f microsoft-agent-framework-dotnet
```

---

## ✨ What Makes This Different

Sure, the template is great—but this project takes it a few steps further. Here's what's been added:

### 🎨 **Visual Enhancements**
The frontend has been given a serious glow-up:
- **Glassmorphism effects** with backdrop blur and semi-transparent layers
- **Smooth animations**: fade-in effects, shimmer overlays, and even a rotating sun icon 🌞
- **Dynamic background patterns**: SVG-based patterns you can swap on the fly

### 🧩 **Custom UI Components**
Three brand-new components bring data to life:
- **ContactCard**: A sleek, animated card for displaying contact details—complete with a clickable link back to the source system.
- **ContactList**: A stylish, responsive table for browsing multiple contacts at once.
- **WeatherCard**: Real-time weather info with animated icons and a polished gradient design.

### ⚙️ **Backend Magic**
The .NET backend has been enhanced to support these rich UI experiences, following best practices from the official Microsoft Agent Framework samples.

🔗 **Inspiration:** [AGUIDojoServer Sample](https://github.com/microsoft/agent-framework/tree/main/dotnet/samples/AGUIClientServer/AGUIDojoServer)

---

## 🤖 AG-UI: The Secret Sauce

At the heart of this project is **AG-UI (Adaptive Generative UI)**—a game-changer for building intelligent, context-aware interfaces.

### Why AG-UI Rocks:
- **On-the-Fly UI Generation**: No more static forms or hardcoded views. The agent decides what to show based on the conversation.
- **Richer Experiences**: Go beyond text—render tables, cards, forms, and interactive elements dynamically.
- **Clean Separation**: The agent handles the logic; the frontend handles the visuals. Everyone wins.

### The Design Decision
AG-UI support was intentionally built into the Microsoft Agent Framework to enable exactly these kinds of rich, adaptive experiences.

📖 **Read the decision doc:** [AG-UI Support Design Decision](https://github.com/microsoft/agent-framework/blob/dc2b109b509361288199c8727876c9c3e3e1da9d/docs/decisions/0010-ag-ui-support.md?plain=1#L16)

---

## 🚀 Ready to Build?

Clone this repo, fire up the backend and frontend, and start exploring what's possible when AI meets beautiful UI. The future of human-AI interaction is adaptive, intelligent, and seriously good-looking. Let's build it together.
