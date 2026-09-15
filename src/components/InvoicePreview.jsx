import { forwardRef } from 'react'

const InvoicePreview = forwardRef(function InvoicePreview({ data, totals }, ref) {
  const { business, client, invoice, items } = data
  const { subtotal, discount, tax, grandTotal } = totals

  const fmt = (n) =>
    `${invoice.currency} ${Number(n).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`

  const formatDate = (d) =>
    d ? new Date(d + 'T00:00:00').toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
    }) : '—'

  return (
    <div
      ref={ref}
      id="invoice-preview"
      className="bg-white w-full max-w-[794px] min-h-[1123px] shadow-xl rounded-sm p-10 sm:p-12 mx-auto"
      style={{ aspectRatio: '210 / 297' }}
    >
      {/* ===== Header: Logo + Business vs INVOICE title ===== */}
      <div className="flex justify-between items-start pb-8 border-b-4 border-brand-600">
        <div className="flex items-start gap-4">
          {business.logo && (
            <img src={business.logo} alt="logo" className="h-16 w-auto object-contain" />
          )}
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              {business.name || 'Your Business Name'}
            </h1>
            <p className="text-sm text-slate-500 whitespace-pre-line mt-1">{business.address}</p>
            <p className="text-sm text-slate-500">{business.email}</p>
            <p className="text-sm text-slate-500">{business.phone}</p>
            {business.taxId && (
              <p className="text-sm text-slate-500">Tax ID: {business.taxId}</p>
            )}
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-4xl font-extrabold text-brand-600 tracking-tight">INVOICE</h2>
          <p className="text-slate-600 font-semibold mt-2">{invoice.number}</p>
        </div>
      </div>

      {/* ===== Bill To / Dates ===== */}
      <div className="flex justify-between mt-8 mb-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Bill To</p>
          <p className="font-bold text-slate-900">{client.name || 'Client Name'}</p>
          <p className="text-sm text-slate-500 whitespace-pre-line">{client.address}</p>
          <p className="text-sm text-slate-500">{client.email}</p>
        </div>
        <div className="text-right space-y-1">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Issue Date</p>
            <p className="text-sm font-semibold text-slate-800">{formatDate(invoice.date)}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Due Date</p>
            <p className="text-sm font-semibold text-slate-800">{formatDate(invoice.dueDate)}</p>
          </div>
        </div>
      </div>

      {/* ===== Items Table ===== */}
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-900 text-white">
            <th className="text-left py-2.5 px-3 font-semibold rounded-l-md">#</th>
            <th className="text-left py-2.5 px-3 font-semibold">Description</th>
            <th className="text-right py-2.5 px-3 font-semibold">Qty</th>
            <th className="text-right py-2.5 px-3 font-semibold">Unit Price</th>
            <th className="text-right py-2.5 px-3 font-semibold rounded-r-md">Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={item.id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
              <td className="py-2.5 px-3 text-slate-500">{i + 1}</td>
              <td className="py-2.5 px-3 text-slate-800">{item.description || '—'}</td>
              <td className="py-2.5 px-3 text-right text-slate-800">{item.quantity}</td>
              <td className="py-2.5 px-3 text-right text-slate-800">
                {fmt(Number(item.price) || 0)}
              </td>
              <td className="py-2.5 px-3 text-right font-semibold text-slate-900">
                {fmt((Number(item.quantity) || 0) * (Number(item.price) || 0))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ===== Totals ===== */}
      <div className="flex justify-end mt-6">
        <div className="w-72 space-y-2 text-sm">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal</span><span>{fmt(subtotal)}</span>
          </div>
          {Number(invoice.discountRate) > 0 && (
            <div className="flex justify-between text-slate-600">
              <span>Discount ({invoice.discountRate}%)</span>
              <span>- {fmt(discount)}</span>
            </div>
          )}
          {Number(invoice.taxRate) > 0 && (
            <div className="flex justify-between text-slate-600">
              <span>Tax ({invoice.taxRate}%)</span>
              <span>+ {fmt(tax)}</span>
            </div>
          )}
          <div className="flex justify-between items-center bg-brand-600 text-white font-bold text-lg rounded-md px-3 py-2.5">
            <span>Grand Total</span><span>{fmt(grandTotal)}</span>
          </div>
        </div>
      </div>

      {/* ===== Notes ===== */}
      {invoice.notes && (
        <div className="mt-10 pt-6 border-t border-slate-200">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
            Notes & Payment Terms
          </p>
          <p className="text-sm text-slate-600 whitespace-pre-line">{invoice.notes}</p>
        </div>
      )}

      {/* ===== Footer ===== */}
      <div className="mt-16 text-center">
        <p className="text-xs text-slate-400">
          Thank you for your business! · Generated with Invoice Maker
        </p>
      </div>
    </div>
  )
})

export default InvoicePreview
