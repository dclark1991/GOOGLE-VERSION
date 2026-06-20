import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, HeartHandshake } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark flex flex-col font-sans overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <header className="flex items-center justify-between p-6 md:px-12 md:py-8 max-w-7xl mx-auto w-full z-10">
        <div className="flex items-center gap-3 text-brand-primary">
          <HeartHandshake className="w-8 h-8" />
          <span className="font-heading text-2xl uppercase tracking-widest mt-1">MH Portal</span>
        </div>
        <div className="hidden md:flex gap-6 font-medium text-brand-dark/70">
          <a href="#" className="hover:text-brand-primary transition-colors">About</a>
          <a href="#" className="hover:text-brand-primary transition-colors">Program</a>
          <a href="#" className="hover:text-brand-primary transition-colors">Support</a>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <span className="text-brand-secondary font-bold tracking-widest uppercase mb-4 block">Together for Wellbeing</span>
          <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl leading-none tracking-wide mb-8 text-brand-primary uppercase">
            Empower<br />Mental Health<br />Everywhere
          </h1>
          <p className="text-xl md:text-2xl text-brand-dark/70 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Your centralized portal for mental health learning, extensive signposting databases, and powerful resources.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/onboarding"
              className="inline-flex items-center gap-3 bg-brand-primary text-white font-semibold px-8 py-4 text-lg hover:bg-[#0f4052] transition-all duration-300 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
