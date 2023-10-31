<script setup lang="ts">
import { type StudentItem } from '@/type'
import { computed, onMounted, type PropType } from 'vue'
import { useStudentStore } from '@/stores/student'
import { useTeacherStore } from '@/stores/teacher'
import InputText from '@/components/InputText.vue'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { useAuthStore } from '@/stores/auth'
import { useRouter, RouterLink } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import StudentService from '@/services/StudentService'
import { type TeacherItem } from '@/type'
import ImageUpload from '@/components/ImageUpload.vue'
// Import the ref and computed functions from Vue

const props = defineProps({
  id: String
})

// Define a reactive property to track if the form is in edit mode
let isEditing = ref(false);
let showImageUpload = ref(false);


// Function to enter edit mode
const enterEditMode = () => {
  isEditing.value = true;
  showImageUpload.value = true; // Show the ImageUpload component when entering edit mode
};

const authStore = useAuthStore()
const router = useRouter()
const storeMessage = useMessageStore()

const { message } = storeToRefs(storeMessage)

// const student = ref<StudentItem | null>(null)
const teacher = ref<TeacherItem | null>(null)

let images = ''

onMounted(async () => {
  try {
    const response = await useTeacherStore().getTeacherById(props.id!);
    teacher.value = response;

    // Access student data here
    if (teacher.value) {
      console.log(response?.department);
      username.value = response?.username;
      firstName.value = response?.name;
      lastName.value = response?.surname;
      department.value = response?.department
      images = response?.images

      if (response.images) {
        mediaURLs.value = response.images;
        console.log(mediaURLs.value)
      }

    }
  } catch (error) {
    console.error('Error fetching student data:', error);
  }
});



const validationSchema = yup.object({

  firstName: yup
    .string()
    .required('The firstName is required'),


  lastName: yup
    .string()
    .required('The lastName is required'),

  department: yup
    .string()
    .required('The department is required'),

  images: yup
    .string()


})

const { errors, handleSubmit } = useForm({
  validationSchema,

  initialValues: {
    firstName: '',
    lastName: '',
    department: '',

  }
})

const { value: username } = useField<string>('username')

const { value: firstName } = useField<string>('firstName')

const { value: lastName } = useField<string>('lastName')

const { value: department } = useField<string>('department')

// Function to save changes and exit edit mode
const saveChanges = () => {
  // Add your logic to save changes here
  isEditing.value = false;
  showImageUpload.value = false;

};

const onSubmit = handleSubmit(async (values) => {
  try {
    console.log(values)
    values.images = mediaURLs.value;

    await authStore.teacherUpdateProfile(props.id, values.firstName, values.lastName, values.images);

    storeMessage.updateMessage;
    setTimeout(() => {
      storeMessage.resetMessage();
    }, 4000);
  } catch (error) {
    storeMessage.updateMessage('Could not update profile');
    setTimeout(() => {
      storeMessage.resetMessage();
    }, 3000);
  }
});

const showConfirmation = () => {
  if (confirm("Are you sure you want to save these changes?")) {
    saveAndSubmitForm();
  }
};

// Function to save changes and submit the form
const saveAndSubmitForm = async () => {
  saveChanges(); // Call the saveChanges function
  // You can set a different message here based on your needs
  const successMessage = 'Changes saved successfully';
  const errorMessage = 'Could not save changes';

  try {
    await onSubmit();
    console.log(onSubmit())
    storeMessage.updateMessage(successMessage);
    setTimeout(() => {
      storeMessage.resetMessage();
      location.reload()
    }, 1000);
  } catch (error) {
    storeMessage.updateMessage(errorMessage);
    setTimeout(() => {
      storeMessage.resetMessage();
      location.reload()
    }, 1000);
  }
};

let mediaURLs = ref<string[]>([]); // Initialize as an empty array


const onFileUploaded = (uploadedURLs: string[]) => {
  // Assuming mediaURLs contains at least one URL
  mediaURLs.value = uploadedURLs;
  console.log(mediaURLs.value)
};

</script>

<template>
  <!-- Flash message -->
  <div id="flashMessage" class="mb-2 animate-pulse text-center text-base font-fig bg-green-500 font-fig text-white"
    v-if="message">
    <h4>{{ message }}</h4>
  </div>
  <main class="flex flex-col items-center justify-center">
    <div class="font-fig flex items-center justify-center p-3 w-3/4 sm:w-2/4 h-4/5 text-2xl font-bold text-gray-900">
      Profile
    </div>

    <div
      class="mt-2 mb-10 font-fig flex flex-col  p-3 w-3/4 sm:w-2/4 h-auto text-xl font-bold text-gray-900 bg-white border border-gray-300 rounded-lg shadow-md">
      <form class="" @submit.prevent="onSubmit">



        <div class="flex flex-col items-center justify-center py-4 space-y-5">
          <!-- Profile picture (outside of edit mode) -->
          <img v-if="!isEditing"
            class="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500" :src="images"
            alt="Profile Picture" />

          <!-- Uploaded image (inside edit mode) -->
          <img v-if="isEditing && mediaURLs.length > 0" :src="mediaURLs[0]" alt="Uploaded Image"
            class="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500" />
        </div>

        <ImageUpload v-model="mediaURLs" :disabled="!isEditing" @fileUploaded="onFileUploaded" v-if="showImageUpload" />

        <div class="items-center mt-4 mb-2 lg:mb-2 lg:mt-2 w-full text-[#202142]">
          <div class="flex flex-col items-center space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 ">
            <div class="items-center mt-4 lg:mb-2 lg:mt-2 w-full text-[#202142]">


              <!-- <form class="" @submit.prevent="onSubmit"> -->


              <div
                class="flex flex-col items-center mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                <div class="w-full">
                  <label for="first_name" class="block mb-2 text-sm font-semibold text-indigo-900">
                    First name</label>
                  <input type="text" id="first_name" :disabled="!isEditing"
                    class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                    placeholder="" v-model="firstName" required>
                </div>

                <div class="w-full">
                  <label for="last_name" class="block mb-2 text-sm font-semibold text-indigo-900 ">
                    Last name</label>
                  <input type="text" id="last_name" :disabled="!isEditing"
                    class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                    placeholder="" v-model="lastName" required>
                </div>
              </div>


              <div
                class="flex flex-col items-center mb-5 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                <div class="w-full">
                  <label for="department" class="block mb-2 text-sm font-semibold text-indigo-900">
                    Academic Position</label>
                  <input type="text" id="academicposition" disabled
                    class="bg-gray-300 border border-indigo-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                    placeholder="Associate Professor" v-model="academicposition" required>
                </div>


              </div>

              <div
                class="flex flex-col items-center mb-5 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                <div class="w-full">
                  <label for="department" class="block mb-2 text-sm font-semibold text-indigo-900">
                    Department</label>
                  <input type="text" id="department" disabled
                    class="bg-gray-300 border border-indigo-300 text-gray-500 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                    placeholder="" v-model="department" required>
                </div>


              </div>

              <div class="flex justify-center">

                <button v-if="!isEditing" @click="enterEditMode"
                  class="flex text-white bg-indigo-500 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center justify-center items-center">
                  <img src="../../assets/edit.png" class="h-[15px] mr-2">
                  Edit
                </button>

                <!-- edit button when editing mode - disabled -->
                <button v-if="isEditing" disabled
                  class="flex opacity-50 text-white bg-gray-400 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center items-center justify-center">
                  <img src="../../assets/edit.png" class="h-[15px] mr-2">
                  Edit
                </button>
              </div>
              <div class="flex justify-center">
                <!-- Save button -->
                <button href="/updatestudents" v-if="isEditing" @click="showConfirmation"
                  class="flex mt-2 text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center justify-center items-center">
                  <img src="../../assets/save.png" class="h-[15px] mr-2">
                  Save
                </button>
              </div>



            </div>
          </div>


        </div>
      </form>


    </div>
  </main>
</template>
