

// Weather card component where the location and themeColor are based on what the agent
// sets via tool calls.
export function WeatherCard({
  location,
  themeColor,
  result,
}: {
  location?: string;
  themeColor: string;
  result: WeatherToolResult;
}) {
  return (
    <div
      data-testid="weather-card"
      style={{
        background: `linear-gradient(135deg, ${themeColor} 0%, ${adjustBrightness(themeColor, -40)} 100%)`
      }}
      className="rounded-2xl mt-6 mb-4 max-w-md w-full shadow-2xl transform hover:scale-[1.02] transition-all duration-300 animate-fade-in-grow relative overflow-hidden ring-1 ring-white/20"
    >
      <div className="absolute inset-0 animate-shimmer pointer-events-none" />
      <div className="bg-black/5 backdrop-blur-sm p-6 w-full rounded-2xl border border-white/30 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 data-testid="weather-city" className="text-2xl font-bold text-white capitalize tracking-tight drop-shadow-md">
              {location}
            </h3>
            <p className="text-white/90 text-sm font-bold uppercase tracking-wider drop-shadow-sm">Current Weather</p>
          </div>
          <div className="bg-white/20 p-3 rounded-full shadow-lg backdrop-blur-md border border-white/30">
            <WeatherIcon conditions={result.conditions} />
          </div>
        </div>

        <div className="flex items-end justify-between mb-6">
          <div className="text-5xl font-bold text-white drop-shadow-lg tracking-tighter">
            {result.temperature}°
            <span className="text-2xl text-white/80 ml-1 font-medium">C</span>
          </div>
          <div className="text-right">
            <div className="text-white/90 font-medium text-lg capitalize drop-shadow-sm">{result.conditions}</div>
            <div className="text-white/60 text-sm font-medium">
              {((result.temperature * 9) / 5 + 32).toFixed(1)}° F
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-white/20">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div data-testid="weather-humidity" className="bg-white/10 rounded-lg p-2 backdrop-blur-sm border border-white/10">
              <p className="text-white/80 text-xs font-bold uppercase tracking-wide mb-1">Humidity</p>
              <p className="text-white font-bold text-lg">{result.humidity}%</p>
            </div>
            <div data-testid="weather-wind" className="bg-white/10 rounded-lg p-2 backdrop-blur-sm border border-white/10">
              <p className="text-white/80 text-xs font-bold uppercase tracking-wide mb-1">Wind</p>
              <p className="text-white font-bold text-lg">{result.windSpeed} <span className="text-xs font-normal opacity-80">mph</span></p>
            </div>
            <div data-testid="weather-feels-like" className="bg-white/10 rounded-lg p-2 backdrop-blur-sm border border-white/10">
              <p className="text-white/80 text-xs font-bold uppercase tracking-wide mb-1">Feels Like</p>
              <p className="text-white font-bold text-lg">{result.feelsLike}°</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to adjust color brightness
function adjustBrightness(color: string, percent: number): string {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255))
    .toString(16).slice(1);
}

export interface WeatherToolResult {
  temperature: number;
  conditions: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
}

function WeatherIcon({ conditions }: { conditions: string }) {
  if (!conditions) return null;

  if (conditions.toLowerCase().includes("clear") || conditions.toLowerCase().includes("sunny")) {
    return <SunIcon />;
  }

  if (
    conditions.toLowerCase().includes("rain") ||
    conditions.toLowerCase().includes("drizzle") ||
    conditions.toLowerCase().includes("snow") ||
    conditions.toLowerCase().includes("thunderstorm")
  ) {
    return <RainIcon />;
  }

  if (
    conditions.toLowerCase().includes("fog") ||
    conditions.toLowerCase().includes("cloud") ||
    conditions.toLowerCase().includes("overcast")
  ) {
    return <CloudIcon />;
  }

  return <CloudIcon />;
}

// Simple sun icon for the weather card
function SunIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-14 h-14 text-yellow-200 animate-spin-slow"
    >
      <circle cx="12" cy="12" r="5" />
      <path
        d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
        strokeWidth="2"
        stroke="currentColor"
      />
    </svg>
  );
}

function RainIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-14 h-14 text-blue-200"
    >
      {/* Cloud */}
      <path
        d="M7 15a4 4 0 0 1 0-8 5 5 0 0 1 10 0 4 4 0 0 1 0 8H7z"
        fill="currentColor"
        opacity="0.8"
      />
      {/* Rain drops */}
      <path
        d="M8 18l2 4M12 18l2 4M16 18l2 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function CloudIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-14 h-14 text-gray-200"
    >
      <path d="M7 15a4 4 0 0 1 0-8 5 5 0 0 1 10 0 4 4 0 0 1 0 8H7z" fill="currentColor" />
    </svg>
  );
}

export function getThemeColor(conditions: string): string {
  const conditionLower = conditions.toLowerCase();
  if (conditionLower.includes("clear") || conditionLower.includes("sunny")) {
    return "#667eea";
  }
  if (conditionLower.includes("rain") || conditionLower.includes("storm")) {
    return "#4A5568";
  }
  if (conditionLower.includes("cloud")) {
    return "#718096";
  }
  if (conditionLower.includes("snow")) {
    return "#63B3ED";
  }
  return "#764ba2";
}

