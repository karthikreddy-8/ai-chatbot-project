import { motion } from 'framer-motion';
import { Code, Search, PenTool, Globe, Palette, FileText } from 'lucide-react';

const features = [
  {
    icon: Code,
    title: 'Code Assistant',
    description: 'Write, debug, and optimize code in any programming language with intelligent suggestions.',
    color: '#38BDF8',
    gradient: 'from-blue-500/10 to-cyan-500/10',
  },
  {
    icon: Search,
    title: 'AI Research',
    description: 'Get detailed, accurate information on any topic with intelligent research assistance.',
    color: '#A78BFA',
    gradient: 'from-purple-500/10 to-pink-500/10',
  },
  {
    icon: PenTool,
    title: 'Content Writer',
    description: 'Generate essays, articles, emails, and creative content effortlessly.',
    color: '#EC4899',
    gradient: 'from-pink-500/10 to-red-500/10',
  },
  {
    icon: Globe,
    title: 'Translation',
    description: 'Translate text between multiple languages with high accuracy and natural flow.',
    color: '#10B981',
    gradient: 'from-green-500/10 to-emerald-500/10',
  },
  {
    icon: Palette,
    title: 'Creative AI',
    description: 'Generate image prompts, story ideas, and creative concepts on demand.',
    color: '#38BDF8',
    gradient: 'from-cyan-500/10 to-blue-500/10',
  },
  {
    icon: FileText,
    title: 'Smart Analysis',
    description: 'Analyze data, summarize documents, and extract key insights instantly.',
    color: '#A78BFA',
    gradient: 'from-purple-500/10 to-violet-500/10',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/**
 * Features — Feature showcase grid section with neon styling.
 */
export default function Features() {
  return (
    <section className="py-24 px-6 relative z-10" id="features">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Powerful <span style={{ animation: 'glow-text 3s ease-in-out infinite' }} className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">AI Capabilities</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From coding to creativity, our AI is your all-in-one intelligent assistant.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -8 }}
              className="group relative"
            >
              <motion.div
                className={`relative p-6 rounded-xl backdrop-blur-xl h-full overflow-hidden transition-all duration-300 border`}
                style={{
                  background: `linear-gradient(135deg, rgba(124, 58, 237, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)`,
                  borderColor: feature.color + '40',
                }}
                animate={{
                  boxShadow: [
                    `0 0 15px ${feature.color}30, inset 0 0 15px ${feature.color}10`,
                    `0 0 25px ${feature.color}50, inset 0 0 20px ${feature.color}15`,
                    `0 0 15px ${feature.color}30, inset 0 0 15px ${feature.color}10`,
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {/* Icon Container */}
                <motion.div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300"
                  style={{
                    background: `${feature.color}15`,
                    border: `1px solid ${feature.color}40`,
                  }}
                  whileHover={{
                    background: `${feature.color}25`,
                    boxShadow: `0 0 20px ${feature.color}60, inset 0 0 10px ${feature.color}30`,
                  }}
                >
                  <feature.icon size={24} style={{ color: feature.color }} />
                </motion.div>

                {/* Title */}
                <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-white transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>

                {/* Accent line on hover */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: `linear-gradient(90deg, ${feature.color}00, ${feature.color}ff, ${feature.color}00)` }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
