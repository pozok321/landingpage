<template>
  <nav 
    ref="navRef"
    :class="[
      'fixed top-0 w-full z-[100] transition-all duration-300 px-6 py-4',
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
    ]"
  >
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      <div class="flex items-center space-x-12">
        <a href="/" class="flex items-center">
          <img 
            src="/images/undangin-logo.png" 
            alt="Undangin Logo" 
            class="h-8 md:h-10 w-auto object-contain transition-all"
            :class="[isScrolled ? 'brightness-100' : 'brightness-0 invert']"
          />
        </a>

        <div 
          :class="[
            'hidden md:flex space-x-8 font-medium transition-colors items-center',
            isScrolled ? 'text-gray-600' : 'text-white/90'
          ]"
        >
          <a href="#" class="hover:text-blue-500 transition">Gallery</a>
          <a href="#" class="hover:text-blue-500 transition">Features</a>
          <a href="#" class="hover:text-blue-500 transition">Contact</a>
        </div>
      </div>

      <div class="flex items-center space-x-4">
        <button 
          class="hidden sm:block bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-500/20"
        >
          Get Started
        </button>

        <button 
          @click="toggleMenu"
          class="md:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5 z-[110]"
        >
          <span :class="['w-6 h-0.5 transition-all duration-300', isMenuOpen ? 'rotate-45 translate-y-2 bg-black' : (isScrolled ? 'bg-black' : 'bg-white')]"></span>
          <span :class="['w-6 h-0.5 transition-all duration-300', isMenuOpen ? 'opacity-0' : (isScrolled ? 'bg-black' : 'bg-white')]"></span>
          <span :class="['w-6 h-0.5 transition-all duration-300', isMenuOpen ? '-rotate-45 -translate-y-2 bg-black' : (isScrolled ? 'bg-black' : 'bg-white')]"></span>
        </button>
      </div>
    </div>

    <div 
  ref="menuOverlay"
  class="fixed top-0 right-0 h-screen w-[75%] md:w-[33%] bg-white z-[105] shadow-[-10px_0_30px_rgba(0,0,0,0.1)] translate-x-[100%] flex flex-col p-10 pt-32 space-y-8"
>
  <a @click="toggleMenu" href="#" class="text-2xl font-bold text-black border-b border-gray-100 pb-4">Gallery</a>
  <a @click="toggleMenu" href="#" class="text-2xl font-bold text-black border-b border-gray-100 pb-4">Features</a>
  <a @click="toggleMenu" href="#" class="text-2xl font-bold text-black border-b border-gray-100 pb-4">Contact</a>
  
  <div class="pt-10">
    <button class="w-full bg-blue-600 text-white px-6 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-500/20">
      Get Started
    </button>
  </div>
</div>

<div 
  v-if="isMenuOpen" 
  @click="toggleMenu"
  class="fixed inset-0 bg-black/20 backdrop-blur-sm z-[104]"
></div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const isScrolled = ref(false)
const isMenuOpen = ref(false)
const navRef = ref(null)
const menuOverlay = ref(null)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  
  if (isMenuOpen.value) {
    // Animasi Drawer Masuk dari Kanan
    gsap.to(menuOverlay.value, {
      xPercent: -100, // Menarik drawer ke dalam layar
      duration: 0.6,
      ease: "expo.out"
    })
  } else {
    // Animasi Drawer Keluar ke Kanan
    gsap.to(menuOverlay.value, {
      xPercent: 0, 
      duration: 0.5,
      ease: "expo.in"
    })
  }
}

onMounted(() => {
  if (process.client) {
    gsap.registerPlugin(ScrollTrigger)
    
    // Update isScrolled state
    window.addEventListener('scroll', () => {
      isScrolled.value = window.scrollY > 50
    })

    // Navbar Auto-hide on Scroll
    ScrollTrigger.create({
      start: "top top",
      onUpdate: (self) => {
        if (!isMenuOpen.value) { // Hanya auto-hide jika menu mobile tertutup
          if (self.direction === 1) {
            gsap.to(navRef.value, { yPercent: -100, duration: 0.4, ease: "power2.inOut" })
          } else {
            gsap.to(navRef.value, { yPercent: 0, duration: 0.4, ease: "power2.out" })
          }
        }
      }
    })
  }
})
</script>