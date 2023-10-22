<template>
    <main class="flex flex-col items-center justify-center">
        <div
            class="mt-5 font-fig flex items-center justify-center p-3 w-3/4 sm:w-2/4 h-4/5 text-2xl font-bold text-gray-900">
            Announcement(s)
        </div>

        <div v-for="announcement in announcements" :key="announcement.id" :announcement="announcement"
            class=" mt-5 mb-10 font-fig flex flex-col items-left justify-left p-3 w-3/4 sm:w-2/4 h-auto text-xl font-bold text-gray-900 bg-white border border-gray-300 rounded-lg shadow-md">
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
                        placeholder="" :value="announcement.title" required />
                </div>


            </div>

            <div class="flex flex-col items-center mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                <div class="w-full">
                    <label for="event_detail" class="block mb-2 text-sm font-semibold text-indigo-900">
                        Detail
                    </label>
                    <input type="text" id="event_detail" disabled
                        class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                        placeholder="" :value="announcement.description" required />
                </div>

            </div>

            <p class="font-fig font-semibold text-sm text-indigo-900">Attached files:</p>
            <div class="flex w-full text-sm font-semibold mt-1 ml-1 hover:text-indigo-700" v-for="file in announcement.files" :key="file">
                <span>-</span> <!-- Add a hyphen here -->
                <FilePreview :fileSource="file" />
            </div>



        </div>
    </main>
</template>
  
<script setup lang="ts">
import { type AnnouncementItem } from '@/type'
import NProgress from 'nprogress'
import { computed, ref, watchEffect, type Ref, onMounted } from 'vue';
import { useAnnouncementStore } from '@/stores/announcement'
import FilePreview from '../../components/FilePreview.vue';

const announcements = ref<AnnouncementItem[] | null>(null)
// let files

onMounted(async () => {
    try {
        const response = await useAnnouncementStore().getAnnouncement
        announcements.value = response
        if (announcements.value) {
            console.log(announcements.value)
        }
    } catch (error) {
        console.log('Error fetching student data:', error)
    }
})

// const mediaFiles = ref<Array<{ type: string; source: string }>>([
//     // {
//     //     type: 'image',
//     //     source: 'URL_TO_IMG',
//     // },
//     // {
//     //     type: 'gif',
//     //     source: 'URL_TO_GIF',
//     // },
//     // {
//     //     type: 'pdf',
//     //     source: 'URL_TO_PDF',
//     // },
//     // Add more media files with different types here
// ]);

// const selectedMedia = ref(0);

// const mediaSource = computed(() => mediaFiles.value[selectedMedia.value].source);
// const isImage = computed(() => mediaFiles.value[selectedMedia.value].type === 'image');
// const isGif = computed(() => mediaFiles.value[selectedMedia.value].type === 'gif');
// const isPdf = computed(() => mediaFiles.value[selectedMedia.value].type === 'pdf');
// const mediaExists = computed(() => mediaFiles.value.length > 0);

// const prevMedia = () => {
//     if (selectedMedia.value > 0) {
//         selectedMedia.value--;
//     } else {
//         selectedMedia.value = mediaFiles.value.length - 1; // Loop to the last media file
//     }
// };

// const nextMedia = () => {
//     if (selectedMedia.value < mediaFiles.value.length - 1) {
//         selectedMedia.value++;
//     } else {
//         selectedMedia.value = 0; // Loop back to the first media file
//     }
// };

// export default {
//     data() {
//         return {
//             mediaFiles: [
//                 // {
//                 //     type: 'image',
//                 //     source: 'URL_TO_IMG',
//                 // },
//                 // {
//                 //     type: 'gif',
//                 //     source: 'URL_TO_GIF',
//                 // },
//                 // {
//                 //     type: 'pdf',
//                 //     source: 'URL_TO_PDF',
//                 // },
//                 // Add more media files with different types here
//             ],
//             selectedMedia: 0, // Initially select the first media file
//         };
//     },
//     computed: {
//         mediaSource() {
//             return this.mediaFiles[this.selectedMedia].source;
//         },
//         isImage() {
//             return this.mediaFiles[this.selectedMedia].type === 'image';
//         },
//         isGif() {
//             return this.mediaFiles[this.selectedMedia].type === 'gif';
//         },
//         isPdf() {
//             return this.mediaFiles[this.selectedMedia].type === 'pdf';
//         },
//         mediaExists() {
//             return this.mediaFiles.length > 0;
//         },
//     },
//     methods: {
//         prevMedia() {
//             if (this.selectedMedia > 0) {
//                 this.selectedMedia--;
//             } else {
//                 this.selectedMedia = this.mediaFiles.length - 1; // Loop to the last media file
//             }
//         },
//         nextMedia() {
//             if (this.selectedMedia < this.mediaFiles.length - 1) {
//                 this.selectedMedia++;
//             } else {
//                 this.selectedMedia = 0; // Loop back to the first media file
//             }
//         },
//     },
// };
</script>
  