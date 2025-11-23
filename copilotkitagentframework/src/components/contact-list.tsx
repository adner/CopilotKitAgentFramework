import { ContactInfoResult } from "./contact";

export function ContactList({ results, themeColor = "#6366f1" }: { results: ContactInfoResult[], themeColor?: string }) {
  return (
    <div 
      className="w-full max-w-4xl mt-6 mb-4 animate-fade-in-grow relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/20"
      style={{
        background: `linear-gradient(135deg, ${themeColor} 0%, ${adjustBrightness(themeColor, -40)} 100%)`
      }}
    >
      <div className="absolute inset-0 animate-shimmer pointer-events-none" />
      <div className="bg-black/5 backdrop-blur-sm relative z-10">
        <div className="p-6 border-b border-white/20 bg-white/5">
          <div className="flex items-center gap-4">          
              <img src="dataverse.png" className="w-12 h-auto" />  
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight drop-shadow-md">
                Contacts Found
              </h3>
              <p className="text-white/80 text-sm font-medium mt-0.5">{results.length} results found</p>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-white border-collapse">
            <thead className="bg-black/20 text-xs uppercase font-bold tracking-wider text-white/90">
              <tr>
                <th className="px-6 py-4 border-b border-white/10">Name</th>
                <th className="px-6 py-4 border-b border-white/10">Email</th>
                <th className="px-6 py-4 border-b border-white/10">Phone</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {results.map((contact) => (
                <tr
                  key={contact.contactid}
                  className="hover:bg-white/10 transition-colors duration-200 group"
                >
                  <td className="px-6 py-4">
                    <div className="font-bold text-white text-lg group-hover:text-white transition-colors drop-shadow-sm">
                      <a
                        href={`https://org41df0750.crm4.dynamics.com/main.aspx?appid=6605cbc2-a674-f011-b4cc-000d3ab25cc7&pagetype=entityrecord&etn=contact&id=${contact.contactid}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {contact.firstname} {contact.lastname}
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-white/90 font-medium">{contact.email}</td>
                  <td className="px-6 py-4 text-sm font-mono text-white/90 font-medium">
                    {contact.mobilephone}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

