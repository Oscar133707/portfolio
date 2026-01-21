import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import { ContactFormData } from '../types';

const Contact: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormData>();

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Form Data:", data);
    alert("Tack för ditt meddelande! Jag återkommer inom kort.");
    reset();
  };

  return (
    <section id="contact" className="py-20 bg-slate-900 text-white scroll-mt-24 overflow-x-hidden w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Redo att starta ditt nästa projekt?
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Oavsett om du behöver en ny webbplats, vill automatisera dina processer eller bara vill bolla idéer. Hör av dig! Jag är alltid öppen för att diskutera nya projekt.
            </p>
            
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <div className="bg-slate-800 p-3 rounded-lg text-accent">
                        <Mail size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-400">Email</p>
                        <a href="mailto:info@oscarjohansson.eu" className="text-xl font-semibold hover:text-accent transition-colors">
                            info@oscarjohansson.eu
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-12 p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
                <h4 className="font-semibold text-lg mb-2 text-blue-400">Varför anlita mig?</h4>
                <ul className="space-y-2 text-slate-300">
                    <li className="flex items-center gap-2">✓ Snabb leverans och tydlig kommunikation</li>
                    <li className="flex items-center gap-2">✓ Modern teknik som är framtidssäkrad</li>
                    <li className="flex items-center gap-2">✓ Fokus på affärsnytta och ROI</li>
                    <li className="flex items-center gap-2">✓ Stötta en ung elitidrottare</li>
                </ul>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 md:p-10 text-slate-900 shadow-2xl"
          >
            <h3 className="text-2xl font-bold mb-6">Boka ett möte / Skicka förfrågan</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Namn</label>
                <input
                  {...register("name", { required: "Vänligen ange ditt namn" })}
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                  placeholder="Ditt namn"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <input
                  {...register("email", { 
                    required: "Vänligen ange din email",
                    pattern: { value: /^\S+@\S+$/i, message: "Ogiltig e-postadress" }
                  })}
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                  placeholder="din@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Jag är intresserad av:</label>
                <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-100">
                        <input type="checkbox" {...register("services.webDev")} className="w-4 h-4 text-accent rounded focus:ring-accent" />
                        <span className="text-sm">Webbutveckling</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-100">
                        <input type="checkbox" {...register("services.aiAutomation")} className="w-4 h-4 text-accent rounded focus:ring-accent" />
                        <span className="text-sm">AI-Automation</span>
                    </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Meddelande</label>
                <textarea
                  {...register("message", { required: "Vänligen skriv ett meddelande" })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all resize-none"
                  placeholder="Berätta kort om ditt projekt..."
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-all hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                    "Skickar..."
                ) : (
                    <>
                        Skicka Förfrågan <Send size={18} />
                    </>
                )}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;