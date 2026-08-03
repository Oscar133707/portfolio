import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, Send, Loader2, CheckCircle, Check, ChevronDown } from 'lucide-react';
import { ContactFormData } from '../types';

const Contact: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormData>();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  // Mobile gets a dropdown instead of checkboxes (easier to use on small screens).
  // Only one of the two controls is ever rendered, so react-hook-form registers one source.
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    setSubmitError(false);

    // Normalise the mobile dropdown choice into the boolean shape the API expects
    const choice = data.serviceChoice;
    const services = isMobile
      ? {
          webDev: choice === 'webDev' || choice === 'both',
          aiAutomation: choice === 'aiAutomation' || choice === 'both',
          unsure: choice === 'unsure',
        }
      : data.services;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
          services,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitSuccess(true);
      reset();

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitError(true);
    }
  };

  const whyMe = [
    "Snabb leverans och tydlig kommunikation",
    "Modern teknik som är framtidssäkrad",
    "Fokus på affärsnytta och ROI",
    "Du stöttar en ung elitidrottare",
  ];

  return (
    <section id="contact" className="relative py-20 md:py-28 bg-slate-950 text-white scroll-mt-24 [overflow:clip] w-full px-5 sm:px-6 lg:px-8">
      {/* Gradient mesh backdrop */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="mesh-orb animate-mesh w-[40rem] h-[40rem] -top-24 -left-24 bg-grad1/30" />
        <div className="mesh-orb animate-float-slow w-[34rem] h-[34rem] bottom-[-12rem] right-[-6rem] bg-grad3/25" />
      </div>
      <div className="grain-overlay opacity-[0.12]" aria-hidden="true" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-start">

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <h2 className="font-display font-semibold text-4xl md:text-5xl tracking-tight leading-[1.1] mb-6 text-white">
              Redo att starta ditt nästa projekt?
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed max-w-md">
              Oavsett om du behöver en ny webbplats, vill automatisera dina processer eller bara vill
              bolla idéer. Hör av dig! Jag är alltid öppen för att diskutera nya projekt.
            </p>

            <div className="flex items-center space-x-4 mb-12">
              <div className="bg-white/5 border border-white/10 p-3 rounded-xl text-grad3">
                <Mail size={22} />
              </div>
              <div>
                <p className="font-mono text-xs text-slate-500">EMAIL</p>
                <a href="mailto:kontakt@oscarjohansson.eu" className="text-lg font-semibold hover:text-grad3 transition-colors">
                  kontakt@oscarjohansson.eu
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-display font-semibold text-lg mb-4 text-white">Varför anlita mig?</h4>
              <ul className="space-y-3">
                {whyMe.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-300">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-grad1 via-grad2 to-grad3 flex items-center justify-center">
                      <Check size={12} className="text-white" strokeWidth={3.5} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="rounded-3xl p-[1.5px] bg-gradient-to-br from-grad1/50 via-grad2/30 to-grad3/50"
          >
            <div className="bg-white rounded-[1.4rem] p-7 md:p-9 text-slate-900">
              <h3 className="font-display text-2xl font-semibold mb-6">Skicka en förfrågan</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Namn</label>
                  <input
                    {...register("name", { required: "Vänligen ange ditt namn" })}
                    className="w-full min-h-[44px] px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-grad2 focus:ring-2 focus:ring-grad2/20 outline-none transition-colors duration-200"
                    placeholder="Ditt namn"
                    aria-invalid={errors.name ? "true" : "false"}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Vänligen ange din email",
                      pattern: { value: /^\S+@\S+$/i, message: "Ogiltig e-postadress" }
                    })}
                    className="w-full min-h-[44px] px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-grad2 focus:ring-2 focus:ring-grad2/20 outline-none transition-colors duration-200"
                    placeholder="din@email.com"
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Jag är intresserad av:</label>
                  {isMobile ? (
                    <div className="relative">
                      <select
                        {...register("serviceChoice")}
                        defaultValue=""
                        className="w-full min-h-[44px] appearance-none px-4 py-3 pr-11 rounded-xl bg-slate-50 border border-slate-200 focus:border-grad2 focus:ring-2 focus:ring-grad2/20 outline-none transition-colors duration-200 text-slate-900"
                      >
                        <option value="">Välj tjänst</option>
                        <option value="webDev">Webbutveckling</option>
                        <option value="aiAutomation">AI-Automation</option>
                        <option value="both">Båda</option>
                        <option value="unsure">Vet inte än</option>
                      </select>
                      <ChevronDown
                        size={18}
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                        aria-hidden="true"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-3">
                      <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors flex-1">
                        <input type="checkbox" {...register("services.webDev")} className="w-4 h-4 accent-grad2 rounded" />
                        <span className="text-sm">Webbutveckling</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors flex-1">
                        <input type="checkbox" {...register("services.aiAutomation")} className="w-4 h-4 accent-grad2 rounded" />
                        <span className="text-sm">AI-Automation</span>
                      </label>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Meddelande</label>
                  <textarea
                    {...register("message", { required: "Vänligen skriv ett meddelande" })}
                    rows={5}
                    minLength={10}
                    className="w-full min-h-[130px] px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-grad2 focus:ring-2 focus:ring-grad2/20 outline-none transition-colors duration-200 resize-none"
                    placeholder="Berätta kort om ditt projekt..."
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                </div>

                {/* Error Message */}
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 border border-red-200 rounded-xl"
                  >
                    <p className="text-red-800 text-sm font-medium">
                      Något gick fel. Försök igen eller kontakta mig direkt på{' '}
                      <a href="mailto:kontakt@oscarjohansson.eu" className="underline">kontakt@oscarjohansson.eu</a>
                    </p>
                  </motion.div>
                )}

                {/* Success Message */}
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3"
                  >
                    <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
                    <p className="text-green-800 text-sm font-medium">
                      Tack för ditt meddelande! Jag återkommer inom kort.
                    </p>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || submitSuccess}
                  className="w-full min-h-[44px] bg-gradient-to-r from-grad1 via-grad2 to-grad3 text-white font-bold py-4 rounded-2xl transition-all duration-200 hover:shadow-lg hover:shadow-grad2/30 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-grad2 focus-visible:outline-offset-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      <span>Skickar...</span>
                    </>
                  ) : (
                    <>
                      <span>Skicka förfrågan</span>
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
