<script setup>
  import { ref, onMounted, computed } from 'vue';

  const api = useApi();
  const searchQuery = ref(''); 

  const getBlogData = ref({
    posts: []
  });

  const getBlog = async () => {
    try {
      const currentLang = (process.client ? localStorage.getItem('user-locale') : 'id') || 'id';
      const res = await api({
        url: '/v1/frontpage/getblogpostlist',
        method: 'get',
        params: {
          lang: currentLang
        } 
      });
      if (res?.data?.posts) {
        getBlogData.value = res.data;
      } else if (res?.posts) {
        getBlogData.value = res;
      }
    } catch (error) {
      console.error("Gagal mengambil blog:", error);
    }
  };

  // Filter hanya fokus ke input pencarian text saja
  const filteredPosts = computed(() => {
    let posts = getBlogData.value?.posts || [];
    
    if (searchQuery.value.trim() !== '') {
      const keyword = searchQuery.value.toLowerCase().trim();
      posts = posts.filter(p => p.title?.toLowerCase().includes(keyword));
    }
    
    return posts;
  });

  onMounted(() => {
    getBlog();
  });
</script>

<template>
  <section class="py-24 px-6 bg-[#FBFCFE]">
    <div class="max-w-7xl mx-auto">

      <div class="text-center mb-16">
        <h2 class="text-5xl md:text-6xl font-bold text-[#1A1A1A] mb-6 tracking-tighter">
          Insight and Inspiration,<br> Explore Our Blog
        </h2>
        <p class="text-gray-500 text-lg mb-10">Explore expert ideas and useful guides for better event experiences.</p>
        
        <div class="relative max-w-xl mx-auto">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search for blog..." 
            class="w-full py-4 px-6 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-slate-800" 
          />
        </div>
      </div>
      
      <div v-if="filteredPosts.length === 0" class="text-center py-12 text-gray-400 text-lg">
        No articles found matching your criteria.
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
        <div v-for="(post, index) in filteredPosts" :key="post.post_id || index"
          class="group flex flex-col h-full bg-white p-4 rounded-[40px] border border-gray-50 hover:shadow-xl transition-all duration-300">
          
          <div class="overflow-hidden rounded-[30px] aspect-[4/3] mb-6 bg-slate-100">
            <nuxt-link :to="'/blog/detail/' + post.slug">
              <img :src="post.featured_image" :alt="post.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </nuxt-link>
          </div>

          <div class="px-4 pb-6 flex flex-col flex-grow">
            <div class="flex justify-between items-center mb-4">
              <span class="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-lg uppercase">
                {{ post.category || 'Article' }}
              </span>
              <span class="text-gray-400 text-xs">{{ post.published_at }}</span>
            </div>

            <h3 class="text-xl font-bold text-[#1A1A1A] mb-3 leading-tight line-clamp-2">
              {{ post.title }}
            </h3>
            <p class="text-gray-500 text-sm mb-6 line-clamp-2">
              {{ post.excerpt || 'Learn more about event management...' }}
            </p>
            
            <nuxt-link :to="'/blog/detail/' + post.slug" class="mt-auto text-blue-600 font-bold text-sm border-b-2 border-blue-600 w-max pb-0.5">
              Read More
            </nuxt-link>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>