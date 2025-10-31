// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa' // 1. ایمپورت پلاگین

export default defineConfig({
  plugins: [
    react(),
    // 2. افزودن پلاگین و پیکربندی آن
    VitePWA({
      registerType: 'autoUpdate', // به طور خودکار سرویس ورکر را آپدیت می‌کند
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        // این اطلاعات در پنجره "Add to Home Screen" نمایش داده می‌شود
        name: 'تقویم شیفت بابا',
        short_name: 'تقویم شیفت',
        description: 'اپلیکیشن محاسبه و نمایش شیفت‌های کاری بابا',
        theme_color: '#ffffff', // رنگ نوار بالای اپ در اندروید
        background_color: '#f4f7f6', // رنگ صفحه قبل از بارگذاری اپ
        display: 'standalone', // اپ را مانند یک برنامه بومی باز می‌کند
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable' // برای آیکون‌های تطبیق‌پذیر
          }
        ]
      }
    })
  ],
})