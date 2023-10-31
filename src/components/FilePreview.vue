<template>
  <div>
    <div>
      <a :href="fileSource" target="_blank">{{ fileSource }}</a>
    </div>
    <div v-if="fileType === 'image'">
      <img :src="fileSource" alt="File Preview" />
    </div>
    <div v-else-if="fileType === 'pdf'">
      <iframe :src="fileSource" width="100%" height="500px"></iframe>
    </div>
    <div v-else-if="fileType === 'video'">
      <video controls width="100%" height="auto">
        <source :src="fileSource" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fileSource: String
  },
  data() {
    return {
      fileType: 'unknown'
    }
  },
  computed: {
    determineFileType() {
      if (this.fileSource.startsWith('http') || this.fileSource.startsWith('https')) {
        console.log('Detected URL')
        return 'url'
      }
      const extension = this.getFileExtension(this.fileSource);
      console.log('Extension:', extension);
      if (extension) {
        if (['jpg', 'jpeg', 'png', 'gif'].includes(extension.toLowerCase())) {
          console.log('Detected image')
          return 'image'
        } else if (extension.toLowerCase() === 'pdf') {
          console.log('Detected PDF')
          return 'pdf'
        } else if (['mp4', 'webm', 'ogg'].includes(extension.toLowerCase())) {
          console.log('Detected video')
          return 'video'
        }
      }
      console.log('Unknown file type')
      return 'unknown'
    }
  },
  methods: {
    getFileExtension(url) {
      const extensionMatch = url.match(/\.([0-9a-z]+)(?:[\?#]|$)/i)
      if (extensionMatch && extensionMatch[1]) {
        return extensionMatch[1].toLowerCase()
      }
      return ''
    }
  },
  watch: {
    fileSource(newVal) {
        console.log('File source changed:', newVal);
    this.fileType = this.determineFileType();
    console.log('File type changed:', this.fileType)
    }
  }
}
</script>
