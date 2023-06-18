<script setup>
import { ref, computed } from 'vue'
import { getTitles, getEpigraphs, uploadBook } from '../apiHelper.js'
import LoadingDialog from '../components/LoadingDialog.vue'
import router from '@/router'

const description = ref('')
const isAIThinking = ref(false)

const titleOptions = ref([])
const epigraphOptions = ref([])

const customTitle = ref('')

const convertGPTResponseToList = (response) => {
  console.log('convertGPTResponseToList')
  console.log(response)
  const result = response['body']
    .replace(/(^")|("$)/g, '')
    .split('\\n')
    .map((title) => title.trim())
    .map((title) => title.replace(/^\d+\.\s*/, ''))
    .map((title) => title.replace(/\\"/g, '"'))
    .filter((title) => title)

  console.log(result)
  return result
}

const generateTitles = async () => {
  isAIThinking.value = true
  try {
    const result = await getTitles(description.value)
    titleOptions.value = convertGPTResponseToList(result)
    console.log(result)
  } catch (e) {
    console.log(e)
  }
  isAIThinking.value = false
}

const generateEpigraphs = async () => {
  isAIThinking.value = true
  try {
    const title = isCustomTitleSelected.value ? customTitle.value : selectedTitle.value
    const result = await getEpigraphs(description.value, title)
    epigraphOptions.value = convertGPTResponseToList(result)
  } catch (e) {
    console.log(e)
  }
  isAIThinking.value = false
}

const isTitleSelected = ref(false)
const isCustomTitleSelected = ref(false)
const selectedTitle = ref('')
const selectedEpigraph = ref('')

const selectTitle = (evt) => {
  const liElements = document.querySelectorAll('div.selected-title')

  liElements.forEach((li) => {
    li.classList.remove('selected-title')
  })

  evt.target.classList.add('selected-title')

  selectedTitle.value = evt.target.innerText
  isTitleSelected.value = true
}

const selectCustomTitle = () => {
  const liElements = document.querySelectorAll('div.selected-title')

  liElements.forEach((li) => {
    li.classList.remove('selected-title')
  })

  document.querySelector('#custom-title-input').classList.add('selected-title')

  isTitleSelected.value = true
  isCustomTitleSelected.value = true
}

const canGenerateBook = computed(() => {
  return description.value.length > 0 && isTitleSelected.value
})

const selectEpigraph = (evt) => {
  const liElements = document.querySelectorAll('div.selected-epigraph')

  liElements.forEach((li) => {
    li.classList.remove('selected-epigraph')
  })

  evt.target.classList.add('selected-epigraph')

  selectedEpigraph.value = evt.target.innerText
}

const generateBook = async () => {
  const id = await uploadBook(description.value, selectedTitle.value, selectedEpigraph.value)

  router.push(`/outline/${id}`)
}
</script>

<template>
  <LoadingDialog :isOpen="isAIThinking">
    <div class="lds-hourglass"></div>
    <div>
      <i> AI thinking!</i>
      <br />
      (this could take a minute 😴)
    </div>
  </LoadingDialog>
  <main>
    <div class="wrapper flow">
      <h1>AI Book Planner</h1>
      <!-- <p class="subtitle">an experiment by <a href="https://www.youtube.com/c/ami1649/">ami1649</a></p> -->

      <h3>Step 1 - What is this book about?</h3>
      <textarea
        class="text-area"
        rows="3"
        placeholder="Describe the book want to generate"
        v-model="description"
      ></textarea>

      <h3>Step 2 - Select a title</h3>
      <button class="button" @click="generateTitles" :disabled="!description">
        Show Me Some Titles
      </button>

      <ul class="title-options" v-show="description">
        <li v-for="title in titleOptions" :key="title">
          <div @click="selectTitle" class="title-option">
            {{ title }}
          </div>
        </li>
        <li v-if="titleOptions.length">
          <div id="custom-title-input" @click="selectCustomTitle" class="title-option">
            <input
              type="text"
              class="input"
              placeholder="Your custom title"
              v-model="customTitle"
            />
          </div>
        </li>
      </ul>
      <h3>Step 3 - Select an epigraph</h3>

      <div style="display: flex">
        <VTooltip>
          <div>
            <button class="button" @click="generateEpigraphs" :disabled="!canGenerateBook">
              Show Me (fake) Epigraphs
            </button>
          </div>
          <template #popper v-if="!canGenerateBook && titleOptions.length">
            Select a book title
          </template>
        </VTooltip>
      </div>

      <p class="subtitle" v-if="epigraphOptions.length">
        <i>Warning! These quotes were invented by AI and are likely not real</i>
      </p>

      <ul class="title-options" v-show="description">
        <li v-for="epigraph in epigraphOptions" :key="epigraph">
          <div @click="selectEpigraph" class="title-option">
            {{ epigraph }}
          </div>
        </li>
      </ul>

      <h3>Step 4 - Generate Book</h3>
      <div style="display: flex">
        <VTooltip>
          <div>
            <button class="button" @click="generateBook" :disabled="!canGenerateBook">
              Let's do this 🫡
            </button>
          </div>
          <template #popper v-if="!canGenerateBook && titleOptions.length">
            Select a book title
          </template>
        </VTooltip>
      </div>
      <br />
      <p class="subtitle">
        <a href="https://www.buymeacoffee.com/ami1649">help keep this site alive 🙏🏻</a>
      </p>
      <p class="subtitle">reach out: amichaimlevy@gmail.com</p>
    </div>
    <br /><br /><br />
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
  background-color: var(--clr-text-background);
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
  background-color: var(--clr-text-background);
  font-size: var(--fs-1);
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

.selected-title,
.selected-epigraph {
  --animation-delay: 0.4s;
  position: relative;
  overflow: hidden;
  border-right: 1px solid var(--clr-accent);
  transition: border-right 0s linear var(--animation-delay);
}

.selected-title::after,
.selected-epigraph::after {
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

.subtitle {
  font-size: var(--fs--2);
}

.fire-emoji {
  width: 50px;
}

button:disabled > .fire-emoji {
  filter: grayscale(100%);
}

.lds-hourglass {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}

.lds-hourglass:after {
  content: ' ';
  display: block;
  border-radius: 50%;
  width: 0;
  height: 0;
  margin: 8px;
  box-sizing: border-box;
  border: 32px solid #cef;
  border-color: #cef transparent #cef transparent;
  animation: lds-hourglass 1.2s infinite;
}

@keyframes lds-hourglass {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  100% {
    transform: rotate(1800deg);
  }
}
</style>
