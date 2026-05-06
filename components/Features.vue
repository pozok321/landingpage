<script setup>
  import {
    gsap
  } from 'gsap';
  import {
    onMounted,
    onUnmounted,
    ref,
    nextTick
  } from 'vue';

  const currentIndex = ref(0);
  let autoSlideInterval = null;

  const slides = [{
      id: 'fast-setup'
    },
    {
      id: 'support'
    },
    {
      id: 'security'
    },
    {
      id: 'analytics'
    },
    {
      id: 'multiplatform'
    },
    {
      id: 'savetimes'
    }
  ];

  const goToSlide = (index) => {
    // Logic untuk looping (jika index < 0 balik ke akhir, jika lebih balik ke awal)
    if (index < 0) {
      currentIndex.value = slides.length - 1;
    } else if (index >= slides.length) {
      currentIndex.value = 0;
    } else {
      currentIndex.value = index;
    }

    gsap.to('.slide-item', {
      xPercent: -100 * currentIndex.value,
      duration: 1.2,
      ease: "power3.inOut"
    });

    // Reset timer auto-slide setiap kali user klik manual agar tidak bentrok
    resetTimer();
  };

  const nextSlide = () => goToSlide(currentIndex.value + 1);
  const prevSlide = () => goToSlide(currentIndex.value - 1);

  const resetTimer = () => {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
      nextSlide();
    }, 5000);
  };

  onMounted(async () => {
    await nextTick();
    resetTimer();
  });

  onUnmounted(() => {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
  });
</script>

<template>
  <div class="relative overflow-hidden bg-black w-full h-screen group">
    <div class="flex w-full h-full items-center container">
      <section class="slide-item w-full h-full flex-shrink-0 relative flex items-center justify-center bg-black">
        <div class="absolute inset-0">
          <img src="/images/fastsetup.png" class="w-full h-full object-cover opacity-50" alt="BG" />
        </div>
        <div class="relative z-10 text-center px-6">
          <h2 class="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Built for Effortless Event Management
          </h2>

          <div class="max-w-3xl mx-auto mb-12">
            <p class="text-gray-300 text-sm md:text-base leading-relaxed">
              Powerful features designed to simplify event planning, streamline guest management, and ensure a seamless event experience.
            </p>
          </div>
          <div class="inline-block p-10 bg-white/5 backdrop-blur-2xl border border-white/20 rounded-[40px]">
            <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6">
              <img src="/images/fastsetup-icon.svg" class="w-8" alt="Icon" />
            </div>
            <h3 class="text-white text-2xl font-bold">Fast Setup</h3>
            <p class="text-gray-400">Ready in minutes</p>
          </div>
          <div class="max-w-3xl mx-auto mt-4">
            <p class="text-gray-300 text-sm md:text-base leading-relaxed">
              Get your event up and running in minutes with a simple and intuitive setup process, allowing you to focus
              more on planning a successful and memorable event.
            </p>
          </div>
        </div>
      </section>

      <section class="slide-item w-full h-full flex-shrink-0 relative flex items-center justify-center bg-black">
        <div class="absolute inset-0">
          <img src="/images/support.png" class="w-full h-full object-cover opacity-50" alt="BG" />
        </div>

        <div class="relative z-10 text-center px-6">
          <h2 class="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Built for Effortless Event Management
          </h2>

          <div class="max-w-3xl mx-auto mb-12">
            <p class="text-gray-300 text-sm md:text-base leading-relaxed">
              Powerful features designed to simplify event planning, streamline guest management, and ensure a seamless event experience.
            </p>
          </div>
          <div class="inline-block p-10 bg-white/5 backdrop-blur-2xl border border-white/20 rounded-[40px]">
            <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6">
              <img src="/images/support-icon.svg" class="w-8" alt="Icon" />
            </div>
            <h3 class="text-white text-2xl font-bold">24/7 Support</h3>
            <p class="text-gray-400">Always ready to help</p>
          </div>
          <div class="max-w-3xl mx-auto mt-4">
            <p class="text-gray-300 text-sm md:text-base leading-relaxed">
              Our dedicated support team is available around the clock to assist you whenever you need help, ensuring
              your events run smoothly without interruptions.
            </p>
          </div>
        </div>
      </section>

      <section class="slide-item w-full h-full flex-shrink-0 relative flex items-center justify-center bg-black">
        <div class="absolute inset-0">
          <img src="/images/security.png" class="w-full h-full object-cover opacity-50" alt="BG" />
        </div>
        <div class="relative z-10 text-center px-6">
          <h2 class="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Built for Effortless Event Management
          </h2>

          <div class="max-w-3xl mx-auto mb-12">
            <p class="text-gray-300 text-sm md:text-base leading-relaxed">
              Powerful features designed to simplify event planning, streamline guest management, and ensure a seamless event experience.
            </p>
          </div>
          <div class="inline-block p-10 bg-white/5 backdrop-blur-2xl border border-white/20 rounded-[40px]">
            <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6">
              <img src="/images/security-icon.svg" class="w-8" alt="Icon" />
            </div>
            <h3 class="text-white text-2xl font-bold">Data Security</h3>
            <p class="text-gray-400">Guest data stored <br>securely and encrypted</p>
          </div>
          <div class="max-w-3xl mx-auto mt-4">
            <p class="text-gray-300 text-sm md:text-base leading-relaxed">
              We prioritize the security of your event and guest data with advanced protection systems, ensuring that
              all information remains safe, secure, and reliable.
            </p>
          </div>
        </div>
      </section>

      <section class="slide-item w-full h-full flex-shrink-0 relative flex items-center justify-center bg-black">
        <div class="absolute inset-0">
          <img src="/images/realtime-analytic.png" class="w-full h-full object-cover opacity-50" alt="BG" />
        </div>
        <div class="relative z-10 text-center px-6">
          <h2 class="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Built for Effortless Event Management
          </h2>

          <div class="max-w-3xl mx-auto mb-12">
            <p class="text-gray-300 text-sm md:text-base leading-relaxed">
              Powerful features designed to simplify event planning, streamline guest management, and ensure a seamless event experience.
            </p>
          </div>
          <div class="inline-block p-10 bg-white/5 backdrop-blur-2xl border border-white/20 rounded-[40px]">
            <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6">
              <img src="/images/analytics-icon.svg" class="w-8" alt="Icon" />
            </div>
            <h3 class="text-white text-2xl font-bold">Analytics</h3>
            <p class="text-gray-400">Gain insights with <br>real-time analytics</p>
          </div>
          <div class="max-w-3xl mx-auto mt-4">
            <p class="text-gray-300 text-sm md:text-base leading-relaxed">
            Track event performance and guest engagement in real time with clear insights and data visualization, helping you make better decisions throughout your event.
            </p>
          </div>
        </div>
      </section>

      <section class="slide-item w-full h-full flex-shrink-0 relative flex items-center justify-center bg-black">
        <div class="absolute inset-0">
          <img src="/images/multiplatform.png" class="w-full h-full object-cover opacity-50" alt="BG" />
        </div>
        <div class="relative z-10 text-center px-6">
          <h2 class="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Built for Effortless Event Management
          </h2>

          <div class="max-w-3xl mx-auto mb-12">
            <p class="text-gray-300 text-sm md:text-base leading-relaxed">
              Powerful features designed to simplify event planning, streamline guest management, and ensure a seamless event experience.
            </p>
          </div>
          <div class="inline-block p-10 bg-white/5 backdrop-blur-2xl border border-white/20 rounded-[40px]">
            <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6">
              <img src="/images/multiplatform-icon.svg" class="w-8" alt="Icon" />
            </div>
            <h3 class="text-white text-2xl font-bold">Multi-Platform Support</h3>
            <p class="text-gray-400">Access from any device</p>
          </div>
          <div class="max-w-3xl mx-auto mt-4">
            <p class="text-gray-300 text-sm md:text-base leading-relaxed">
            Manage and monitor your events seamlessly across multiple devices, including desktop, tablet, and mobile, giving you full control wherever you are.
            </p>
          </div>
        </div>
      </section>

      <section class="slide-item w-full h-full flex-shrink-0 relative flex items-center justify-center bg-black">
        <div class="absolute inset-0">
          <img src="/images/savetime.png" class="w-full h-full object-cover opacity-50" alt="BG" />
        </div>
        <div class="relative z-10 text-center px-6">
          <h2 class="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Built for Effortless Event Management
          </h2>

          <div class="max-w-3xl mx-auto mb-12">
            <p class="text-gray-300 text-sm md:text-base leading-relaxed">
              Powerful features designed to simplify event planning, streamline guest management, and ensure a seamless event experience.
            </p>
          </div>
          <div class="inline-block p-10 bg-white/5 backdrop-blur-2xl border border-white/20 rounded-[40px]">
            <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6">
              <img src="/images/savetime-icon.svg" class="w-8" alt="Icon" />
            </div>
            <h3 class="text-white text-2xl font-bold">Save Time</h3>
            <p class="text-gray-400">Automate RSVP and <br> registration processes</p>
          </div>
          <div class="max-w-3xl mx-auto mt-4">
            <p class="text-gray-300 text-sm md:text-base leading-relaxed">
            Automate repetitive tasks and streamline event management processes so you can save valuable time and focus on creating exceptional event experiences.
            </p>
          </div>
        </div>
      </section>

    </div>

    <button @click="prevSlide"
      class="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all hover:bg-white hover:text-black opacity-0 group-hover:opacity-100">
      <i class="bx bx-chevron-left text-3xl"></i>
    </button>

    <button @click="nextSlide"
      class="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all hover:bg-white hover:text-black opacity-0 group-hover:opacity-100">
      <i class="bx bx-chevron-right text-3xl"></i>
    </button>

    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
      <button v-for="(slide, index) in slides" :key="index" @click="goToSlide(index)" :class="[
          'h-2 rounded-full transition-all duration-500',
          currentIndex === index ? 'w-8 bg-blue-500' : 'w-2 bg-gray-400'
        ]"></button>
    </div>
  </div>
</template>

<style scoped>
  .slide-item {
    will-change: transform;
  }
</style>