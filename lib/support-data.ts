export type Helpline = {
  name: string
  number: string
  detail: string
  hours: string
  tag: 'emergency' | 'women' | 'mind' | 'child' | 'legal'
}

/** Government and nationally recognised helplines available across India. */
export const helplines: Helpline[] = [
  {
    name: 'National Emergency Response',
    number: '112',
    detail: 'Police, fire and ambulance on a single number. Works even with no balance.',
    hours: '24x7',
    tag: 'emergency',
  },
  {
    name: 'Women Helpline (All India)',
    number: '1091',
    detail: 'Immediate police assistance for women in distress, harassment or stalking.',
    hours: '24x7',
    tag: 'women',
  },
  {
    name: 'Women in Distress — 181',
    number: '181',
    detail: 'Counselling, shelter, medical aid and legal referral for domestic violence.',
    hours: '24x7',
    tag: 'women',
  },
  {
    name: 'Tele-MANAS',
    number: '14416',
    detail: 'Government mental health support. Free counselling in 20+ Indian languages.',
    hours: '24x7',
    tag: 'mind',
  },
  {
    name: 'KIRAN Mental Health',
    number: '1800-599-0019',
    detail: 'Toll-free support for anxiety, depression, panic and suicidal thoughts.',
    hours: '24x7',
    tag: 'mind',
  },
  {
    name: 'CHILDLINE',
    number: '1098',
    detail: 'For anyone under 18 facing abuse, child marriage or trafficking.',
    hours: '24x7',
    tag: 'child',
  },
  {
    name: 'NALSA Legal Aid',
    number: '15100',
    detail: 'Free legal advice and representation, including FIR and maintenance help.',
    hours: 'Mon-Sat, 10am-6pm',
    tag: 'legal',
  },
  {
    name: 'Cyber Crime Reporting',
    number: '1930',
    detail: 'Online harassment, morphed images, blackmail and financial fraud.',
    hours: '24x7',
    tag: 'emergency',
  },
]

export const tagLabels: Record<Helpline['tag'], string> = {
  emergency: 'Emergency',
  women: 'Women',
  mind: 'Mental health',
  child: 'Under 18',
  legal: 'Legal aid',
}

export type EssentialItem = {
  id: string
  name: string
  description: string
  unit: string
}

export const essentialItems: EssentialItem[] = [
  {
    id: 'pads',
    name: 'Sanitary pads',
    description: 'Regular and overnight flow, ultra-thin cotton top sheet.',
    unit: 'pack of 10',
  },
  {
    id: 'cups-tampons',
    name: 'Menstrual cup or tampons',
    description: 'Reusable medical-grade silicone cup, or a starter tampon box.',
    unit: '1 kit',
  },
  {
    id: 'innerwear',
    name: 'Innerwear',
    description: 'New, sealed cotton bras and briefs. Share your size at checkout.',
    unit: 'set of 2',
  },
  {
    id: 'period-pants',
    name: 'Period pants',
    description: 'Leak-proof reusable underwear, good for heavy days and travel.',
    unit: '2 pairs',
  },
  {
    id: 'hygiene',
    name: 'Hygiene kit',
    description: 'Intimate wash, disposal bags, wipes and paracetamol for cramps.',
    unit: '1 kit',
  },
  {
    id: 'maternity',
    name: 'Maternity pads & essentials',
    description: 'Post-partum pads, nursing pads and a soft maternity brief.',
    unit: '1 kit',
  },
]

export type TherapyTrack = {
  title: string
  who: string
  format: string
  cost: string
  points: string[]
}

export const therapyTracks: TherapyTrack[] = [
  {
    title: 'Free listening circle',
    who: 'If you mainly need to be heard without advice or judgement.',
    format: '45 min voice call with a trained peer volunteer',
    cost: 'Always free',
    points: [
      'No diagnosis, no paperwork, no name required',
      'Same volunteer each week if you want continuity',
      'Available in Hindi, English, Tamil, Telugu, Bengali, Marathi',
    ],
  },
  {
    title: 'Licensed therapy, sliding scale',
    who: 'For depression, anxiety, panic attacks, grief or burnout.',
    format: 'Weekly 50 min video or audio session with an RCI-registered therapist',
    cost: 'Pay what you can, ₹0-₹800',
    points: [
      'Structured CBT and trauma-informed care',
      'Therapist matched to your language and lived experience',
      'Written safety plan you keep, in case a bad night comes',
    ],
  },
  {
    title: 'Crisis follow-through',
    who: 'If you have had thoughts of ending your life, or you are unsafe at home.',
    format: 'Same-day call back, then daily check-ins for two weeks',
    cost: 'Free, funded by donors',
    points: [
      'Direct escalation to Tele-MANAS and local emergency services',
      'Help arranging a shelter bed or a safe relative to stay with',
      'One advocate stays with your case start to finish',
    ],
  },
]
