<script setup lang="ts">

</script>

<template>
    <main class=" flex flex-col items-center justify-center">
        <div class="font-fig flex items-center justify-center p-3 w-3/4 sm:w-2/4 h-4/5 text-2xl font-bold text-gray-900">
            Profile
        </div>
        <div
            class="mt-2 mb-10 font-fig flex flex-col items-center justify-center p-3 w-3/4 sm:w-2/4 h-auto text-xl font-bold text-gray-900 bg-white border border-gray-300 rounded-lg shadow-md">
            <div class="flex flex-col items-center justify-center py-4 space-y-5">

                <img class="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                    src="src\assets\bodymoml.png" alt="Profile Picture">

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
                    class="flex flex-col items-center mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                    <div class="w-full">
                        <label for="studentid" class="block mb-2 text-sm font-semibold text-indigo-900">
                            Student ID</label>
                        <input type="text" id="studentid" disabled
                            class="bg-gray-300 border border-indigo-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                            placeholder="" value="BRO-073" required>
                    </div>

                    <div class="w-full">
                        <label for="username" class="block mb-2 text-sm font-semibold text-indigo-900">
                            Username</label>
                        <input type="text" id="username"
                        
                            class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                            placeholder="" value="Gboy" required>
                    </div>


                </div>

                <div
                    class="flex flex-col items-center mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                    <div class="w-full">
                        <label for="first_name" class="block mb-2 text-sm font-semibold text-indigo-900">
                            First name</label>
                        <input type="text" id="first_name"
                            class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                            placeholder="" value="Gorn" required>
                    </div>

                    <div class="w-full">
                        <label for="last_name" class="block mb-2 text-sm font-semibold text-indigo-900 ">
                            Last name</label>
                        <input type="text" id="last_name"
                            class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                            placeholder="" value="Wannapairote" required>
                    </div>
                </div>

                <div
                    class="flex flex-col items-center mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                    <div class="w-full">
                        <label for="department" class="block mb-2 text-sm font-semibold text-indigo-900">
                            Departmenr</label>
                        <input type="text" id="department" disabled
                            class="bg-gray-300 border border-indigo-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                            placeholder="" value="Faculty of Medicine" required>
                    </div>

                </div>

                <div class="flex justify-center">
                    <button type="submit"
                        class="flex text-white bg-indigo-500  hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center items-center ">
                        <img src="src\assets\edit.png" class="h-[15px]  mr-2">

                        Edit</button>
                </div>
            </div>
        </div>







    </main>
</template>
  
