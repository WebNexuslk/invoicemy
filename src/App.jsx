import { useEffect, useRef, useState } from 'react'
import { FileText } from 'lucide-react'
import InvoiceForm from './components/InvoiceForm.jsx'
import InvoicePreview from './components/InvoicePreview.jsx'
import { downloadInvoicePDF } from './utils/pdf.js'
import { loadBusinessInfo, saveBusinessInfo } from './utils/storage.js'

const CURRENCIES = ['$', 'LKR', '€', '£', '₹', '¥', '₹']

const createEmptyItem = () => ({
  id: crypto.randomUUID(),
  description: '',
  quantity: 1,
  price: 0,
})

const defaultState = {
  business: {
    name: '',
    email: '',
    phone: '',
    address: '',
    taxId: '',
    logo: null, // base64 data URL
  },
  client: {
    name: '',
    email: '',
    address: '',
  },
  invoice: {
    number: `INV-${String(Date.now()).slice(-6)}`,
    date: new Date().toISOString().slice(0, 10),
    dueDate: '',
    currency: '$',
    taxRate: 0,
    discountRate: 0,
    notes: '',
  },
  items: [createEmptyItem()],
}

export default function App() {
  const [data, setData] = useState(defaultState)
  const [downloading, setDownloading] = useState(false)
  const previewRef = useRef(null)

  // Load saved business info on first render
  useEffect(() => {
    const saved = loadBusinessInfo()
    if (saved) {
      setData((prev) => ({ ...prev, business: { ...prev.business, ...saved } }))
    }
  }, [])

  // Persist business info whenever it changes
  useEffect(() => {
    saveBusinessInfo(data.business)
  }, [data.business])

  // ---------- Handlers ----------

  const updateBusiness = (field, value) =>
    setData((prev) => ({ ...prev, business: { ...prev.business, [field]: value } }))

  const updateClient = (field, value) =>
    setData((prev) => ({ ...prev, client: { ...prev.client, [field]: value } }))

  const updateInvoice = (field, value) =>
    setData((prev) => ({ ...prev, invoice: { ...prev.invoice, [field]: value } }))

  const updateItem = (id, field, value) =>
    setData((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    }))

  const addItem = () =>
    setData((prev) => ({ ...prev, items: [...prev.items, createEmptyItem()] }))

  const removeItem = (id) =>
    setData((prev) => ({
      ...prev,
      items: prev.items.length > 1
        ? prev.items.filter((item) => item.id !== id)
        : prev.items,
    }))

  const handleLogoUpload = (file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => updateBusiness('logo', e.target.result)
    reader.readAsDataURL(file)
  }

  // ---------- Calculations ----------

  const lineTotal = (item) =>
    (Number(item.quantity) || 0) * (Number(item.price) || 0)

  const subtotal = data.items.reduce((sum, item) => sum + lineTotal(item), 0)
  const discount = (subtotal * (Number(data.invoice.discountRate) || 0)) / 100
  const taxable = subtotal - discount
  const tax = (taxable * (Number(data.invoice.taxRate) || 0)) / 100
  const grandTotal = taxable + tax

  const totals = { subtotal, discount, tax, grandTotal }

  // ---------- Actions ----------

  const handleDownloadPDF = async () => {
    setDownloading(true)
    await downloadInvoicePDF(previewRef.current, `${data.invoice.number || 'invoice'}.pdf`)
    setDownloading(false)
  }

  const handlePrint = () => window.print()

  const handleReset = () => {
    if (!confirm('Reset the entire invoice? Your saved business info will be kept.')) return
    const savedBusiness = data.business
    setData({ ...defaultState, business: savedBusiness })
  }

  // ---------- Render ----------

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-brand-600 text-white flex items-center justify-center">
              <FileText size={18} />
            </div>
            <div>
              <h1 className="font-bold text-slate-900 leading-tight">Invoice Maker</h1>
              <p className="text-xs text-slate-500 hidden sm:block">
                Free & open-source · runs entirely in your browser
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
            >
              Reset
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition"
            >
              🖨️ Print
            </button>
            <button
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="px-4 py-2 text-sm font-semibold text-white bg-brand-600 rounded-lg hover:bg-brand-700 transition disabled:opacity-60 disabled:cursor-wait"
            >
              {downloading ? 'Generating…' : '⬇ Download PDF'}
            </button>
          </div>
        </div>
      </header>

      {/* Main: Form (left) + Preview (right) */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-6 p-4 sm:p-6">
        <section className="nice-scroll lg:max-h-[calc(100vh-96px)] lg:overflow-y-auto lg:pr-1">
          <InvoiceForm
            data={data}
            currencies={CURRENCIES}
            onBusinessChange={updateBusiness}
            onClientChange={updateClient}
            onInvoiceChange={updateInvoice}
            onItemChange={updateItem}
            onAddItem={addItem}
            onRemoveItem={removeItem}
            onLogoUpload={handleLogoUpload}
            totals={totals}
          />
        </section>

        <section className="flex justify-center lg:justify-start">
          <InvoicePreview ref={previewRef} data={data} totals={totals} />
        </section>
      </main>
    </div>
  )
}
