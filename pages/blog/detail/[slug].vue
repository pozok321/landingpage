<script setup>
  import { ref, onMounted, watch, nextTick } from 'vue'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'

  const route = useRoute()
  const api = useApi()
  
  const blog = ref(null)
  const tags = ref([])
  const fetchBlogDetail = async () => {
    try {
      let slugParam = route.params.slug;
      const currentLang = (process.client ? localStorage.getItem('user-locale') : 'id') || 'id';

      const res = await api({
        url: '/v1/frontpage/getpostdetails',
        method: 'GET',
        params: {
          slug: slugParam,
          lang: currentLang
        }
      });

      if (res?.status === '201' || res?.msg === 'Not Found details') {
        blog.value = null;
        return;
      }

      blog.value = res.data || res;
      tags.value = blog.value.tags || [];

      nextTick(() => {
        if (process.client) {
          ScrollTrigger.refresh();
        }
      });
    } catch (error) {
      console.error("Gagal mengambil detail blog:", error);
    }
  };

  // --- BAGIAN PENTING: REAKTIVITAS BAHASA ---
  
  // Jika Anda menggunakan Nuxt i18n, pasang watcher ini:
  // const { locale } = useI18n()
  // watch(locale, () => {
  //   fetchBlogDetail()
  // })

  // Jika Anda menggunakan event manual/localStorage change:
  // Kita pantau route params agar saat pindah artikel datanya update
  watch(() => route.params.slug, () => {
    fetchBlogDetail()
  })

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

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div class="lg:col-span-8">
          <article class="prose prose-lg max-w-none text-gray-600 leading-relaxed" v-html="blog.content">
          </article>
          <!-- <div class="mt-16 pt-8 border-t border-gray-100 italic text-gray-400">
            #Undangin #DigitalInvitation #EventTips
          </div> -->
        </div>

        <aside class="lg:col-span-4">
          <div class="sticky top-32">
            <h3 class="text-2xl font-bold text-[#273448] mb-8">Another Insight for you</h3>
            <div class="space-y-6">
              <template v-for="tag in blog.tags" :key="tag.tag_id">
                <div v-for="post in tag.postlist" :key="post.post_id"
                  class="bg-[#F8FAFC] p-6 rounded-3xl hover:shadow-md transition-all group mb-4">
                  <nuxt-link :to="'/blog/detail/' + post.slug">
                    <div class="flex justify-between items-center mb-3">
                      <span class="px-3 py-1 bg-blue-100 text-blue-500 text-[10px] font-bold rounded-full uppercase">
                        {{ tag.tag_name }}
                      </span>
                      <span class="text-gray-400 text-[10px]">{{ post.category }}</span>
                    </div>
                    <div v-if="post.featured_image" class="w-full h-32 rounded-2xl overflow-hidden mb-4">
                      <img :src="post.featured_image" :alt="post.alt_image"
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform">
                    </div>
                    <h4 class="font-bold text-[#273448] mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                      {{ post.title }}
                    </h4>
                    <p class="text-xs text-gray-500 line-clamp-2 mb-4">
                      {{ post.excerpt || 'Explore more insights about how to make your special moments more meaningful.' }}
                    </p>
                    <div class="text-blue-500 text-xs font-bold underline underline-offset-4 decoration-2">
                      Read More
                    </div>
                  </nuxt-link>
                </div>
              </template>
            </div>

            <button @click="navigateTo('/blog')"
              class="w-full mt-8 py-4 border-2 border-gray-100 rounded-2xl font-bold text-gray-400 hover:bg-gray-50 hover:text-[#273448] hover:border-[#273448] transition-all">
              Find more articles
            </button>
          </div>
        </aside>

      </div>
    </div>
  </section>

  <div v-else class="py-24 text-center">
    <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
    <p class="text-gray-500">Loading your special moment...</p>
  </div>

  <Footer />
</template>