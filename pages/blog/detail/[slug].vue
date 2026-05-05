<script setup>
  import {
    ScrollTrigger
  } from 'gsap/ScrollTrigger'
  const route = useRoute()
  const config = useRuntimeConfig()
  const api = useApi()
  const blog = ref(null)
  const aside = ref([])

  const fetchBlogDetail = async () => {
    try {
      // Ambil slug dari params, tapi jika terpotong, kita ambil manual dari fullPath
      let slugParam = route.params.slug;

      // Logika tambahan: jika URL asli mengandung '?', route.params.slug biasanya terpotong.
      // Kita ambil string setelah '/blog/' secara manual untuk memastikan keutuhan.
      const fullPath = route.fullPath;
      if (fullPath.includes('/blog/')) {
        slugParam = fullPath.split('/blog/')[1];
      }

      console.log("Slug yang akan dikirim:", slugParam);

      const res = await api({
        url: '/v1/frontpage/getpostdetails',
        method: 'GET',
        params: {
          slug: slugParam
        }
      });

      // Validasi respons "Not Found" dari backend Undangin
      if (res ?.status === '201' || res ?.msg === 'Not Found details') {
        console.error("Artikel tidak ditemukan");
        blog.value = null;
        return;
      }

      // Set data blog
      blog.value = res.data || res;
      aside.value = res;

      nextTick(() => {
        if (process.client) {
          ScrollTrigger.refresh();
        }
      });
    } catch (error) {
      console.error("Gagal mengambil detail blog:", error);
    }
  };

  onMounted(() => {
    fetchBlogDetail()
  })
</script>

<template>
  <section v-if="blog" class="py-12 md:py-20 bg-white">
    <div class="max-w-7xl mx-auto px-6">
      <div class="mb-8">
        <span class="px-4 py-1 bg-blue-100 text-blue-600 text-xs font-bold rounded-full uppercase">
          {{ blog.category || 'Article' }}
        </span>
        <div class="mt-4 text-gray-400 text-sm">
          Published : {{ blog.published_at }} | Author : 
          <span class="text-[#273448] font-bold">{{ blog.fullname }}</span>
        </div>
      </div>

      <h1 class="text-4xl md:text-6xl font-bold text-[#273448] mb-10 tracking-tighter">
        {{ blog.title }}
      </h1>

      <div class="w-full aspect-video rounded-[32px] overflow-hidden mb-12 shadow-lg">
        <img :src="blog.featured_image" :alt="blog.alt_image" class="w-full h-full object-cover" />
      </div>

      <!-- GRID SYSTEM DIMULAI DI SINI -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        <!-- KOLOM KIRI: Content Utama (8 Kolom) -->
        <div class="lg:col-span-12">
          <article class="prose prose-lg max-w-none text-gray-600 leading-relaxed" v-html="blog.content">
          </article>
          
          <!-- Opsional: Tambahkan Hashtag di sini jika ada -->
          <div class="mt-16 pt-8 border-t border-gray-100 italic text-gray-400">
             #Undangin #DigitalInvitation #EventTips
          </div>
        </div>

        <!-- KOLOM KANAN: Sidebar (4 Kolom) -->
        <!-- <aside class="lg:col-span-4">
          <div class="sticky top-32">
            <h3 class="text-2xl font-bold text-[#273448] mb-8">Another Insight for you</h3>
            
            <div class="space-y-6">
              <div v-for="(post, index) in aside" :key="post.index" 
                   class="bg-[#F8FAFC] p-6 rounded-3xl hover:shadow-md transition-all group">
                
                <div class="flex justify-between items-center mb-3">
                  <span class="px-3 py-1 bg-blue-100 text-blue-500 text-[10px] font-bold rounded-full uppercase">
                    {{ post.excerpt }}
                  </span>
                  <span class="text-gray-400 text-[10px]">{{ post.published_at }}</span>
                </div>

                <h4 class="font-bold text-[#273448] mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                  {{ post.title }}
                </h4>
                
                <p class="text-xs text-gray-500 line-clamp-2 mb-4">
                  Explore more insights about how to make your special moments more meaningful.
                </p>

                <NuxtLink :to="`/blog/${post.slug}`" 
                          class="text-blue-500 text-xs font-bold underline underline-offset-4 decoration-2">
                  Read More
                </NuxtLink>
              </div>
            </div>

            <button @click="router.push('/blog')" 
                    class="w-full mt-8 py-4 border-2 border-gray-100 rounded-2xl font-bold text-gray-400 hover:bg-gray-50 hover:text-[#273448] hover:border-[#273448] transition-all">
              Find more articles
            </button>
          </div>
        </aside> -->

      </div> <!-- END GRID -->
    </div>
  </section>

  <!-- Loading State -->
  <div v-else class="py-24 text-center">
    <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
    <p class="text-gray-500">Loading your special moment...</p>
  </div>
  
  <Footer />
</template>