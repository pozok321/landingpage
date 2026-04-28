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

  const config = useRuntimeConfig()

  // Panggil API menggunakan URL dari config
  const {
    data
  } = await useFetch(`${config.public.apiUrl}/events`)

  onMounted(() => {
  })
  const imageGridRef = ref(null);
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
  <section ref="galleryRef" class="w-full bg-white overflow-hidden py-20 md:py-32">
    <div class="container">
      <div class="text-center mb-16 md:mb-24">
        <h1 class="text-4xl md:text-6xl font-bold text-black leading-tight mb-6 tracking-tight">
          Seamless Event Experiences
        </h1>
        <p class="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          With hundreds of events managed and over a million guests registered, our platform continues to deliver reliable event solutions
        </p>
      </div>

      <div ref="imageGridRef" class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="(photo, index) in bentoPhotos" :key="index"
          class="h-[400px] w-full relative rounded-[40px] overflow-hidden bg-gray-100 shadow-xl group">
          
          <img :src="photo.url" :alt="photo.title"
            class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />

          <div class="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60"></div>

          <div class="relative h-full w-full flex flex-col items-center justify-center text-center px-6">
            <p class="text-white/80 text-sm font-medium mb-2 uppercase tracking-widest">{{ photo.title }}</p>
            <h2 class="text-white text-6xl md:text-7xl font-bold tracking-tighter">
              {{ photo.stats }}
            </h2>
          </div>

          <div class="absolute bottom-8 left-1/2 -translate-x-1/2 w-[85%]">
            <div class="bg-white/95 backdrop-blur-md py-4 px-5 rounded-[24px] shadow-lg text-center">
              <p class="text-xs md:text-sm leading-relaxed text-gray-900">
                <span class="font-bold text-blue-600">{{ photo.labelBold }}</span> {{ photo.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>