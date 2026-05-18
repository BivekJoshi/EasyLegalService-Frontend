/* ============================================================
   Templates catalogue + helpers used across the Documents page.
   ----
   Each template declares its OWN field schema. The form renders
   only the fields the selected template needs — so switching from
   an NDA to a court form completely swaps the form layout.
   ----
   Field schema:
     { key, label, section, type?, icon?, placeholder?, span?, optional? }
       - type:   'text' (default) | 'date' | 'textarea'
       - span:   'half' (default) | 'full'
       - section: groups fields under a sub-header (preserves order)
   ============================================================ */
import MyaadPreview from './MyaadPreview'

/* Default field set used by the standard contract-style templates. */
const COMMON_FIELDS = [
  { key: 'matterClient',  label: 'Client / Matter',                  icon: 'briefcase', placeholder: 'Search or pick a matter', span: 'full', section: 'Reference' },

  { key: 'party1',        label: 'Party A',                          icon: 'user',      placeholder: 'First Party name',  span: 'half', section: 'Parties' },
  { key: 'party2',        label: 'Party B',                          icon: 'user',      placeholder: 'Second Party name', span: 'half', section: 'Parties' },

  { key: 'effective',     label: 'Effective date', type: 'date',     icon: 'clock',                                       span: 'half', section: 'Details' },
  { key: 'jurisdiction',  label: 'Jurisdiction',                     icon: 'pin',       placeholder: 'Kathmandu, Nepal',  span: 'half', section: 'Details' },
  { key: 'consideration', label: 'Consideration / Subject matter',
                          type: 'textarea',                          icon: 'receipt',
                          placeholder: 'Fee, asset, scope of work, or subject of the document…',
                          span: 'full', section: 'Details', optional: true },
]

/* Nepali Form No. 1 — court time-extension memorandum. */
const MYAAD_FIELDS = [
  { key: 'matterClient',          label: 'Client / Matter',          icon: 'briefcase', placeholder: 'Search or pick a matter', span: 'full', section: 'Reference' },

  { key: 'court',                 label: 'Court name',               icon: 'building',  placeholder: 'काठमाडौँ जिल्ला अदालत', span: 'half', section: 'Court' },
  { key: 'bench',                 label: 'Bench',                    icon: 'scales',    placeholder: 'फुलकोर्ट',           span: 'half', section: 'Court' },
  { key: 'subjectNe',             label: 'विषय (Subject)',           icon: 'chat',      placeholder: 'जग्गा सम्बन्धी',        span: 'full', section: 'Court' },

  { key: 'defendantCaseNo',       label: 'Case no.',                 placeholder: '०२३',                    span: 'half', section: 'Defendant (प्रतिवादी)' },
  { key: 'defendantAddress',      label: 'Address / Tole',           icon: 'pin', placeholder: 'टोल',         span: 'half', section: 'Defendant (प्रतिवादी)' },
  { key: 'defendantWard',         label: 'Ward',                     placeholder: '५',                       span: 'half', section: 'Defendant (प्रतिवादी)' },
  { key: 'defendantMunicipality', label: 'Municipality',             placeholder: 'काठमाडौँ महानगर',          span: 'half', section: 'Defendant (प्रतिवादी)' },
  { key: 'defendantDistrict',     label: 'District',                 placeholder: 'काठमाडौँ',                span: 'half', section: 'Defendant (प्रतिवादी)' },
  { key: 'defendantAge',          label: 'Age',                      placeholder: '३२',                      span: 'half', section: 'Defendant (प्रतिवादी)' },
  { key: 'party1',                label: 'Defendant name',           icon: 'user', placeholder: 'नाम',         span: 'full', section: 'Defendant (प्रतिवादी)' },

  { key: 'plaintiffCaseNo',       label: 'Case no.',                 placeholder: '०१४',                     span: 'half', section: 'Plaintiff (बादी)' },
  { key: 'plaintiffAddress',      label: 'Address / Tole',           icon: 'pin', placeholder: 'टोल',         span: 'half', section: 'Plaintiff (बादी)' },
  { key: 'plaintiffWard',         label: 'Ward',                     placeholder: '७',                       span: 'half', section: 'Plaintiff (बादी)' },
  { key: 'plaintiffMunicipality', label: 'Municipality',             placeholder: 'ललितपुर महानगर',          span: 'half', section: 'Plaintiff (बादी)' },
  { key: 'plaintiffDistrict',     label: 'District',                 placeholder: 'ललितपुर',                 span: 'half', section: 'Plaintiff (बादी)' },
  { key: 'plaintiffAge',          label: 'Age',                      placeholder: '४५',                      span: 'half', section: 'Plaintiff (बादी)' },
  { key: 'party2',                label: 'Plaintiff name',           icon: 'user', placeholder: 'नाम',         span: 'full', section: 'Plaintiff (बादी)' },

  { key: 'receivedDate',          label: 'Date received (मिति)',     icon: 'clock', placeholder: '२०८२/०२/१५', span: 'half', section: 'Filing' },
  { key: 'summonsDate',           label: 'Summons date',             icon: 'clock', placeholder: '२०८२/०१/२०', span: 'half', section: 'Filing' },
  { key: 'totalDays',             label: 'Days elapsed',             placeholder: '१५',                      span: 'half', section: 'Filing' },
  { key: 'totalWeeks',            label: 'Weeks',                    placeholder: '२',                       span: 'half', section: 'Filing' },
  { key: 'totalMonths',           label: 'Months',                   placeholder: '०',                       span: 'half', section: 'Filing' },
  { key: 'iti',                   label: 'Iti sambat',               placeholder: '२०८२/०२/१६',              span: 'half', section: 'Filing' },
  { key: 'signature',             label: 'Signatory',                icon: 'user',  placeholder: 'Signatory name', span: 'full', section: 'Filing' },
]

export const TEMPLATES = [
  { id: 'engagement', icon: 'handshake', name: 'Engagement Letter',   desc: 'Scope, fees, retainer terms.',         fields: COMMON_FIELDS },
  { id: 'nda',        icon: 'shield',    name: 'Non-Disclosure (NDA)', desc: 'Mutual or one-way confidentiality.',  fields: COMMON_FIELDS },
  { id: 'affidavit',  icon: 'scales',    name: 'Affidavit',            desc: 'Sworn statement template.',            fields: COMMON_FIELDS },
  { id: 'power',      icon: 'gavel',     name: 'Power of Attorney',    desc: 'General or special POA.',              fields: COMMON_FIELDS },
  { id: 'notice',     icon: 'chat',      name: 'Legal Notice',         desc: 'Demand or cease-and-desist.',          fields: COMMON_FIELDS },
  { id: 'lease',      icon: 'building',  name: 'Lease Agreement',      desc: 'Commercial or residential.',           fields: COMMON_FIELDS },

  /* Nepali court form */
  {
    id: 'myaad',
    icon: 'gavel',
    name: 'म्याद बुझिपाऊँ · Form No. 1',
    desc: 'Court time-period receipt memorandum (Nepali).',
    Preview: MyaadPreview,
    fields: MYAAD_FIELDS,
  },
]

export const STATUS_FILTERS = ['All', 'Draft', 'Sent', 'Signed', 'Archived']

export const EMPTY_FORM = {
  template: '',
}

export const badgeClass = (status) =>
  status === 'Signed'   ? 'badge--active'  :
  status === 'Sent'     ? 'badge--pending' :
  status === 'Archived' ? 'badge--closed'  :
                          'badge--draft'

/* Groups fields by section while preserving first-occurrence order. */
export function groupFieldsBySection(fields = []) {
  const sections = []
  const index = new Map()
  for (const field of fields) {
    const section = field.section ?? 'Details'
    if (!index.has(section)) {
      const bucket = { name: section, fields: [] }
      index.set(section, bucket)
      sections.push(bucket)
    }
    index.get(section).fields.push(field)
  }
  return sections
}
