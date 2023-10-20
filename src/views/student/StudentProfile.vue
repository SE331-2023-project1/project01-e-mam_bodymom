<script setup lang="ts">
import { type StudentItem } from '@/type'
import { computed, onMounted, type PropType } from 'vue'
import { useStudentStore } from '@/stores/student'
import InputText from '@/components/InputText.vue'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { useAuthStore } from '@/stores/auth'
import { useRouter, RouterLink } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import StudentService from '@/services/StudentService'
// Import the ref and computed functions from Vue

// Define a reactive property to track if the form is in edit mode
let isEditing = ref(false);

// Function to enter edit mode
const enterEditMode = () => {
    isEditing.value = true;
};

// Function to save changes and exit edit mode
const saveChanges = () => {
    // Add your logic to save changes here
    isEditing.value = false;
};

// // Create a computed property for the button label
// const buttonLabel = computed(() => (isEditing.value ? 'Save' : 'Edit'));

// // Create a computed property for the button color
// const buttonColor = computed(() => (isEditing.value ? 'bg-emerald-500 focus:ring-emerald-300' : 'bg-indigo-500'));

// Create a computed property for the button image source
// const buttonImage = computed(() => (isEditing.value ? 'src/assets/save.png' : 'src/assets/edit.png'));

const authStore = useAuthStore()
const router = useRouter()
const storeMessage = useMessageStore()

const { message } = storeToRefs(storeMessage)

const student = ref<StudentItem | null>(null)

// StudentService.getStudentById(authStore.id).then((response) => {
//   student.value = response
//   console.log(student.value.data)
// })

const fetchStudentData = async () => {
  try {
    const response = await StudentService.getStudentById(authStore.id);
    student.value = response;
  } catch (error) {
    console.error('Error fetching student data:', error);
  }
};

onMounted(() => {
  fetchStudentData();
});

const validationSchema = yup.object({
    id: yup.string()
      .required('The id is required')
      .matches(/^[A-Za-z0-9]+$/, 'Id should contain only numbers'),

    username: yup.string()
      .required('The username is required')
      .matches(/^[A-Za-z0-9]+$/, 'Username should contain only alphabetic characters and numbers'),

  firstName: yup
    .string()
    .required('The firstName is required')
    .matches(/^[A-Za-z]+$/, 'First name should contain only alphabetic characters'),

  lastName: yup
    .string()
    .required('The lastName is required')
    .matches(/^[A-Za-z]+$/, 'Last name should contain only alphabetic characters'),

    email: yup.string()
      .required('The email is required')
      .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, 'Please enter a valid email address ending with example.com'),

    password: yup.string()
      .required('The password is required')
      .min(6, 'Password must be at least 6 characters long.'),
})

// console.log(student)

const { errors, handleSubmit } = useForm({
  validationSchema,

  initialValues: {
    id: student?.value?.data?.id,
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  }
})

const { value: id } = useField<string>('id')

const { value: username } = useField<string>('username')

const { value: firstName } = useField<string>('firstName')

const { value: lastName } = useField<string>('lastName')

const { value: email } = useField<string>('email')

const { value: password } = useField<string>('password')

const onSubmit = handleSubmit(async (values) => {
  try {
    await authStore.studentUpdateProfile(values.id, values.firstName, values.lastName);
    storeMessage.updateMessage('Update profile successful');
    setTimeout(() => {
      storeMessage.resetMessage();
    }, 4000);
    router.push({ name: 'home-page' });
  } catch (error) {
    storeMessage.updateMessage('Could not update profile');
    setTimeout(() => {
      storeMessage.resetMessage();
    }, 3000);
  }
});
</script>

<template>
  <main class="flex flex-col items-center justify-center">
    <div class="font-fig flex items-center justify-center p-3 w-3/4 sm:w-2/4 h-4/5 text-2xl font-bold text-gray-900">
      Profile
    </div>

    <div class="mt-2 mb-10 font-fig flex flex-col items-center justify-center p-3 w-3/4 sm:w-2/4 h-auto text-xl font-bold text-gray-900 bg-white border border-gray-300 rounded-lg shadow-md">
      <div class="flex flex-col items-center justify-center py-4 space-y-5">
        <img
          class="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
          src="src\assets\bodymoml.png"
          alt="Profile Picture"
        />

        <!-- <button type="button"
                    class="py-3.5 px-7 text-base font-medium text-white focus:outline-none bg-emerald-600 rounded-lg border border-indigo-200 hover:bg-emerald-800 focus:z-10 focus:ring-4 focus:ring-indigo-200 ">
                    Change picture
                </button> -->
        <!-- <button type="button"
            class="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 ">
            Delete picture
        </button> -->
      </div>

      <div class="items-center mt-4 mb-4 lg:mb-6 lg:mt-6 w-full text-[#202142]">
          <div
            class="flex flex-col items-center mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6"
          >
            <div class="items-center mt-4 mb-4 lg:mb-6 lg:mt-6 w-full text-[#202142]">


                <div
                    class="flex flex-col items-center mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                    <div class="w-full">
                        <label for="studentid" class="block mb-2 text-sm font-semibold text-indigo-900">
                            Student ID</label>
                        <input type="text" id="studentid" disabled
                            class="bg-gray-300 border border-indigo-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                            placeholder="" :value="student?.data?.id" required>
                    </div>

                    <div class="w-full">
                        <label for="username" class="block mb-2 text-sm font-semibold text-indigo-900">
                            Username</label>
                        <input type="text" id="username" disabled
                            class="bg-gray-300 border border-indigo-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                            placeholder="" :value="student?.data?.username" required>
                    </div>


                </div>

                <div
                    class="flex flex-col items-center mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                    <div class="w-full">
                        <label for="first_name" class="block mb-2 text-sm font-semibold text-indigo-900">
                            First name</label>
                        <input type="text" id="first_name" :disabled="!isEditing"
                            class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                            placeholder="" :value="student?.data?.name" required>
                    </div>

                    <div class="w-full">
                        <label for="last_name" class="block mb-2 text-sm font-semibold text-indigo-900 ">
                            Last name</label>
                        <input type="text" id="last_name" :disabled="!isEditing"
                            class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                            placeholder="" :value="student?.data?.surname" required>
                    </div>
                </div>

                <div
                    class="flex flex-col items-center mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                    <div class="w-full">
                        <label for="department" class="block mb-2 text-sm font-semibold text-indigo-900">
                            Departmenr</label>
                        <input type="text" id="department" disabled
                            class="bg-gray-300 border border-indigo-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                            placeholder="" :value="student?.data?.department" required>
                    </div>

                </div>

                <div class="flex justify-center">
                    <!-- <button type="submit" @click="toggleEditMode"
                        :class="`${buttonColor} hover:${buttonColor} flex focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-white text-sm w-full sm:w-auto px-5 py-2 text-center items-center`">
                        <img :src="buttonImage" class="h-[15px] mr-2">
                        {{ buttonLabel }}
                    </button> -->
                    <!-- Edit button -->
                    <button v-if="!isEditing" @click="enterEditMode"
                        class="flex text-white bg-indigo-500 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center items-center">
                        <img src="src/assets/edit.png" class="h-[15px] mr-2">
                        Edit
                    </button>

                    <!-- Save button -->
                    <button v-if="isEditing" @click="saveChanges"
                        class="flex text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center items-center">
                        <img src="src/assets/save.png" class="h-[15px] mr-2">
                        Save
                    </button>
                </div>
                
            </div>
          </div>


      </div>


    </div>
  </main>
</template>
