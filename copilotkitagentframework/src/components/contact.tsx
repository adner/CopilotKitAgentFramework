
export function ContactCard({
  result,
  themeColor = "#6366f1",
}: {
  result: ContactInfoResult;
  themeColor?: string;
}) {
  return (
    <div
      data-testid="contact-card"
      style={{
        background: `linear-gradient(135deg, ${themeColor} 0%, ${adjustBrightness(themeColor, -40)} 100%)`
      }}
      className="rounded-2xl mt-6 mb-4 max-w-md w-full shadow-2xl transform hover:scale-[1.02] transition-all duration-300 animate-fade-in-grow relative overflow-hidden ring-1 ring-white/20"
    >
      <div className="absolute inset-0 animate-shimmer pointer-events-none" />
      <div className="bg-black/5 backdrop-blur-sm p-6 w-full rounded-2xl border border-white/30 relative z-10">
        {/* Header with Avatar Circle */}
        <div className="flex items-center gap-4 mb-6">
          <div className={`bg-white/20 rounded-full shadow-lg backdrop-blur-md border border-white/30 ${
            result.firstname === "Jonas" && result.lastname === "Rapp"
              ? "p-0 overflow-hidden w-[5.5rem] h-[5.5rem] flex-shrink-0"
              : "p-4"
          }`}>
            {result.firstname === "Jonas" && result.lastname === "Rapp" ? (
              <img
                src="jonas.png"
                alt="Jonas Rapp"
                className="w-full h-full object-cover"
              />
            ) : (
              <ContactIcon />
            )}
          </div>
          <div className="flex-1">
            <h3 data-testid="contact-name" className="text-2xl font-bold text-white mb-1 tracking-tight drop-shadow-md">
              <a
                href={`https://org41df0750.crm4.dynamics.com/main.aspx?appid=6605cbc2-a674-f011-b4cc-000d3ab25cc7&pagetype=entityrecord&etn=contact&id=${result.contactid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-white/90 transition-colors"
              >
                {result.firstname} {result.lastname}
              </a>
            </h3>
            <p className="text-white/90 text-sm font-bold uppercase tracking-wider drop-shadow-sm">Contact Information</p>
          </div>
        </div>

        {/* Contact Details */}
        <div className="space-y-4">
          {result.email && (
            <div
              data-testid="contact-email"
              className="flex items-center gap-3 bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors duration-200 border border-white/10 shadow-sm"
            >
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <EmailIcon />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white/80 text-xs font-bold uppercase tracking-wide drop-shadow-sm">Email</p>
                <p className="text-white font-bold truncate drop-shadow-sm">{result.email}</p>
              </div>
            </div>
          )}
          {result.mobilephone && (
            <div
              data-testid="contact-phone"
              className="flex items-center gap-3 bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors duration-200 border border-white/10 shadow-sm"
            >
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <PhoneIcon />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white/80 text-xs font-bold uppercase tracking-wide drop-shadow-sm">Mobile Phone</p>
                <p className="text-white font-bold drop-shadow-sm">{result.mobilephone}</p>
              </div>
            </div>
          )}
          <div
            data-testid="contact-id"
            className="flex items-center gap-3 bg-white/10 p-3 rounded-lg border border-white/10 shadow-sm"
          >
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <IdIcon />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white/80 text-xs font-bold uppercase tracking-wide drop-shadow-sm">Contact ID</p>
              <p className="text-white font-mono text-xs truncate font-semibold opacity-90 drop-shadow-sm">{result.contactid}</p>
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

export interface ContactInfoResult {
  contactid: string;
  firstname: string;
  lastname: string;
  email: string;
  mobilephone: string;
}

function ContactIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-14 h-14 text-white/90"
    >
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5 text-white/70"
    >
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5 text-white/70"
    >
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

function IdIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5 text-white/70"
    >
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" />
    </svg>
  );
}