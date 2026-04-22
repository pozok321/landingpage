<template>
  <section class="relative w-full min-h-screen bg-black flex items-center justify-center overflow-hidden py-20 px-6">
    <div class="absolute inset-0 z-0">
      <img 
        src="/images/fastsetup.png" 
        alt="Background" 
        class="w-full h-full object-cover opacity-80"
      />
      <div class="absolute inset-0 bg-gradient-to-b via-transparent"></div>
    </div>

    <div class="relative z-10 max-w-5xl w-full text-center">
      
      <div class="mb-16">
        <h2 class="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          Built for Effortless Event Management
        </h2>
        <p class="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed opacity-80">
          Powerful features designed to simplify event planning, streamline 
          guest management, and ensure a seamless event experience.
        </p>
      </div>

      <div class="flex justify-center mb-16">
        <div class="w-64 h-80 rounded-[32px] border border-white/20 bg-white/5 flex flex-col items-center justify-center p-8 transition-transform hover:scale-105 duration-500">
          <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-white/10">
            <img src="/public/images/fastsetup-icon.svg" alt="" srcset="">
          </div>
          
          <h3 class="text-white text-xl font-bold mb-2">Fast Setup</h3>
          <p class="text-white text-sm">Ready to use in minutes</p>
        </div>
      </div>

      <div class="max-w-3xl mx-auto">
        <p class="text-gray-300 text-sm md:text-base leading-relaxed">
          Get your event up and running in minutes with a simple and intuitive setup process, allowing you to focus more on planning a successful and memorable event.
        </p>
      </div>

    </div>
  </section>
</template>

<script setup>
// Anda bisa menambahkan GSAP ScrollTrigger di sini jika ingin 
// Card "Fast Setup" muncul perlahan saat di-scroll
</script>