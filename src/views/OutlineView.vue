<script setup>
  import { ref, onMounted } from 'vue'
  
  const props = defineProps({
    guid: {
      type: String,
      required: true,
    },
  });

  const title = ref('')
  const summary = ref('')
  const epigraph = ref('')
  const epigraphPart1 = ref('')
  const epigraphPart2 = ref('')

  const emit = defineEmits([])
  onMounted(async () => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    const response = await fetch(`https://i27f13a1be.execute-api.us-east-1.amazonaws.com/dev?id=${props.guid}`, requestOptions);
    const responseJson = await response.json();
    console.log(responseJson)

    const item = responseJson.Items[0]
    title.value = decodeURIComponent(item.title.S)
    epigraph.value = decodeURIComponent(item.epigraph.S)
    summary.value = decodeURIComponent(item.summary.S)

    const epigraphParts = epigraph.value.split('" -')
    epigraphPart1.value = epigraphParts[0] + '"';
    if(epigraphParts[1]) {
      epigraphPart2.value = '-' + epigraphParts[1]
    }
  })

</script>

<template>
  <main class="root">
    <div class="wrapper flow">
      <h1>{{title}}</h1>
      <!-- <p class="author"><i>AI Outline</i></p> -->
      <br>
      <div class="epigraph-wrapper">
        <span class="epigraph" v-if="!epigraphPart1 || !epigraphPart2">{{ epigraph }}</span>
        <div class="epigraph">
          <span class="epigraph-part-1" v-if="epigraphPart1 && epigraphPart2">{{ epigraphPart1 }}</span>
          <span class="epigraph-part-2" v-if="epigraphPart1 && epigraphPart2">{{ epigraphPart2 }}</span>
        </div>


      </div>

      

    
      {{summary}}
      <br>
      <br>

      </div>
      </main>

</template>

<style scoped>

h1 {
  margin-top: 0;
  padding-top: 2rem;
  text-align: center;
}

.epigraph-part-1 {
  font-style: italic;
}
.epigraph-part-2 {
  text-align: right;
}

.epigraph-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.epigraph {
  max-width: 45ch;
  display: flex;
  flex-direction: column;
}

h1, h2, h3{
  color: black;
  font-family: 'Times New Roman', Times, serif;
}
.root {
  background-color: hsl(0, 3%, 94%);;
  white-space: pre-wrap;
  color: black;
  /* height: 100dvh; */
  font-family: 'Times New Roman', Times, serif;
}
.wrapper {
  --clr-text: hsl(204, 20%, 15%);
  --clr-background: #ffffff;
  --clr-text-background: hsl(0, 7%, 89%);
  --clr-primary: #8fb4ff;
  --clr-secondary: hsl(222, 100%, 96%);
  --clr-accent: #ff8f94;
}

.author {
  text-align: center;
  font-size: 1.5rem;
  font-family: 'Times New Roman', Times, serif;
}
</style>
