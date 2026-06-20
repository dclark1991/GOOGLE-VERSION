import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Home from './dashboard/Home';
import Learning from './dashboard/Learning';
import Database from './dashboard/Database';
import Resources from './dashboard/Resources';
import ActionPlan from './dashboard/ActionPlan';
import StandardDetail from './dashboard/StandardDetail';
import Network from './dashboard/Network';
import Framework from './dashboard/Framework';
import PillarDetail from './dashboard/PillarDetail';
import MHLeadHub from './dashboard/MHLeadHub';
import Ideas from './dashboard/Ideas';
import { Menu, UserCircle, X, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const WALKTHROUGH_STEPS = [
  {
    title: "Welcome to Healthy Minds",
    content: "We're thrilled to have you here. This portal is your central hub for establishing a proactive mental health culture at your club.",
    image: "https://images.unsplash.com/photo-1593113564551-71fb264c80cb?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "The Florio Framework & Action Plan",
    content: "A 5-pillar approach to mental health. Use the Action Plan tool to benchmark your club's current status and track your progress over time.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Learning Tracks",
    content: "Each role has a specific curriculum. From 'Recognizing Signs' to 'Having Safe Conversations', these micro-learnings fit your schedule.",
    image: "https://images.unsplash.com/photo-1587329310686-91414b8e3cb7?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Signposting Database",
    content: "If you need to direct someone to professional help or crisis support, our curated database is always up-to-date and ready to use.",
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=800&q=80"
  }
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  const [walkthroughStep, setWalkthroughStep] = useState(0);

  const role = localStorage.getItem('userRole');
  const isMHLead = role === 'MH_LEAD';

  useEffect(() => {
    const hasSeen = localStorage.getItem('hasSeenWalkthrough');
    if (hasSeen === 'false') {
      setShowWalkthrough(true);
    }
  }, []);

  const handleWalkthroughNext = () => {
    if (walkthroughStep < WALKTHROUGH_STEPS.length - 1) {
      setWalkthroughStep(s => s + 1);
    } else {
      setShowWalkthrough(false);
      localStorage.setItem('hasSeenWalkthrough', 'true');
    }
  };

  const handleWalkthroughSkip = () => {
    setShowWalkthrough(false);
    localStorage.setItem('hasSeenWalkthrough', 'true');
  };

  return (
    <div className="h-screen bg-brand-bg flex flex-col font-sans text-brand-dark overflow-hidden">
      {/* Walkthrough Modal */}
      {showWalkthrough && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-primary/80 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col md:flex-row relative">
             <button onClick={handleWalkthroughSkip} className="absolute top-4 right-4 z-10 text-brand-dark/40 hover:text-brand-primary bg-white/50 rounded-full p-2 backdrop-blur-sm transition-colors">
               <X className="w-5 h-5" />
             </button>
             
             <div className="md:w-1/2 h-64 md:h-auto relative">
               <img src={WALKTHROUGH_STEPS[walkthroughStep].image} alt="Walkthrough Step" className="absolute inset-0 w-full h-full object-cover" />
               <div className="absolute inset-0 bg-brand-primary/20 mix-blend-overlay" />
             </div>
             
             <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
               <div className="flex gap-2 mb-6">
                 {WALKTHROUGH_STEPS.map((_, i) => (
                   <div key={i} className={`h-1.5 flex-1 rounded-full ${i === walkthroughStep ? 'bg-brand-secondary' : i < walkthroughStep ? 'bg-brand-primary/20' : 'bg-brand-primary/10'}`} />
                 ))}
               </div>
               
               <h3 className="font-heading text-3xl text-brand-primary mb-4">{WALKTHROUGH_STEPS[walkthroughStep].title}</h3>
               <p className="text-brand-dark/70 mb-8 leading-relaxed">
                 {WALKTHROUGH_STEPS[walkthroughStep].content}
               </p>
               
               <button onClick={handleWalkthroughNext} className="mt-auto bg-brand-primary text-white font-bold py-4 px-6 rounded-full w-full flex items-center justify-center gap-2 hover:bg-[#0f4052] transition-colors">
                 {walkthroughStep === WALKTHROUGH_STEPS.length - 1 ? (
                   <>Get Started <CheckCircle2 className="w-5 h-5" /></>
                 ) : (
                   <>Next <ChevronRight className="w-5 h-5" /></>
                 )}
               </button>
             </div>
          </div>
        </div>
      )}

      {/* Global Brand Header - More Premium Look */}
      <header className="bg-white shrink-0 relative z-40 border-b border-brand-primary/5 shadow-sm">
        <div className="flex items-center justify-between px-4 lg:px-6 h-16 w-full max-w-[1600px] mx-auto">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 text-brand-primary hover:text-brand-secondary lg:hidden transition-colors">
              <Menu className="w-6 h-6" />
            </button>
            <Link to="/dashboard" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-brand-primary text-brand-secondary flex items-center justify-center font-bold shadow-md group-hover:bg-brand-secondary group-hover:text-brand-primary transition-all duration-300">
                 HM
              </div>
              <div className="hidden sm:block">
                 <h1 className="font-heading text-lg md:text-xl leading-none text-brand-primary tracking-widest uppercase mt-0.5 group-hover:text-brand-secondary transition-colors">Healthy Minds</h1>
                 <p className="text-[10px] text-brand-dark/50 font-bold uppercase tracking-[0.2em]">Golf Club Hub</p>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-5 text-brand-primary">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold truncate max-w-[150px] md:max-w-none text-brand-primary">{isMHLead ? 'Mental Health Lead' : 'General Manager'}</p>
              <p className="text-[10px] text-brand-primary/50 uppercase tracking-widest font-bold">{isMHLead ? 'Priority Portal' : 'Management Portal'}</p>
            </div>
            <div className="w-10 h-10 rounded-full border border-brand-primary/10 overflow-hidden flex items-center justify-center bg-brand-primary/5 text-brand-primary hover:bg-brand-primary/10 transition-colors cursor-pointer">
               <UserCircle className="w-6 h-6" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex min-h-0 relative">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        
        <main className="flex-1 overflow-y-auto w-full relative z-0 custom-scrollbar">
          <div className="max-w-6xl mx-auto w-full p-4 md:p-8 lg:p-12">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/framework" element={<Framework />} />
              <Route path="/framework/:pillarId" element={<PillarDetail />} />
              <Route path="/action-plan" element={<ActionPlan />} />
              <Route path="/action-plan/:id" element={<StandardDetail />} />
              <Route path="/learning" element={<Learning />} />
              <Route path="/mh-lead-toolkit" element={<MHLeadHub />} />
              <Route path="/ideas" element={<Ideas />} />
              <Route path="/database" element={<Database />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/network" element={<Network />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}
