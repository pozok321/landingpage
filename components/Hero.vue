<script setup>
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  onMounted(async () => {
    await nextTick();

    if (process.client) {
      gsap.registerPlugin(ScrollTrigger);     
    }
  });
</script>

<template>
  <section id="hero-trigger" class="relative h-screen bg-white overflow-hidden z-20">
    <div class="relative w-full h-full overflow-hidden flex items-center will-change-transform">
      <div class="absolute inset-0 z-10">
        <img 
          src="/images/landingpage.jpg" 
          class="w-full h-full object-cover"
          alt="Undangin Landing Page"
        />
        <div class="absolute inset-0 bg-black/10"></div>
      </div>
      
      <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-8 md:px-20 relative z-30">
        <div class="flex flex-col items-start text-left">
          <span class="inline-block px-4 py-1.5 mb-8 text-xs bg-white/80 backdrop-blur-sm tracking-[0.1em] border border-black/10 rounded-full text-black font-bold">
            LEADING GUEST SOLUTION
          </span>
          
          <h1 class="text-6xl md:text-[90px] font-bold text-blue-950 leading-[0.9] tracking-tighter mb-10">
            Manage Your Events
            <span class="text-blue-600">Perfectly.</span>
          </h1>
          
          <p class="text-lg md:text-xl text-gray-800 mb-12 max-w-md leading-relaxed font-medium">
            All-in-one Guest Management platform for digital invitations, RSVP and ticketing.
          </p>
          
          <div class="flex gap-4">
            <button class="px-10 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-xl shadow-blue-500/30">
              Get Started
            </button>
            <button class="px-10 py-4 bg-white/20 backdrop-blur-md border border-black/10 text-gray-900 rounded-full font-bold hover:bg-white/40 transition-all transform hover:scale-105">
              View Services
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<style scoped>

:root {
  --hero-height: 200vh; /* Ruang untuk animasi scroll */
}

body {
  margin: 0;
  font-family: sans-serif;
  background: #000;
  color: #fff;
}

.revolut-hero {
  height: var(--hero-height);
  position: relative;
}

.hero-bg-container {
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  z-index: 1;
}

.hero-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.1s ease-out;
}

.hero-content {
  position: sticky;
  top: 30vh; /* Posisi teks */
  z-index: 2;
  text-align: center;
  transition: opacity 0.3s ease;
}

.hero-visual {
  position: sticky;
  top: 50vh;
  z-index: 3;
  display: flex;
  justify-content: center;
  pointer-events: none;
}

.phone-mockup {
  width: 300px;
  transition: transform 0.1s ease-out;
}

.spacer {
  height: 100vh;
  background: #fff;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 10;
}
</style>