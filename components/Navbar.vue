<template>
  <nav ref="navRef" style="pointer-events: auto;" :class="[
    'fixed top-0 w-full z-[100] transition-all duration-300 px-6 py-4 will-change-transform',
    isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
  ]">
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      <div class="flex items-center space-x-12">
        <nuxt-link to="/" class="flex items-center">
          <img src="/images/undangin-logo.png" alt="Undangin Logo"
            class="h-8 md:h-10 w-auto object-contain transition-all"
            :class="[isScrolled ? 'brightness-100' : 'brightness-0 invert']" />
        </nuxt-link>
        <div :class="[
            'hidden md:flex space-x-8 font-medium transition-colors items-center',
            isScrolled ? 'text-gray-600' : 'text-white/90'
          ]">
          <nuxt-link to="/" class="hover:text-blue-500 transition">Home</nuxt-link>
          <nuxt-link to="#" class="hover:text-blue-500 transition">Services</nuxt-link>
          <nuxt-link to="#" class="hover:text-blue-500 transition">Portofolio</nuxt-link>
          <nuxt-link to="#" class="hover:text-blue-500 transition">Blog & Article</nuxt-link>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <div class="relative" ref="dropdownRef">
          <button @click="isDropdownOpen = !isDropdownOpen"
            class="flex items-center gap-2 bg-black/5 backdrop-blur-md px-3 md:px-4 py-2 rounded-full border border-black/10 hover:bg-black/10 transition-all text-[10px] md:text-xs font-bold"
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
              </button>
              <button @click="changeLanguage('en')"
                class="w-full text-left px-4 py-3 text-xs font-bold flex items-center justify-between hover:bg-blue-50 transition-colors"
                :class="locale === 'en' ? 'text-blue-600' : 'text-gray-700'">
                English
              </button>
            </div>
          </transition>
        </div>
        <button @click="toggleMenu" 
          class="md:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5 z-[110]">
          <span :class="['w-6 h-0.5 transition-all duration-300', 
            isScrolled ? 'bg-black' : 'bg-white',
            isMenuOpen ? 'rotate-45 translate-y-2' : '']"></span>
          <span :class="['w-6 h-0.5 transition-all duration-300', 
            isScrolled ? 'bg-black' : 'bg-white',
            isMenuOpen ? 'opacity-0' : '']"></span>
          <span :class="['w-6 h-0.5 transition-all duration-300', 
            isScrolled ? 'bg-black' : 'bg-white',
            isMenuOpen ? '-rotate-45 -translate-y-2' : '']"></span>
        </button>
      </div>
    </div>
    <div ref="menuOverlay"
      class="fixed top-0 right-0 h-screen w-[85%] md:w-[33%] bg-white z-[105] shadow-[-10px_0_30px_rgba(0,0,0,0.1)] translate-x-[100%] flex flex-col p-10 pt-32 space-y-6">
      <nuxt-link @click="toggleMenu" to="#" class="text-xl font-bold text-black border-b border-gray-50 pb-4">Home</nuxt-link>
      <nuxt-link @click="toggleMenu" to="#" class="text-xl font-bold text-black border-b border-gray-50 pb-4">Services</nuxt-link>
      <nuxt-link @click="toggleMenu" to="#" class="text-xl font-bold text-black border-b border-gray-50 pb-4">Portofolio</nuxt-link>
      <nuxt-link @click="toggleMenu" to="#" class="text-xl font-bold text-black border-b border-gray-50 pb-4">Blog & Article</nuxt-link>
      <div class="pt-6">
        <button class="w-full bg-blue-600 text-white px-6 py-4 rounded-xl font-bold shadow-lg">
          Get Started
        </button>
      </div>
    </div>
    <div v-if="isMenuOpen" @click="toggleMenu" class="fixed inset-0 bg-black/40 backdrop-blur-sm z-[104]"></div>
  </nav>
</template>

<script setup>
  import { ref, onMounted, onUnmounted, nextTick } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'

  const isScrolled = ref(false)
  const isMenuOpen = ref(false)
  const isDropdownOpen = ref(false)

  const navRef = ref(null)
  const menuOverlay = ref(null)
  const dropdownRef = ref(null)

  const { locale, setLocale } = useI18n()
  const changeLanguage = (lang) => {
    if (typeof setLocale === 'function') {
      setLocale(lang)
    } else {
      locale.value = lang
    }
    localStorage.setItem('user-locale', lang)
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

  const handleClickOutside = (event) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
      isDropdownOpen.value = false
    }
  }

  onMounted(() => {
    if (process.client) {
      const savedLocale = localStorage.getItem('user-locale')
      if (savedLocale) {
        setLocale ? setLocale(savedLocale) : (locale.value = savedLocale)
      } else {
        const defaultLang = 'id'
        setLocale ? setLocale(defaultLang) : (locale.value = defaultLang)
        localStorage.setItem('user-locale', defaultLang)
      }
      gsap.registerPlugin(ScrollTrigger)
      
      const handleScroll = () => {
        isScrolled.value = window.scrollY > 50
      }

      window.addEventListener('scroll', handleScroll)
      window.addEventListener('click', handleClickOutside)

      nextTick(() => {
        const target = document.querySelector("section")
        
        if (target && navRef.value) {
          ScrollTrigger.create({
            trigger: target,
            start: "top top",
            onLeave: () => {
              gsap.to(navRef.value, {
                yPercent: -120,
                duration: 0.4,
                ease: "power2.inOut"
              })
            },
            onEnterBack: () => {
              gsap.to(navRef.value, {
                yPercent: 0,
                duration: 0.4,
                ease: "power2.out"
              })
            }
          })
        }
      })
    }
  })

  onUnmounted(() => {
    if (process.client) {
      window.removeEventListener('scroll', () => { isScrolled.value = window.scrollY > 50 })
      window.removeEventListener('click', handleClickOutside)
    }
  })
</script>