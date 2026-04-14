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

  onMounted(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroSection.value,
        start: "top top",
        end: "+=150%", // Tambah durasi agar transisi lebih lega
        pin: true,
        scrub: 1,
      }
    });

    // 1. Efek Zoom-out: Seluruh container mengecil ke tengah
    tl.to(innerContainer.value, {
      scale: 0.5, // Mengecil lebih jauh agar efek zoom-out kuat
      opacity: 0, // Sambil menghilang
      borderRadius: "100px", // Membuatnya sangat melengkung saat mengecil
      ease: "power2.inOut",
      duration: 1.5
    }, 0);

    // 2. Teks menghilang lebih cepat dari container-nya
    tl.to(content.value, {
      scale: 0.5,
      opacity: 0,
      ease: "power2.inOut",
      duration: 1
    }, 0);

    // 3. KUNCI REVOLUT: Gallery Naik Menutup
    // Kita tarik Gallery ke atas tepat saat Hero mengecil
    tl.to(".featured-gallery", {
      yPercent: -100, // Menarik Gallery naik ke posisi Hero
      ease: "none",
      duration: 1.5
    }, 0);
  });
</script>

<template>
  <section ref="heroSection" class="relative h-screen bg-white overflow-hidden z-20">
    <div 
      ref="innerContainer" 
      class="relative w-full h-full overflow-hidden flex items-center "
    >
      <div 
        class="absolute inset-0 bg-cover bg-center z-0"
        style="background-image: url('/images/landingpage.jpg');"
      ></div> 

      <div class="absolute inset-0 bg-gradient-to-tr from-blue-900/40 via-transparent to-transparent z-20"></div>

      <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-8 md:px-20 relative z-30">
        
        <div ref="content" class="flex flex-col items-start text-left">
          <span class="inline-block px-4 py-1.5 mb-8 text-xs font-bold tracking-[0.1em] border border-black/20 rounded-full text-black">
            Leading Guest Solution
          </span>
          
          <h1 class="text-7xl md:text-[110px] font-bold leading-[0.85] tracking-tighter text-white mb-10">
            Manage Your Events
            <span class="text-blue-500">Perfectly.</span>
          </h1>
          
          <p class="text-xl md:text-2xl text-black mb-12 max-w-md leading-relaxed">
            All-in-one Guest Management platform for digital invitations, RSVP and ticketing
          </p>
          
          <div class="flex gap-2">
            <button class="px-10 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all transform hover:scale-105 shadow-xl shadow-blue-500/20">
              Get Started
            </button>
            <button class="px-10 py-2 bg-transparent border border-black/20 text-black rounded-full font-bold hover:bg-black/10 transition-all transform hover:scale-105">
              View Services
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>