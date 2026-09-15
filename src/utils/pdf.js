import html2pdf from 'html2pdf.js'

/**
 * Downloads the invoice preview element as a PDF file.
 * @param {HTMLElement} element - The DOM node to render (#invoice-preview)
 * @param {string} filename - e.g. "INV-0001.pdf"
 */
export const downloadInvoicePDF = async (element, filename = 'invoice.pdf') => {
  if (!element) return

  const options = {
    margin: 0,
    filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
    },
  }

  try {
    await html2pdf().set(options).from(element).save()
  } catch (err) {
    console.error('PDF generation failed:', err)
    alert('Sorry, the PDF could not be generated. Please try the Print button instead.')
  }
}
