import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { motion } from 'framer-motion';
import Reveal from './Reveal';
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
    <section id="contact" className="yta-textur relative py-20 md:py-28 bg-bas-djup scroll-mt-24 [overflow:clip] w-full px-5 sm:px-6 lg:px-8">
      <div className="skiljelinje absolute inset-x-0 top-0" aria-hidden="true" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-start">

          {/* Text content */}
          <Reveal>
            <h2 className="font-display font-medium text-[2.5rem] leading-[1.05] md:text-6xl mb-6 text-fg">
              Redo att starta ditt nästa projekt?
            </h2>
            <p className="text-dump text-lg mb-10 leading-[1.7] max-w-md">
              Oavsett om du behöver en ny webbplats, vill automatisera dina processer eller bara vill
              bolla idéer. Hör av dig! Jag är alltid öppen för att diskutera nya projekt.
            </p>

            <div className="flex items-center gap-4 mb-12">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-linje bg-yta text-accent-ljus">
                <Mail size={22} />
              </div>
              <div>
                <p className="text-sm text-dump-svag">E-post</p>
                <a href="mailto:kontakt@oscarjohansson.eu" className="text-lg font-semibold">
                  kontakt@oscarjohansson.eu
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-display font-medium text-xl mb-4 text-fg">Varför anlita mig?</h3>
              <ul className="space-y-3">
                {whyMe.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-dump">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/15 text-accent-ljus flex items-center justify-center">
                      <Check size={12} strokeWidth={3.5} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Contact form */}
          <Reveal delay={0.1}>
            <div className="kort p-6 sm:p-8 md:p-9">
              <h3 className="font-display text-2xl md:text-3xl font-medium text-fg mb-6">Skicka en förfrågan</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                <div>
                  <label className="block text-sm font-medium text-dump mb-2">Namn</label>
                  <input
                    {...register("name", { required: "Vänligen ange ditt namn" })}
                    className="w-full min-h-[44px] px-4 py-3 rounded-xl bg-bas border border-linje text-fg placeholder:text-dump-svag focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none transition-colors duration-200"
                    placeholder="Ditt namn"
                    aria-invalid={errors.name ? "true" : "false"}
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1.5">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-dump mb-2">Email</label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Vänligen ange din email",
                      pattern: { value: /^\S+@\S+$/i, message: "Ogiltig e-postadress" }
                    })}
                    className="w-full min-h-[44px] px-4 py-3 rounded-xl bg-bas border border-linje text-fg placeholder:text-dump-svag focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none transition-colors duration-200"
                    placeholder="din@email.com"
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1.5">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-dump mb-2">Jag är intresserad av:</label>
                  {isMobile ? (
                    <div className="relative">
                      <select
                        {...register("serviceChoice")}
                        defaultValue=""
                        className="w-full min-h-[44px] appearance-none px-4 py-3 pr-11 rounded-xl bg-bas border border-linje text-fg placeholder:text-dump-svag focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none transition-colors duration-200 "
                      >
                        <option value="">Välj tjänst</option>
                        <option value="webDev">Webbutveckling</option>
                        <option value="aiAutomation">AI-Automation</option>
                        <option value="both">Båda</option>
                        <option value="unsure">Vet inte än</option>
                      </select>
                      <ChevronDown
                        size={18}
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-dump-svag"
                        aria-hidden="true"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-3">
                      <label className="flex items-center gap-2.5 cursor-pointer bg-bas px-4 py-3 rounded-xl border border-linje text-fg hover:border-dump-svag transition-colors flex-1">
                        <input type="checkbox" {...register("services.webDev")} className="w-4 h-4 accent-accent rounded" />
                        <span className="text-sm">Webbutveckling</span>
                      </label>
                      <label className="flex items-center gap-2.5 cursor-pointer bg-bas px-4 py-3 rounded-xl border border-linje text-fg hover:border-dump-svag transition-colors flex-1">
                        <input type="checkbox" {...register("services.aiAutomation")} className="w-4 h-4 accent-accent rounded" />
                        <span className="text-sm">AI-Automation</span>
                      </label>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-dump mb-2">Meddelande</label>
                  <textarea
                    {...register("message", { required: "Vänligen skriv ett meddelande" })}
                    rows={5}
                    minLength={10}
                    className="w-full min-h-[130px] px-4 py-3 rounded-xl bg-bas border border-linje text-fg placeholder:text-dump-svag focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none transition-colors duration-200 resize-none"
                    placeholder="Berätta kort om ditt projekt..."
                  />
                  {errors.message && <p className="text-red-400 text-sm mt-1.5">{errors.message.message}</p>}
                </div>

                {/* Error Message */}
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-500/10 border border-red-400/30 rounded-xl"
                  >
                    <p className="text-red-200 text-sm font-medium">
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
                    className="p-4 bg-emerald-500/10 border border-emerald-400/30 rounded-xl flex items-center gap-3"
                  >
                    <CheckCircle className="text-emerald-400 flex-shrink-0" size={20} />
                    <p className="text-emerald-100 text-sm font-medium">
                      Tack för ditt meddelande! Jag återkommer inom kort.
                    </p>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || submitSuccess}
                  className="knapp knapp-primar w-full min-h-[52px] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
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
          </Reveal>

        </div>
      </div>
    </section>
  );
};

export default Contact;
