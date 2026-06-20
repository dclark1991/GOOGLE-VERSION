import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Users, ThumbsUp, MessageCircle, MapPin, Search } from 'lucide-react';
import { cn } from '../../lib/utils';

type Tab = 'Feed' | 'Directory';

const FEED_POSTS = [
  {
    id: 1,
    authorName: 'Sarah Jenkins',
    authorRole: 'MH Lead',
    clubName: 'Pine Valley Golf Club',
    avatar: 'S',
    time: '2 hours ago',
    content: 'Just ran our first "Walk and Talk" session for the greens staff. Great turnout! Taking golf buggies out and discussing mental fatigue explicitly really brought walls down. Highly recommend other clubs try this.',
    likes: 12,
    comments: 3
  },
  {
    id: 2,
    authorName: 'David Chen',
    authorRole: 'General Manager',
    clubName: 'Oakwood Park',
    avatar: 'D',
    time: '5 hours ago',
    content: 'Has anyone found a good local partner for immediate crisis escalation in the North West region? We are updating our support pathways.',
    likes: 4,
    comments: 8
  },
  {
    id: 3,
    authorName: 'Emma Watson',
    authorRole: 'MH Lead',
    clubName: 'Royal Birkdale',
    avatar: 'E',
    time: '1 day ago',
    content: 'We put up the new World Mental Health Day posters in the locker rooms and it sparked three separate conversations today alone. Small things make a big difference.',
    likes: 24,
    comments: 1
  }
];

const CLUBS_DIRECTORY = [
  { id: 1, name: 'Pine Valley Golf Club', region: 'South East', gm: 'Michael Scott', mhLead: 'Sarah Jenkins' },
  { id: 2, name: 'Oakwood Park', region: 'North West', gm: 'David Chen', mhLead: 'Lisa Ray' },
  { id: 3, name: 'Royal Birkdale', region: 'North West', gm: 'John Smith', mhLead: 'Emma Watson' },
  { id: 4, name: 'Wentworth Club', region: 'South East', gm: 'Marcus Aurelius', mhLead: 'Diana Prince' },
  { id: 5, name: 'St Andrews Links', region: 'Scotland', gm: 'Bruce Wayne', mhLead: 'Clark Kent' },
];

export default function Network() {
  const [activeTab, setActiveTab] = useState<Tab>('Feed');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClubs = CLUBS_DIRECTORY.filter(club => 
    club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    club.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-brand-primary/10">
        <div>
          <span className="text-brand-secondary font-semibold tracking-widest uppercase mb-2 block text-sm">Community Connection</span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-brand-primary mb-2">Network.</h1>
          <p className="text-brand-dark/60 max-w-2xl text-lg">
             Connect, share learnings, and seek advice from other General Managers and MH Leads across the programme.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-brand-primary/10">
        {(['Feed', 'Directory'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "pb-4 font-semibold text-sm transition-colors relative flex items-center gap-2",
              activeTab === tab ? "text-brand-primary" : "text-brand-dark/40 hover:text-brand-dark/60"
            )}
          >
            {tab === 'Feed' ? <MessageSquare className="w-4 h-4" /> : <Users className="w-4 h-4" />}
            {tab}
            {activeTab === tab && (
              <motion.div layoutId="networkTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-secondary" />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'Feed' && (
          <motion.div key="feed" initial={{opacity: 0, y: 15}} animate={{opacity: 1, y: 0}} exit={{opacity: 0}} className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Compose Post */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-brand-primary/10 flex gap-4 items-start">
                 <div className="w-10 h-10 rounded-full bg-brand-primary text-brand-secondary flex items-center justify-center font-bold shrink-0">
                   Y
                 </div>
                 <div className="flex-1">
                   <textarea 
                     placeholder="Share an update, ask a question, or celebrate a win..." 
                     className="w-full bg-brand-bg/50 border border-brand-primary/10 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-secondary min-h-[100px] resize-none mb-3"
                   />
                   <div className="flex justify-end">
                     <button className="bg-brand-primary text-white px-6 py-2 rounded-full font-semibold text-sm hover:bg-brand-primary/90 transition-colors shadow-sm">
                       Post to Network
                     </button>
                   </div>
                 </div>
              </div>

              {/* Feed Posts */}
              <div className="space-y-6">
                 {FEED_POSTS.map((post, i) => (
                   <motion.div initial={{opacity:0, y:10}} animate={{opacity:1,y:0}} transition={{delay: i*0.1}} key={post.id} className="bg-white rounded-3xl p-6 shadow-sm border border-brand-primary/5">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full bg-brand-secondary/20 text-brand-primary flex items-center justify-center font-bold">
                             {post.avatar}
                           </div>
                           <div>
                             <p className="font-bold text-brand-primary text-sm">{post.authorName}</p>
                             <p className="text-xs text-brand-dark/50"><span className="font-semibold text-brand-secondary">{post.authorRole}</span> • {post.clubName}</p>
                           </div>
                        </div>
                        <span className="text-xs text-brand-dark/40 font-medium">{post.time}</span>
                      </div>
                      
                      <p className="text-brand-dark/80 text-sm leading-relaxed mb-6">
                        {post.content}
                      </p>

                      <div className="flex items-center gap-6 border-t border-brand-primary/5 pt-4">
                         <button className="flex items-center gap-2 text-brand-dark/40 hover:text-brand-primary transition-colors text-sm font-semibold">
                           <ThumbsUp className="w-4 h-4" /> {post.likes}
                         </button>
                         <button className="flex items-center gap-2 text-brand-dark/40 hover:text-brand-primary transition-colors text-sm font-semibold">
                           <MessageCircle className="w-4 h-4" /> {post.comments} Comments
                         </button>
                      </div>
                   </motion.div>
                 ))}
              </div>
            </div>

            <div className="space-y-6">
               <div className="bg-brand-primary rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-brand-secondary/20 rounded-full blur-2xl" />
                 <h3 className="font-bold text-lg mb-2 relative z-10">Community Guidelines</h3>
                 <p className="text-white/70 text-sm mb-4 relative z-10">This is a safe space for club leaders. Please remember to maintain confidentiality regarding specific member cases.</p>
               </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'Directory' && (
          <motion.div key="directory" initial={{opacity: 0, y: 15}} animate={{opacity: 1, y: 0}} exit={{opacity: 0}} className="space-y-6">
            <div className="flex items-center relative max-w-md">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-primary/40 w-5 h-5" />
               <input 
                 type="text" 
                 placeholder="Search clubs or regions..." 
                 value={searchQuery}
                 onChange={e => setSearchQuery(e.target.value)}
                 className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-brand-primary/10 focus:outline-none focus:ring-2 focus:ring-brand-secondary shadow-sm"
               />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               {filteredClubs.map((club, i) => (
                  <motion.div initial={{opacity:0, scale:0.98}} animate={{opacity:1, scale:1}} transition={{delay: i*0.05}} key={club.id} className="bg-white rounded-3xl p-6 shadow-sm border border-brand-primary/5 hover:shadow-md transition-shadow">
                     <div className="flex items-center gap-2 mb-4">
                        <MapPin className="text-brand-secondary w-5 h-5" />
                        <span className="text-xs font-bold text-brand-dark/40 uppercase tracking-wider">{club.region}</span>
                     </div>
                     <h3 className="text-xl font-bold text-brand-primary mb-6">{club.name}</h3>
                     
                     <div className="space-y-3">
                        <div className="bg-brand-bg rounded-xl p-3 flex justify-between items-center">
                           <span className="text-xs text-brand-dark/50 font-medium">General Manager</span>
                           <span className="text-sm font-bold text-brand-primary">{club.gm}</span>
                        </div>
                        <div className="bg-brand-bg rounded-xl p-3 flex justify-between items-center">
                           <span className="text-xs text-brand-dark/50 font-medium">MH Lead</span>
                           <span className="text-sm font-bold text-brand-primary">{club.mhLead}</span>
                        </div>
                     </div>
                  </motion.div>
               ))}
               {filteredClubs.length === 0 && (
                 <div className="col-span-full py-12 text-center text-brand-dark/50">
                    <p className="text-lg">No clubs found matching your search.</p>
                 </div>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
