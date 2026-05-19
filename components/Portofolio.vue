<script setup>
  import { ref, onMounted, watch, nextTick, computed } from 'vue'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'

  const route = useRoute()
  const api = useApi()
  
  const portofolio = ref(null)
  const featured = ref([])
  const nonFeatured = ref([])

  // FIX 1: Tentukan batasan awal data non-featured yang ingin ditampilkan (misal: awal hanya muncul 2 item)
  const defaultLimit = 3
  const currentLimit = ref(defaultLimit)

  const fetchPortofolioImg = async () => {
    try {
      let slugParam = route.params.slug;
      const currentLang = (process.client ? localStorage.getItem('user-locale') : 'id') || 'id';

      const res = await api({
        url: '/v1/frontpage/getimgportfolio',
        method: 'GET',
        params: {
          slug: slugParam,
          lang: currentLang
        },
      });

      if (res?.status === '201' || res?.msg === 'Not Found details') {
        portofolio.value = null;
        return;
      }

      portofolio.value = res.data || res;
      featured.value = portofolio.value.featured || [];
      nonFeatured.value = portofolio.value.nofeatured || [];

      // Reset limit setiap kali slug berpindah halaman
      currentLimit.value = defaultLimit

      nextTick(() => {
        if (process.client) {
          ScrollTrigger.refresh();
        }
      });
    } catch (error) {
      console.error("Gagal mengambil detail portofolio:", error);
    }
  };

  // FIX 2: Computed properti untuk memotong isi array nonFeatured sesuai limit saat ini
  const displayedNonFeatured = computed(() => {
    return nonFeatured.value.slice(0, currentLimit.value)
  })

  // FIX 3: Fungsi logic tombol Show More / Show Less
  const hasMoreItems = computed(() => {
    return currentLimit.value < nonFeatured.value.length
  })

  const toggleShowMore = () => {
    if (hasMoreItems.value) {
      // Jika masih ada sisa data, tampilkan semuanya
      currentLimit.value = nonFeatured.value.length
    } else {
      // Jika data sudah terbuka semua, tombol bisa dipakai untuk menciutkan kembali (opsional)
      currentLimit.value = defaultLimit
    }
    
    // Refresh scroll trigger agar kalkulasi animasi GSAP tidak berantakan setelah element bertambah tinggi
    nextTick(() => {
      if (process.client) ScrollTrigger.refresh();
    });
  }

  watch(() => route.params.slug, () => {
    fetchPortofolioImg()
  })

  onMounted(() => {
    fetchPortofolioImg()
  })
</script>

<template>
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto container px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div class="flex flex-col justify-center pr-4 mb-8 md:mb-0">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Our Portfolio
          </h2>
          <p class="text-gray-600 text-lg leading-relaxed mb-10">
            A curated portfolio of events powered by Undangin, highlighting our commitment to quality, innovation, and seamless event management.
          </p>
          <NuxtLink :to="`/portofolio/`"
            class="w-full px-10 py-4 bg-[#2D3748] text-white text-center rounded-full font-semibold hover:bg-slate-700 transition-colors">
            Portofolio Detail
          </NuxtLink>
        </div>

        <div class="relative group overflow-hidden rounded-[2.5rem]" :key="'feat-' + index" v-for="(item, index) in featured">
          <div class="absolute top-6 left-6 z-10">
            <span v-if="item.featured == 'Y'" class="flex items-center gap-1 px-3 py-1 bg-yellow-100/90 backdrop-blur-sm text-yellow-700 text-xs font-bold rounded-full border border-yellow-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 fill-current" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
              Featured
            </span>
          </div>
          <img 
            :src="item.image_url" 
            :alt="item.title" 
            class="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div class="relative group overflow-hidden rounded-[2.5rem]" :key="'non-feat-' + index" v-for="(item, index) in displayedNonFeatured">
          <div class="absolute top-6 left-6 z-10">
            <span v-if="item.featured == 'Y'" class="flex items-center gap-1 px-3 py-1 bg-yellow-100/90 backdrop-blur-sm text-yellow-700 text-xs font-bold rounded-full border border-yellow-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 fill-current" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
              Featured
            </span>
          </div>
          <img 
            :src="item.image_url" 
            :alt="item.title" 
            class="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      <div v-if="nonFeatured.length > defaultLimit" class="flex justify-center mt-12 w-full">
        <button 
          @click="toggleShowMore"
          class="inline-flex items-center gap-2 px-8 py-3 border-2 border-slate-200 hover:border-slate-800 rounded-full text-sm font-bold text-slate-700 hover:text-slate-900 transition-all duration-300">
          <span>{{ hasMoreItems ? 'Show More Insights' : 'Show Less' }}</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            class="h-4 w-4 transition-transform duration-300"
            :class="{ 'rotate-180': !hasMoreItems }"
            fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

    </div>
  </section>
</template>

<style scoped>
img {
  backface-visibility: hidden;
}
</style>