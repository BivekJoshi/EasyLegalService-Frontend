/* ============================================================
   Team data + photo resolver
   ============================================================
   Drop photos into src/assets/team/ or src/assets/Teams/ —
   they'll be picked up by filename (case-insensitive).
   ============================================================ */

const photoModules = {
  ...import.meta.glob('../assets/team/*.{jpg,jpeg,png,webp,gif,JPG,JPEG,PNG,WEBP}', { eager: true }),
  ...import.meta.glob('../assets/Teams/*.{jpg,jpeg,png,webp,gif,JPG,JPEG,PNG,WEBP}', { eager: true }),
}
const photoByName = Object.fromEntries(
  Object.entries(photoModules).map(([path, mod]) => [
    path.split('/').pop().toLowerCase(),
    mod.default ?? mod,
  ])
)
export function resolveTeamPhoto(photo) {
  if (!photo) return null
  const basename = photo.split('/').pop().toLowerCase()
  return photoByName[basename] ?? null
}

export const TEAM = [
  {
    slug: 'alina-maharjan',
    initials: 'AM',
    name: 'Adv. Alina Maharjan',
    firstName: 'Alina',
    photo: '../../assets/team/alina.jpeg',
    role: 'Founding Partner',
    bio: 'Corporate, M&A and FDI advisor for 18+ years. Former counsel to two listed companies.',
    longBio: [
      'Alina is the founding partner of Easy Legal Service, leading the corporate and foreign-investment practice for over 18 years. Her work spans complex M&A, joint ventures and cross-border structuring for institutional investors entering Nepal.',
      'Before founding the firm in 2010, Alina served as in-house counsel for two listed Nepali companies and worked at a Magic Circle firm in London. She holds an LLM from NYU School of Law and an LLB from Tribhuvan University.',
      'Alina is known for direct, plain-language advice and for the discipline she brings to deal execution. She has closed 60+ investment transactions across financial services, manufacturing and technology, and represents both Nepali sponsors and inbound strategic investors.',
    ],
    tags: ['Corporate', 'M&A', 'FDI'],
    practiceAreas: [
      'Corporate & Commercial',
      'Mergers & Acquisitions',
      'Foreign Investment',
      'Joint Ventures',
      'Corporate Governance',
    ],
    years: 18,
    barCouncil: 'NBA #2847',
    languages: ['English', 'Nepali', 'Hindi'],
    education: [
      { degree: 'LLM', school: 'New York University School of Law', year: '2008' },
      { degree: 'LLB', school: 'Tribhuvan University', year: '2005' },
    ],
    matters: [
      { title: 'Cross-border M&A — manufacturing', year: '2024', description: 'Lead counsel on a $50M acquisition by a Singapore strategic of a Nepali industrial group.' },
      { title: 'Series A — fintech', year: '2024', description: 'Closed $5M Series A including share-purchase, NRB approval and amended articles in 6 weeks.' },
      { title: 'JV structuring — energy', year: '2023', description: 'Advised on a JV between a Nepali sponsor and an Indian utility for a 50MW hydro project.' },
    ],
    awards: ['Chambers Asia-Pacific 2024 — Ranked', 'Asialaw Profiles 2023 — Notable Practitioner'],
    email: 'alina@easylegal.np',
    linkedin: '#',
    quote: 'Good lawyering is about removing surprises — not impressing with arguments.',
    featured: true,
  },
  {
    slug: 'priya-bhattarai',
    initials: 'PB',
    name: 'Adv. Priya Bhattarai',
    firstName: 'Priya',
    photo: '../../assets/team/priya.jpeg',
    role: 'Partner — Disputes',
    bio: 'Supreme Court advocate; lead counsel on commercial arbitration and constitutional writs.',
    longBio: [
      'Priya leads the disputes practice at Easy Legal Service, with full rights of audience before the Supreme Court of Nepal and accreditation as an arbitrator with NEPCA and the ICA.',
      'She has appeared in over 80 reported judgments across commercial litigation, constitutional writs and white-collar enforcement, and represents both Nepali enterprises and foreign claimants in cross-border arbitration.',
      'Priya is a frequent speaker on arbitral practice in South Asia and has lectured at Kathmandu School of Law.',
    ],
    tags: ['Litigation', 'Arbitration'],
    practiceAreas: [
      'Commercial Litigation',
      'Domestic & International Arbitration',
      'Constitutional Writs',
      'White-collar Enforcement',
      'Mediation',
    ],
    years: 14,
    barCouncil: 'NBA #3192',
    languages: ['English', 'Nepali'],
    education: [
      { degree: 'LLM (Dispute Resolution)', school: 'National University of Singapore', year: '2014' },
      { degree: 'LLB', school: 'Kathmandu School of Law', year: '2010' },
    ],
    matters: [
      { title: 'NEPCA arbitration — infrastructure', year: '2024', description: 'Lead counsel on a $12M EPC dispute against a state-owned utility; favourable award secured.' },
      { title: 'Constitutional writ — telecom regulation', year: '2023', description: 'Successfully challenged a regulatory order affecting market entry; cited in three subsequent matters.' },
      { title: 'Cross-border arbitration — SIAC', year: '2022', description: 'Defended a Nepali manufacturer against a Singapore-seated SIAC claim by an overseas supplier.' },
    ],
    awards: ['Chambers Asia-Pacific 2024 — Recognised', 'Legal 500 2023 — Disputes'],
    email: 'priya@easylegal.np',
    linkedin: '#',
    quote: 'Win the matter in the brief, not in the courtroom.',
  },
  {
    slug: 'rohan-thapa',
    initials: 'RT',
    name: 'Adv. Rohan Thapa',
    firstName: 'Rohan',
    photo: '../../assets/team/rohan.jpeg',
    role: 'Partner — Tax',
    bio: 'Former IRD officer; advises on cross-border tax structuring and IRD representation.',
    longBio: [
      'Rohan heads the tax practice and brings 12+ years of advisory and dispute experience. He spent six years at the Inland Revenue Department before joining the firm, including a senior assessment role.',
      'His work covers income-tax planning, VAT, withholding and transfer pricing, with a particular focus on cross-border structuring for inbound investors and outbound Nepali groups.',
      'Rohan has represented clients in over 40 IRD assessment proceedings and Revenue Tribunal matters, with a 90%+ favourable outcome rate.',
    ],
    tags: ['Tax', 'Customs'],
    practiceAreas: [
      'Income Tax Planning',
      'VAT & Withholding',
      'Transfer Pricing',
      'Customs & Duty',
      'IRD Representation',
    ],
    years: 12,
    barCouncil: 'NBA #3508',
    languages: ['English', 'Nepali'],
    education: [
      { degree: 'LLM (Taxation)', school: 'London School of Economics', year: '2015' },
      { degree: 'LLB', school: 'Nepal Law Campus, Tribhuvan University', year: '2011' },
    ],
    matters: [
      { title: 'Transfer pricing review — pharma', year: '2024', description: 'Designed an arm\'s-length pricing model for a multi-jurisdiction pharma group with Nepali presence.' },
      { title: 'Revenue Tribunal — VAT appeal', year: '2024', description: 'Won a NPR 80M VAT assessment appeal at the Revenue Tribunal.' },
      { title: 'Inbound restructuring — SaaS', year: '2023', description: 'Advised a US SaaS company on Nepal entry, withholding obligations and PE risk.' },
    ],
    awards: ['Asialaw Profiles 2024 — Tax'],
    email: 'rohan@easylegal.np',
    linkedin: '#',
    quote: 'Tax is design — the structure you build matters more than the form you file.',
  },
  {
    slug: 'sneha-kc',
    initials: 'SK',
    name: 'Adv. Sneha KC',
    firstName: 'Sneha',
    photo: '../../assets/team/sneha.jpeg',
    role: 'Senior Associate — IP',
    bio: 'Trademark, copyright and tech-transfer specialist with a portfolio of 400+ registrations.',
    longBio: [
      'Sneha leads our intellectual-property desk, advising on trademark prosecution, copyright protection and tech-transfer agreements for clients in consumer brands, software and media.',
      'She has filed 400+ trademark applications across Nepal, India and the Madrid system, with extensive experience in opposition, enforcement and customs recordal.',
      'Sneha holds a WIPO fellowship and lectures on IP strategy for early-stage founders.',
    ],
    tags: ['IP', 'Tech'],
    practiceAreas: [
      'Trademark Filing & Prosecution',
      'Copyright',
      'Patent Filing',
      'Tech-Transfer Agreements',
      'Brand Enforcement',
    ],
    years: 9,
    barCouncil: 'NBA #4127',
    languages: ['English', 'Nepali'],
    education: [
      { degree: 'WIPO Fellowship', school: 'World Intellectual Property Organization', year: '2018' },
      { degree: 'LLB', school: 'Kathmandu School of Law', year: '2015' },
    ],
    matters: [
      { title: 'Madrid Protocol filing — apparel', year: '2024', description: 'Filed trademark protection across 14 jurisdictions for a Nepali apparel brand going global.' },
      { title: 'Copyright enforcement — media', year: '2023', description: 'Secured takedown and damages settlement against three pirate streaming services.' },
      { title: 'Tech-transfer — SaaS', year: '2023', description: 'Drafted IP-assignment and licensing terms for a $2M technology transfer to a Singapore HoldCo.' },
    ],
    awards: ['Asialaw Profiles 2024 — Rising Star'],
    email: 'sneha@easylegal.np',
    linkedin: '#',
    quote: 'Register early. The hardest IP problems are the ones you should have prevented two years ago.',
  },
]

export const TEAM_META = [
  { num: '12', label: 'Advocates' },
  { num: '04', label: 'Partners' },
  { num: '03', label: 'Generations of practice' },
]

export function findMemberBySlug(slug) {
  return TEAM.find((m) => m.slug === slug) ?? null
}
