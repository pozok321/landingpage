<template>
  <nav 
    :class="[
      'fixed top-0 w-full z-50 transition-all duration-300 px-6 py-4',
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
    ]"
  >
    <div class="max-w-6xl mx-auto flex justify-between items-center">
      <div 
        :class="[
          'hidden md:flex space-x-8 font-medium transition-colors items-center',
          isScrolled ? 'text-gray-600' : 'text-white/90'
        ]"
      >
        <a href="/" class="flex items-center">
        <img 
          src="/public/images/undangin-logo.png" 
          alt="Undangin Logo" 
          class="h-8 md:h-10 w-auto object-contain transition-all"
          :class="[isScrolled ? 'brightness-100' : 'brightness-0 invert']"
        />
        </a>
        <a href="#" class="hover:text-blue-500 transition">Gallery</a>
        <a href="#" class="hover:text-blue-500 transition">Features</a>
        <a href="#" class="hover:text-blue-500 transition">Contact</a>
      </div>

      <button 
        class="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-500/30"
      >
        Get Started
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const isScrolled = ref(false)
const navRef = ref(null)

// Di Navbar.vue <script setup>
onMounted(() => {
  const nav = document.querySelector('nav');
  ScrollTrigger.create({
    start: "top top",
    onUpdate: (self) => {
      // Jika scroll ke bawah, navbar naik (sembunyi)
      // Jika scroll ke atas, navbar balik (muncul)
      if (self.direction === 1) {
        gsap.to(nav, { yPercent: -100, opacity: 0, duration: 0.5 });
      } else {
        gsap.to(nav, { yPercent: 0, opacity: 1, duration: 0.5 });
      }
    }
  });
});
</script>