import { ExternalLink, Phone, Globe, Mail, MapPin, Search, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

const CONTACTS = [
  {
    name: 'Mind',
    description: 'Provides advice and support to empower anyone experiencing a mental health problem.',
    phone: '0300 123 3393',
    website: 'mind.org.uk',
    email: 'info@mind.org.uk',
    tags: ['General', 'Advice']
  },
  {
    name: 'Samaritans',
    description: 'Whatever you are going through, a Samaritan will face it with you. We are here 24 hours a day, 365 days a year.',
    phone: '116 123',
    website: 'samaritans.org',
    email: 'jo@samaritans.org',
    tags: ['Crisis', '24/7']
  },
  {
    name: 'Shout',
    description: 'A free, confidential, 24/7 text messaging support service for anyone who is struggling to cope.',
    text: 'Text SHOUT to 85258',
    website: 'giveusashout.org',
    tags: ['Crisis', 'Text Only']
  },
  {
    name: 'CALM',
    description: 'Leading a movement against suicide. Every week 125 people in the UK take their own lives. CALM exists to change this.',
    phone: '0800 58 58 58',
    website: 'thecalmzone.net',
    tags: ['Suicide Prevention', 'Advice']
  },
  {
    name: 'Anxiety UK',
    description: 'Charity providing support if you have been diagnosed with an anxiety condition.',
    phone: '03444 775 774',
    website: 'anxietyuk.org.uk',
    tags: ['Anxiety', 'Support Services']
  },
  {
    name: 'No Panic',
    description: 'Voluntary charity offering support for sufferers of panic attacks and obsessive compulsive disorder (OCD).',
    phone: '0300 772 9844',
    website: 'nopanic.org.uk',
    tags: ['Anxiety', 'OCD', 'Support Services']
  }
];

export default function Database() {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');

  const filteredContacts = CONTACTS.filter(contact => {
    return contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           contact.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Crisis Banner */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 border border-red-200 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start gap-4 md:gap-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center shrink-0">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
        <div>
           <h2 className="text-xl md:text-2xl font-bold mb-2 text-red-900">Immediate Danger or Crisis?</h2>
           <p className="text-red-800 font-medium">If someone is in immediate danger to themselves or others, call <strong className="bg-white px-2 py-0.5 rounded text-red-900 mx-1">999</strong> immediately.</p>
           <p className="mt-3 text-sm text-red-700/80 max-w-3xl leading-relaxed">
             For 24/7 mental health crisis support across the UK, text <strong>SHOUT to 85258</strong> or call <strong>Samaritans on 116 123</strong>. Both services are free, confidential, and will not show up on a phone bill.
           </p>
        </div>
      </motion.div>

      {/* Header & Search */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-6 pb-6 pt-4 border-b border-brand-primary/10">
        <div>
          <span className="text-brand-secondary font-semibold tracking-widest uppercase mb-2 block text-sm">Signposting Database</span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-brand-primary mb-2">Find Support.</h1>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <div className="relative flex-1 sm:w-64">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-primary/40 w-5 h-5" />
             <input 
               type="text" 
               placeholder="Search by name or topic..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-brand-primary/10 focus:outline-none focus:ring-2 focus:ring-brand-secondary shadow-sm"
             />
          </div>
          <div className="relative flex-1 sm:w-56">
             <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-primary/40 w-5 h-5" />
             <input 
               type="text" 
               placeholder="Location (Postcode)" 
               value={locationQuery}
               onChange={(e) => setLocationQuery(e.target.value)}
               className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-brand-primary/10 focus:outline-none focus:ring-2 focus:ring-brand-secondary shadow-sm"
             />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 pt-2">
        {filteredContacts.map((contact, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            key={contact.name}
            className="bg-white rounded-3xl shadow-sm border border-brand-primary/5 flex flex-col sm:flex-row overflow-hidden hover:shadow-md transition-shadow group"
          >
            <div className="p-6 sm:p-8 flex-1 border-b sm:border-b-0 sm:border-r border-brand-primary/5">
              <div className="flex flex-wrap gap-2 mb-4">
                {contact.tags.map(tag => (
                  <span key={tag} className="bg-brand-primary/5 text-brand-primary text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-2xl font-bold text-brand-primary mb-3 group-hover:text-brand-secondary transition-colors">{contact.name}</h3>
              <p className="text-brand-dark/70 text-sm leading-relaxed">
                {contact.description}
              </p>
            </div>
            <div className="bg-brand-bg/30 p-6 sm:p-8 sm:w-64 flex flex-col justify-center space-y-4 shrink-0">
              {contact.phone && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-brand-dark/40 font-bold uppercase tracking-wider mb-0.5">Call</p>
                    <span className="text-sm font-semibold text-brand-primary">{contact.phone}</span>
                  </div>
                </div>
              )}
              {contact.text && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-brand-dark/40 font-bold uppercase tracking-wider mb-0.5">Text</p>
                    <span className="text-sm font-semibold text-brand-primary">{contact.text}</span>
                  </div>
                </div>
              )}
              {contact.website && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Globe className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-brand-dark/40 font-bold uppercase tracking-wider mb-0.5">Website</p>
                    <a href={`https://${contact.website}`} target="_blank" rel="noreferrer" className="text-sm font-semibold text-brand-primary hover:text-brand-secondary transition-colors flex items-center gap-1">
                      Link <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
