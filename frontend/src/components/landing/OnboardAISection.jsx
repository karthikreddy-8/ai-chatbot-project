import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Cpu, Terminal, ArrowRight, MessageSquareCode, Sparkles } from 'lucide-react';

const SUGGESTED_PROMPTS = [
  {
    id: 1,
    title: 'Calculate Slingshot Trajectory',
    prompt: 'Plan a gravity-assist slingshot route around Jupiter to reach Saturn.',
    response: 'Calculating slingshot trajectory vector...\n\n1. **Target:** Jupiter Orbit Approach Vector: 14.2° relative to ecliptic.\n2. **Gravity Assist Delta-V Boost:** +8.4 km/s.\n3. **Optimal Insertion Burn:** T+144:20:10.\n4. **Trajectory Output:** Hyperbolic orbital escape achieved. Fuel consumption reduced by 42%. En-route duration to Saturn shortened by 14 months.',
  },
  {
    id: 2,
    title: 'Check Exoplanet Telemetry',
    prompt: 'What are the surface conditions and biosphere stats of Kepler-186f?',
    response: 'Retrieving deep space probe archive...\n\n- **Spectral Class:** M-type red dwarf (Kepler-186).\n- **Equilibrium Temperature:** -31°C (estimated, with greenhouse warming expected to push habitable zones to +12°C).\n- **Gravity Factor:** 1.12 g (structural reinforcements recommended for human mobility).\n- **Biosphere Diagnostics:** Multi-cellular photosynthetic plant life detected (red pigment flora). Liquid water reservoirs cover 64% of surface area.',
  },
  {
    id: 3,
    title: 'Decrypt Foreign Transmission',
    prompt: 'Translate the localized warning marker found on Gliese-581g.',
    response: 'Parsing Gliese-581g regional radio frequencies...\n\n- **Signal Origin:** Solar Twilight Zone Sentinel Grid.\n- **Decryption Protocol:** Unified Interstellar Glyphs.\n- **Translation Output:** *"Danger. High ionized radiation storm activity starting in sector 4. Seek bio-dome magnetic shield buffer immediately. Do not expose carbon-based cellular structures."*',
  },
];

export default function OnboardAISection() {
  const navigate = useNavigate();
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'ai',
      text: 'Greetings Voyager. I am **Nexus AI**, your onboard interstellar flight copilot. Click one of the astronaut command queries below to test my navigation subsystems.',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handlePromptClick = (promptObj) => {
    if (isTyping) return;
    
    // Add user message
    setChatHistory((prev) => [...prev, { sender: 'user', text: promptObj.prompt }]);
    setSelectedPrompt(promptObj);
    setIsTyping(true);
  };

  useEffect(() => {
    if (!selectedPrompt) return;

    // Simulate AI typing response after 1.5 seconds
    const timer = setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        { sender: 'ai', text: selectedPrompt.response },
      ]);
      setIsTyping(false);
      setSelectedPrompt(null);
    }, 1800);

    return () => clearTimeout(timer);
  }, [selectedPrompt]);

  return (
    <section id="cosmos-ai" className="py-28 px-6 relative z-10 bg-slate-950/40">
      
      {/* Background blobs */}
      <div className="absolute top-[20%] left-[10%] w-[450px] h-[450px] bg-violet-600/5 blur-[90px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-cyan-500/5 blur-[90px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: AI Description & Controls */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-semibold tracking-wider text-cyan-300 uppercase">
                Voyager Companion System
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
              Nexus Interstellar <br />
              <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-500 bg-clip-text text-transparent">
                Flight Copilot
              </span>
            </h2>

            <p className="text-slate-300 leading-relaxed mb-8">
              Every COSMOS starship is powered by **Nexus AI**, our advanced deep-space neural network. Nexus AI manages atmospheric life support diagnostics, plots optimal gravity-assist slingshots, and translates planetary grids in real-time.
            </p>

            {/* Simulated buttons */}
            <div className="flex flex-col gap-4 w-full">
              <span className="text-xs font-bold font-mono tracking-widest text-slate-400 uppercase">
                SELECT AN ASTRONAUT COMMAND QUERY:
              </span>

              <div className="flex flex-col gap-3">
                {SUGGESTED_PROMPTS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handlePromptClick(item)}
                    disabled={isTyping}
                    className="p-4 rounded-xl text-left bg-slate-900/40 border border-white/5 hover:border-cyan-500/30 hover:bg-slate-900/80 transition-all duration-300 flex items-center justify-between group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <Terminal className="w-4 h-4 text-cyan-400" />
                      <span className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                        {item.title}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform group-hover:text-cyan-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Simulated Chat Dialog Console */}
          <div className="lg:col-span-7 w-full">
            <div className="liquid-glass-strong border border-white/10 overflow-hidden flex flex-col h-[520px] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              
              {/* Terminal Title Bar */}
              <div className="px-6 py-4 bg-slate-950/60 border-b border-white/10 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  <span className="text-xs font-mono text-slate-400 ml-2">NEXUS_NAV_OS_V4.9</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-cyan-400">ENCRYPTED CO-PILOT</span>
                </div>
              </div>

              {/* Chat Message Window Area */}
              <div className="flex-grow p-6 overflow-y-auto flex flex-col gap-4 hide-scrollbar bg-slate-950/30">
                {chatHistory.map((msg, index) => {
                  const isAI = msg.sender === 'ai';
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${isAI ? 'justify-start' : 'justify-end'} w-full`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                          isAI
                            ? 'bg-slate-900/60 border border-white/5 text-slate-200'
                            : 'bg-gradient-to-r from-violet-600/30 to-cyan-500/20 border border-cyan-500/30 text-white'
                        }`}
                      >
                        {/* Render simple formatting for markdown bolding/bullets */}
                        <div className="whitespace-pre-line">
                          {msg.text.split('\n').map((line, idx) => {
                            let content = line;
                            // Match bolding **text**
                            const boldRegex = /\*\*(.*?)\*\*/g;
                            const matches = line.matchAll(boldRegex);
                            
                            // Basic formatting replacement
                            const formatted = line.replace(/\*\*(.*?)\*\*/g, '$1');
                            
                            return (
                              <p key={idx} className={line.startsWith('-') ? 'ml-4 list-item list-disc' : 'mb-1'}>
                                {line.startsWith('-') ? line.substring(2) : line}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Simulated Typing dots */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start w-full"
                  >
                    <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-4 flex gap-1.5 items-center">
                      <div className="typing-dot" />
                      <div className="typing-dot" />
                      <div className="typing-dot" />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Terminal Bottom Redirect CTA */}
              <div className="p-4 bg-slate-950/60 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 flex-shrink-0">
                <span className="text-xs text-slate-400 text-center md:text-left">
                  Ready to start a live conversation with the AI engine?
                </span>
                
                <button
                  onClick={() => navigate('/login')}
                  className="px-5 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-violet-600 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:scale-[1.03] transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageSquareCode className="w-4 h-4" />
                  Consult Live AI
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
