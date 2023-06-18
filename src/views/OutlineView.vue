<script setup>
  import { ref, onMounted } from 'vue'
  
  const props = defineProps({
    guid: {
      type: String,
      required: true,
    },
  });

  const emit = defineEmits([])

  onMounted(() => {
    ///loading spinner
    ///query the book
    /// check the timestamp

    /// if within a thershold, query every 7 seconds

    ///format the book so it looks beautiful on the page
  })
</script>

<template>
  <div class="root">
  testing tesitng 123
  {{ props.guid }}
</div>
</template>

<style scoped>
.root {
  --clr-text: hsl(204, 20%, 15%);
  --clr-background: #ffffff;
  --clr-text-background: hsl(0, 7%, 89%);
  --clr-primary: #8fb4ff;
  --clr-secondary: hsl(222, 100%, 96%);
  --clr-accent: #ff8f94;
}

:root{
  --clr-text: hsl(204, 20%, 15%);
  --clr-background: #ffffff;
  --clr-text-background: hsl(0, 7%, 89%);
  --clr-primary: #8fb4ff;
  --clr-secondary: hsl(222, 100%, 96%);
  --clr-accent: #ff8f94;
}
</style>
