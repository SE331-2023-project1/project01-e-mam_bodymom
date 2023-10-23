<template>
  <div class="flex flex-col p-3 w-3/4 h-4/5 border border-gray-700
        rounded-lg mb-4 bg-white shadow-md my-5 mx-auto">

    <div class="font-fig mx-5 text-black">
      <h1 class="flex justify-center font-bold text-2xl mb-3 text-green-600">Add Teacher</h1>
      <div class="flex mb-3">
     
      </div>

     
      <div>

        <!-- แบบฟอร์มสำหรับเพิ่มครู -->
        <ImageUpload @fileUploaded="onFileUploaded" v-model="mediaURLs" />
        <form @submit.prevent="onSubmit">
          
          <div class="mb-2">
          <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
          <InputText type="text" v-model="username" class="text-emerald-600 text-sm font-semibold" placeholder="Usename">
          </InputText>
          <div v-if="errors['username']" class="text-red-500 text-sm my-2" style="font-weight: 600; font-size: small;">❌
            {{ errors['username'] }}</div>
        </div>

        <div class="mb-2">
          <label for="firstName" class="block text-sm font-medium leading-6 text-gray-900">First Name</label>
          <InputText type="text" v-model="firstName" class="text-emerald-600 text-sm font-semibold"
            placeholder="Enter your first name"></InputText>
          <div v-if="errors['firstName']" class="text-red-500 text-sm my-2" style="font-weight: 600; font-size: small;">❌
            {{ errors['firstName'] }}</div>

        </div>

        <div class="mb-2">
          <label for="lastName" class="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
          <InputText type="text" v-model="lastName" class="text-emerald-600 text-sm font-semibold"
            placeholder="Enter your last name"></InputText>
          <div v-if="errors['lastName']" class="text-red-500 text-sm my-2" style="font-weight: 600; font-size: small;">❌
            {{ errors['lastName'] }}</div>

        </div>

        <div>
          <label for="department" class="block text-sm font-medium leading-6 text-gray-900">Department</label>
          <InputText type="text" v-model="department" class="text-emerald-600 text-sm font-semibold"
            placeholder="Enter your department"></InputText>
          <div v-if="errors['department']" class="text-red-500 text-sm my-2" style="font-weight: 600; font-size: small;">❌
            {{ errors['department'] }}</div>

        </div>

        <div>
          <label for="academic" class="block text-sm font-medium leading-6 text-gray-900">Academic</label>
          <InputText type="text" v-model="academic" class="text-emerald-600 text-sm font-semibold"
            placeholder="Enter your last name"></InputText>
          <div v-if="errors['academic']" class="text-red-500 text-sm my-2" style="font-weight: 600; font-size: small;">❌
            {{ errors['academic'] }}</div>

        </div>


        <div class="mb-2">
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email Address</label>
          <InputText type="text" v-model="email" class="text-emerald-600 text-sm font-semibold"
            placeholder="Enter your email address"></InputText>
          <div v-if="errors['email']" class="text-red-500 text-sm my-2" style="font-weight: 600; font-size: small;">❌ {{
            errors['email'] }}</div>

        </div>

        <div class="mb-4">
          <div class="flex items-center justify-start">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          </div>

          <InputText v-model="password" type="password" class="text-emerald-600 text-sm font-semibold"
            placeholder="Create password"></InputText>
          <div v-if="errors['password']" class="text-red-500 text-sm my-2" style="font-weight: 600; font-size: small;">❌
            {{ errors['password'] }}</div>
        </div>

      

          <div id="flashMessage" class="mb-2 animate-pulse text-center text-base font-fig bg-green-500 font-fig text-white" v-if="message">
              <h4>{{ message }}</h4>
            </div>
            <FlashMessage />
          <div class="flex justify-center mb-2">
            <button class="bg-green-500 hover:bg-green-700 shadow-md px-2 py-1
            rounded-lg font-bold text-white" type="submit">Add Teacher</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import InputText from '@/components/InputText.vue'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { useAuthStore } from '@/stores/auth'
import { useRouter, RouterLink } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'
import ImageUpload from '@/components/ImageUpload.vue'

const authStore = useAuthStore()
const router = useRouter()
const storeMessage = useMessageStore()

const { message } = storeToRefs(storeMessage)

const validationSchema = yup.object({
  username: yup.string()
    .required('The username is required')
    .matches(/^[A-Za-z0-9]+$/, 'Username should contain only alphabetic characters and numbers'),
  firstName: yup.string()
    .required('The firstName is required')
    .matches(/^[A-Za-z]+$/, 'First name should contain only alphabetic characters'),

  lastName: yup.string()
    .required('The lastName is required')
    .matches(/^[A-Za-z]+$/, 'Last name should contain only alphabetic characters'),

    department: yup.string()
    .required('The department is required')
    .matches(/^[A-Za-z]+$/, 'Department should contain only alphabetic characters'),

  academic: yup.string()
    .required('The academic is required')
    .matches(/^[A-Za-z.]+$/, 'Academic should contain only alphabetic characters and dot(.)'),

  email: yup.string()
    .required('The email is required')
    .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, 'Please enter a valid email address ending with example.com'),

  password: yup.string()
    .required('The password is required')
    .min(6, 'Password must be at least 6 characters long.'),
})

const { errors, handleSubmit } = useForm({
  validationSchema,

  initialValues: {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    images: [],
    department: '',
    academic: ''
  }
})

const { value: username } = useField<string>('username')

const { value: firstName } = useField<string>('firstName')

const { value: lastName } = useField<string>('lastName')

const { value: department } = useField<string>('department')

const { value: academic } = useField<string>('academic')

const { value: email } = useField<string>('email')

const { value: password } = useField<string>('password')
  const { value: images } = useField<string[]>('images')

const onSubmit = handleSubmit((values) => {
  authStore
    .teacherRegister(values.username, values.firstName, values.lastName, 
    values.email, values.password, values.images,
    values.department, values.academic)
    .then(() => {
      storeMessage.updateMessage('Add Teacher Successfully');
      setTimeout(() => {
        storeMessage.resetMessage()
        location.reload()
      }, 4000)
    })
    .catch(() => {
      storeMessage.updateMessage('could not add teacher')

      setTimeout(() => {
        storeMessage.resetMessage()
        location.reload()
      }, 3000)
    })
})


import { ref } from 'vue';

const mediaURLs = ref<string[]>([]);

const onFileUploaded = (mediaURLs: string[]) => {
  // Assuming mediaURLs contains at least one URL
  images.value = [mediaURLs[0]];
  console.log(images.value)
};

</script>

  