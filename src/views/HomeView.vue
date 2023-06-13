<script setup>
import { ref, computed } from 'vue'

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
    'Captivating Science Fiction: Crafting Epic Storytelling',
    'The Worlds Ahead: Crafting Inventive Sci-Fi Stories',
    'Crafting Vivid Sci-Fi Narratives',
    'Experienced Authors & Innovative Sci-Fi: Writing Methodologies',
    'Writing Alternative Worlds: Tips for Writing Sci-Fi',
    'Crafting Epic Sci-Fi: Storytelling and Technique',
    'Becoming a Sci-Fi Storyteller: Writing Techniques & Inspiration'
  ]
}

const isTitleSelected = ref(false)

const selectTitle = (evt) => {
  const liElements = document.querySelectorAll('div.selected-title');

  liElements.forEach((li) => {
    li.classList.remove('selected-title');
  });

  evt.target.classList.add('selected-title');
  isTitleSelected.value = true;
}

const selectCustomTitle = () => {
  const liElements = document.querySelectorAll('div.selected-title');

  liElements.forEach((li) => {
    li.classList.remove('selected-title');
  });

  document.querySelector('#custom-title-input').classList.add('selected-title');

  isTitleSelected.value = true;
}

const canGenerateTitle = computed(() => {
  return description.value.length > 0
    && isTitleSelected.value;
})

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
        Step 2 - Select a title:
      </h3>
      <button 
        class="button"
        @click="generateTitles"
        :disabled="!description">
        Show Me Some Titles
      </button>

      <ul class="title-options" v-show="description">
        <li v-for="title in titleOptions" :key="title">
          <div @click="selectTitle" class="title-option">
            {{ title }}
          </div>
        </li>
        <li>
          <div 
            @click="selectCustomTitle" 
            id="custom-title-input" 
            class="title-option">
            <input type="text" class="input" placeholder="Your custom title">
          </div>
        </li>
      </ul>
      <h3>
        Step 3 - Generate an Outline:
      </h3>
      <button 
        class="button"
        @click="generateTitles"
        :disabled="!canGenerateTitle">
        Take me to the outline!
      </button>
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
  width: calc(100% - 1rem);
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

.title-option {
  padding: 0.1rem 0.5rem;
  font-family: var(--ff-accent);
}


@keyframes drawBorder {
  from {
    width: 0;
  }
  to {
      width: 100%;
  }
}

.selected-title {
  --animation-delay: 0.4s;
  position: relative;
  overflow: hidden;
  border-right: 1px solid var(--clr-accent);
  transition:  border-right 0s linear var(--animation-delay);
}

.selected-title::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    border-top: 1px solid var(--clr-accent);
    border-left: 1px solid var(--clr-accent);
    border-bottom: 1px solid var(--clr-accent);
    
    animation: drawBorder var(--animation-delay) linear forwards;
}

</style>
