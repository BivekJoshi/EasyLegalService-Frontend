/* Single source of truth for the demo records used across the
 * workspace pages AND the command palette. Each page still owns
 * its own local mutable copy via useState. */

export const CLIENT_SEED = [
  { id: 'CL-2401', name: 'Aakash Trading Pvt. Ltd.', type: 'Corporate',  email: 'legal@aakash.com.np',   phone: '+977 9801-110011', cases: 4, since: '12 Apr 2025' },
  { id: 'CL-2400', name: 'Sita Karki',                type: 'Individual', email: 'sita.karki@gmail.com', phone: '+977 9841-220022', cases: 1, since: '08 Apr 2025' },
  { id: 'CL-2399', name: 'Himalaya Hydropower',       type: 'Corporate',  email: 'counsel@hhpower.com',  phone: '+977 9803-330033', cases: 2, since: '02 Apr 2025' },
  { id: 'CL-2398', name: 'Bishnu Maharjan',           type: 'Individual', email: 'b.maharjan@yahoo.com', phone: '+977 9842-440044', cases: 1, since: '28 Mar 2025' },
  { id: 'CL-2397', name: 'Nepal Foods Co.',           type: 'Corporate',  email: 'office@nepalfoods.np', phone: '+977 9851-550055', cases: 3, since: '19 Mar 2025' },
  { id: 'CL-2396', name: 'Rita Pradhan',              type: 'Individual', email: 'rita.p@outlook.com',   phone: '+977 9802-660066', cases: 1, since: '11 Mar 2025' },
]

export const CASE_SEED = [
  { id: '2080-021', title: 'Aakash Trading vs. Customs Office', client: 'Aakash Trading Pvt. Ltd.', area: 'Tax & Customs',    status: 'Active',  filed: '12 Apr 2025', lead: 'R. Shrestha' },
  { id: '2080-019', title: 'Karki — Property partition',         client: 'Sita Karki',                area: 'Property',         status: 'Pending', filed: '08 Apr 2025', lead: 'A. Pandey'   },
  { id: '2080-016', title: 'Hydropower licence renewal',         client: 'Himalaya Hydropower',       area: 'Corporate / Reg.', status: 'Draft',   filed: '02 Apr 2025', lead: 'M. Adhikari' },
  { id: '2080-014', title: 'Maharjan v. Maharjan',               client: 'Bishnu Maharjan',           area: 'Family',           status: 'Active',  filed: '28 Mar 2025', lead: 'A. Pandey'   },
  { id: '2080-011', title: 'Nepal Foods — labour dispute',       client: 'Nepal Foods Co.',           area: 'Employment',       status: 'Closed',  filed: '04 Feb 2025', lead: 'R. Shrestha' },
  { id: '2080-009', title: 'Pradhan — contract review',          client: 'Rita Pradhan',              area: 'Contracts',        status: 'Active',  filed: '22 Jan 2025', lead: 'M. Adhikari' },
]

export const DOCUMENT_SEED = [
  { id: 'DOC-2418', title: 'Engagement Letter — Aakash Trading',  template: 'Engagement Letter', client: 'Aakash Trading Pvt. Ltd.', author: 'R. Shrestha', generated: '14 Apr 2025 · 10:42', status: 'Signed'   },
  { id: 'DOC-2417', title: 'Mutual NDA — Himalaya Hydropower',     template: 'NDA',               client: 'Himalaya Hydropower',     author: 'A. Pandey',    generated: '12 Apr 2025 · 16:18', status: 'Sent'     },
  { id: 'DOC-2416', title: 'Affidavit — Sita Karki property',      template: 'Affidavit',         client: 'Sita Karki',              author: 'A. Pandey',    generated: '08 Apr 2025 · 09:05', status: 'Draft'    },
  { id: 'DOC-2415', title: 'Legal Notice — Nepal Foods labour',    template: 'Legal Notice',      client: 'Nepal Foods Co.',         author: 'R. Shrestha', generated: '02 Apr 2025 · 13:30', status: 'Signed'   },
  { id: 'DOC-2414', title: 'Power of Attorney — Maharjan',         template: 'Power of Attorney', client: 'Bishnu Maharjan',         author: 'M. Adhikari', generated: '28 Mar 2025 · 11:11', status: 'Archived' },
]
