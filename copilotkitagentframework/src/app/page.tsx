"use client";

import { ProverbsCard } from "@/components/proverbs";
import { WeatherCard, WeatherToolResult, getThemeColor } from "@/components/weather";
import { ContactCard } from "@/components/contact";
import { ContactList } from "@/components/contact-list";
import { MoonCard } from "@/components/moon";
import {
  useCoAgent,
  useFrontendTool,
  useHumanInTheLoop,
  useCopilotAction,
} from "@copilotkit/react-core";
import { CopilotChat, CopilotKitCSSProperties, CopilotSidebar } from "@copilotkit/react-ui";
import { useState } from "react";
import { AgentState } from "@/lib/types";
import { ContactInfoResult } from "@/components/contact";

export default function CopilotKitPage() {
  const [themeColor, setThemeColor] = useState("#6366f1");
  const [backgroundPattern, setBackgroundPattern] = useState<string | null>(null);

  // 🪁 Frontend Actions: https://docs.copilotkit.ai/microsoft-agent-framework/frontend-actions
  useFrontendTool({
    name: "setThemeColor",
    description: "Set the theme color of the application",
    parameters: [
      {
        name: "themeColor",
        type: "string",
        description: "The theme color to set. Make sure to pick nice colors.",
        required: true,
      },
    ],
    handler: async ({ themeColor }) => {
      setThemeColor(themeColor);
    },
  });

  useFrontendTool({
    name: "setBackgroundPattern",
    description: "Set the background pattern of the application using an SVG string.",
    parameters: [
      {
        name: "svgPattern",
        type: "string",
        description: "The SVG string to use as a background pattern. It should be a valid SVG string.",
        required: true,
      },
    ],
    handler: async ({ svgPattern }) => {
      setBackgroundPattern(svgPattern);
    },
  });

  return (
    <main
      style={
        { "--copilot-kit-primary-color": themeColor } as CopilotKitCSSProperties
      }
    > 
     
        <YourMainContent themeColor={themeColor} backgroundPattern={backgroundPattern} />
      
    </main>
  );
}

function YourMainContent({ themeColor, backgroundPattern }: { themeColor: string, backgroundPattern: string | null }) {
  // 🪁 Shared State: https://docs.copilotkit.ai/pydantic-ai/shared-state
  const { state, setState } = useCoAgent<AgentState>({
    name: "my_agent",
    initialState: {
      proverbs: [
        "CopilotKit may be new, but its the best thing since sliced bread.",
      ],
    },
  });

 useCopilotAction({
    name: "get_weather",
    available: "disabled",
    parameters: [{ name: "location", type: "string", required: true }],
    render: ({ args, result, status }) => {
      if (status !== "complete") {
        return (
          <div className=" bg-[#667eea] text-white p-4 rounded-lg max-w-md">
            <span className="animate-spin">⚙️ Retrieving weather...</span>
          </div>
        );
      }

      const weatherResult: WeatherToolResult = {
        temperature: result?.temperature || 0,
        conditions: result?.conditions || "clear",
        humidity: result?.humidity || 0,
        windSpeed: result?.wind_speed || 0,
        feelsLike: result?.feels_like || result?.temperature || 0,
      };

      const themeColor = getThemeColor(weatherResult.conditions);

      return (
        <WeatherCard
          location={args.location}
          themeColor={themeColor}
          result={weatherResult}
        />
      );
    },
  });

  useCopilotAction({
    name: "get_contacts",
    available: "disabled",
    parameters: [{ name: "fetchXml", type: "string", required: true }],
    render: ({ args, result, status }) => {
      if (status !== "complete") {
        return (
          <div className=" bg-[#667eea] text-white p-4 rounded-lg max-w-md">
            <span className="animate-spin">⚙️ Fetching from Dataverse...</span>
          </div>
        );
      }

      if (!result || result.length === 0) {
        return <></>;
      }

      if (result.length === 1) {
        const firstResult = result[0];
        const contactResult: ContactInfoResult = {
          contactid: firstResult?.contactid || "",
          firstname: firstResult?.firstname || "",
          lastname: firstResult?.lastname || "",
          email: firstResult?.email || "",
          mobilephone: firstResult?.mobilephone || "",
        };

        return (
          <ContactCard
            result={contactResult}
            themeColor={themeColor}
          />
        );
      }

      const contactResults: ContactInfoResult[] = result.map((r: any) => ({
        contactid: r?.contactid || "",
        firstname: r?.firstname || "",
        lastname: r?.lastname || "",
        email: r?.email || "",
        mobilephone: r?.mobilephone || "",
      }));

      return <ContactList results={contactResults} themeColor={themeColor} />;
    },
  });

  // 🪁 Human In the Loop: https://docs.copilotkit.ai/microsoft-agent-framework/human-in-the-loop/frontend-tool-based
  useHumanInTheLoop(
    {
      name: "go_to_moon",
      description: "Go to the moon on request.",
      render: ({ respond, status }) => {
        return (
          <MoonCard themeColor={themeColor} status={status} respond={respond} />
        );
      },
    },
    [themeColor],
  );

  const containerStyle = backgroundPattern
    ? {
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(backgroundPattern)}")`,
        backgroundColor: themeColor,
        backgroundRepeat: "repeat",
      }
    : { backgroundColor: themeColor };

  return (
    <div
      style={containerStyle}
      className="h-screen w-screen flex justify-center items-center p-16 transition-all duration-300"
    >
      <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20 bg-white/95 backdrop-blur-sm">
         <CopilotChat className="h-full w-full"
        disableSystemMessage={true}
        // clickOutsideToClose={false}
        labels={{
          title: "Assistant",
          initial: "👋 Hi, there! You're chatting with an agent.",
        }}
        // suggestions={[
        //   {
        //     title: "Generative UI",
        //     message: "Get the weather in San Francisco.",
        //   },
        //   {
        //     title: "Frontend Tools",
        //     message: "Set the theme to green.",
        //   },
        //   {
        //     title: "Human In the Loop",
        //     message: "Please go to the moon.",
        //   },
        //   {
        //     title: "Write Agent State",
        //     message: "Add a proverb about AI.",
        //   },
        //   {
        //     title: "Update Agent State",
        //     message:
        //       "Please remove 1 random proverb from the list if there are any.",
        //   },
        //   {
        //     title: "Read Agent State",
        //     message: "What are the proverbs?",
        //   },
        // ]}
      ></CopilotChat>
      </div>
    </div>
  );
}
