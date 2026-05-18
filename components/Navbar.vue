<template>
  <nav ref="navRef" style="pointer-events: auto;" :class="[
    'fixed top-0 w-full z-[100] transition-all duration-300 px-6 py-4 will-change-transform',
    isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
  ]">
  <div class="container">
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      <div class="flex items-center space-x-12">
        <nuxt-link to="/" class="flex items-center">
          <img src="/images/undangin-logo.png" alt="Undangin Logo"
            class="h-8 md:h-10 w-auto "/>
        </nuxt-link>
        <div :class="[
            'hidden md:flex space-x-8 font-medium transition-colors items-center',
            isScrolled ? 'text-gray-600' : 'text-black-600'
          ]">
          <nuxt-link to="/" class="hover:text-blue-500 transition">Home</nuxt-link>
          <button @click="navigateToServices" class="hover:text-blue-500 transition text-left font-medium">Services</button>
          <nuxt-link to="/portofolio" class="hover:text-blue-500 transition">Portofolio</nuxt-link>
          <nuxt-link to="/blog" class="hover:text-blue-500 transition">Blog & Article</nuxt-link>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <div class="relative" ref="dropdownRef">
          <button @click="isDropdownOpen = !isDropdownOpen"
            class="flex items-center gap-2 bg-black/5 backdrop-blur-md px-3 md:px-4 py-2 rounded-full border border-black/10 hover:bg-black/10 transition-all text-[10px] md:text-xs font-bold"
            :class="isScrolled ? 'text-black' : 'text-black border-white/20'">
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
                :class="locale === 'id' ? 'text-black-600' : 'text-gray-700'">
                Bahasa Indonesia
              </button>
              <button @click="changeLanguage('en')"
                class="w-full text-left px-4 py-3 text-xs font-bold flex items-center justify-between hover:bg-blue-50 transition-colors"
                :class="locale === 'en' ? 'text-black-600' : 'text-gray-700'">
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
    </div>
    <div ref="menuOverlay"
      class="fixed top-0 right-0 h-screen w-[85%] md:w-[33%] bg-white z-[105] shadow-[-10px_0_30px_rgba(0,0,0,0.1)] translate-x-[100%] flex flex-col p-10 pt-32 space-y-6">
      <nuxt-link @click="toggleMenu" to="#" class="text-xl font-bold text-black border-b border-gray-50 pb-4">Home
      </nuxt-link>
      <nuxt-link @click="toggleMenu" to="#" class="text-xl font-bold text-black border-b border-gray-50 pb-4">Services
      </nuxt-link>
      <nuxt-link @click="toggleMenu" to="#" class="text-xl font-bold text-black border-b border-gray-50 pb-4">Portofolio
      </nuxt-link>
      <nuxt-link @click="toggleMenu" to="#" class="text-xl font-bold text-black border-b border-gray-50 pb-4">Blog &
        Article</nuxt-link>
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
import { ref, onMounted, nextTick, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const isScrolled = ref(false)
const isMenuOpen = ref(false)
const isDropdownOpen = ref(false)

const navRef = ref(null)
const menuOverlay = ref(null)
const dropdownRef = ref(null)

const router = useRouter()
let scrollTriggerInstance = null // Simpan instance agar bisa dihancurkan/dibuat ulang

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

// Handler scroll dipisah agar bisa di-remove dengan benar saat unmount
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

// Fungsi utama untuk menginisialisasi ulang ScrollTrigger Navbar
const initNavbarScrollTrigger = async () => {
  if (!process.client) return

  await nextTick()
  
  // Hancurkan instance lama agar tidak bentrok
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill()
    scrollTriggerInstance = null
  }

  const heroTarget = document.querySelector("#hero-trigger")

  if (heroTarget && navRef.value) {
    // === SKENARIO A: JIKA DI HALAMAN HOME (ADA HERO) ===
    // Mengikuti pergerakan Hero Section agar presisi dengan animasi gambar mengecil
    gsap.set(navRef.value, { yPercent: 0 })

    scrollTriggerInstance = ScrollTrigger.create({
      trigger: heroTarget,
      start: "top top",
      end: "bottom top",
      onLeave: () => hideNavbar(),
      onEnterBack: () => showNavbar()
    })
  } else if (navRef.value) {
    // === SKENARIO B: JIKA DI HALAMAN LAIN (PORTOFOLIO, BLOG, DLL) ===
    // Menggunakan scroll body global. Ketika scroll turun melewati 150px, navbar sembunyi.
    gsap.set(navRef.value, { yPercent: 0 })

    scrollTriggerInstance = ScrollTrigger.create({
      start: "top -150", // Mulai tericu ketika user scroll ke bawah sejauh 150px
      onUpdate: (self) => {
        // self.direction: 1 artinya scroll ke bawah, -1 artinya scroll ke atas
        if (self.direction === 1) {
          hideNavbar()
        } else {
          showNavbar()
        }
      }
    })
  }
}

// Fungsi helper untuk menyembunyikan Navbar
const hideNavbar = () => {
  gsap.to(navRef.value, {
    yPercent: -120,
    duration: 0.4,
    ease: "power2.inOut",
    overwrite: "auto"
  })
}

// Fungsi helper untuk memunculkan Navbar
const showNavbar = () => {
  gsap.to(navRef.value, {
    yPercent: 0,
    duration: 0.4,
    ease: "power2.out",
    overwrite: "auto"
  })
}

// Tambahkan fungsi ini di bagian bawah <script setup> sebelum onMounted

const navigateToServices = async () => {
  if (!process.client) return

  // Cek apakah user saat ini sedang berada di halaman Home
  if (router.currentRoute.value.path === '/') {
    const target = document.querySelector("#ticket-section")
    if (target) {
      target.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      })
    }
  } else {
    // Jika sedang di page lain (/portofolio atau /blog), lempar balik ke Home dengan hash target
    await router.push({ path: '/', hash: '#ticket-section' })
    
    // Berikan sedikit waktu agar Nuxt merender ulang halaman utama sebelum melakukan scroll
    setTimeout(() => {
      const target = document.querySelector("#ticket-section")
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 300)
  }
}

onMounted(() => {
  if (process.client) {
    const savedLocale = localStorage.getItem('user-locale') || 'id'
    setLocale ? setLocale(savedLocale) : (locale.value = savedLocale)
    
    gsap.registerPlugin(ScrollTrigger)

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('click', handleClickOutside)

    // Jalankan pertama kali saat aplikasi di-refresh/diakses langsung
    initNavbarScrollTrigger()

    // SOLUSI: Berikan sedikit jeda (delay) saat memantau perpindahan halaman 
    // agar DOM halaman baru selesai di-render sempurna oleh Nuxt 3
    watch(
      () => router.currentRoute.value.path,
      () => {
        // Hancurkan trigger lama dengan segera agar tidak conflict
        if (scrollTriggerInstance) {
          scrollTriggerInstance.kill()
          scrollTriggerInstance = null
        }
        
        // Reset posisi navbar ke default agar tidak tersangkut sembunyi
        gsap.set(navRef.value, { yPercent: 0 })

        // Berikan delay aman 100ms-200ms untuk proses transisi halaman Nuxt SPA
        setTimeout(async () => {
          await initNavbarScrollTrigger()
          ScrollTrigger.refresh()
        }, 200) 
      }
    )

    watch(locale, async () => {
      await nextTick()
      ScrollTrigger.refresh()
      isScrolled.value = window.scrollY > 50
    })
  }
})
</script>