/* Templates catalogue + helpers used across the Documents page. */

export const TEMPLATES = [
  { id: 'engagement',  icon: 'handshake', name: 'Engagement Letter',   desc: 'Scope, fees, retainer terms.' },
  { id: 'nda',         icon: 'shield',    name: 'Non-Disclosure (NDA)', desc: 'Mutual or one-way confidentiality.' },
  { id: 'affidavit',   icon: 'scales',    name: 'Affidavit',           desc: 'Sworn statement template.' },
  { id: 'power',       icon: 'gavel',     name: 'Power of Attorney',   desc: 'General or special POA.' },
  { id: 'notice',      icon: 'chat',      name: 'Legal Notice',        desc: 'Demand or cease-and-desist.' },
  { id: 'lease',       icon: 'building',  name: 'Lease Agreement',     desc: 'Commercial or residential.' },
]

export const STATUS_FILTERS = ['All', 'Draft', 'Sent', 'Signed', 'Archived']

export const EMPTY_FORM = {
  template: '',
  matterClient: '',
  party1: '',
  party2: '',
  effective: new Date().toISOString().slice(0, 10),
  consideration: '',
  jurisdiction: 'Kathmandu, Nepal',
}

export const badgeClass = (status) =>
  status === 'Signed'   ? 'badge--active'  :
  status === 'Sent'     ? 'badge--pending' :
  status === 'Archived' ? 'badge--closed'  :
                          'badge--draft'
