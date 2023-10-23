<template>
  <div>
    <h1>File Upload</h1>
    <input type="file" ref="fileInput" accept="image/*" @change="handleFileChange" />
    <button @click="uploadFile">Upload</button>
    <div id="status">{{ statusMessage }}</div>
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
          // this.statusMessage = `File uploaded successfully. Media URL: ${mediaURL}`;
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