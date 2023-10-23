<template>
    <div id="flashMessage" class="mb-2 animate-pulse text-center text-base font-fig bg-green-500 font-fig text-white"
        v-if="message">
        <h4>{{ message }}</h4>
    </div>
    <FlashMessage />
    <main class="flex flex-col items-center justify-center">
        <div
            class="mt-5 font-fig flex items-center justify-center p-3 w-3/4 sm:w-2/4 h-4/5 text-2xl font-bold text-gray-900">
            Create Announcement
        </div>

        <div
            class="mt-2 mb-10 font-fig flex flex-col items-center justify-center p-3 w-3/4 sm:w-2/4 h-auto text-xl font-bold text-gray-900 bg-white border border-gray-300 rounded-lg shadow-md">
            <!-- Announcement Header with Photo, Name, Date, and Time -->
            <div class="flex items-center space-x-3">
                <img :src="teacher?.images" alt="Person's Photo" class="w-20 h-20 rounded-full">
                <div>
                    <p class="font-fig font-semibold text-md">{{teacher?.name}}</p>
                    <p class="font-fig text-sm font-semibold text-gray-600">Date: {{currentDate}}</p>
                    <p class="font-fig text-sm font-semibold text-gray-600">Time: {{currentTime}}</p>
                </div>
            </div>

            <div class="items-center mt-4 mb-2 lg:mb-2 lg:mt-2 w-full text-[#202142]">
        <div class="flex flex-col items-center space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 ">
            <div class="items-center mt-4 lg:mb-2 lg:mt-2 w-full text-[#202142]">
                <div
                    class="flex flex-col items-center mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                    <div class="w-full">
                        <label for="event_name" class="block mb-2 text-sm font-semibold text-indigo-900">
                            Topic</label>
                        <input type="text" id="event_name"
                            class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                            placeholder="Write topic here..." :value="eventName" @input="eventName = $event.target.value" required>
                    </div>
                </div>

                <div
                    class="flex flex-col items-center mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                    <div class="w-full">
                        <label for="event_detail" class="block mb-2 text-sm font-semibold text-indigo-900">
                            Detail</label>
                        <input type="text" id="event_detail"
                            class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                            placeholder="Write detail here..." :value="eventDetail" @input="eventDetail = $event.target.value" required>
                    </div>
                        </div>
<!-- 
                        <div id="app" class="container my-3">
                            <div class="row">
                                <div class="col-12 text-center">
                                    <p class="mb-3 font-fig text-md font-semibold text-indigo-900">Upload File</p>
                                </div> -->
                                <!-- <div class="col-md-5 offset-md-1">
                                    <h5>1. single file</h5>
                                    <form>
                                        <div class="form-group">
                                            <label for="my-file">Select Image</label>
                                            <input type="file" accept="image/*" @change="previewImage"
                                                class="form-control-file" id="my-file">

                                            <div class="border p-2 mt-3">
                                                <p>Preview Here:</p>
                                                <template v-if="preview">
                                                    <img :src="preview" class="img-fluid" />
                                                    <p class="mb-0">file name: {{ image.name }}</p>
                                                    <p class="mb-0">size: {{ image.size / 1024 }}KB</p>
                                                </template>
                                            </div>
                                        </div>
                                    </form>
                                </div> -->
<!-- 
                                <div class="col-md-5">
                                    <form>
                                        <div class="form-group">
                                            <label for="my-files"
                                                class="font-fig text-sm font-semibold text-indigo-900">Select Images</label>
                                            <input type="file" accept="image/*,.pdf" multiple="multiple"
                                                @change="previewMultiImages"
                                                class="form-control-file lg:ml-2 text-white bg-pink-400 font-medium rounded-lg text-sm w-full sm:w-auto text-center justify-center items-center"
                                                id="my-files">

                                            <div class="border p-2 mt-3">
                                                <p class="font-fig text-sm font-semibold text-indigo-900">Preview Here:</p>
                                                <template v-if="previewList.length">
                                                    <div v-for="(item, index) in previewList" :key="index"> -->
                                                        <!-- <img :src="item" class="img-fluid mx-auto object-cover h-40" /> -->
                                                        <!-- <p
                                                            class="flex justify-center font-fig text-sm font-semibold text-gray-600 ">
                                                            file name: {{ imageList[index].name }}</p>
                                                        <p
                                                            class="flex justify-center font-fig mb-2 text-sm font-semibold text-gray-600">
                                                            size: {{ imageList[index].size / 1024 }}KB</p>
                                                    </div>
                                                </template>
                                            </div>
                                        </div>
                                    </form> -->
                                <!-- </div> -->

                                <div class="w-100"></div>
                                <div class="col-12 mt-3 text-center">
                                  
                                </div>
                            </div>
                        </div>

                        <UploadFile @fileUploaded="handleFileUploaded" />

                        <div class="flex justify-center">

                            <!-- Post button -->
                            <button @click="showConfirmation"
                                class="flex text-white bg-emerald-500 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center justify-center items-center mt-5">
                                Post
                            </button>


                        </div>


                    </div>
                </div>


            <!-- </div>


        </div> -->

    </main>
</template>

<script setup lang="ts">
import { useMessageStore } from '@/stores/message'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { useTeacherStore } from '@/stores/teacher'
import { type TeacherItem } from '@/type'
import UploadFile from '@/components/UploadFile.vue';

const storeMessage = useMessageStore()
const authStore = useAuthStore()
const { message } = storeToRefs(storeMessage)
const eventName = ref("");
const eventDetail = ref("");
const teacher = ref<TeacherItem | null>(null)
// import { ref } from 'vue';

const currentTime = ref('');
const currentDate = ref('');


const mediaURL = ref<string[]>([]); // Initialize mediaURL as an empty array of strings


// Define the method to handle the uploaded file
const handleFileUploaded = (newMediaURL: string) => {
    mediaURL.value.push(newMediaURL); // Push the new URL to the array
  console.log('mediaURL:', mediaURL.value);
  // Do other actions as needed
};








// Function to update the currentTime and currentDate
const updateDateTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  currentTime.value = formattedTime;

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  currentDate.value = now.toLocaleDateString(undefined, options);
};

const showConfirmation = () => {
    if (!eventName.value || !eventDetail.value) {
        alert('Please fill in all required fields (Topic and Detail) before posting.');
    } else if (confirm("Are you sure you want to post this announcement?")) {
        onSubmit();
    }
};

const onSubmit = () => {
    // Handle the post data submission here
    // You can send your post data to the server or perform any necessary actions
    // This method is called when the user confirms the post in the dialog

    authStore.announcementPost(eventName.value, eventDetail.value,mediaURL.value)
    // location.reload()
    // Display a success message
    storeMessage.updateMessage('Announcement posted!');
    reset(); 
    setTimeout(() => {
        storeMessage.resetMessage();
        location.reload()
    
    }, 4000);
};

onMounted(async () => {
    try {
        const response = await useTeacherStore().getTeacher()
        teacher.value = response
        updateDateTime();
        setInterval(updateDateTime, 60000);
        if (teacher.value) {
            console.log(teacher.value)
        }
    } catch (error) {
        console.log('Error fetching student data:', error)
    }
})

import { ref, onMounted } from 'vue';
import type { string } from 'yup'

const preview = ref<string | null>(null);
const image = ref<File | null>(null);
const previewList = ref<string[]>([]);
const imageList = ref<File[]>([]);

// const previewImage = (event: Event) => {
//     const file = (event.target as HTMLInputElement).files?.[0];
//     if (file) {
//         const reader = new FileReader();
//         reader.onload = () => {
//             preview.value = reader.result as string;
//         };
//         reader.readAsDataURL(file);
//         image.value = file;
//     }
// };

// const previewMultiImages = (event: Event) => {
//     const files = (event.target as HTMLInputElement).files;
//     previewList.value = [];
//     imageList.value = [];
//     for (let i = 0; i < files.length; i++) {
//         const file = files[i];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = () => {
//                 previewList.value.push(reader.result as string);
//             };
//             reader.readAsDataURL(file);
//             imageList.value.push(file);
//         }
//     }
// };

const previewMultiImages = (event: Event) => {
    const files = (event.target as HTMLInputElement).files;
    previewList.value = [];
    imageList.value = [];
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file) {
            if (file.type.startsWith('image/')) {
                // Handle image files
                const reader = new FileReader();
                reader.onload = () => {
                    previewList.value.push(reader.result as string);
                };
                reader.readAsDataURL(file);
                imageList.value.push(file);
            } else if (file.type === 'application/pdf') {
                // Handle PDF files
                // Display a link to the PDF file
                previewList.value.push('path_to_your_pdf_file.pdf');
                imageList.value.push(file);
            }
        }
    }
};


const reset = () => {
    const fileInput = document.getElementById('my-files') as HTMLInputElement | null;
    if (fileInput) {
        fileInput.value = ''; // Clear the file input value
    }

    preview.value = null;
    image.value = null;
    previewList.value = [];
    imageList.value = [];

    // Reset the text inputs
    eventName.value = "";
    eventDetail.value = "";
};
</script>