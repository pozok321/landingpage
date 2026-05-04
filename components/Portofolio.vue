<template>
  <div class="bg-white py-16 px-4 sm:px-6 lg:px-8">
    <!-- Header & Filter Tabs -->
    <div class="max-w-7xl mx-auto text-center mb-12">
      <h2 class="text-4xl font-bold text-slate-900 mb-4">Showcasing Our Experience</h2>
      
      <div class="inline-flex flex-col items-center mt-8">
        <span class="text-sm font-semibold text-slate-900 mb-3">Our Masterpiece Managing</span>
        <div class="bg-slate-100 p-1.5 rounded-full flex gap-2">
          <button 
            v-for="tab in ['private', 'ticketing']" 
            :key="tab"
            @click="activeTab = tab"
            :class="activeTab === tab ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-500 hover:text-slate-700'"
            class="px-10 py-2 rounded-full text-sm font-medium transition-all duration-300 capitalize"
          >
            {{ tab }}
          </button>
        </div>
      </div>
    </div>

    <!-- Grid Konten dengan Animasi Transisi Sederhana -->
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 transition-opacity duration-500" :key="activeTab">
        <div 
          v-for="item in filteredItems" 
          :key="item.id" 
          class="relative group overflow-hidden rounded-2xl aspect-[4/3] bg-slate-200"
        >
          <img 
            :src="item.image" 
            :alt="item.title"
            class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" 
          />
          
          <!-- Badge Category (Optional) -->
          <div class="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-[10px] text-white px-3 py-1 rounded-full uppercase">
            {{ item.category }}
          </div>

          <!-- Overlay Info saat Hover (Khas Portofolio Ticketing) -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <p class="text-white font-bold text-lg">{{ item.title }}</p>
            <p class="text-slate-300 text-xs">{{ item.location }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('private')

// Gabungkan semua data portfolio dalam satu array
const allPortfolios = [
  // DATA PRIVATE (Seperti di Screenshot 2026-04-30 at 16.36.03.jpg)
  { id: 1, category: 'private', title: 'Intimate Wedding', location: 'Jakarta', image: 'https://images.unsplash.com/photo-1519741497674-611481863552' },
  { id: 2, category: 'private', title: 'Garden Vows', location: 'Bali', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622' },
  
  // DATA TICKETING (Event Publik/Komersial)
  { id: 3, category: 'ticketing', title: 'Tech Conference 2026', location: 'ICE BSD', image: 'https://images.unsplash.com/photo-1540575861501-7ad0582373f2' },
  { id: 4, category: 'ticketing', title: 'Music Festival', location: 'Senayan', image: 'https://images.unsplash.com/photo-1459749411177-042180ce673c' },
  { id: 5, category: 'ticketing', title: 'Product Launch', location: 'Surabaya', image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678' },
]

// Fungsi Filter Otomatis
const filteredItems = computed(() => {
  return allPortfolios.filter(item => item.category === activeTab.value)
})
</script>