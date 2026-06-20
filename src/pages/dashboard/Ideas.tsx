import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lightbulb, Sparkles, Heart, Users, MessageCircle, Send, Plus, X, ArrowRight, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';

type Category = 'All' | 'Events' | 'Communication' | 'Staff Wellbeing' | 'Quick Wins';

const IDEAS = [
  {
    id: 1,
    title: 'Walk and Talk Tuesdays',
    description: 'A designated 9-hole morning where members are paired randomly without scorecards, focusing purely on conversation and connection.',
    category: 'Events',
    likes: 124,
    tags: ['Social', 'Low Cost'],
    color: 'bg-orange-100/80 text-orange-900 border-orange-200',
    icon: Users
  },
  {
    id: 2,
    title: 'The Halfway Check-In',
    description: 'Posters at the halfway hut prompting a "mental scorecard" check-in, normalizing taking a breath and assessing mood alongside the game.',
    category: 'Communication',
    likes: 89,
    tags: ['Visibility', 'Awareness'],
    color: 'bg-blue-100/80 text-blue-900 border-blue-200',
    icon: MessageCircle
  },
  {
    id: 3,
    title: 'Greenkeeper Coffee Mornings',
    description: 'Monthly protected time for the course staff to grab a coffee together before their shift, fostering team cohesion and a safe space to chat.',
    category: 'Staff Wellbeing',
    likes: 156,
    tags: ['Staff', 'Routine'],
    color: 'bg-green-100/80 text-green-900 border-green-200',
    icon: Heart
  },
  {
    id: 4,
    title: 'Champion Recognition Pins',
    description: 'Small, discreet lapel pins for staff who have completed Mental Health First Aid training, so members know who is a safe person to approach.',
    category: 'Quick Wins',
    likes: 210,
    tags: ['Training', 'Visibility'],
    color: 'bg-purple-100/80 text-purple-900 border-purple-200',
    icon: Sparkles
  },
  {
    id: 5,
    title: 'Winter Guest Speaker Series',
    description: 'Using the quiet winter months to host informal evenings with guest speakers on topics like resilience, sleep, and handling winter slumps.',
    category: 'Events',
    likes: 76,
    tags: ['Education', 'Engagement'],
    color: 'bg-brand-bg text-brand-primary border-brand-primary/10',
    icon: Lightbulb
  },
  {
    id: 6,
    title: 'Quiet Zone in Clubhouse',
    description: 'Designating a small area of the clubhouse as a device-free "quiet zone" with comfortable chairs and reading materials for decompression.',
    category: 'Quick Wins',
    likes: 92,
    tags: ['Facilities', 'Wellbeing'],
    color: 'bg-pink-100/80 text-pink-900 border-pink-200',
    icon: Zap
  }
];

const CATEGORIES: Category[] = ['All', 'Quick Wins', 'Events', 'Communication', 'Staff Wellbeing'];

export default function Ideas() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [ideas, setIdeas] = useState(IDEAS);
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());

  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState<Category>('Quick Wins');

  const filteredIdeas = ideas.filter(idea => activeCategory === 'All' || idea.category === activeCategory);

  const handleLike = (id: number) => {
    setLikedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    const newIdea = {
      id: Date.now(),
      title: newTitle,
      description: newDesc,
      category: newCategory,
      likes: 0,
      tags: ['Community', 'New'],
      color: 'bg-yellow-100/80 text-yellow-900 border-yellow-200',
      icon: Lightbulb
    };

    setIdeas([newIdea, ...ideas]);
    setIsSubmitOpen(false);
    setNewTitle('');
    setNewDesc('');
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Section */}
      <div className="relative bg-brand-primary rounded-[2.5rem] overflow-hidden p-8 md:p-14 shadow-xl text-white">
         <div className="absolute top-0 right-0 w-96 h-96 bg-brand-secondary/20 rounded-full blur-[100px] pointer-events-none" />
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] pointer-events-none" />
         
         <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-brand-secondary font-bold text-xs uppercase tracking-widest mb-6 backdrop-blur-md">
              <Sparkles className="w-4 h-4" /> The Inspiration Hub
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 tracking-wide leading-tight">
              Spark a Change at Your Club.
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
              Browse proven ideas from other golf clubs, from quick wins to major events. Found something that works for you? Share it with the community.
            </p>
            <button 
              onClick={() => setIsSubmitOpen(true)}
              className="bg-brand-secondary text-brand-primary hover:bg-white font-bold px-8 py-4 rounded-full transition-all shadow-lg flex items-center gap-3 text-lg"
            >
               <Plus className="w-5 h-5" /> Share Your Idea
            </button>
         </div>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
         {/* Filter Bar */}
         <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border",
                  activeCategory === category 
                    ? "bg-brand-primary text-white border-brand-primary shadow-md" 
                    : "bg-white text-brand-dark/60 border-brand-primary/10 hover:border-brand-primary/30 hover:text-brand-primary"
                )}
              >
                {category}
              </button>
            ))}
         </div>

         {/* Ideas Grid */}
         <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredIdeas.map((idea) => {
                const Icon = idea.icon;
                const isLiked = likedIds.has(idea.id);
                return (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    key={idea.id}
                    className={cn(
                      "rounded-[2rem] p-8 border backdrop-blur-sm relative overflow-hidden group flex flex-col transition-all hover:shadow-xl",
                      idea.color
                    )}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-bl-full blur-[40px] pointer-events-none group-hover:bg-white/30 transition-colors" />
                    
                    <div className="flex items-start justify-between mb-6 relative z-10">
                       <div className="w-12 h-12 rounded-2xl bg-white/40 flex items-center justify-center shadow-sm backdrop-blur-md">
                         <Icon className="w-6 h-6" />
                       </div>
                       <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/40 backdrop-blur-md shadow-sm">
                          {idea.category}
                       </span>
                    </div>

                    <h3 className="text-xl font-bold mb-3 leading-snug relative z-10">{idea.title}</h3>
                    <p className="opacity-80 text-sm leading-relaxed mb-8 flex-1 relative z-10">
                      {idea.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto relative z-10 pt-4 border-t border-black/5">
                       <div className="flex gap-2">
                         {idea.tags.map(tag => (
                           <span key={tag} className="text-[10px] font-bold uppercase tracking-wider bg-black/5 px-2 py-1 rounded-md">
                             {tag}
                           </span>
                         ))}
                       </div>
                       <button 
                         onClick={() => handleLike(idea.id)}
                         className={cn(
                           "flex items-center gap-1.5 text-sm font-bold transition-colors px-3 py-1.5 rounded-full",
                           isLiked ? "bg-red-500/10 text-red-600" : "hover:bg-black/5"
                         )}
                       >
                         <Heart className={cn("w-4 h-4", isLiked ? "fill-current" : "")} /> 
                         {idea.likes + (isLiked ? 1 : 0)}
                       </button>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
         </motion.div>
      </div>

      {/* Submit Idea Modal */}
      <AnimatePresence>
        {isSubmitOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }} 
               className="absolute inset-0 bg-brand-primary/40 backdrop-blur-sm"
               onClick={() => setIsSubmitOpen(false)}
            />
            <motion.div 
               initial={{ opacity: 0, y: 40, scale: 0.95 }}
               animate={{ opacity: 1, y: 0, scale: 1 }}
               exit={{ opacity: 0, y: 20, scale: 0.95 }}
               className="bg-white rounded-[2rem] shadow-2xl w-full max-w-xl relative z-10 overflow-hidden"
            >
               <div className="p-8 border-b border-brand-primary/10 flex items-center justify-between bg-brand-bg/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-primary text-brand-secondary rounded-xl flex items-center justify-center">
                      <Lightbulb className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-brand-primary">Submit an Idea</h2>
                      <p className="text-sm text-brand-dark/50">Share what's working at your club.</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsSubmitOpen(false)}
                    className="p-2 hover:bg-white rounded-full transition-colors text-brand-dark/50 hover:text-brand-primary"
                  >
                    <X className="w-5 h-5" />
                  </button>
               </div>

               <form onSubmit={handleSubmit} className="p-8 space-y-6">
                 <div>
                   <label className="block text-sm font-bold text-brand-primary mb-2">Title of your idea</label>
                   <input 
                     type="text" 
                     required
                     value={newTitle}
                     onChange={(e) => setNewTitle(e.target.value)}
                     className="w-full border border-brand-primary/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-secondary text-brand-dark"
                     placeholder="e.g., Monthly Wellbeing Walks"
                   />
                 </div>
                 
                 <div>
                   <label className="block text-sm font-bold text-brand-primary mb-2">Category</label>
                   <select 
                     value={newCategory}
                     onChange={(e) => setNewCategory(e.target.value as Category)}
                     className="w-full border border-brand-primary/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-secondary text-brand-dark appearance-none bg-white"
                   >
                     {CATEGORIES.filter(c => c !== 'All').map(c => (
                       <option key={c} value={c}>{c}</option>
                     ))}
                   </select>
                 </div>

                 <div>
                   <label className="block text-sm font-bold text-brand-primary mb-2">Description</label>
                   <textarea 
                     required
                     value={newDesc}
                     onChange={(e) => setNewDesc(e.target.value)}
                     className="w-full border border-brand-primary/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-secondary text-brand-dark h-32 resize-none"
                     placeholder="Tell us how it works, what you need to run it, and what the impact has been..."
                   />
                 </div>

                 <div className="pt-4 flex justify-end gap-3">
                   <button 
                     type="button"
                     onClick={() => setIsSubmitOpen(false)}
                     className="px-6 py-3 font-bold text-brand-dark/60 hover:text-brand-primary transition-colors"
                   >
                     Cancel
                   </button>
                   <button 
                     type="submit"
                     className="bg-brand-primary text-white font-bold px-8 py-3 rounded-full hover:bg-brand-primary/90 transition-shadow shadow-md hover:shadow-lg flex items-center gap-2"
                   >
                     Submit Idea <Send className="w-4 h-4" />
                   </button>
                 </div>
               </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
