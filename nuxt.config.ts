import { defineNuxtConfig } from 'nuxt'
require('dotenv').config()
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  ssr: false,
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      
      title: 'Radioly',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Free Internet Radio!' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon/favicon.svg' }
      ]
    },
  },
  build: {
    transpile: [
      '@emailjs/browser',
    ],
  },
})
