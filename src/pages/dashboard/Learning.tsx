import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PlayCircle, Lock, Search, BookOpen, Clock, ArrowRight,
  Waves, Smile, ShieldAlert, Moon, Flame, Zap, Activity, Users, HeartHandshake, MessageCircle, Leaf,
  ChevronRight, ChevronLeft, Target
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';

const HERO_SLIDES = [
  { 
    id: 1, 
    title: 'Building a Culture of Care', 
    subtitle: 'A comprehensive 4-part series for management on how to architect a club environment that proactively supports mental wellbeing.', 
    image: 'https://images.unsplash.com/photo-1593113564551-71fb264c80cb?auto=format&fit=crop&w=2000&q=80', 
    tag: 'FEATURED TRACK',
    duration: '1.5 hrs',
    locked: false
  },
  { 
    id: 2, 
    title: 'De-escalation Masterclass', 
    subtitle: 'Learn practical techniques for handling angry or distressed members safely.', 
    image: 'https://images.unsplash.com/photo-1551836022-4c4c79ec5c81?auto=format&fit=crop&w=2000&q=80', 
    tag: 'NEW COURSE',
    duration: '22 mins',
    locked: true
  }
];

const CONTINUE_WATCHING = [
  { id: 10, title: 'Recognising the Signs', duration: '20 mins', progress: 65, image: 'https://images.unsplash.com/photo-1544367567-0f2fcb046eeb?auto=format&fit=crop&w=800&q=80', description: 'Module 2 • Mental Health at Work' },
  { id: 11, title: 'Active Listening Basics', duration: '15 mins', progress: 30, image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=800&q=80', description: 'Communication Series' },
  { id: 12, title: 'Personal Boundaries', duration: '25 mins', progress: 10, image: 'https://images.unsplash.com/photo-1493836512294-502baa1986e2?auto=format&fit=crop&w=800&q=80', description: 'Self Care Toolkit' },
];

const RECOMMENDED = [
  { id: 1, title: 'Starting the Conversation', duration: '25 mins', image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=800&q=80', type: 'Course', tag: 'BE SUCCESSFUL' },
  { id: 2, title: '5 Minute Check-in Framework', duration: '3 mins', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80', type: 'Quick Guide', tag: 'COMMUNICATION' },
  { id: 3, title: 'Handling Winter Slumps', duration: '8 mins', image: 'https://images.unsplash.com/photo-1535136104956-6bed9211c470?auto=format&fit=crop&w=800&q=80', type: 'Case Study', tag: 'TEAM COHESION' },
  { id: 5, title: 'Mindful Breathing', duration: '10 mins', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80', type: 'Audio', tag: 'STRESS LESS' },
];

const NEW_NOTEWORTHY = [
  { id: 101, title: 'The Empathetic Leader', duration: '15 mins', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80', type: 'Series' },
  { id: 102, title: 'Recognising Burnout', duration: '12 mins', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80', type: 'Video' },
  { id: 103, title: 'Crisis Signposting', duration: '15 mins', image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=800&q=80', type: 'Course' },
  { id: 104, title: 'Conflict Resolution', duration: '30 mins', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80', type: 'Course' },
];

const GOALS = [
  { id: 1, title: 'Stress Less', icon: Waves },
  { id: 2, title: 'Be Happier', icon: Smile },
  { id: 3, title: 'Handle Crisis', icon: ShieldAlert },
  { id: 4, title: 'Sleep Better', icon: Moon },
  { id: 5, title: 'Be Successful', icon: Flame },
  { id: 6, title: 'Boost Energy', icon: Zap },
  { id: 7, title: 'Build Resilience', icon: Activity },
  { id: 8, title: 'Team Cohesion', icon: Users },
  { id: 9, title: 'Self Care', icon: HeartHandshake },
  { id: 10, title: 'Communication', icon: MessageCircle },
  { id: 11, title: 'Manage Time', icon: Clock },
  { id: 12, title: 'Mindfulness', icon: Leaf },
];

const COLLECTIONS = [
  { id: 1, title: 'For General Managers', desc: 'Strategic overviews and systemic changes.', count: '12 Resources', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80' },
  { id: 2, title: 'For Mental Health Leads', desc: 'Tactical tools and conversation guides.', count: '24 Resources', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80' },
  { id: 3, title: 'Crisis Management', desc: 'What to do when things escalate quickly.', count: '5 Resources', image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=800&q=80' }
];

function HorizontalScrollRow({ title, rightContent, items, renderItem, className }: { title: string, rightContent?: React.ReactNode, items: any[], renderItem: (item: any) => React.ReactNode, className?: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -400, behavior: 'smooth' });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 400, behavior: 'smooth' });

  return (
    <div className={cn("space-y-6 pt-4", className)}>
      <div className="flex items-center justify-between px-1">
        <h3 className="text-xl md:text-2xl font-bold text-brand-primary">{title}</h3>
        <div className="flex items-center gap-4">
          {rightContent}
          <div className="hidden sm:flex gap-2">
             <button onClick={scrollLeft} className="p-2 rounded-full bg-brand-bg text-brand-primary hover:bg-brand-secondary/20 transition-colors">
               <ChevronLeft className="w-5 h-5" />
             </button>
             <button onClick={scrollRight} className="p-2 rounded-full bg-brand-bg text-brand-primary hover:bg-brand-secondary/20 transition-colors">
               <ChevronRight className="w-5 h-5" />
             </button>
          </div>
        </div>
      </div>
      <div 
        ref={scrollRef}
        className="flex gap-4 md:gap-6 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide snap-x snap-mandatory"
      >
        {items.map((item, i) => (
          <div key={item.id} className="snap-start shrink-0">
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Learning() {
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  return (
    <div className="space-y-16 pb-20">
      
      {/* Featured Banner Slider */}
      <section className="relative">
        <h3 className="text-xl md:text-2xl font-bold text-brand-primary mb-6">Featured</h3>
        <div className="relative h-[350px] md:h-[450px] w-full rounded-[2.5rem] overflow-hidden bg-brand-primary group shadow-xl">
           <AnimatePresence mode="wait">
             <motion.div 
               key={currentHeroSlide}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.5 }}
               className="absolute inset-0"
             >
                <img 
                  src={HERO_SLIDES[currentHeroSlide].image} 
                  alt="" 
                  className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60 group-hover:scale-105 transition-transform duration-[3s] ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-brand-primary/60 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                   <div className="mb-4 flex items-center gap-3">
                     <span className="bg-brand-secondary text-brand-primary text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded inline-block shadow-sm">
                       {HERO_SLIDES[currentHeroSlide].tag}
                     </span>
                     <span className="text-xs font-bold text-white/80 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded shadow-sm">
                       {HERO_SLIDES[currentHeroSlide].duration}
                     </span>
                   </div>
                   <h2 className="text-3xl md:text-5xl font-heading tracking-wide text-white mb-4 max-w-3xl">
                     {HERO_SLIDES[currentHeroSlide].title}
                   </h2>
                   <p className="text-white/80 text-lg md:text-xl mb-8 max-w-2xl font-medium">
                     {HERO_SLIDES[currentHeroSlide].subtitle}
                   </p>
                   
                   <div className="flex items-center gap-4">
                     {HERO_SLIDES[currentHeroSlide].locked ? (
                        <button className="bg-white text-brand-primary/40 font-bold w-12 h-12 rounded-full cursor-not-allowed flex items-center justify-center shadow-lg">
                          <Lock className="w-5 h-5" />
                        </button>
                     ) : (
                        <button className="bg-white text-brand-primary hover:text-brand-secondary hover:bg-brand-primary font-bold px-8 py-3.5 rounded-full transition-all flex items-center gap-2 shadow-lg">
                          <PlayCircle className="w-5 h-5" /> Start Now
                        </button>
                     )}
                   </div>
                </div>
             </motion.div>
           </AnimatePresence>

           {/* Slide Indicators */}
           <div className="absolute bottom-6 right-8 md:bottom-12 md:right-12 flex gap-2 z-20">
             {HERO_SLIDES.map((_, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setCurrentHeroSlide(idx)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300", 
                    currentHeroSlide === idx ? "w-8 bg-brand-secondary" : "w-2 bg-white/40 hover:bg-white/60"
                  )}
                />
             ))}
           </div>
        </div>
      </section>

      {/* Continue Watching Row */}
      <HorizontalScrollRow 
         title="Continue Learning"
         items={CONTINUE_WATCHING}
         renderItem={(item) => (
            <Link to="#" className="block w-[280px] md:w-[320px] group bg-white rounded-3xl p-4 border border-brand-primary/5 shadow-sm hover:shadow-lg transition-all">
               <div className="h-40 w-full rounded-2xl overflow-hidden relative mb-4">
                 <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                 <div className="absolute inset-0 bg-brand-primary/20 group-hover:bg-brand-primary/10 transition-colors" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-90 group-hover:scale-110 transition-transform">
                      <PlayCircle className="w-6 h-6 fill-current" />
                    </div>
                 </div>
               </div>
               <div>
                  <h4 className="font-bold text-brand-primary text-lg mb-1 truncate">{item.title}</h4>
                  <p className="text-xs text-brand-dark/50 font-medium mb-4 truncate">{item.description}</p>
                  
                  <div className="flex items-center gap-4">
                    <div className="h-1.5 flex-1 bg-brand-bg rounded-full overflow-hidden">
                      <div className="h-full bg-brand-secondary rounded-full" style={{ width: `${item.progress}%` }} />
                    </div>
                    <span className="text-xs font-bold text-brand-primary">{item.progress}%</span>
                  </div>
               </div>
            </Link>
         )}
      />

      {/* Browse By Goal (Grid) */}
      <section className="pt-4">
         <h3 className="text-xl md:text-2xl font-bold text-brand-primary mb-6">Browse by Goal</h3>
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
           {GOALS.map((goal, idx) => (
             <motion.button 
               key={goal.id}
               initial={{ opacity: 0, y: 15 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.05 }}
               className="bg-brand-primary text-white p-6 rounded-3xl border border-white/5 hover:border-brand-secondary transition-colors flex flex-col items-center justify-center gap-4 group hover:shadow-[0_0_20px_rgba(205,255,100,0.15)] relative overflow-hidden"
             >
               <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               <goal.icon className="w-8 h-8 text-white/50 group-hover:text-brand-secondary group-hover:scale-110 transition-all duration-300 relative z-10" />
               <span className="text-sm font-semibold relative z-10 tracking-wide text-center">{goal.title}</span>
             </motion.button>
           ))}
         </div>
      </section>

      {/* Recommended For You Row */}
      <HorizontalScrollRow 
         title="Recommended For You"
         items={RECOMMENDED}
         className="bg-brand-bg/50 -mx-4 px-4 md:-mx-12 md:px-12 lg:-mx-14 lg:px-14 py-12 border-y border-brand-primary/5"
         renderItem={(item) => (
            <Link to="#" className="block w-[260px] md:w-[300px] group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-brand-primary/5 transition-all">
               <div className="h-36 w-full relative overflow-hidden">
                 <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                 <div className="absolute inset-0 bg-brand-primary/10" />
                 <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md text-brand-secondary text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded flex items-center gap-1.5 shadow-sm">
                    <Target className="w-3 h-3" /> {item.tag}
                 </div>
               </div>
               <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                     <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary bg-brand-bg px-2 py-0.5 rounded">{item.type}</span>
                     <span className="text-xs text-brand-dark/40 font-medium">{item.duration}</span>
                  </div>
                  <h4 className="text-lg font-bold text-brand-primary group-hover:text-brand-secondary transition-colors line-clamp-2">{item.title}</h4>
               </div>
            </Link>
         )}
      />

      {/* New & Noteworthy Row */}
      <HorizontalScrollRow 
         title="New & Noteworthy"
         items={NEW_NOTEWORTHY}
         renderItem={(item) => (
            <Link to="#" className="block w-[260px] md:w-[300px] group">
               <div className="h-44 w-full rounded-[2rem] overflow-hidden relative mb-4 shadow-sm group-hover:shadow-lg transition-all border border-brand-primary/5">
                 <img src={item.image} alt="" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
                 <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 via-brand-primary/20 to-transparent" />
                 <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10 text-white">
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-secondary shadow-sm">{item.type}</span>
                    <span className="text-xs font-medium text-white/80">{item.duration}</span>
                 </div>
               </div>
               <h4 className="text-lg font-bold text-brand-primary px-2 group-hover:text-brand-secondary transition-colors">{item.title}</h4>
            </Link>
         )}
      />

      {/* Featured Collections */}
      <section className="pt-4">
         <h3 className="text-xl md:text-2xl font-bold text-brand-primary mb-6">Featured Collections</h3>
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COLLECTIONS.map((collection, idx) => (
              <motion.div 
                key={collection.id}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group rounded-[2rem] overflow-hidden relative min-h-[300px] flex items-end p-8 border border-brand-primary/10 shadow-sm hover:shadow-xl transition-all block cursor-pointer"
              >
                <img src={collection.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-brand-primary/60 to-transparent mix-blend-multiply" />
                <div className="relative z-10 w-full">
                  <span className="inline-block bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full mb-3 shadow-sm">{collection.count}</span>
                  <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-brand-secondary transition-colors">{collection.title}</h4>
                  <p className="text-white/80 text-sm font-medium leading-relaxed max-w-[90%]">{collection.desc}</p>
                </div>
              </motion.div>
            ))}
         </div>
      </section>

    </div>
  );
}
