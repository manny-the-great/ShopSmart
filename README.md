# 🛒 ShopSmart

ShopSmart is a modern, mobile-first Point-of-Sale (POS) application built for the web. Featuring a sleek, touch-friendly interface, it allows store owners to seamlessly manage product catalogues, ring up transactions, and review sales histories, all while ensuring robust access control through PIN authentication.

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-informational?style=for-the-badge)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)

## ✨ Features

- **📱 Mobile-First POS Interface:** A responsive product grid optimized for touch interactions.
- **🔐 PIN Authentication:** Fast and secure employee/owner login system.
- **📊 Owner Dashboard:** High-level metrics, recent activities, and actionable insights.
- **🛍️ Product Catalogue Management:** Easily view, add, and organize products.
- **🧾 Transaction History:** Comprehensive logs of past sales and orders.
- **✨ Premium UI/UX:** Built with Shadcn UI and brought to life with Framer Motion animations.

## 🛠️ Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Directory)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Components:** [Shadcn UI](https://ui.shadcn.com/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)

## 🚀 Getting Started

### Prerequisites

You'll need Node.js installed on your machine. We recommend using the latest LTS version.

### Installation & Local Setup

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <your-repo-link>
   cd ShopSmart
   ```

2. **Navigate to the frontend directory:**
   ```bash
   cd shopsmart-frontend
   ```

3. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or 
   pnpm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application running.

## 🌐 Deployment to Vercel

Since the Next.js app sits inside a subdirectory (`shopsmart-frontend`), Vercel makes it incredibly easy to configure:

1. Import your repository into Vercel.
2. In the "Configure Project" screen, locate the **Root Directory** setting.
3. Click **Edit** and set it to `shopsmart-frontend`.
4. Deploy! Vercel will automatically detect Next.js and apply the correct build settings.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
