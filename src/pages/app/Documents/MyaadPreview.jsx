/* Nepali Form No. 1 — "अड्डाको रोहवरमा म्याद बुझिपाऊँ"
 * (Memorandum confirming time-period receipt before the court.)
 * User form values fill the blanks; empty fields show "______".
 */
import './MyaadPreview.css'

const blank = (v, width = 16) => v && String(v).trim() ? v : '_'.repeat(width)

export default function MyaadPreview({ form }) {
  const f = form
  return (
    <article className="myaad" lang="ne">
      <div className="myaad__no">फाराम नं. १</div>

      <header className="myaad__head">
        <h2>श्री {blank(f.court, 22)} अदालत</h2>
        <div className="myaad__bench">{blank(f.bench, 16)} इजलास</div>
      </header>

      <div className="myaad__subject">
        <span>विषय:</span>
        <u>{blank(f.subjectNe || f.consideration, 36)}</u>
      </div>

      <div className="myaad__parties">
        {/* Defendant column */}
        <div className="myaad__party">
          <div className="myaad__caseno">
            प्रतिवादी म.वा. नं.- <u>{blank(f.defendantCaseNo, 8)}</u>
          </div>
          <p>
            {blank(f.defendantAddress, 10)} वडा नं. <u>{blank(f.defendantWard, 3)}</u> /
            {' '}<u>{blank(f.defendantMunicipality, 10)}</u> नगर /
            {' '}<u>{blank(f.defendantDistrict, 8)}</u> जि.वि.स.
          </p>
          <p>
            बस्ने उमेर <u>{blank(f.defendantAge, 3)}</u> वर्ष
          </p>
          <p>
            <strong>{blank(f.party1 || f.defendantName, 24)}</strong>
          </p>
          <small className="myaad__role">प्रतिवादी</small>
        </div>

        <div className="myaad__vs">बादी विरूद्ध</div>

        {/* Plaintiff column */}
        <div className="myaad__party">
          <div className="myaad__caseno">
            बादी म.वा.- <u>{blank(f.plaintiffCaseNo, 8)}</u>
          </div>
          <p>
            {blank(f.plaintiffAddress, 10)} वडा नं. <u>{blank(f.plaintiffWard, 3)}</u> /
            {' '}<u>{blank(f.plaintiffMunicipality, 10)}</u> नगर /
            {' '}<u>{blank(f.plaintiffDistrict, 8)}</u> जि.वि.स.
          </p>
          <p>
            बस्ने उमेर <u>{blank(f.plaintiffAge, 3)}</u> वर्ष
          </p>
          <p>
            <strong>{blank(f.party2 || f.plaintiffName, 24)}</strong>
          </p>
          <small className="myaad__role">बादी</small>
        </div>
      </div>

      <p className="myaad__received">
        मिति बुझेको— <u>{blank(f.receivedDate || f.effective, 14)}</u>
      </p>

      <ol className="myaad__body">
        <li>
          प्रस्तुत मुद्दामा बादी / प्रतिवादी{' '}
          <u>{blank(f.party2 || f.party1, 16)}</u>{' '}
          ले मलाई / हामीलाई दिएको अदालतको{' '}
          <u>{blank(f.summonsDate, 10)}</u>{' '}
          मितिको म्याद आजको मितिसम्ममा{' '}
          <u>{blank(f.totalDays, 3)}</u> दिन /{' '}
          <u>{blank(f.totalWeeks, 3)}</u> हप्ता /{' '}
          <u>{blank(f.totalMonths, 3)}</u> महिना भएको हुनाले उक्त म्याद बुझिपाएको ठहर्‍याई पाउँ भनी निवेदन गरेको छु।
        </li>
        <li>यस्तो म्याद बुझेको कुरा यस अदालतको दर्तामा जनाई पाउँ भन्ने निवेदन गर्दछु।</li>
      </ol>

      <div className="myaad__sig">
        <div>
          <strong>प्रतिवादी</strong>
          <span className="myaad__sig-line">{blank(f.signature, 22)}</span>
          <small>
            इति सम्वत् <u>{blank(f.iti, 14)}</u>
          </small>
        </div>
      </div>

      <footer className="myaad__notes">
        <strong>द्रष्टव्य:</strong>
        <span>(१) यो निवेदन फाराम अदालतमा बुझाएको म्याद रोहवरमा बुझि पाएको दिन अदालतको कार्यालयमा बुझाउनुपर्छ।</span>
        <span>(२) म्याद बुझेको मितिसम्म आउनु अनिवार्य छ।</span>
      </footer>
    </article>
  )
}
