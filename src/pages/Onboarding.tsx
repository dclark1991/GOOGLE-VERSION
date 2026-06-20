import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { UserCircle, Shield, ArrowRight, CheckCircle2, HeartPulse, Camera } from 'lucide-react';
import { cn } from '../lib/utils';

type Role = 'GM' | 'MH_LEAD' | 'MH_FIRST_AIDER' | null;

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<Role>(null);
  const [clubDetails, setClubDetails] = useState({
    clubName: '',
    gmName: '',
    mhLeadName: '',
    firstAiders: '',
  });

  const handleNext = () => {
    if (step === 1 && !role) return;
    if (step === 4) {
      localStorage.setItem('userRole', role as string);
      localStorage.setItem('clubDetails', JSON.stringify(clubDetails));
      localStorage.setItem('hasSeenWalkthrough', 'false');
      navigate('/dashboard');
      return;
    }
    setStep((s) => s + 1);
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="w-full max-w-4xl relative z-10 flex flex-col space-y-12">
        <div className="flex gap-4 items-center justify-center max-w-xl mx-auto w-full mb-8">
          {[1, 2, 3, 4].map(idx => (
            <div key={idx} className="flex-1 h-2 rounded-full bg-white/50 overflow-hidden shadow-inner">
              <div className={cn("h-full transition-all duration-500", step >= idx ? "bg-brand-secondary" : "w-0")} />
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col items-center"
            >
              <h2 className="font-heading text-4xl md:text-5xl uppercase mb-4 text-center text-brand-primary tracking-wide">Select Your Role</h2>
              <p className="text-lg text-brand-dark/70 mb-10 text-center max-w-2xl font-light">
                Choose your role to get tailored resources, training, and responsibilities for your position.
              </p>

              <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl">
                <button
                  onClick={() => setRole('GM')}
                  className={cn(
                    "p-8 text-left transition-all duration-300 rounded-3xl relative border border-transparent",
                    role === 'GM' 
                      ? "bg-white shadow-xl ring-2 ring-brand-secondary scale-100" 
                      : "bg-white/50 hover:bg-white text-brand-dark/60 hover:text-brand-dark hover:shadow-md"
                  )}
                >
                  <UserCircle className={cn("w-12 h-12 mb-6 transition-colors", role === 'GM' ? "text-brand-primary" : "text-brand-dark/30")} />
                  <h3 className="font-heading text-2xl uppercase mb-2 text-brand-primary tracking-wide">GM / Sponsor</h3>
                  <p className="text-sm font-medium leading-relaxed">Focus on club-wide wellbeing protocols, resource allocation, and overall programme sponsorship.</p>
                  <div className={cn("absolute top-6 right-6 transition-opacity", role === 'GM' ? "opacity-100 text-brand-secondary" : "opacity-0")}>
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                </button>

                <button
                  onClick={() => setRole('MH_LEAD')}
                  className={cn(
                    "p-8 text-left transition-all duration-300 rounded-3xl relative border border-transparent",
                    role === 'MH_LEAD' 
                      ? "bg-white shadow-xl ring-2 ring-brand-secondary scale-100" 
                      : "bg-white/50 hover:bg-white text-brand-dark/60 hover:text-brand-dark hover:shadow-md"
                  )}
                >
                  <Shield className={cn("w-12 h-12 mb-6 transition-colors", role === 'MH_LEAD' ? "text-brand-primary" : "text-brand-dark/30")} />
                  <h3 className="font-heading text-2xl uppercase mb-2 text-brand-primary tracking-wide">MH Lead</h3>
                  <p className="text-sm font-medium leading-relaxed">Drive the mental health strategy, manage initiatives, and act as the core specialist in the club.</p>
                  <div className={cn("absolute top-6 right-6 transition-opacity", role === 'MH_LEAD' ? "opacity-100 text-brand-secondary" : "opacity-0")}>
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                </button>

                <button
                  onClick={() => setRole('MH_FIRST_AIDER')}
                  className={cn(
                    "p-8 text-left transition-all duration-300 rounded-3xl relative border border-transparent",
                    role === 'MH_FIRST_AIDER' 
                      ? "bg-white shadow-xl ring-2 ring-brand-secondary scale-100" 
                      : "bg-white/50 hover:bg-white text-brand-dark/60 hover:text-brand-dark hover:shadow-md"
                  )}
                >
                  <HeartPulse className={cn("w-12 h-12 mb-6 transition-colors", role === 'MH_FIRST_AIDER' ? "text-brand-primary" : "text-brand-dark/30")} />
                  <h3 className="font-heading text-xl uppercase mb-2 text-brand-primary tracking-wide">MH First Aider</h3>
                  <p className="text-sm font-medium leading-relaxed">Provide peer support, early triage, and confident signposting when someone needs help.</p>
                  <div className={cn("absolute top-6 right-6 transition-opacity", role === 'MH_FIRST_AIDER' ? "opacity-100 text-brand-secondary" : "opacity-0")}>
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col items-center w-full max-w-2xl mx-auto"
            >
              <h2 className="font-heading text-4xl uppercase mb-4 text-center text-brand-primary tracking-wide">
                Club Details
              </h2>
              <p className="text-lg text-brand-dark/70 mb-10 text-center font-light">
                Complete your profile and define the key mental health points of contact in your club.
              </p>
              
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-brand-primary/5 w-full space-y-6">
                
                {/* Profile Pic Upload Mock */}
                <div className="flex flex-col items-center mb-8">
                  <div className="w-24 h-24 rounded-full bg-brand-bg flex items-center justify-center text-brand-primary/40 border border-brand-primary/10 mb-4 cursor-pointer hover:bg-brand-secondary/10 transition-colors">
                    <Camera className="w-8 h-8" />
                  </div>
                  <span className="text-sm font-bold text-brand-secondary uppercase tracking-widest cursor-pointer">Upload Photo</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-brand-primary mb-2">Club Name</label>
                    <input 
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-brand-primary/10 focus:ring-2 focus:ring-brand-secondary outline-none"
                      placeholder="e.g. Healthy Minds Golf Club"
                      value={clubDetails.clubName}
                      onChange={e => setClubDetails({...clubDetails, clubName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-brand-primary mb-2">General Manager / Project Sponsor</label>
                    <input 
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-brand-primary/10 focus:ring-2 focus:ring-brand-secondary outline-none"
                      placeholder="Name"
                      value={clubDetails.gmName}
                      onChange={e => setClubDetails({...clubDetails, gmName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-brand-primary mb-2">Mental Health Lead(s)</label>
                    <input 
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-brand-primary/10 focus:ring-2 focus:ring-brand-secondary outline-none"
                      placeholder="Name(s)"
                      value={clubDetails.mhLeadName}
                      onChange={e => setClubDetails({...clubDetails, mhLeadName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-brand-primary mb-2">MH First Aiders (Optional)</label>
                    <input 
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-brand-primary/10 focus:ring-2 focus:ring-brand-secondary outline-none"
                      placeholder="Name(s)"
                      value={clubDetails.firstAiders}
                      onChange={e => setClubDetails({...clubDetails, firstAiders: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col items-center"
            >
              <h2 className="font-heading text-4xl uppercase mb-4 text-center text-brand-primary tracking-wide">
                The Programme & You
              </h2>
              <p className="text-lg text-brand-dark/70 mb-12 text-center max-w-3xl font-light">
                The mental health programme succeeds when roles work together. Here's how your role fits into the bigger picture.
              </p>
              
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-brand-primary/5 max-w-4xl w-full">
                
                <div className="grid md:grid-cols-3 gap-8 text-sm">
                   
                   <div className={cn("p-6 rounded-2xl", role === 'GM' ? "bg-brand-primary/5 ring-1 ring-brand-primary" : "")}>
                     <div className="flex items-center gap-3 mb-4">
                       <UserCircle className={cn("w-6 h-6", role === 'GM' ? "text-brand-primary" : "text-brand-dark/40")} />
                       <h4 className={cn("font-bold uppercase tracking-wider", role === 'GM' ? "text-brand-primary" : "text-brand-dark/60")}>GM / Sponsor</h4>
                     </div>
                     <p className="text-brand-dark/70 leading-relaxed mb-4">Provides the authority, budget, and culture-setting for the programme to thrive. They endorse the work but do not run the daily operations.</p>
                     
                     {role === 'GM' && (
                       <ul className="space-y-3 mt-4 pt-4 border-t border-brand-primary/10">
                         <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 shrink-0 text-brand-secondary mt-0.5" /> <span>Endorse MH Policies</span></li>
                         <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 shrink-0 text-brand-secondary mt-0.5" /> <span>Allocate budget & time</span></li>
                         <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 shrink-0 text-brand-secondary mt-0.5" /> <span>Review club-wide progression</span></li>
                       </ul>
                     )}
                   </div>

                   <div className={cn("p-6 rounded-2xl", role === 'MH_LEAD' ? "bg-brand-primary/5 ring-1 ring-brand-primary" : "")}>
                     <div className="flex items-center gap-3 mb-4">
                       <Shield className={cn("w-6 h-6", role === 'MH_LEAD' ? "text-brand-primary" : "text-brand-dark/40")} />
                       <h4 className={cn("font-bold uppercase tracking-wider", role === 'MH_LEAD' ? "text-brand-primary" : "text-brand-dark/60")}>MH Lead</h4>
                     </div>
                     <p className="text-brand-dark/70 leading-relaxed mb-4">The operational heart. Oversees the action plan, organizes awareness campaigns, ensures resources are visible, and sets boundaries for support.</p>
                     
                     {role === 'MH_LEAD' && (
                       <ul className="space-y-3 mt-4 pt-4 border-t border-brand-primary/10">
                         <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 shrink-0 text-brand-secondary mt-0.5" /> <span>Drive the Action Plan</span></li>
                         <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 shrink-0 text-brand-secondary mt-0.5" /> <span>Maintain Signposting DB</span></li>
                         <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 shrink-0 text-brand-secondary mt-0.5" /> <span>Host conversations safely</span></li>
                       </ul>
                     )}
                   </div>

                   <div className={cn("p-6 rounded-2xl", role === 'MH_FIRST_AIDER' ? "bg-brand-primary/5 ring-1 ring-brand-primary" : "")}>
                     <div className="flex items-center gap-3 mb-4">
                       <HeartPulse className={cn("w-6 h-6", role === 'MH_FIRST_AIDER' ? "text-brand-primary" : "text-brand-dark/40")} />
                       <h4 className={cn("font-bold uppercase tracking-wider", role === 'MH_FIRST_AIDER' ? "text-brand-primary" : "text-brand-dark/60")}>First Aiders</h4>
                     </div>
                     <p className="text-brand-dark/70 leading-relaxed mb-4">The boots on the ground. They are trained to spot signs, offer peer support, and direct individuals to the MH Lead or the Signposting database.</p>
                     
                     {role === 'MH_FIRST_AIDER' && (
                       <ul className="space-y-3 mt-4 pt-4 border-t border-brand-primary/10">
                         <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 shrink-0 text-brand-secondary mt-0.5" /> <span>Spot early warning signs</span></li>
                         <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 shrink-0 text-brand-secondary mt-0.5" /> <span>Offer a listening ear</span></li>
                         <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 shrink-0 text-brand-secondary mt-0.5" /> <span>Escalate or signpost</span></li>
                       </ul>
                     )}
                   </div>

                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col items-center"
            >
              <h2 className="font-heading text-4xl uppercase mb-4 text-center text-brand-primary tracking-wide">
                Recommended First Steps
              </h2>
              <p className="text-lg text-brand-dark/70 mb-12 text-center max-w-2xl font-light">
                Here's what you should focus on as soon as you open your dashboard.
              </p>
              
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-brand-primary/5 max-w-xl w-full">
                <ul className="space-y-6">
                  {role === 'GM' && (
                    <>
                      <li className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold shrink-0">1</div> <div className="text-brand-dark/80 mt-1"><strong className="text-brand-primary block mb-1">Review the Dashboard</strong> Monitor the club's mental health progress.</div></li>
                      <li className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold shrink-0">2</div> <div className="text-brand-dark/80 mt-1"><strong className="text-brand-primary block mb-1">Explore Resources</strong> See the flyers and policies available for download.</div></li>
                      <li className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold shrink-0">3</div> <div className="text-brand-dark/80 mt-1"><strong className="text-brand-primary block mb-1">Discuss the Action Plan</strong> Check in with your MH Lead on current progression.</div></li>
                    </>
                  )}
                  {role === 'MH_LEAD' && (
                    <>
                      <li className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-brand-secondary text-brand-primary flex items-center justify-center font-bold shrink-0">1</div> <div className="text-brand-dark/80 mt-1"><strong className="text-brand-primary block mb-1">Complete "Intro to your role"</strong> Head to Learning to tackle Having conversations, signposting, looking after yourself, and crisis protocol.</div></li>
                      <li className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold shrink-0">2</div> <div className="text-brand-dark/80 mt-1"><strong className="text-brand-primary block mb-1">Set up the Action Plan</strong> Benchmark your club against the Florio Framework.</div></li>
                      <li className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold shrink-0">3</div> <div className="text-brand-dark/80 mt-1"><strong className="text-brand-primary block mb-1">Build Signposting Db</strong> Verify local and crisis contacts are correct.</div></li>
                    </>
                  )}
                  {role === 'MH_FIRST_AIDER' && (
                    <>
                       <li className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold shrink-0">1</div> <div className="text-brand-dark/80 mt-1"><strong className="text-brand-primary block mb-1">Access Learning Track</strong> Complete modules on mental health awareness and safe listening.</div></li>
                       <li className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold shrink-0">2</div> <div className="text-brand-dark/80 mt-1"><strong className="text-brand-primary block mb-1">Review Signposting Db</strong> Know where to find emergency numbers and therapy avenues.</div></li>
                       <li className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold shrink-0">3</div> <div className="text-brand-dark/80 mt-1"><strong className="text-brand-primary block mb-1">Connect with Network</strong> Join the First Aider community discussion to share experiences.</div></li>
                    </>
                  )}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between items-center w-full max-w-2xl mx-auto pt-8">
          <button 
            onClick={() => step > 1 ? setStep(s => s - 1) : navigate('/')}
            className="font-medium px-6 py-3 rounded-full text-brand-dark/60 hover:text-brand-dark hover:bg-white/50 transition-colors"
          >
            Go Back
          </button>
          
          <button 
            onClick={handleNext}
            disabled={step === 1 && !role}
            className="flex items-center gap-2 bg-brand-primary text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          >
            {step === 4 ? 'Go To Dashboard' : 'Continue'} <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
