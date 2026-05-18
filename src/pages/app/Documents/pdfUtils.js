import html2pdf from 'html2pdf.js'

/* During capture we add `data-pdf-capture` to <body>. CSS rules
 * keyed off that attribute force a print-friendly palette so the
 * generated PDF doesn't carry dark-theme colours. */
async function withCaptureMode(fn) {
  document.body.setAttribute('data-pdf-capture', '')
  try {
    return await fn()
  } finally {
    document.body.removeAttribute('data-pdf-capture')
  }
}

function pdfOptions(filename) {
  return {
    margin:      [12, 12, 12, 12],
    filename,
    image:       { type: 'jpeg', quality: 0.96 },
    html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
    jsPDF:       { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak:   { mode: ['css', 'legacy'] },
  }
}

export async function downloadAsPdf(element, filename = 'document.pdf') {
  if (!element) return
  await withCaptureMode(() =>
    html2pdf().set(pdfOptions(filename)).from(element).save()
  )
}

export async function openPdfInTab(element, filename = 'document.pdf') {
  if (!element) return
  const blob = await withCaptureMode(() =>
    html2pdf().set(pdfOptions(filename)).from(element).outputPdf('blob')
  )
  const url = URL.createObjectURL(blob)
  const win = window.open(url, '_blank', 'noopener,noreferrer')
  /* Some browsers block window.open when triggered async — fall back
   * to navigating an anchor with target=_blank. */
  if (!win) {
    const a = document.createElement('a')
    a.href = url
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
    document.body.appendChild(a)
    a.click()
    a.remove()
  }
  /* Release the blob URL after a delay so the browser has time to
   * load the PDF before it's revoked. */
  setTimeout(() => URL.revokeObjectURL(url), 60_000)
}

/* Native print path — relies on a @media print stylesheet that
 * shows only the element marked .docs-preview-host. */
export function printElement() {
  window.print()
}
