<script setup>
    // Import computed secara eksplisit untuk memastikan reaktivitas berjalan
    import {
        ref,
        onMounted
    } from 'vue'

    const { locale } = useI18n()
    const api = useApi()
    const getOnGoingEvents = ref([])
    const getOnGoingEventsData = async () => {
        api({
            url: '/v1/frontpage/geteventlist?lang{locale.value}',
            method: 'GET'
        }).then((res) => {
            getOnGoingEvents.value = res.data
        })
    };

    onMounted(() => {
        getOnGoingEventsData()
    })
</script>

<template>
    <section class="py-24 overflow-hidden bg-white">
        <div class="max-w-7xl mx-auto px-6">

            <div class="text-center mb-16">
                <h2 class="text-4xl md:text-5xl font-bold text-[#273448] mb-6 tracking-tight">
                    Find Events That Are Live Right Now
                </h2>
                <p class="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
                    Browse public and ticketed events currently running on Undangin
                </p>
            </div>

            <div class="flex overflow-x-auto gap-8 pb-10 hide-scrollbar snap-x snap-mandatory">

                <div v-for="event in getOnGoingEvents.posts" :key="event.id"
                    class="flex-shrink-0 w-[90%] md:w-[1000px] sm:w-[100%] snap-center">
                    <div
                        class="bg-white border border-gray-100 rounded-[32px] overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-xl transition-all duration-500 h-full">
                        <div class="md:w-1/2 h-64 md:h-auto overflow-hidden">
                            <img :src="event.poster" :alt="event.name"
                                class="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700" />
                        </div>

                        <div class="md:w-1/2 p-8 md:p-10 flex flex-col">
                            <div>
                                <h3 class="text-3xl md:text-4xl font-bold text-[#273448] mb-4">{{ event.name }}</h3>
                                <p class="text-gray-500 text-sm md:text-base leading-relaxed mb-6">
                                    Explore the main programs at Franchise & License Expo Indonesia (FLEI),
                                    including exhibitions, business conferences, seminars, and business matching.
                                </p>

                                <div class="space-y-3">
                                    <div class="flex items-center gap-3 text-gray-500">
                                        <i class='bx bx-map text-xl'></i>
                                        <span class="text-sm font-medium">Jakarta International Expo</span>
                                    </div>
                                    <div class="flex items-center gap-3 text-gray-500">
                                        <i class='bx bx-calendar text-xl'></i>
                                        <span class="text-sm font-medium">10-12 May 2024</span>
                                    </div>
                                </div>
                            </div>

                            <div class="mt-8">
                                <button
                                    class="w-full bg-[#273448] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#1e293a] transition-colors shadow-lg shadow-gray-200">
                                    Get Ticket
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="flex-shrink-0 w-[100px] md:w-[300px] opacity-40">
                    <div class="bg-white border border-gray-100 rounded-[32px] h-full"></div>
                </div>

            </div>
        </div>
    </section>
</template>

<style scoped>
    .hide-scrollbar::-webkit-scrollbar {
        display: none;
    }

    .hide-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
</style>