<template>
  <section class="bg-[#2D3A4D] py-20 px-4">
    <div class="max-w-7xl mx-auto">
      <!-- Header Section -->
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4 uppercase tracking-wider">
          As Featured In
        </h2>
        <p class="text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Our platform has been featured by leading media outlets highlighting our innovation in event and guest management technology
        </p>
      </div>

      <!-- News Cards Slider -->
      <div class="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 scrollbar-hide">
        <div 
          v-for="(article, index) in newsArticles" 
          :key="index"
          class="min-w-[320px] md:min-w-[380px] snap-center bg-white rounded-[2rem] p-8 flex flex-col shadow-2xl"
        >
          <!-- Card Header (Icons) -->
          <div class="flex justify-between overflow-hidden overflow-x-auto items-start mb-8">
            <div class="text-slate-400">
              <!-- Document Icon -->
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
            </div>
            <div class="h-6">
              <!-- Placeholder for Liputan6 Logo -->
              <span class="text-[#FF5C00] font-black italic text-xl">LIPUTAN<span class="bg-[#FF5C00] text-white px-1 rounded-sm ml-0.5">6</span></span>
            </div>
          </div>

          <!-- Card Body -->
          <div class="flex-grow">
            <h3 class="text-xl font-bold text-[#3E516B] leading-snug mb-4">
              {{ article.title }}
            </h3>
            <p class="text-slate-500 text-xs leading-relaxed line-clamp-3">
              <span class="font-semibold">{{ article.source }}, {{ article.location }} — </span>
              {{ article.snippet }}
            </p>
          </div>

          <!-- Card Footer -->
          <a 
            :href="article.link" 
            target="_blank"
            class="mt-8 bg-[#4A5E7A] hover:bg-[#3E516B] text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-colors font-medium"
          >
            Read More
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        </div>
      </div>

      <!-- Pagination Dots (Visual Only) -->
      <div class="flex justify-center gap-2 mt-4">
        <div class="w-2.5 h-2.5 rounded-full bg-white"></div>
        <div class="w-2.5 h-2.5 rounded-full bg-slate-500"></div>
        <div class="w-2.5 h-2.5 rounded-full bg-slate-500"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
const newsArticles = [
  {
    title: 'Megabuild Indonesia Exhibition Helps Industry Players Connect with Relevant Professionals',
    source: 'Liputan6.com',
    location: 'Jakarta',
    snippet: 'The beginning of the year is the perfect time to seek inspiration for our dream home. The exhibition brings together various industrial sectors...',
    link: '#'
  },
  {
    title: 'Digital Innovation in Guest Management: How Undangin is Changing the Game',
    source: 'Liputan6.com',
    location: 'Jakarta',
    snippet: 'As technology evolves, the way we manage event guests has been revolutionized. Undangin introduces a seamless way to handle invitations...',
    link: '#'
  },
  {
    title: 'The Future of Event Technology in Southeast Asia',
    source: 'Liputan6.com',
    location: 'Jakarta',
    snippet: 'With the rise of large-scale exhibitions, the demand for efficient registration systems has peaked. Experts highlight the role of digital platforms...',
    link: '#'
  },
    {
    title: 'The Future of Event Technology in Southeast Asia',
    source: 'Liputan6.com',
    location: 'Jakarta',
    snippet: 'With the rise of large-scale exhibitions, the demand for efficient registration systems has peaked. Experts highlight the role of digital platforms...',
    link: '#'
  }
]
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>