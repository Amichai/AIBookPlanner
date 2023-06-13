<script setup>
import { ref } from 'vue'

const description = ref('')

const placeholderOptions = [
  'A small, furry rabbit embarks on an unlikely adventure to save a stranded whale.',
  'Following an unexplainable beacon, a gang of rebellious teens take on a powerful evil tyrant.',
  'A mischievous rock wanders the world, collecting insights from its travels and sharing them with anyone willing to listen.',
  'When a talking raccoon is mistaken for a bandit, the unlikeliest of friends must join forces to save the day.',
  'A medieval knight teams up with a crew of modern-day urbanites to take down an alien invasion.',
  'Three witches must cook up a magical potion to reverse a curse before their town is destroyed.',
  'A single forgotten happy hour leads to one epic night of adventure and excitement.',
  'A reluctant space explorer embarks on a mission to locate a mysterious planet that could hold the key to saving humanity.',
  'A detective with extraordinary powers and an unlikely sidekick team up to unravel a centuries-old mystery.',
  'When a toy box transports two children to a distant galaxy, they must enlist the help of intergalactic superheroes to make their way back home.',
  'Discover how you can save money by eating cereal for every meal',
  'The bizarre history of the bathroom fixture from ancient Egypt to modern day use',
  'Plant communication',
  'Uncovering the fascinating secrets of bees',
  "The intricate formalities of visiting a foreign royal family, so you don't make any faux pas!"
]

const placeholder = placeholderOptions[Math.floor(Math.random() * placeholderOptions.length)];


const titleOptions = ref([])

const generateTitles = () => {
  titleOptions.value = [
    'Stellar Stories: Writing Science Fiction with Flair',
    'Spinning Tales in Space: A Creative Writing Guide',
    'Writing Fictions of the Future',
    'Captivating Science Fiction: Crafting Epic Storytellin',
    'The Worlds Ahead: Crafting Inventive Sci-Fi Stories',
    'Crafting Vivid Sci-Fi Narratives',
    'Experienced Authors & Innovative Sci-Fi: Writing Methodologies',
    'Writing Alternative Worlds: Tips for Writing Sci-F',
    'Crafting Epic Sci-Fi: Storytelling and Technique',
    'Becoming a Sci-Fi Storyteller: Writing Techniques & Inspiration'
  ]
}

const selectTitle = (evt) => {
  const liElements = document.querySelectorAll('li.selected');

  liElements.forEach((li) => {
    li.classList.remove('selected');
  });

  evt.target.classList.add('selected');
}

const selectCustomTitle = (evt) => {
  const liElements = document.querySelectorAll('li.selected');

  liElements.forEach((li) => {
    li.classList.remove('selected');
  });

  document.querySelector('#custom-title-input').classList.add('selected');
}

</script>

<template>
  <main>
    <div class="wrapper flow">
      <h1>AI Book Generator</h1>
      <h3>
        Step 1 - What is this book about?:
      </h3>
      <textarea class="text-area" rows="3"
      :placeholder="placeholder"
        v-model="description"
      ></textarea>

      <h3>
        Step 2 - Let's select a title:
      </h3>
      <button 
        class="button"
        @click="generateTitles"
        :disabled="!description">
        Show Me Some Titles
    </button>

      <ul class="title-options">
        <li v-for="title in titleOptions" :key="title" @click="selectTitle">
          {{ title }}
        </li>
        <li @click="selectCustomTitle" id="custom-title-input">
          <input type="text" class="input">
        </li>
      </ul>
    </div>
    <br><br><br><br><br><br>
  </main>
</template>

<style scoped>
.text-area {
  height: 100%;
  width: 100%;
  
  word-break: break-word;
  box-sizing: border-box;
  line-height: 1.3;
  padding: 0.5rem;
  resize: none;
  outline: none;
  font-family: var(--ff-base);
  background-color: rgb(48, 47, 51);
  font-size: var(--fs-0);
  border-radius: 0.3rem;
  border: 1px solid var(--clr-accent);
}

.button {
  font-size: var(--fs-0);
  padding: 0.5rem 1rem;
}

.input {
  width: calc(100% - 0.7rem);
  line-height: 1.3;
  border: none;
  border-radius: 0.3rem;
  padding: 0.1rem 0.5rem;
  font-family: var(--ff-base);
  background-color: rgb(48, 47, 51);
  font-size: var(--fs-0);
  outline: none;
  font-family: var(--ff-accent);
}

.selected {
  border: 1px solid var(--clr-accent);
  border-radius: 0.3rem;
}

li {
  padding: 0.1rem 0.5rem;
  font-family: var(--ff-accent);
}


</style>
