<template>
    <section class="bg-white py-20 px-4">
        <div class="max-w-7xl mx-auto container">
            <!-- Image Banner Section -->
            <div class="w-full mb-12 overflow-hidden rounded-3xl shadow-xl">
                <img src="/public/images/undangin-smartchoise.png"
                    alt="Undangin Support Team" class="w-full h-[400px] object-cover" />
            </div>

            <!-- Text Header Section -->
            <div class="mb-16">
                <h2 class="text-4xl md:text-5xl font-bold text-[#566D8F] mb-6 tracking-tight">
                    What Makes Undangin the Smarter Choice
                </h2>
                <p class="text-slate-600 text-lg max-w-4xl leading-relaxed">
                    Flexible solutions for smoother events, especially in guest management and better guest experiences,
                    helping organizers manage every detail with ease and confidence.
                </p>
            </div>

            <div class="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 scrollbar-hide">
                <div v-for="feature in features" :key="feature.title"
                    class="min-w-[280px] md:min-w-[320px] snap-center p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500 flex flex-col items-start">
                    <!-- Konten tetap sama -->
                    <div
                        class="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center mb-8 text-slate-800">
                        <component :is="feature.icon" class="w-6 h-6" />
                    </div>

                    <h3 class="text-xl font-bold text-slate-900 mb-2">
                        {{ feature.title }}
                    </h3>
                    <p class="text-slate-500 text-sm leading-snug">
                        {{ feature.desc }}
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    // Saya menggunakan Icon dari Heroicons (lucide-vue-next juga bisa)
    import {
        BoltIcon,
        PhoneIcon,
        ShieldCheckIcon,
        ClockIcon
    } from '@heroicons/vue/24/solid'

    const features = [{
            title: 'Fast Setup',
            desc: 'Ready to use in minutes',
            icon: BoltIcon
        },
        {
            title: '24/7 Support',
            desc: 'Support team always ready to help',
            icon: PhoneIcon
        },
        {
            title: 'Data Security',
            desc: 'Guest data stored securely and encrypted',
            icon: ShieldCheckIcon
        },
        {
            title: 'Save Time',
            desc: 'Automate RSVP and registration',
            icon: ClockIcon
        },
        {
            title: 'Fast Setup',
            desc: 'Ready to use in minutes',
            icon: BoltIcon
        },
        {
            title: 'Fast Setup',
            desc: 'Ready to use in minutes',
            icon: BoltIcon
        },
        {
            title: 'Data Security',
            desc: 'Guest data stored securely and encrypted',
            icon: ShieldCheckIcon
        },
        {
            title: 'Data Security',
            desc: 'Guest data stored securely and encrypted',
            icon: ShieldCheckIcon
        },
        {
            title: 'Data Security',
            desc: 'Guest data stored securely and encrypted',
            icon: ShieldCheckIcon
        },
    ]
</script>

<style scoped>
    /* Menghaluskan transisi shadow */
    .transition-all {
        will-change: transform, shadow;
    }
</style>