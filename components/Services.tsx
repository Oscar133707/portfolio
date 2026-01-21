import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Bot, Check, Sparkles } from 'lucide-react';

interface ServiceFeatureProps {
  text: string;
  colorClass: string;
}

const ServiceFeature: React.FC<ServiceFeatureProps> = ({ text, colorClass }) => (
  <li className="flex items-start space-x-3">
    <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${colorClass} bg-opacity-10`}>
      <Check size={12} className={colorClass} strokeWidth={3} />
    </div>
    <span className="text-slate-600 text-base leading-relaxed">{text}</span>
  </li>
);

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  theme: 'blue' | 'purple';
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, features, icon, theme, delay }) => {
  const isBlue = theme === 'blue';
  
  // Color configurations based on theme
  const bgGradient = isBlue ? 'from-blue-500 to-cyan-400' : 'from-purple-500 to-indigo-500';
  const hoverBorder = isBlue ? 'group-hover:border-blue-200' : 'group-hover:border-purple-200';
  const shadowColor = isBlue ? 'group-hover:shadow-blue-500/10' : 'group-hover:shadow-purple-500/10';
  const featureColor = isBlue ? 'text-blue-600' : 'text-purple-600';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8 }}
      className={`group relative h-full bg-white rounded-3xl p-8 md:p-10 border border-slate-100 ${hoverBorder} shadow-sm hover:shadow-2xl ${shadowColor} transition-all duration-300 ease-out flex flex-col`}
    >
      {/* Icon Container */}
      <div className="mb-8 relative">
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${bgGradient} flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
          {icon}
        </div>
        {/* Decorative blob behind icon */}
        <div className={`absolute -inset-4 bg-gradient-to-br ${bgGradient} opacity-0 group-hover:opacity-20 blur-xl rounded-full transition-opacity duration-500`} />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 tracking-tight">
          {title}
        </h3>
        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
          {description}
        </p>

        <div className="w-full h-px bg-slate-100 mb-8" />

        <ul className="space-y-4 mb-8">
          {features.map((feature, idx) => (
            <ServiceFeature key={idx} text={feature} colorClass={featureColor} />
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 md:py-32 bg-slate-50 relative overflow-x-hidden overflow-y-visible scroll-mt-24 w-full">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-x-hidden overflow-y-visible pointer-events-none">
        <div className="absolute top-20 left-0 md:left-10 w-64 md:w-96 h-64 md:h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-20 right-0 md:right-10 w-64 md:w-96 h-64 md:h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20 md:mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block py-1 px-3 rounded-full bg-slate-100 text-slate-600 text-sm font-semibold tracking-wide uppercase mb-4"
          >
            Vad jag erbjuder
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6"
          >
            Tjänster
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Helhetslösningar inom digital utveckling. Jag kombinerar teknisk expertis med affärsförståelse för att skapa värde.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          
          <ServiceCard 
            theme="blue"
            icon={<Monitor size={32} strokeWidth={2.5} />}
            title="Webbutveckling"
            description="Responsiva, snabba och användarvänliga hemsidor byggda med modern teknik som React och Tailwind CSS."
            features={[
              "Responsiv design för alla enheter",
              "Snabb laddningstid & SEO-optimering",
              "Modern tech stack (React, TypeScript, Next.js)",
              "Underhållbar och skalbar kod"
            ]}
            delay={0.2}
          />

          <ServiceCard 
            theme="purple"
            icon={<Sparkles size={32} strokeWidth={2.5} />}
            title="AI-Automation"
            description="Effektivisera arbetsflöden genom att implementera smarta AI-assistenter och automatiseringar som sparar tid."
            features={[
              "Automatisera repetitiva uppgifter",
              "AI-chattbotar & assistenter",
              "Integration med befintliga system",
              "Skräddarsydda lösningar för din verksamhet"
            ]}
            delay={0.4}
          />

        </div>
      </div>

      {/* Custom Styles for Tailwind config (simulated here for functionality) */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default Services;