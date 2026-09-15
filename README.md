<div align="center">

# Invoice Maker

**A modern, free & open-source Invoice Maker — create, preview, print and download professional invoices as PDF. Built with React (Vite) + Tailwind CSS. No backend, no sign-up, no tracking.**

[Live Demo](#) · [Report Bug](../../issues) · [Request Feature](../../issues)

</div>

---

## Features

- **Business & Client Info** — name, address, email, phone, Tax ID / VAT number
- **Logo Upload** — add your company logo (stored locally in the browser)
- **Dynamic Invoice Table** — add / remove item rows with quantity, unit price & automatic line totals
- **Smart Calculations** — subtotal, custom **Tax %**, custom **Discount %**, and grand total
- **Multi-Currency** — $, LKR, €, £, ₹, ¥ and more
- **A4-Perfect Live Preview** — pixel-accurate invoice rendered as you type
- **One-Click PDF Export** — powered by [html2pdf.js](https://github.com/eKoopmans/html2pdf.js)
- **Print-Friendly** — dedicated print stylesheet prints *only* the invoice
- **Local Storage** — your business details are saved automatically, no re-typing
- **100% Client-Side** — your data never leaves your browser
- **Auto-Deploy** — GitHub Actions builds & deploys to GitHub Pages on every push to `main`

## Tech Stack

| Layer    | Technology                          |
| -------- | ----------------------------------- |
| UI       | React 18 + Vite                     |
| Styling  | Tailwind CSS 3                      |
| Icons    | Lucide React                        |
| PDF      | html2pdf.js (jsPDF + html2canvas)   |
| Deploy   | GitHub Actions -> GitHub Pages      |

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+ and npm

### Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/invoice-maker.git

# 2. Navigate into the folder
cd invoice-maker

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

Open `http://localhost:5173` in your browser — that is it!

### Build for Production

```bash
npm run build   # outputs static files to ./dist
npm run preview # preview the production build locally
```

## Deploy to GitHub Pages (FREE)

1. **Push this repo to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Invoice Maker"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/invoice-maker.git
   git push -u origin main
   ```

2. **Set `base` in `vite.config.js`** to match your repo name:
   ```js
   base: '/invoice-maker/'
   ```

3. **Enable GitHub Pages:**
   Go to **Settings -> Pages -> Source** and select **GitHub Actions**.

4. **Done!** The workflow in `.github/workflows/deploy.yml` builds and deploys automatically on every push to `main`. Your site will be live at:
   ```
   https://YOUR_USERNAME.github.io/invoice-maker/
   ```

> **Alternative:** You can also deploy to [Vercel](https://vercel.com) or [Netlify](https://netlify.com) in one click — just import the repo, no config needed (set `base: '/'` in `vite.config.js` for those platforms).

## Project Structure

```
invoice-maker/
├── .github/workflows/deploy.yml   # CI/CD -> GitHub Pages
├── public/favicon.svg
├── src/
│   ├── components/
│   │   ├── InvoiceForm.jsx        # Left panel: all inputs
│   │   └── InvoicePreview.jsx     # Right panel: A4 live preview
│   ├── utils/
│   │   ├── pdf.js                 # html2pdf.js wrapper
│   │   └── storage.js             # localStorage helpers
│   ├── App.jsx                    # State management & layout
│   ├── main.jsx
│   └── index.css                  # Tailwind + print styles
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/amazing-feature`)
3. Commit your Changes (`git commit -m 'Add some amazing feature'`)
4. Push to the Branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
Made with love using React + Tailwind CSS
</div>
