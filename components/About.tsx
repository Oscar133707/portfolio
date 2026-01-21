import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-white scroll-mt-24 overflow-x-hidden w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Image Grid - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4 h-[400px] md:h-[600px]"
          >
            {/* Left Column */}
            <div className="space-y-4 h-full">
              {/* Top-left: VM Poréc 2025 - Larger image */}
              <div className="relative rounded-lg overflow-hidden shadow-md h-[240px] md:h-[360px] cursor-pointer">
                <img 
                  src="/compressed 2/IMG_3531.jpg" 
                  alt="VM Poréc 2025" 
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                />
                <div className="absolute bottom-4 left-4">
                  <span className="inline-block bg-white/90 backdrop-blur-sm text-slate-900 text-sm font-medium px-4 py-2 rounded-full">VM Kroatien 2025</span>
                </div>
              </div>
              
              {/* Bottom-left: Irländska mästerskapen 2024 */}
              <div className="relative rounded-lg overflow-hidden shadow-md h-[150px] md:h-[220px] cursor-pointer">
                <img 
                  src="/compressed 2/IMG_3505.jpg" 
                  alt="Irländska mästerskapen 2024" 
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                />
                <div className="absolute bottom-4 left-4">
                  <span className="inline-block bg-white/90 backdrop-blur-sm text-slate-900 text-sm font-medium px-4 py-2 rounded-full">Irländska mästerskapen 2024</span>
                </div>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-4 h-full">
              {/* Top-right: SM final 2025 */}
              <div className="relative rounded-lg overflow-hidden shadow-md h-[120px] md:h-[180px] cursor-pointer">
                <img 
                  src="/compressed 2/031EAC96-CABA-47BF-B058-6D094FDB808F.jpg" 
                  alt="SM final 2025" 
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                />
                <div className="absolute bottom-4 left-4">
                  <span className="inline-block bg-white/90 backdrop-blur-sm text-slate-900 text-sm font-medium px-4 py-2 rounded-full">SM finalen 2025</span>
                </div>
              </div>
              
              {/* Middle-right: Taekwondo Training */}
              <div className="relative rounded-lg overflow-hidden shadow-md h-[120px] md:h-[180px] cursor-pointer">
                <img 
                  src="/compressed 2/54cd919e-af6a-4733-a8ac-688a0ae9dd91.jpg" 
                  alt="Taekwondo Training" 
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                />
              </div>
              
              {/* Bottom-right: Sweden National Team */}
              <div className="relative rounded-lg overflow-hidden shadow-md h-[150px] md:h-[220px] cursor-pointer">
                <img 
                  src="/compressed 2/592ab3c0-18ad-4c40-9c6d-abaa3181cca6 2.jpg" 
                  alt="Sweden National Team" 
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                />
                <div className="absolute bottom-4 left-4">
                  <span className="inline-block bg-white/90 backdrop-blur-sm text-slate-900 text-sm font-medium px-4 py-2 rounded-full">MMC Polen 2023</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text Content - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center min-h-[400px] md:min-h-[600px]"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Om mig
            </h2>
            
            <div className="space-y-6 text-lg md:text-xl text-slate-700 leading-relaxed">
              <p>
                Jag heter Oscar Johansson och jag är en dedikerad landslagstävlande i Taekwon-do och passionerad webbutvecklare & AI-specialist.
              </p>
              
              <p>
                Under sex år på Taekwon-do-mattan har jag lärt mig att excellens kräver disciplin, precision och att aldrig ge upp. Dessa värderingar formar också mitt arbete inom webbutveckling och AI-automation.
              </p>
              
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mt-8 mb-4">
                Varje projekt finansierar min Taekwon-do-karriär
              </h3>
              
              <p>
                De pengarna jag tjänar går direkt till internationella tävlingar, träningsläger och utrustning som krävs för att konkurrera på elitnivå. När du arbetar med mig investerar du inte bara i professionella digitala lösningar. Du blir också en del av min resa mot VM-medaljer och internationell framgång.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;