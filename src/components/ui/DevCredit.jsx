import './DevCredit.css'
import bivek from "../../assets/bivek.svg";

export default function DevCredit() {
  return (
    <a
      className="dev-credit"
      href="https://www.bivekjoshi03.com.np"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Designed and built by Bivek Prasad Joshi — opens in a new tab"
    >
      <span className="dev-credit__mark" aria-hidden>
        <img src={bivek} alt="" className="dev-credit__logo" />
      </span>
      <span className="dev-credit__text">
        <span className="dev-credit__cap">Designed &amp; built by</span>
        <span className="dev-credit__name">Bivek&nbsp;P.&nbsp;Joshi</span>
      </span>
      <svg
        className="dev-credit__arrow"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M7 17 17 7" />
        <path d="M8 7h9v9" />
      </svg>
    </a>
  )
}
