import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, CheckCircle2, FileEdit, ArrowRight, ArrowLeft, ChevronRight, ListChecks, History, RotateCcw, AlertTriangle, PlayCircle } from 'lucide-react';
import { STANDARDS, PRINCIPLES, Standard, Pillar, Level, Score } from '../../data/standards';
import { ActionPlanRecord } from '../../types/actionPlan';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';

const PILLARS: Pillar[] = ['LEAD', 'COMMUNICATE', 'SUPPORT', 'CARE', 'CONNECT'];

function getRecommendations(plan: ActionPlanRecord): number[] {
  const getScore = (id: number) => plan.responses[id]?.score || null;

  // 1. Unmet Essential standards (NM/PM)
  const unmetEssentials = STANDARDS.filter(s => s.level === 'Essential' && (getScore(s.id) === 'NM' || getScore(s.id) === 'PM' || getScore(s.id) === null));
  if (unmetEssentials.length > 0) {
    return unmetEssentials.slice(0, 3).map(s => s.id);
  }

  // 2. Quick wins - PM standards one nudge from FM
  const quickWins = STANDARDS.filter(s => getScore(s.id) === 'PM');
  if (quickWins.length > 0) {
    return quickWins.slice(0, 3).map(s => s.id);
  }

  // 3. Level-completers (simplified for now to just next unmet)
  const allUnmet = STANDARDS.filter(s => {
    const sc = getScore(s.id);
    return sc !== 'FM' && sc !== 'NA';
  });

  const levelOrder: Record<Level, number> = { 'Essential': 1, 'Bronze': 2, 'Silver': 3, 'Gold': 4 };

  allUnmet.sort((a, b) => levelOrder[a.level] - levelOrder[b.level]);

  return allUnmet.slice(0, 3).map(s => s.id);
}

export default function ActionPlan() {
  const [plans, setPlans] = useState<ActionPlanRecord[]>([]);
  const [view, setView] = useState<'dashboard' | 'assessment' | 'focus'>('dashboard');
  
  // Assessment State
  const [currentPlan, setCurrentPlan] = useState<ActionPlanRecord | null>(null);
  const [activePillarIndex, setActivePillarIndex] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('actionPlans');
    if (saved) {
      setPlans(JSON.parse(saved));
    }
  }, []);

  const startNewAssessment = () => {
    const newPlan: ActionPlanRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      responses: {},
      focusIds: []
    };
    STANDARDS.forEach(s => {
      newPlan.responses[s.id] = { score: null, notes: '' };
    });
    // Copy forward old responses if any
    if (plans.length > 0) {
      const last = plans[0];
      Object.keys(last.responses).forEach(id => {
         newPlan.responses[Number(id)] = { ...last.responses[Number(id)] };
      });
    }
    setCurrentPlan(newPlan);
    setActivePillarIndex(0);
    setView('assessment');
  };

  const handleResponseChange = (stdId: number, score: Score) => {
    if (!currentPlan) return;
    setCurrentPlan(prev => ({
      ...prev!,
      responses: {
        ...prev!.responses,
        [stdId]: { ...prev!.responses[stdId], score }
      }
    }));
  };

  const handleNotesChange = (stdId: number, notes: string) => {
    if (!currentPlan) return;
    setCurrentPlan(prev => ({
      ...prev!,
      responses: {
        ...prev!.responses,
        [stdId]: { ...prev!.responses[stdId], notes }
      }
    }));
  };

  const submitAssessment = () => {
    if(!currentPlan) return;
    const focusIds = getRecommendations(currentPlan);
    setCurrentPlan(prev => ({ ...prev!, focusIds }));
    setView('focus');
  };

  const saveFocusAndFinish = () => {
    if(!currentPlan) return;
    const newPlans = [currentPlan, ...plans];
    setPlans(newPlans);
    localStorage.setItem('actionPlans', JSON.stringify(newPlans));
    localStorage.setItem('latestActionPlan', JSON.stringify(currentPlan));
    setView('dashboard');
  };

  const latestPlan = plans[0];
  const activePillar = PILLARS[activePillarIndex];

  // Helper for rendering standards grouped by principles
  const renderStandardsForPillar = (pillar: Pillar) => {
    const pillarPrinciples = PRINCIPLES.filter(p => p.pillar === pillar).sort((a,b) => a.order - b.order);
    return pillarPrinciples.map(principle => {
      const stds = STANDARDS.filter(s => s.principleId === principle.id);
      if (stds.length === 0) return null;

      // Group essentially first, then ordered
      const essentialStds = stds.filter(s => s.level === 'Essential');
      const otherStds = stds.filter(s => s.level !== 'Essential');

      const renderStd = (std: Standard) => (
        <div key={std.id} className="bg-brand-bg rounded-2xl p-5 md:p-6 border border-brand-primary/5 flex flex-col xl:flex-row gap-6">
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex gap-2 mb-2">
                 <span className={cn(
                   "text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded",
                   std.level === 'Essential' ? "bg-green-100 text-green-800" : "bg-white text-brand-primary border border-brand-primary/10"
                 )}>
                   {std.level}
                 </span>
                 <span className="text-[10px] uppercase font-bold tracking-wider bg-white px-2 py-0.5 rounded text-brand-primary border border-brand-primary/10">
                   {std.subcategory}
                 </span>
              </div>
              <p className="font-bold text-brand-primary text-lg leading-snug">
                <span className="opacity-40 mr-2">{std.number}</span> <br/>
                {std.statement}
              </p>
            </div>
            
            <div className="bg-white/50 rounded-xl p-4 border border-brand-primary/5 space-y-2 max-w-2xl">
               <p className="text-xs font-bold text-brand-dark/50 uppercase tracking-widest">Indicators ("What good looks like")</p>
               <ul className="list-disc pl-4 space-y-1 text-sm text-brand-dark min-h-[40px]">
                 {std.indicators.map((ind, idx) => (
                   <li key={idx}>{ind}</li>
                 ))}
               </ul>
            </div>
          </div>
          
          <div className="flex flex-col gap-4 shrink-0 xl:w-80">
            <div className="grid grid-cols-4 bg-white rounded-xl overflow-hidden border border-brand-primary/10 shadow-sm p-1 gap-1">
              {['FM', 'PM', 'NM', 'NA'].map(score => {
                const isSelected = currentPlan?.responses[std.id]?.score === score;
                return (
                  <button 
                    key={score}
                    onClick={() => handleResponseChange(std.id, score as Score)}
                    className={cn(
                      "py-2.5 text-sm font-bold rounded-lg transition-all border border-transparent",
                      isSelected 
                        ? (score === 'FM' ? "bg-green-500 text-white shadow-md border-green-600" 
                          : score === 'PM' ? "bg-yellow-500 text-white shadow-md border-yellow-600" 
                          : score === 'NM' ? "bg-red-500 text-white shadow-md border-red-600"
                          : "bg-gray-500 text-white shadow-md border-gray-600")
                        : "text-brand-dark/50 hover:bg-brand-bg hover:text-brand-primary"
                    )}
                  >
                    {score}
                  </button>
                )
              })}
            </div>
            <textarea 
              placeholder="Private notes (optional)..."
              value={currentPlan?.responses[std.id]?.notes || ''}
              onChange={e => handleNotesChange(std.id, e.target.value)}
              className="w-full bg-white border border-brand-primary/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-secondary min-h-[80px] resize-none"
            />
          </div>
        </div>
      );

      return (
        <div key={principle.id} className="mb-12">
          <div className="mb-6">
            <h4 className="text-2xl font-bold text-brand-primary">{principle.title}</h4>
            <p className="text-brand-dark/70 text-lg">{principle.description}</p>
          </div>
          <div className="space-y-4">
            {essentialStds.map(renderStd)}
            {otherStds.map(renderStd)}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-brand-primary/10">
        <div>
          <span className="text-brand-secondary font-semibold tracking-widest uppercase mb-2 block text-sm">Framework Tracker</span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-brand-primary mb-2">Action Plan.</h1>
          <p className="text-brand-dark/60 max-w-2xl text-lg">
            Complete the self-assessment to generate actionable next steps.
          </p>
        </div>
        {view === 'dashboard' && (
          <div className="flex gap-3">
             <Link to="/dashboard/framework" className="bg-white border-2 border-brand-primary/10 text-brand-primary font-semibold px-6 py-3 rounded-full hover:border-brand-primary/30 transition-colors flex items-center justify-center gap-2">
                Explainer
             </Link>
             <button onClick={startNewAssessment} className="bg-brand-primary text-white font-semibold px-6 py-3 rounded-full hover:bg-[#0f4052] transition-colors flex items-center justify-center gap-2">
               {plans.length > 0 ? <RotateCcw className="w-5 h-5" /> : <FileEdit className="w-5 h-5" />} 
               {plans.length > 0 ? "Re-Assess" : "Start Assessment"}
             </button>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {view === 'dashboard' && (
          <motion.div key="dashboard" initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0}}>
            {plans.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-brand-primary/10 shadow-sm max-w-2xl mx-auto">
                <Target className="w-16 h-16 text-brand-secondary mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-brand-primary mb-4">No Baseline Assessment Found</h2>
                <p className="text-brand-dark/60 mb-8 max-w-md mx-auto">Complete your baseline assessment to unlock tailored recommendations.</p>
                <button onClick={startNewAssessment} className="bg-brand-primary text-white font-semibold px-8 py-4 rounded-full hover:bg-brand-primary/90 transition-shadow shadow-md hover:shadow-xl inline-flex items-center gap-2">
                  Start First Assessment <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-8">
                  
                  {/* Status Banner */}
                  <div className="bg-brand-primary rounded-3xl p-8 relative overflow-hidden shadow-xl text-white">
                     <div className="absolute top-0 right-0 w-64 h-64 bg-brand-secondary/20 rounded-full blur-[80px]" />
                     <h2 className="text-xl font-bold mb-6 text-white/90">Club Status: <span className="text-brand-secondary">Active Partner</span></h2>
                     
                     <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                       {PILLARS.map(p => {
                          const pillarStds = STANDARDS.filter(s => s.pillar === p);
                          const isGold = pillarStds.filter(s => s.level === 'Gold').every(s => latestPlan.responses[s.id]?.score === 'FM');
                          const isSilver = pillarStds.filter(s => s.level === 'Silver').every(s => latestPlan.responses[s.id]?.score === 'FM');
                          const isBronze = pillarStds.filter(s => s.level === 'Bronze').every(s => latestPlan.responses[s.id]?.score === 'FM');
                          const isEssential = pillarStds.filter(s => s.level === 'Essential').every(s => latestPlan.responses[s.id]?.score === 'FM');

                          let displayLvl = 'None';
                          if (isGold) displayLvl = 'Gold';
                          else if (isSilver) displayLvl = 'Silver';
                          else if (isBronze) displayLvl = 'Bronze';
                          else if (isEssential) displayLvl = 'Essential';

                          return (
                            <div key={p} className="text-center">
                              <div className="text-[10px] font-bold text-brand-secondary tracking-widest mb-1">{p.slice(0,4)}</div>
                              <div className="bg-white/10 rounded-xl py-3 border border-white/5">
                                 <span className={cn(
                                   "font-bold text-sm",
                                   displayLvl === 'Gold' ? "text-[#FFD700]" 
                                   : displayLvl === 'Silver' ? "text-[#C0C0C0]"
                                   : displayLvl === 'Bronze' ? "text-[#CD7F32]"
                                   : displayLvl === 'Essential' ? "text-green-400"
                                   : "text-white/40"
                                 )}>{displayLvl}</span>
                              </div>
                            </div>
                          )
                       })}
                     </div>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-brand-primary/10">
                    <h2 className="text-xl font-bold text-brand-primary mb-6 flex items-center gap-2">
                       Work on Next
                    </h2>

                    <div className="space-y-4">
                      {latestPlan.focusIds.map(id => {
                        const std = STANDARDS.find(s => s.id === id);
                        if (!std) return null;
                        return (
                          <div key={std.id} className="bg-brand-bg p-6 rounded-2xl border border-brand-primary/5 flex flex-col sm:flex-row gap-6">
                            <div className="flex-1 space-y-3">
                               <div className="flex gap-2">
                                  <span className={cn(
                                    "text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded",
                                    std.level === 'Essential' ? "bg-green-100 text-green-800" : "bg-white text-brand-primary border border-brand-primary/10"
                                  )}>
                                    {std.level}
                                  </span>
                                  <span className="text-[10px] uppercase font-bold tracking-wider bg-white px-2 py-0.5 rounded text-brand-primary border border-brand-primary/10">
                                    {std.subcategory}
                                  </span>
                               </div>
                               <h4 className="font-bold text-brand-primary text-xl leading-snug">
                                  <span className="opacity-40 mr-2">{std.number}</span>
                                  {std.statement}
                               </h4>
                               
                               <div className="flex gap-2 flex-wrap pt-2">
                                  {std.actionIdeas.map((idea, i) => (
                                    <div key={i} className="inline-flex items-center gap-2 text-sm bg-white border border-brand-primary/10 px-3 py-1.5 rounded-lg text-brand-dark/80 font-medium shadow-sm">
                                       <PlayCircle className="w-4 h-4 text-brand-secondary" /> {idea}
                                    </div>
                                  ))}
                               </div>
                            </div>
                            <div className="shrink-0 flex items-center pt-2">
                               <Link to={`/dashboard/action-plan/${std.id}`} className="bg-white text-brand-primary font-bold px-6 py-3.5 rounded-full border border-brand-primary/10 shadow-sm hover:shadow-md transition-all text-sm">
                                 Standard Details
                               </Link>
                            </div>
                          </div>
                        )
                       })}
                    </div>
                  </div>

                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-brand-primary/10">
                    <h2 className="text-lg font-bold text-brand-primary mb-6 flex items-center gap-2">
                      <History className="w-5 h-5 text-brand-secondary" /> Assessment History
                    </h2>
                    <div className="space-y-3">
                       {plans.map((plan, i) => (
                         <div key={plan.id} className="flex items-center justify-between p-4 bg-brand-bg rounded-xl border border-transparent hover:border-brand-primary/10 transition-colors cursor-pointer group">
                            <div>
                              <p className="font-bold text-brand-primary group-hover:text-brand-secondary transition-colors">Assessment {plans.length - i}</p>
                              <p className="text-sm text-brand-dark/50">{new Date(plan.date).toLocaleDateString()}</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-brand-dark/30 group-hover:text-brand-primary transition-colors" />
                         </div>
                       ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {view === 'assessment' && currentPlan && (
          <motion.div key={`assessment-bg`} initial={{opacity: 0, scale:0.98}} animate={{opacity: 1, scale:1}} exit={{opacity: 0}}>
            {/* Step navigation / chunking */}
            <div className="mb-8 overflow-x-auto pb-4 scrollbar-hide">
               <div className="flex gap-4 min-w-max px-2">
                 {PILLARS.map((p, i) => {
                   const isActive = i === activePillarIndex;
                   const isPast = i < activePillarIndex;
                   return (
                     <button
                       key={p}
                       onClick={() => setActivePillarIndex(i)} 
                       className={cn(
                         "flex flex-col items-center gap-2 w-32 relative",
                         !isActive && !isPast && "opacity-50"
                       )}
                     >
                        <div className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-colors z-10 relative",
                          isActive ? "bg-brand-primary text-white shadow-lg" : isPast ? "bg-brand-secondary text-brand-primary shadow-sm" : "bg-white text-brand-dark/40 border border-brand-primary/10"
                        )}>
                           {isPast ? <CheckCircle2 className="w-6 h-6" /> : i + 1}
                        </div>
                        <span className={cn("text-[10px] font-bold uppercase tracking-widest text-center", isActive ? "text-brand-primary" : "text-brand-dark/40")}>{p}</span>
                        
                        {i < PILLARS.length - 1 && (
                          <div className={cn("absolute top-6 left-1/2 w-full h-[2px]", isPast ? "bg-brand-secondary" : "bg-brand-primary/10")} style={{ transform: 'translateX(24px)' }} />
                        )}
                     </button>
                   )
                 })}
               </div>
            </div>

            <div className="bg-white rounded-[2rem] shadow-xl border border-brand-primary/10 overflow-hidden">
               <div className="p-8 md:p-12 space-y-6">
                 <div className="border-b-2 border-brand-primary/10 pb-8 mb-8">
                   <h3 className="font-heading text-5xl text-brand-primary tracking-wide mb-3">{activePillar}</h3>
                   <p className="text-xl text-brand-dark/70 max-w-3xl font-medium">{PILLARS[activePillarIndex] === 'LEAD' ? "When leadership is visibly behind the programme, it changes what is possible for everyone else." : PILLARS[activePillarIndex] === 'COMMUNICATE' ? "Mental wellbeing becomes part of how the club talks to its members." : PILLARS[activePillarIndex] === 'SUPPORT' ? "Clear pathways in place before anyone needs them." : PILLARS[activePillarIndex] === 'CARE' ? "The club takes an active interest in the wellbeing of the people inside it." : "The social fabric of the club is strong enough to notice when someone is having a hard time."}</p>
                 </div>

                 <div className="max-w-5xl">
                   {renderStandardsForPillar(activePillar)}
                 </div>
               </div>
               
               <div className="p-8 border-t border-brand-primary/10 bg-[#f9fafb] flex flex-col sm:flex-row justify-between items-center gap-4 sticky bottom-0 z-30 shadow-[0_-8px_20px_-10px_rgba(0,0,0,0.1)]">
                 {activePillarIndex > 0 ? (
                   <button onClick={() => {
                     window.scrollTo({ top: 0, behavior: 'smooth' });
                     setActivePillarIndex(i => i - 1);
                   }} className="font-semibold px-8 py-4 text-brand-dark/60 hover:text-brand-primary transition-colors flex items-center gap-2">
                      <ArrowLeft className="w-5 h-5" /> Previous: {PILLARS[activePillarIndex - 1]}
                   </button>
                 ) : <div></div>}
                 
                 {activePillarIndex < PILLARS.length - 1 ? (
                   <button onClick={() => {
                     window.scrollTo({ top: 0, behavior: 'smooth' });
                     setActivePillarIndex(i => i + 1);
                   }} className="bg-brand-primary text-white font-bold px-10 py-4 rounded-full hover:bg-[rgb(15,64,82)] transition-shadow shadow-lg hover:shadow-xl flex items-center gap-3">
                     Next Module: {PILLARS[activePillarIndex + 1]} <ArrowRight className="w-5 h-5" />
                   </button>
                 ) : (
                   <button onClick={submitAssessment} className="bg-brand-secondary text-brand-primary font-bold px-10 py-4 rounded-full hover:bg-brand-secondary/90 transition-shadow shadow-lg hover:shadow-xl flex items-center gap-3 text-lg">
                     Finish Assessment <ArrowRight className="w-5 h-5" />
                   </button>
                 )}
               </div>
            </div>
          </motion.div>
        )}

        {view === 'focus' && currentPlan && (
          <motion.div key="focus" initial={{opacity: 0, scale: 0.95}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0}}>
            <div className="bg-white rounded-[2rem] shadow-2xl border border-brand-primary/10 overflow-hidden max-w-4xl mx-auto p-8 md:p-14 relative">
               <div className="absolute top-0 right-0 w-64 h-64 bg-brand-secondary/20 rounded-bl-full blur-[80px] pointer-events-none" />
               
               <div className="text-center mb-16 relative z-10">
                 <div className="w-24 h-24 bg-brand-bg text-brand-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border border-brand-primary/5">
                   <Target className="w-12 h-12" />
                 </div>
                 <h2 className="text-4xl md:text-5xl font-bold font-heading text-brand-primary mb-6 tracking-wide">Work on Next</h2>
                 <p className="text-brand-dark/70 text-xl max-w-2xl mx-auto">Because momentum matters. Based on your assessment, here are the most impactful steps to take right now to advance your Florio status.</p>
               </div>

               <div className="space-y-6 mb-14 relative z-10">
                  {currentPlan.focusIds.map((id, index) => {
                    const std = STANDARDS.find(s => s.id === id);
                    if (!std) return null;
                    return (
                      <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay: index * 0.15}} key={id} className="bg-brand-bg p-8 rounded-3xl border border-brand-primary/5 flex flex-col md:flex-row items-start gap-8 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-16 h-16 bg-white text-brand-primary shadow border border-brand-primary/5 rounded-full flex items-center justify-center shrink-0 font-bold text-3xl font-heading">
                          {index + 1}
                        </div>
                        <div className="space-y-4">
                            <div className="flex gap-2">
                               <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 bg-white border border-brand-primary/10 rounded-full text-brand-primary">
                                 {std.pillar}
                               </span>
                               <span className={cn(
                                 "text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full",
                                 std.level === 'Essential' ? "bg-green-100 text-green-800" : "bg-white text-brand-primary border border-brand-primary/10"
                               )}>
                                 {std.level}
                               </span>
                            </div>
                            <h4 className="text-brand-primary font-bold text-2xl leading-snug">
                              <span className="opacity-40 mr-2">{std.number}</span>{std.statement}
                            </h4>
                            
                            <div className="pt-2">
                              <p className="text-xs font-bold uppercase tracking-widest text-brand-dark/40 mb-3">Action Ideas</p>
                              <div className="flex flex-wrap gap-2">
                                {std.actionIdeas.map((idea, i) => (
                                  <div key={i} className="inline-flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl text-sm font-medium border border-brand-primary/5 shadow-sm text-brand-dark">
                                    <PlayCircle className="w-5 h-5 text-brand-secondary" /> {idea}
                                  </div>
                                ))}
                              </div>
                            </div>
                        </div>
                      </motion.div>
                    )
                  })}
               </div>

               <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10 pt-8 border-t border-brand-primary/5">
                 <button onClick={() => setView('assessment')} className="font-semibold px-8 py-4 rounded-full text-brand-dark/60 hover:text-brand-primary hover:bg-brand-bg transition-colors">
                   Back to Assessment
                 </button>
                 <button onClick={saveFocusAndFinish} className="bg-brand-primary text-white font-bold px-12 py-4 rounded-full hover:bg-brand-primary/90 transition-shadow shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 text-lg">
                   Save to Dashboard <ArrowRight className="w-5 h-5" />
                 </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
