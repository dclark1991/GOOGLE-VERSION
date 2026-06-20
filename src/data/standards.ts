export type Level = 'Essential' | 'Bronze' | 'Silver' | 'Gold';
export type Pillar = 'LEAD' | 'COMMUNICATE' | 'SUPPORT' | 'CARE' | 'CONNECT';
export type Score = 'FM' | 'PM' | 'NM' | 'NA' | null;

export interface Principle {
  id: string;
  pillar: Pillar;
  title: string;
  description: string;
  order: number;
}

export interface Standard {
  id: number;
  number: string;
  pillar: Pillar;
  principleId: string;
  level: Level;
  subcategory: string;
  statement: string;
  indicators: string[];
  actionIdeas: string[];
}

export const PRINCIPLES: Principle[] = [
  { id: 'lead-1', pillar: 'LEAD', title: 'Governance and Commitment', description: 'Mental health is formally recognised and supported by club leadership.', order: 1 },
  { id: 'lead-2', pillar: 'LEAD', title: 'Resourcing', description: 'The programme has the necessary time, budget, and materials to succeed.', order: 2 },
  { id: 'comm-1', pillar: 'COMMUNICATE', title: 'Visibility', description: 'Mental health resources and support information are easy to find.', order: 1 },
  { id: 'supp-1', pillar: 'SUPPORT', title: 'Pathways to Help', description: 'Safety and escalation protocols are clear to everyone.', order: 1 },
  { id: 'care-1', pillar: 'CARE', title: 'Workplace Wellbeing', description: 'Staff mental health is treated with the same priority as members.', order: 1 },
  { id: 'conn-1', pillar: 'CONNECT', title: 'Belonging', description: 'Proactive efforts are made to integrate new members and support isolatedones.', order: 1 },
];

export const STANDARDS: Standard[] = [
  // LEAD
  { 
    id: 1, number: '1.1', pillar: 'LEAD', principleId: 'lead-1', level: 'Essential', subcategory: 'Leadership & Governance', 
    statement: 'Board or Committee has formally approved the mental health programme and the decision is documented.',
    indicators: ['Minutes show formal approval.', 'Programme is mentioned in AGM notes.'],
    actionIdeas: ['Add mental health to the next committee agenda.', 'Draft a 1-page proposal.']
  },
  { 
    id: 2, number: '1.2', pillar: 'LEAD', principleId: 'lead-1', level: 'Essential', subcategory: 'Leadership & Governance', 
    statement: 'A senior Board or Committee member is named as oversight contact and actively supports the Lead.',
    indicators: ['Named contact exists.', 'Lead has regular check-ins with them.'],
    actionIdeas: ['Identify a sponsor on the board.', 'Set a recurring monthly check-in.']
  },
  { 
    id: 3, number: '1.3', pillar: 'LEAD', principleId: 'lead-1', level: 'Essential', subcategory: 'Leadership & Governance', 
    statement: 'A Mental Health Lead is appointed and their name and contact details are visible to members.',
    indicators: ['Lead is appointed.', 'Contact details are on the noticeboard or website.'],
    actionIdeas: ['Create a generic email address for the lead.', 'Put up a poster with their photo.']
  },
  { 
    id: 4, number: '1.4', pillar: 'LEAD', principleId: 'lead-1', level: 'Essential', subcategory: 'Leadership & Governance', 
    statement: 'Lead has a clear reporting route to the oversight contact.',
    indicators: ['Reporting mechanism is defined.', 'Reports occur at least quarterly.'],
    actionIdeas: ['Define a simple 3-point report template.', 'Agree on escalation paths.']
  },
  { 
    id: 5, number: '1.5', pillar: 'LEAD', principleId: 'lead-1', level: 'Bronze', subcategory: 'Leadership & Governance', 
    statement: 'A senior leader has publicly endorsed the programme through statement that reaches the membership.',
    indicators: ['Captain or Manager has written about it in a newsletter.'],
    actionIdeas: ['Draft a paragraph for the Captain\'s next email.']
  },
  { 
    id: 6, number: '2.1', pillar: 'LEAD', principleId: 'lead-2', level: 'Bronze', subcategory: 'Resourcing', 
    statement: 'An annual budget for mental health work has been agreed and the Lead knows how to access it.',
    indicators: ['Line item exists in club accounts.', 'Lead knows the amount.'],
    actionIdeas: ['Propose a £500 initial budget for resources.']
  },
  { 
    id: 7, number: '2.2', pillar: 'LEAD', principleId: 'lead-2', level: 'Essential', subcategory: 'Resourcing', 
    statement: 'The Lead has access to Florio toolkit resources and key templates.',
    indicators: ['Lead has a login.', 'Lead has downloaded key templates.'],
    actionIdeas: ['Complete the onboarding module.']
  },
  { 
    id: 8, number: '2.3', pillar: 'LEAD', principleId: 'lead-2', level: 'Bronze', subcategory: 'Resourcing', 
    statement: 'Core programme documentation is accessible including role summary, key contacts, and governance position.',
    indicators: ['Folder of documents exists.', 'Easily accessible by committee.'],
    actionIdeas: ['Create a shared drive folder.']
  },
  { 
    id: 9, number: '1.6', pillar: 'LEAD', principleId: 'lead-1', level: 'Silver', subcategory: 'Leadership & Governance', 
    statement: 'Mental health appears on a senior leadership agenda at least twice annually.',
    indicators: ['Agendas show mental health as an item.'],
    actionIdeas: ['Schedule specific review dates for June and December.']
  },

  // COMMUNICATE
  { 
    id: 20, number: '3.1', pillar: 'COMMUNICATE', principleId: 'comm-1', level: 'Essential', subcategory: 'Visibility', 
    statement: 'Mental health resources are displayed in at least two visible club locations.',
    indicators: ['Posters are up in locker rooms.', 'Flyers are in the pro shop.'],
    actionIdeas: ['Print the Florio starter pack posters.']
  },
  { 
    id: 21, number: '3.2', pillar: 'COMMUNICATE', principleId: 'comm-1', level: 'Essential', subcategory: 'Visibility', 
    statement: 'The club\'s partnership with Florio has been announced to members.',
    indicators: ['Email sent to all members.', 'Mentioned in the club newsletter.'],
    actionIdeas: ['Use the Florio press release template.']
  },
  { 
    id: 22, number: '3.3', pillar: 'COMMUNICATE', principleId: 'comm-1', level: 'Bronze', subcategory: 'Visibility', 
    statement: 'The club has shared at least one message that directly challenges mental health stigma or normalises help-seeking.',
    indicators: ['A specific anti-stigma message was sent.'],
    actionIdeas: ['Share a story or case study.']
  },

  // SUPPORT
  { 
    id: 32, number: '4.1', pillar: 'SUPPORT', principleId: 'supp-1', level: 'Essential', subcategory: 'Pathways', 
    statement: 'The club has documented support pathways showing routes for early support, external signposting, and urgent escalation.',
    indicators: ['A flow chart exists.', 'Staff know where it is.'],
    actionIdeas: ['Download and adapt the Florio pathway template.']
  },
  { 
    id: 34, number: '4.2', pillar: 'SUPPORT', principleId: 'supp-1', level: 'Essential', subcategory: 'Pathways', 
    statement: 'The Lead has completed training covering role boundaries, signposting, and warning signs.',
    indicators: ['Training certificate is on file.'],
    actionIdeas: ['Book the next available online session.']
  },

  // CARE
  { 
    id: 45, number: '5.1', pillar: 'CARE', principleId: 'care-1', level: 'Essential', subcategory: 'Staff', 
    statement: 'Staff know how to access mental health support information and resources.',
    indicators: ['Noticeboard in staff break room has information.'],
    actionIdeas: ['Run a 10-minute briefing for staff.']
  },
  // CONNECT
  { 
    id: 54, number: '6.1', pillar: 'CONNECT', principleId: 'conn-1', level: 'Essential', subcategory: 'Integration', 
    statement: 'New members receive welcome information that helps them connect socially.',
    indicators: ['Welcome pack includes social events list.'],
    actionIdeas: ['Update the new member welcome letter.']
  },
];
