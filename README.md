# CopilotKit + Microsoft Agent Framework + AG-UI

This is an example of an agent with a rich user interface, that uses CopilotKit for the front-end, and **Microsoft Agent Framework** as the backend, communicating using the [AG-UI protocol](https://github.com/ag-ui-protocol/ag-ui).

Check out this video on LinkedIn showing it in action: [**Dynamic AI user interfaces with Microsoft Agent Framework & AG-UI**](https://www.linkedin.com/posts/andreasadner_dynamic-ai-user-interfaces-with-microsoft-activity-7398088200042315776-ygSA?utm_source=share&utm_medium=member_desktop)

This project is based on the **Microsoft Agent Framework quickstart template for CopilotKit**:

📚 **Docs:** [https://docs.copilotkit.ai/microsoft-agent-framework/quickstart](https://docs.copilotkit.ai/microsoft-agent-framework/quickstart)

You can spin up the same starting point with:
```bash
npx copilotkit@latest create -f microsoft-agent-framework-dotnet
```
Then, the template was modified in various ways:

- Both backend and frontend code didn't really work, so I made modifications using for example code found [**here**](https://github.com/microsoft/agent-framework/tree/main/dotnet/samples/AGUIClientServer/AGUIDojoServer).

Check out the [reasoning](https://github.com/microsoft/agent-framework/blob/dc2b109b509361288199c8727876c9c3e3e1da9d/docs/decisions/0010-ag-ui-support.md) why AG-UI support was added to Microsoft Agent Framework, and why the team believes it is important.
