<template>
  <div>
    <label class="block mb-2 text-sm font-semibold text-indigo-900" for="file_input">Upload file</label>
    <div class="flex items-center">
      <input
        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        ref="fileInput"
        accept="image/*, .pdf"
        @change="handleFileChange"
        type="file"
      >
      <button @click="uploadFile" class="ml-2 bg-indigo-500 text-white py-1 px-2 rounded-md hover:bg-indigo-700 focus:outline-none text-base">Upload</button>
    </div>
    <div id="status" class="mt-2 text-sm text-green-700 font-semibold">{{ statusMessage }}</div>
  </div>
</template>





<script>




export default {
  data() {
    return {
      selectedFile: null,
      statusMessage: "",
    };
  },
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    uploadFile() {
      if (!this.selectedFile) {
        this.statusMessage = "Please select a file to upload.";
        return;
      }

      const formData = new FormData();
      formData.append("file", this.selectedFile);

      fetch("http://localhost:8080/uploadFile", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`File upload failed: ${response.status} - ${response.statusText}`);
          }
          return response.text(); // Extract the response as text (media URL)
        })
        .then((mediaURL) => {
          this.statusMessage = `File uploaded successfully.`;
          this.$emit("fileUploaded", mediaURL);
          // console.log(mediaURL)
          
        })
        .catch((error) => {
          this.statusMessage = error.message;
        });
    },
  },
};
</script>