import { Plus, Trash2, Upload, X } from 'lucide-react'

// ---------- Small reusable pieces ----------

const Section = ({ title, children }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
    <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500 mb-4">
      {title}
    </h2>
    <div className="space-y-3">{children}</div>
  </div>
)

const Field = ({ label, children }) => (
  <label className="block">
    <span className="block text-xs font-semibold text-slate-600 mb-1">{label}</span>
    {children}
  </label>
)

const inputCls =
  'w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition'

// ---------- Main Form Component ----------

export default function InvoiceForm({
  data,
  currencies,
  onBusinessChange,
  onClientChange,
  onInvoiceChange,
  onItemChange,
  onAddItem,
  onRemoveItem,
  onLogoUpload,
  totals,
}) {
  const { business, client, invoice, items } = data
  const fmt = (n) => `${invoice.currency} ${n.toFixed(2)}`

  return (
    <div className="space-y-5 pb-6">
      {/* ---- Business Info ---- */}
      <Section title="Your Business">
        {/* Logo upload */}
        <div className="flex items-center gap-3">
          {business.logo ? (
            <div className="relative">
              <img
                src={business.logo}
                alt="Business logo"
                className="w-14 h-14 object-contain rounded-lg border border-slate-200 bg-white p-1"
              />
              <button
                type="button"
                onClick={() => onBusinessChange('logo', null)}
                className="absolute -top-2 -right-2 w-5 h-5 bg-slate-700 text-white rounded-full flex items-center justify-center hover:bg-red-500 transition"
                title="Remove logo"
              >
                <X size={12} />
              </button>
            </div>
          ) : (
            <label className="w-14 h-14 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center cursor-pointer text-slate-400 hover:border-brand-500 hover:text-brand-500 transition">
              <Upload size={16} />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => onLogoUpload(e.target.files?.[0])}
              />
            </label>
          )}
          <p className="text-xs text-slate-500">Upload your logo<br />(PNG / JPG)</p>
        </div>

        <Field label="Business Name">
          <input className={inputCls} value={business.name}
            onChange={(e) => onBusinessChange('name', e.target.value)}
            placeholder="Acme Pvt Ltd" />
        </Field>
        <Field label="Email">
          <input className={inputCls} type="email" value={business.email}
            onChange={(e) => onBusinessChange('email', e.target.value)}
            placeholder="billing@acme.com" />
        </Field>
        <Field label="Phone">
          <input className={inputCls} value={business.phone}
            onChange={(e) => onBusinessChange('phone', e.target.value)}
            placeholder="+94 77 123 4567" />
        </Field>
        <Field label="Address">
          <textarea className={inputCls} rows={2} value={business.address}
            onChange={(e) => onBusinessChange('address', e.target.value)}
            placeholder="123 Galle Road, Colombo 03, Sri Lanka" />
        </Field>
        <Field label="Tax ID / VAT No.">
          <input className={inputCls} value={business.taxId}
            onChange={(e) => onBusinessChange('taxId', e.target.value)}
            placeholder="VAT 104209847-7000" />
        </Field>
      </Section>

      {/* ---- Client Info ---- */}
      <Section title="Bill To (Client)">
        <Field label="Client Name">
          <input className={inputCls} value={client.name}
            onChange={(e) => onClientChange('name', e.target.value)}
            placeholder="Client Company Ltd" />
        </Field>
        <Field label="Client Email">
          <input className={inputCls} type="email" value={client.email}
            onChange={(e) => onClientChange('email', e.target.value)}
            placeholder="accounts@client.com" />
        </Field>
        <Field label="Client Address">
          <textarea className={inputCls} rows={2} value={client.address}
            onChange={(e) => onClientChange('address', e.target.value)}
            placeholder="456 Main Street, Kandy, Sri Lanka" />
        </Field>
      </Section>

      {/* ---- Invoice Details ---- */}
      <Section title="Invoice Details">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Invoice #">
            <input className={inputCls} value={invoice.number}
              onChange={(e) => onInvoiceChange('number', e.target.value)} />
          </Field>
          <Field label="Currency">
            <select className={inputCls} value={invoice.currency}
              onChange={(e) => onInvoiceChange('currency', e.target.value)}>
              {currencies.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field label="Issue Date">
            <input className={inputCls} type="date" value={invoice.date}
              onChange={(e) => onInvoiceChange('date', e.target.value)} />
          </Field>
          <Field label="Due Date">
            <input className={inputCls} type="date" value={invoice.dueDate}
              onChange={(e) => onInvoiceChange('dueDate', e.target.value)} />
          </Field>
        </div>
      </Section>

      {/* ---- Items ---- */}
      <Section title="Items">
        <div className="space-y-3">
          {items.map((item, idx) => (
            <div key={item.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">Item {idx + 1}</span>
                <button
                  type="button"
                  onClick={() => onRemoveItem(item.id)}
                  disabled={items.length === 1}
                  className="text-slate-400 hover:text-red-500 transition disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Remove item"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <input className={inputCls} value={item.description}
                onChange={(e) => onItemChange(item.id, 'description', e.target.value)}
                placeholder="Description of goods / service" />

              <div className="grid grid-cols-3 gap-2">
                <input className={inputCls} type="number" min="0" step="1"
                  value={item.quantity}
                  onChange={(e) => onItemChange(item.id, 'quantity', e.target.value)}
                  placeholder="Qty" title="Quantity" />
                <input className={inputCls} type="number" min="0" step="0.01"
                  value={item.price}
                  onChange={(e) => onItemChange(item.id, 'price', e.target.value)}
                  placeholder="Price" title="Unit price" />
                <div className="px-2 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg text-right">
                  {fmt((Number(item.quantity) || 0) * (Number(item.price) || 0))}
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={onAddItem}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-brand-600 border-2 border-dashed border-brand-200 rounded-lg hover:bg-brand-50 hover:border-brand-400 transition"
          >
            <Plus size={16} /> Add Item
          </button>
        </div>
      </Section>

      {/* ---- Tax / Discount / Notes ---- */}
      <Section title="Tax, Discount & Notes">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Tax Rate (%)">
            <input className={inputCls} type="number" min="0" max="100" step="0.1"
              value={invoice.taxRate}
              onChange={(e) => onInvoiceChange('taxRate', e.target.value)} />
          </Field>
          <Field label="Discount (%)">
            <input className={inputCls} type="number" min="0" max="100" step="0.1"
              value={invoice.discountRate}
              onChange={(e) => onInvoiceChange('discountRate', e.target.value)} />
          </Field>
        </div>
        <Field label="Notes / Terms">
          <textarea className={inputCls} rows={3} value={invoice.notes}
            onChange={(e) => onInvoiceChange('notes', e.target.value)}
            placeholder="Payment due within 14 days. Bank: HNB – 1234567890" />
        </Field>
      </Section>

      {/* ---- Live Totals ---- */}
      <div className="bg-slate-900 text-white rounded-xl p-5 shadow-sm space-y-2 text-sm">
        <div className="flex justify-between text-slate-300">
          <span>Subtotal</span><span>{fmt(totals.subtotal)}</span>
        </div>
        <div className="flex justify-between text-slate-300">
          <span>Discount</span><span>- {fmt(totals.discount)}</span>
        </div>
        <div className="flex justify-between text-slate-300">
          <span>Tax</span><span>+ {fmt(totals.tax)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg pt-2 border-t border-slate-700">
          <span>Grand Total</span><span>{fmt(totals.grandTotal)}</span>
        </div>
      </div>
    </div>
  )
}
