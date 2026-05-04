<template>
  <nav ref="navRef" style="pointer-events: auto;" :class="[
    'fixed top-0 w-full z-[100] transition-all duration-300 px-6 py-4 will-change-transform',
    isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
  ]">
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      <div class="flex items-center space-x-12">
        <a href="/" class="flex items-center">
          <img src="/images/undangin-logo.png" alt="Undangin Logo"
            class="h-8 md:h-10 w-auto object-contain transition-all"
            :class="[isScrolled ? 'brightness-100' : 'brightness-0 invert']" />
        </a>

        <div :class="[
            'hidden md:flex space-x-8 font-medium transition-colors items-center',
            isScrolled ? 'text-gray-600' : 'text-white/90'
          ]">
          <a href="#" class="hover:text-blue-500 transition">Home</a>
          <a href="#" class="hover:text-blue-500 transition">Services</a>
          <a href="#" class="hover:text-blue-500 transition">Portofolio</a>
          <a href="#" class="hover:text-blue-500 transition">Blog & Article</a>
        </div>
      </div>

      <div class="relative" ref="dropdownRef">
        <button @click="isDropdownOpen = !isDropdownOpen"
          class="flex items-center gap-2 bg-black/5 backdrop-blur-md px-4 py-2 rounded-full border border-black/10 hover:bg-black/10 transition-all text-xs font-bold"
          :class="isScrolled ? 'text-black' : 'text-white border-white/20'">
          <span>{{ locale.toUpperCase() }}</span>
          <svg class="w-3 h-3 transition-transform duration-300" :class="{ 'rotate-180': isDropdownOpen }" fill="none"
            stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <transition enter-active-class="transition duration-200 ease-out"
          enter-from-class="transform scale-95 opacity-0 -translate-y-2"
          enter-to-class="transform scale-100 opacity-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="transform scale-100 opacity-100 translate-y-0"
          leave-to-class="transform scale-95 opacity-0 -translate-y-2">
          <div v-if="isDropdownOpen"
            class="absolute right-0 mt-2 w-36 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden py-1 z-[110]">
            <button @click="changeLanguage('id')"
              class="w-full text-left px-4 py-3 text-xs font-bold flex items-center justify-between hover:bg-blue-50 transition-colors"
              :class="locale === 'id' ? 'text-blue-600' : 'text-gray-700'">
              Bahasa Indonesia
              <span v-if="locale === 'id'" class="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
            </button>
            <button @click="changeLanguage('en')"
              class="w-full text-left px-4 py-3 text-xs font-bold flex items-center justify-between hover:bg-blue-50 transition-colors"
              :class="locale === 'en' ? 'text-blue-600' : 'text-gray-700'">
              English
              <span v-if="locale === 'en'" class="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
            </button>
          </div>
        </transition>
      </div>
    </div>

    <div ref="menuOverlay"
      class="fixed top-0 right-0 h-screen w-[75%] md:w-[33%] bg-white z-[105] shadow-[-10px_0_30px_rgba(0,0,0,0.1)] translate-x-[100%] flex flex-col p-10 pt-32 space-y-8">
      <a @click="toggleMenu" href="#" class="text-2xl font-bold text-black border-b border-gray-100 pb-4">Gallery</a>
      <a @click="toggleMenu" href="#" class="text-2xl font-bold text-black border-b border-gray-100 pb-4">Features</a>
      <a @click="toggleMenu" href="#" class="text-2xl font-bold text-black border-b border-gray-100 pb-4">Contact</a>

      <div class="pt-10">
        <button
          class="w-full bg-blue-600 text-white px-6 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-500/20">
          Get Started
        </button>
      </div>
    </div>

    <div v-if="isMenuOpen" @click="toggleMenu" class="fixed inset-0 bg-black/20 backdrop-blur-sm z-[104]"></div>
  </nav>
</template>

<script setup>
  import {
    ref,
    onMounted,
    onUnmounted
  } from 'vue'
  import {
    useI18n
  } from 'vue-i18n' // Atau '#i18n' jika menggunakan Nuxt
  import {
    gsap
  } from 'gsap'
  import {
    ScrollTrigger
  } from 'gsap/ScrollTrigger'

  const isScrolled = ref(false)
  const isMenuOpen = ref(false)
  const isDropdownOpen = ref(false)

  const navRef = ref(null)
  const menuOverlay = ref(null)
  const dropdownRef = ref(null)

  const {
    locale,
    setLocale
  } = useI18n()

  const changeLanguage = (lang) => {
    setLocale(lang)
    isDropdownOpen.value = false
  }

  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
    if (isMenuOpen.value) {
      gsap.to(menuOverlay.value, {
        xPercent: -100,
        duration: 0.6,
        ease: "expo.out"
      })
    } else {
      gsap.to(menuOverlay.value, {
        xPercent: 0,
        duration: 0.5,
        ease: "expo.in"
      })
    }
  }

  // Menutup dropdown saat klik di luar area tombol/menu
  const handleClickOutside = (event) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
      isDropdownOpen.value = false
    }
  }

  onMounted(() => {
  if (process.client) {
    gsap.registerPlugin(ScrollTrigger)
    
    window.addEventListener('scroll', () => {
      isScrolled.value = window.scrollY > 50
    })
    window.addEventListener('click', handleClickOutside)

    // Gunakan nextTick agar Vue selesai merender elemen v-if
    nextTick(() => {
      const target = document.querySelector("section")
      
      // Hanya jalankan ScrollTrigger jika elemen ditemukan
      if (target) {
        ScrollTrigger.create({
          trigger: target,
          start: "top top",
          end: "bottom top",
          onLeave: () => {
            gsap.to(navRef.value, {
              yPercent: -120,
              duration: 0.4,
              ease: "power2.inOut",
              overwrite: "auto"
            })
          },
          onEnterBack: () => {
            gsap.to(navRef.value, {
              yPercent: 0,
              duration: 0.4,
              ease: "power2.out",
              overwrite: "auto"
            })
          }
        })
      } else {
        console.warn("GSAP: Element 'section' tidak ditemukan di halaman ini.")
      }
    })
  }
})

  onUnmounted(() => {
    if (process.client) {
      window.removeEventListener('click', handleClickOutside)
    }
  })
</script>