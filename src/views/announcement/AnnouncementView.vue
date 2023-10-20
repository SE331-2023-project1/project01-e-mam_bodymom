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
            <div class="flex flex-col items-center mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                <div class="w-full">
                    <label for="event_name" class="block mb-2 text-sm font-semibold text-indigo-900">
                        Topic
                    </label>
                    <input type="text" id="event_name" disabled
                        class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                        placeholder="" :value="eventName" required />
                </div>


            </div>

            <div class="flex flex-col items-center mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                <div class="w-full">
                    <label for="event_description" class="block mb-2 text-sm font-semibold text-indigo-900">
                        Description
                    </label>
                    <input type="text" id="event_description" disabled
                        class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                        placeholder="" :value="eventDescription" required />
                </div>
            </div>

            <!-- Media Preview -->
            <div class="mt-5 relative" v-if="mediaExists">
                <template v-if="isImage">
                    <!-- Image -->
                    <img :src="mediaSource" class="object-cover w-full h-60 md:h-96 rounded-lg" alt="Selected Media" />
                </template>
                <template v-else-if="isGif">
                    <!-- GIF -->
                    <img :src="mediaSource" class="object-cover w-full h-60 md:h-96 rounded-lg" alt="Selected Media" />
                </template>
                <template v-else-if="isPdf">
                    <!-- PDF -->
                    <a :href="mediaSource" target="_blank" class="text-blue-500 underline">View PDF</a>
                </template>
                <!-- Navigation for Images and GIFs -->
                <div
                    class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
                    <span
                        class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
                        @click="prevMedia">
                        <svg class="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5 1 1 5l4 4" />
                        </svg>
                        <span class="sr-only">Previous</span>
                    </span>
                </div>
                <div
                    class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
                    <span
                        class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
                        @click="nextMedia">
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
  
<script>

export default {
    data() {
        return {
            mediaFiles: [
                // {
                //     type: 'image',
                //     source: 'URL_TO_IMG',
                // },
                // {
                //     type: 'gif',
                //     source: 'URL_TO_GIF',
                // },
                // {
                //     type: 'pdf',
                //     source: 'URL_TO_PDF',
                // },
                // Add more media files with different types here
            ],
            selectedMedia: 0, // Initially select the first media file
        };
    },
    computed: {
        mediaSource() {
            return this.mediaFiles[this.selectedMedia].source;
        },
        isImage() {
            return this.mediaFiles[this.selectedMedia].type === 'image';
        },
        isGif() {
            return this.mediaFiles[this.selectedMedia].type === 'gif';
        },
        isPdf() {
            return this.mediaFiles[this.selectedMedia].type === 'pdf';
        },
        mediaExists() {
            return this.mediaFiles.length > 0;
        },
    },
    methods: {
        prevMedia() {
            if (this.selectedMedia > 0) {
                this.selectedMedia--;
            } else {
                this.selectedMedia = this.mediaFiles.length - 1; // Loop to the last media file
            }
        },
        nextMedia() {
            if (this.selectedMedia < this.mediaFiles.length - 1) {
                this.selectedMedia++;
            } else {
                this.selectedMedia = 0; // Loop back to the first media file
            }
        },
    },
};
</script>
  