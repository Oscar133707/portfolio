import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-0 overflow-x-hidden overflow-y-auto scroll-mt-20 w-full">
      
      {/* Split-Screen Background */}
      <div className="absolute inset-0 z-0 flex flex-col md:flex-row">
        {/* Left Image - Hidden on mobile, visible on desktop */}
        <div className="hidden md:block relative w-full md:w-1/2 h-1/2 md:h-full">
          <img 
            src="/for hero/IMG_8897.JPG" 
            alt="Tech Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        {/* Right Image - Full width on mobile, half width on desktop */}
        <div className="relative w-full h-full md:w-1/2 md:h-full">
          <img 
            src="/for hero/IMG_4277.jpg" 
            alt="Athletics Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
            Elitidrottare & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
              Webbutvecklare
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 max-w-2xl mx-auto text-xl text-slate-300 mb-10 leading-relaxed"
        >
          Jag skapar moderna webbplatser och automatiserar affärsprocesser med AI. 
          Låt oss ta din verksamhet till nästa nivå med smart teknik.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <a
            href="#portfolio"
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-semibold rounded-lg text-white bg-accent hover:bg-blue-600 transition-all hover:scale-105 shadow-lg hover:shadow-blue-500/30"
          >
            Se mina projekt
            <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-4 border border-white/30 text-base font-semibold rounded-lg text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all hover:scale-105"
          >
            Boka ett samtal
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;