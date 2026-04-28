<script setup>
  import {
    gsap
  } from 'gsap';
  import {
    ScrollTrigger
  } from 'gsap/ScrollTrigger';

  if (process.client) {
    gsap.registerPlugin(ScrollTrigger);
  }

  const heroSection = ref(null);
  const innerContainer = ref(null);
  const content = ref(null);

  onMounted(async () => {
  await nextTick();

  // Timeline untuk Hero
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: heroSection.value,
      start: "top top",
      end: "+=100%", // Durasi pindah dari Hero ke Gallery
      pin: true,     // Hero ditahan di layar
      scrub: 1,      // Animasi mengikuti kecepatan scroll
    }
  });

  // 1. Animasi Hero Mengecil dan Menghilang
  tl.to(innerContainer.value, {
    scale: 0.5,      // Mengecil ke tengah
    opacity: 0,      // Benar-benar menghilang
    borderRadius: "150px", 
    ease: "power2.inOut",
  });

  // 2. Animasi Content (Teks) menghilang lebih cepat
  tl.to(content.value, {
    opacity: 0,
    y: -50,          // Teks sedikit naik ke atas saat menghilang
    duration: 0.5
  }, 0); // Mulai bersamaan dengan innerContainer
});

</script>

<template>
  <section ref="heroSection" class="relative h-screen bg-white overflow-hidden z-20">
    <div ref="innerContainer" class="relative w-full h-full overflow-hidden flex items-center will-change-transform">
      <div class="absolute inset-0 bg-cover" style="background-image: url('/images/landingpage.jpg');"></div> 
      
      <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-8 md:px-20 relative z-30">
        
        <div ref="content" class="flex flex-col items-start text-left">
          <span class="inline-block px-4 py-1.5 mb-8 text-xs bg-gray-300 tracking-[0.1em] border border-black/20 rounded-full text-black">
            Leading Guest Solution
          </span>
          
          <h1 class="text-7xl md:text-[100px] font-bold text-blue-950 leading-[1] tracking-tighter mb-10 ">
            Manage Your Events
            <span class="text-blue-500">Perfectly.</span>
          </h1>
          
          <p class="text-xl md:text-xl text-black mb-12 max-w-md leading-relaxed">
            All-in-one Guest Management platform for digital invitations, RSVP and ticketing
          </p>
          
          <div class="flex gap-2">
            <button class="px-10 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all transform hover:scale-105 shadow-xl shadow-blue-500/20">
              Get Started
            </button>
            <button class="px-10 py-2 bg-transparent border border-black/20 text-gray-600 rounded-full  hover:bg-black/10 transition-all transform hover:scale-105">
              View Services
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>