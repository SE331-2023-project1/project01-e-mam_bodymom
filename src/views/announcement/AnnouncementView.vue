<script>
export default {
    data() {
        return {
            photos: [
                'https://cdn.britannica.com/38/196638-131-7BF02881/Santa-Claus.jpg',
                'https://hips.hearstapps.com/hmg-prod/images/christmas-facts-650b513919cd9.jpg?crop=1xw:0.8453434844192634xh;center,top&resize=1200:*',
                'https://cdn.creatureandcoagency.com/uploads/2020/10/Facts-about-Chrismtas-5.jpg',
                // Add more photo URLs here
            ],
            selectedPhoto: 0, // Initially select the first photo
        };
    },
    methods: {
        showPhoto(index) {
            this.selectedPhoto = index;
        },
        closePhotoPopup() {
            this.selectedPhoto = null;
        },
        nextPhoto() {
            if (this.selectedPhoto < this.photos.length - 1) {
                this.selectedPhoto++;
            } else {
                this.selectedPhoto = 0; // Loop back to the first photo
            }
        },
        prevPhoto() {
            if (this.selectedPhoto > 0) {
                this.selectedPhoto--;
            } else {
                this.selectedPhoto = this.photos.length - 1; // Loop to the last photo
            }
        },
    },
};
</script>

<template>
    <main class="flex flex-col items-center justify-center">
        <div
            class="mt-5 font-fig flex items-center justify-center p-3 w-3/4 sm:w-2/4 h-4/5 text-2xl font-bold text-gray-900">
            Announcement(s)
        </div>


        <div
            class="mt-5 mb-10 font-fig flex flex-col items-left justify-left p-3 w-3/4 sm:w-2/4 h-auto text-xl font-bold text-gray-900 bg-white border border-gray-300 rounded-lg shadow-md">
            <!-- Announcement Header with Photo, Name, Date, and Time -->
            <div class="flex items-center space-x-3">
                <img src="src\assets\bodymoml.png" alt="Person's Photo" class="w-20 h-20 rounded-full">
                <div>
                    <p class="font-fig font-semibold text-md">Uppahman</p>
                    <p class="font-fig text-sm font-semibold text-gray-600">Date: October 18, 2023</p>
                    <p class="font-fig text-sm font-semibold text-gray-600">Time: 10:00 AM</p>
                </div>
            </div>
            <!-- Announcement Details -->
            <div class="mt-5 flex flex-col pl-3">
                <p class="font-fig font-semibold text-md">Christmas Event !</p>
                <p class="font-fig text-md text-gray-600">Ho Ho Ho kriๆๆๆๆ</p>
            </div>
            <!-- Photo slider -->
            <div class="mt-5  relative">
                <img :src="photos[selectedPhoto]" class="object-cover w-full h-60 md:h-96 rounded-lg"
                    alt="Selected Photo" />
                <div
                    class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
                    <span
                        class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
                        @click="prevPhoto">
                        <svg class="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5 1 1 5l4 4" />
                        </svg>
                        <span class="sr-only">Previous</span>
                    </span>
                </div>
                <div
                    class="absolute top-0 right-0  flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
                    <span
                        class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
                        @click="nextPhoto">
                        <svg class="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 9 4-4-4-4" />
                        </svg>
                        <span class="sr-only">Next</span>
                    </span>
                </div>
            </div>
        </div>

    </main>
</template>
  