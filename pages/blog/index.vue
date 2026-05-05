<script setup>
  import { ref, onMounted, computed } from 'vue';

  const api = useApi();
  const visibleCount = ref(3);
  const activeCategory = ref('All');
  const categories = ['All', 'Tips', 'Guide', 'Insight', 'Update'];

  const getBlogData = ref({
    posts: []
  });

  const getBlog = async () => {
    try {
      const res = await api({
        url: '/v1/frontpage/getblogpostlist',
        method: 'get'
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

  // Logic untuk memfilter berdasarkan kategori & membatasi jumlah tampilan
  const filteredPosts = computed(() => {
    let posts = getBlogData.value?.posts || [];
    
    if (activeCategory.value !== 'All') {
      posts = posts.filter(p => p.category === activeCategory.value);
    }
    
    return posts.slice(0, visibleCount.value);
  });

  const hasMore = computed(() => {
    const totalFiltered = (getBlogData.value?.posts || []).filter(p => 
      activeCategory.value === 'All' ? true : p.category === activeCategory.value
    ).length;
    return totalFiltered > visibleCount.value;
  });

  const showMore = () => {
    visibleCount.value += 3;
  };

  onMounted(() => {
    getBlog();
  });
</script>

<template>
  <section class="py-24 px-6 bg-[#FBFCFE]">
    <div class="max-w-7xl mx-auto">

      <!-- Header & Search -->
      <div class="text-center mb-12">
        <h2 class="text-5xl md:text-6xl font-bold text-[#1A1A1A] mb-6 tracking-tighter">
          Insight and Inspiration,<br> Explore Our Blog
        </h2>
        <p class="text-gray-500 text-lg mb-10">Explore expert ideas and useful guides for better event experiences.</p>
        
        <!-- Search Bar (Placeholder sesuai desain) -->
        <div class="relative max-w-xl mx-auto mb-16">
          <input type="text" placeholder="Search for blog" class="w-full py-4 px-6 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <!-- TOP PICKS FILTER -->
        <div class="space-y-6">
          <h3 class="text-lg font-bold text-gray-900">Top 3 Picks</h3>
          <div class="flex flex-wrap justify-center gap-3">
            <button 
              v-for="cat in categories" 
              :key="cat"
              @click="activeCategory = cat; visibleCount = 3"
              :class="[
                'px-8 py-2.5 rounded-full text-sm font-bold transition-all',
                activeCategory === cat ? 'bg-[#2D394B] text-white shadow-lg' : 'bg-white text-gray-500 border border-gray-100 hover:bg-gray-50'
              ]"
            >
              {{ cat }}
            </button>
          </div>
        </div>
      </div>

      <!-- Grid Posts -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
        <div v-for="(post, index) in filteredPosts" :key="post.post_id || index"
          class="group flex flex-col h-full bg-white p-4 rounded-[40px] border border-gray-50 hover:shadow-xl transition-all duration-300">
          
          <div class="overflow-hidden rounded-[30px] aspect-[4/3] mb-6">
            <nuxt-link :to="'/blog/' + post.slug">
              <img :src="post.featured_image" :alt="post.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </nuxt-link>
          </div>

          <div class="px-4 pb-6 flex flex-col flex-grow">
            <div class="flex justify-between items-center mb-4">
              <span class="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-lg uppercase">{{ post.category }}</span>
              <span class="text-gray-400 text-xs">{{ post.published_at }}</span>
            </div>

            <h3 class="text-xl font-bold text-[#1A1A1A] mb-3 leading-tight line-clamp-2">{{ post.title }}</h3>
            <p class="text-gray-500 text-sm mb-6 line-clamp-2">{{ post.excerpt || 'Learn more about event management...' }}</p>
            
            <nuxt-link :to="'/blog/' + post.slug" class="mt-auto text-blue-600 font-bold text-sm border-b-2 border-blue-600 w-max pb-0.5">
              Read More
            </nuxt-link>
          </div>
        </div>
      </div>

      <div v-if="hasMore" class="text-center">
        <button @click="showMore" class="px-12 py-4 bg-[#2D394B] text-white rounded-full font-bold hover:bg-[#1A232F] transition-all">
          Show More
        </button> 
      </div>
    </div>
  </section>
</template>