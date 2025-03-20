import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist-react',
  },
  define: {
    'process.env': process.env, // Expose environment variables
  },
  server: {
    host: '0.0.0.0', // Allow external access
    port: 3000, // Ensure it's running on the correct port
    strictPort: true,
    allowedHosts: ['account-desktop.8848digitalcloud.com'], // Allow your domain
    proxy: {
      '/api': {
        target: 'https://yatish-testing-v15.frappe.cloud', // Your backend API
        changeOrigin: true,
        secure: true, // Set to false if your backend has self-signed SSL
        cookieDomainRewrite: '', // Ensure cookies are rewritten for localhost
        headers: {
          'Access-Control-Allow-Credentials': 'true',
        },
      },
    },
  },
});
