<template>
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto container">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <!-- Kolom 1: Header Teks -->
        <div class="flex flex-col justify-center pr-4 mb-8 md:mb-0">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Our Portfolio
          </h2>
          <p class="text-gray-600 text-lg leading-relaxed mb-10">
            A curated portfolio of events powered by Undangin, highlighting our commitment to quality, innovation, and seamless event management.
          </p>

        <NuxtLink :to="`/portofolio/`"
          class="w-full md:w-max px-10 py-4 bg-[#2D3748] text-white rounded-full font-semibold hover:bg-slate-700 transition-colors">
          Portofolio Detail
        </NuxtLink>
        </div>

        <!-- Kolom 2: Featured Image 1 -->
        <div class="relative group overflow-hidden rounded-[2.5rem]">
          <div class="absolute top-6 left-6 z-10">
            <span class="flex items-center gap-1 px-3 py-1 bg-yellow-100/90 backdrop-blur-sm text-yellow-700 text-xs font-bold rounded-full border border-yellow-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 fill-current" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
              Featured
            </span>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop" 
            alt="Wedding Event" 
            class="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <!-- Kolom 3: Featured Image 2 -->
        <div class="relative group overflow-hidden rounded-[2.5rem]">
          <div class="absolute top-6 left-6 z-10">
            <span class="flex items-center gap-1 px-3 py-1 bg-yellow-100/90 backdrop-blur-sm text-yellow-700 text-xs font-bold rounded-full border border-yellow-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 fill-current" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
              Featured
            </span>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop" 
            alt="Horse Wedding" 
            class="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <!-- Baris Bawah: Grid 3 Kolom -->
        <div class="overflow-hidden rounded-[2.5rem]">
          <img 
            src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop" 
            alt="Check in event" 
            class="w-full h-[350px] object-cover"
          />
        </div>

        <div class="overflow-hidden rounded-[2.5rem]">
          <img 
            src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop" 
            alt="Check in event" 
            class="w-full h-[350px] object-cover"
          />
        </div>

        <div class="overflow-hidden rounded-[2.5rem]">
           <img 
            src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop" 
            alt="Check in event" 
            class="w-full h-[350px] object-cover"
          />
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>

</script>

<style scoped>
img {
  backface-visibility: hidden;
}
</style>