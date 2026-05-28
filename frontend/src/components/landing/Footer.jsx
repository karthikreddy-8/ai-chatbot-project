import { Link } from 'react-router-dom';
import { Activity, Mail, Phone, MapPin, Compass } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-950/80 border-t border-white/10 pt-20 pb-10 px-6 overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 right-[25%] w-[400px] h-[200px] bg-cyan-500/5 blur-[90px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Grid Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Col 1: Brand Logo */}
          <div className="lg:col-span-4 flex flex-col items-start gap-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                <Activity className="text-white w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <span className="text-2xl font-black tracking-widest bg-gradient-to-r from-white via-cyan-300 to-white bg-clip-text text-transparent group-hover:cosmos-glow-text transition-all duration-300">
                COSMOS
              </span>
            </Link>
            
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mt-2">
              COSMOS is a registered private interstellar travel corporation. Providing sub-orbital luxury cruisers, warp expeditions, and active exoplanet habitat settlements. Powered by Nexus AI.
            </p>

            <div className="flex gap-4 mt-2">
              <a href="#" className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-cyan-500/40 text-slate-400 hover:text-white transition-all duration-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-label="Twitter">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-cyan-500/40 text-slate-400 hover:text-white transition-all duration-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-label="LinkedIn">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
                </svg>
              </a>
              <a href="#" className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-cyan-500/40 text-slate-400 hover:text-white transition-all duration-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-label="GitHub">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2.5">
            <h4 className="text-xs font-black uppercase text-slate-300 tracking-wider font-mono mb-6">
              VOYAGE PROGRAM
            </h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <a href="#hero" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Orbital Launch
                </a>
              </li>
              <li>
                <a href="#fleet" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Spaceship Fleet
                </a>
              </li>
              <li>
                <a href="#destinations" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Galactic Coordinates
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Flight Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Portal Links */}
          <div className="lg:col-span-2.5">
            <h4 className="text-xs font-black uppercase text-slate-300 tracking-wider font-mono mb-6">
              AI CONTROL PORTAL
            </h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link to="/login" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Consult Navigator AI
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Warp Registry Login
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Telemetry Console
                </Link>
              </li>
              <li>
                <a href="#launch-dashboard" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Launch Checklist FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Details */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="text-xs font-black uppercase text-slate-300 tracking-wider font-mono mb-6">
              COSMOS HEADQUARTERS
            </h4>
            <ul className="flex flex-col gap-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span>Sector 4, Dome City, Olympus Mars Colony</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span>voyages@cosmos.private</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span>+88 440-WARP-SPEED</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider line */}
        <div className="h-[1px] w-full bg-white/10 mb-10" />

        {/* Bottom Details Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-500 font-mono">
          <span>© {currentYear} COSMOS Space-Travel Corp. Private Interstellar Operator.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">TERMS OF FLIGHT</a>
            <a href="#" className="hover:text-slate-300 transition-colors">SHIELD INDEMNITY CONTRACT</a>
            <a href="#" className="hover:text-slate-300 transition-colors">OS PRIVACY POLICY</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
