<script setup>
  import {
    gsap
  } from 'gsap';
  import {
    ScrollTrigger
  } from 'gsap/ScrollTrigger';
  import {
    onMounted,
    ref,
    nextTick
  } from 'vue';

  if (process.client) {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Ref untuk container utama
  const galleryRef = ref(null);
  // Ref khusus untuk grid gambar agar rata
  const imageGridRef = ref(null);
  // Ref khusus untuk grid stats agar rata
  const statsGridRef = ref(null);

  onMounted(async () => {
    await nextTick();

    // FIX: Animasi Parallax halus untuk SELURUH container grid gambar (bukan per item)
    if (imageGridRef.value) {
      gsap.to(imageGridRef.value, {
        y: -50, // Bergerak naik sedikit secara bersamaan
        ease: "none",
        scrollTrigger: {
          trigger: imageGridRef.value,
          start: "top bottom", // Mulai saat grid masuk layar
          end: "bottom top", // Selesai saat grid keluar layar
          scrub: true // Mengikuti scroll
        }
      });
    }

    // FIX: Animasi Parallax halus untuk SELURUH container grid stats (bukan per item)
    if (statsGridRef.value) {
      gsap.to(statsGridRef.value, {
        y: -30, // Bergerak naik sedikit bersamaan
        ease: "none",
        scrollTrigger: {
          trigger: statsGridRef.value,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }
  });

  const bentoPhotos = [{
      title: 'Client Satisfaction',
      stats: '99%',
      labelBold: 'Trusted',
      desc: 'by organizers for reliable and seamless event management',
      url: '/images/left-image.png',
    },
    {
      title: 'Event Managed',
      stats: '500+',
      labelBold: 'Successfully',
      desc: 'supporting events across various industries and scales',
      url: '/images/center-image.png',
    },
    {
      title: 'Guest Registered',
      stats: '1 Million+',
      labelBold: 'Millions of guest',
      desc: 'experiences handled smoothly through our platform',
      url: '/images/right-image.png',
    }
  ];
</script>

<template>
  <div ref="galleryRef"
    class="w-full min-h-screen bg-white overflow-hidden px-4 sm:px-8 md:px-16 lg:px-40 py-16 md:py-24">
    <div class="text-center mb-16 md:mb-20">
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-black leading-tight mb-5 tracking-tight">
        Seamless Event Experiences
      </h1>
      <p class="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
        With hundreds of events managed and over a million guests registered, our platform continues to deliver reliable
        event solutions
      </p>
    </div>

    <div ref="imageGridRef" class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 md:mb-24">
      <div v-for="(photo, index) in bentoPhotos" :key="index"
        class="h-[373px] w-full md:w-[286px] mx-auto relative rounded-[32px] overflow-hidden bg-gray-100 shadow-lg group">
        <img :src="photo.url" :alt="photo.title"
          class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

        <div class="absolute inset-0 bg-black/30"></div>

        <div class="relative h-full w-full flex flex-col items-center justify-center text-center px-4">
          <p class="text-white text-sm font-medium mb-1">{{ photo.title }}</p>
          <h2 class="text-white text-5xl md:text-6xl font-bold tracking-tight">
            {{ photo.stats }}
          </h2>
        </div>

        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%]">
          <div class="bg-white/90 backdrop-blur-sm py-3 px-4 rounded-2xl shadow-sm text-center">
            <p class="text-[11px] leading-snug text-gray-800">
              <span class="font-bold">{{ photo.labelBold }}</span> {{ photo.desc }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>