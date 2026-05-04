<script setup>
    // Import computed secara eksplisit untuk memastikan reaktivitas berjalan
    import {
        ref, onMounted
    } from 'vue'

    const api = useApi()
    const getTestimonialsData = ref([])
    const getTestimonials = async () => {
      api({
          url: '/v1/frontpage/gettestimonials',
          method: 'GET'
      }).then((res) => {
            getTestimonialsData.value = res.data
      })
  };

  onMounted(() => {
      getTestimonials()
  })
</script>

<template>
    <section class="py-24 overflow-hidden">
        <div class="max-w-7xl mx-auto px-6">

            <div class="text-center mb-16">
                <h2 class="text-4xl md:text-5xl font-bold text-[#273448] mb-6 tracking-tight">
                    Voices from Our Users
                </h2>
                <p class="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
                    Hear how Undangin helps both organizers and guests enjoy seamless event journeys
                </p>
            </div>

            <div class="flex overflow-x-auto gap-8 pb-10 hide-scrollbar snap-x snap-mandatory">
                <div v-for="(testi, index) in getTestimonialsData.testimonials" :key="index"
                    class="flex-shrink-0 w-[85%] md:w-[calc(40%-1rem)] snap-center">
                    <div
                        class="bg-[#edeff3] h-full p-10 rounded-[40px] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                        <div>
                            <i class="bx bxs-quote-left text-5xl text-[#32435d] mb-6 opacity-80"></i>
                            <p class="text-[#32435d] text-base leading-relaxed mb-8 italic">
                                "{{ testi.testimonial_text }}"
                            </p>
                        </div>

                        <div class="flex justify-between items-end">
                            <div>
                                <h4 class="font-bold text-lg text-[#273448]">{{ testi.client_name }}</h4>
                                <p class="text-sm text-gray-500 italic">{{ testi.client_company }}</p>
                            </div>
                            <div class="flex text-yellow-500 gap-1 mt-4">
                                <i v-for="n in testi.rating" :key="'full-' + testi.client_name + n"
                                    class="bx bxs-star text-lg"></i>

                                <i v-for="n in (5 - testi.rating)" :key="'empty-' + testi.client_name + n"
                                    class="bx bxs-star text-lg text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
    /* Menghilangkan scrollbar tapi fungsi scroll tetap jalan */
    .hide-scrollbar::-webkit-scrollbar {
        display: none;
    }

    .hide-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
</style>