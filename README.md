# 🛒 Modern E-Commerce App

Modern, hızlı ve çok dilli bir e-ticaret uygulaması. Next.js 15, TypeScript ve Tailwind CSS ile geliştirilmiştir.

🌐 **Canlı Demo:** [my-e-commerce-app.vercel.app](https://my-e-commerce-app-git-main-sevims-projects-5fd5f3ae.vercel.app)

## ✨ Özellikler

- 🚀 **Next.js 15** - En son Next.js özellikleri ile
- 🌍 **Çok Dilli Destek** - Türkçe ve İngilizce
- 📱 **Mobil Uyumlu** - Tüm cihazlarda mükemmel deneyim
- 🎨 **Modern Tasarım** - Tailwind CSS ile güzel arayüz
- ⚡ **Hızlı Performans** - Turbopack ile optimize edilmiş
- 🛒 **Sepet Sistemi** - Redux ile state yönetimi
- 🔍 **Ürün Filtreleme** - Kategori ve fiyat filtreleri
- 🌙 **Dark Mode** - Otomatik tema desteği

## 🛠️ Teknolojiler

- **Framework:** Next.js 15
- **Dil:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit
- **Internationalization:** next-intl
- **Deployment:** Vercel

## 🚀 Kurulum

```bash
# Projeyi klonlayın
git clone https://github.com/sevimdelibudak/my-e-commerce-app.git
cd my-e-commerce-app

# Bağımlılıkları yükleyin
npm install

# Development server'ı başlatın
npm run dev
```

Tarayıcıda `http://localhost:3000` adresini açın.

## 📁 Proje Yapısı

```
my-e-commerce-app/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Çok dilli routing
│   │   ├── layout.tsx     # Ana layout
│   │   ├── page.tsx       # Ana sayfa
│   │   ├── products/      # Ürün sayfaları
│   │   └── cart/          # Sepet sayfası
│   └── globals.css        # Global stiller
├── components/            # React bileşenleri
├── lib/                   # Utility fonksiyonları
├── messages/             # Çeviri dosyaları
└── public/              # Statik dosyalar
```

## 🌍 Çok Dilli Destek

- **Türkçe:** `/tr`
- **İngilizce:** `/en`

## 🚀 Deployment

### Vercel
GitHub repository'nizi Vercel'e bağlayın, otomatik deployment başlar.

### Manuel Build
```bash
npm run build
npm start
```

## 🔧 Geliştirme

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint kontrolü
```

## 📄 Lisans

MIT