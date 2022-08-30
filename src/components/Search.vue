<script setup lang="ts">
  import { ComputedRef } from 'vue';
  
  const search = ref("")
  const results = ref([])
  const page = ref(0)
  const lang = ref('en')
  const speech = useSpeechRecognition({
    lang,
    continuous: true,
  })
  const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
  const speechRecognitionList = new SpeechGrammarList()
  speechRecognitionList.addFromString(1)
  speech.recognition!.grammars = speechRecognitionList
  
  
  const { isListening, stop, result } = speech
  const selectedLanguage = ref(lang.value)
  watch(lang, lang => selectedLanguage.value = lang)
  watch(isListening, isListening => isListening ? null : selectedLanguage.value = lang.value)
  const start = () => {
    search.value = ""
    speech.start()
  }
  const query: ComputedRef<string | undefined> = computed(() => {
    if (!isListening.value) {
      return search.value.length > 0 ? search.value.split(" ").join("+") : "";
    }
    else if (isListening) {
      return result.value.split(" ").join("+")
    }
  
  })
  
  function searchQueryspeech() {
  
    const { isFetching, data } = useFetch(`/api/search/${unref(lang)}/${unref(query)}/${unref(page)}`).json()
    results.value = data
    stop()
  }
  
  function searchQuery() {
  
    const { isFetching, data } = useFetch(`/api/search/${unref(lang)}/${unref(query)}/${unref(page)}`).json()
    results.value = data
 
  }
  
  function nextPage() {
    page.value += 1
    searchQuery()
  }
  
  function prevPage() {
    page.value -= 1
    searchQuery()
  }
  
  function toSpanish() {
    lang.value = "es"
    page.value = 0
    searchQuery()
  }
  
  function toEnglish() {
    lang.value = "en"
    page.value = 0
    searchQuery()
  }
  
  function toFrench() {
    lang.value = "fr"
    page.value = 0
    searchQuery()
  }
  
  
  
  </script>
  <template>
     <div col center >
      <div row center > <label :id="lang" class="radio">
          <input v-model="lang" value="en" type="radio" hidden>
          <img src="/images/us.svg" mx-2 cp scale @click="toEnglish"
          :class="{'shadow-black scale-125 dark:shadow-white shadow-md': lang === 'en-US'}" />
      
          <span>
          </span>
        </label>
        <label :id="lang" class="radio">
          <input v-model="lang" value="fr" type="radio" hidden>
          <img src="/images/fr.svg" mx-2 cp scale @click="toFrench"
          :class="{'shadow-black scale-125 dark:shadow-white shadow-md': lang === 'fr'}" />
          
        </label>
        <label :id="lang" class="radio" >
          <input v-model="lang" value="es" type="radio" hidden>
          <img src="/images/pe.svg" mx-2 cp scale @click="toSpanish"
          :class="{'shadow-black scale-125 dark:shadow-white shadow-md': lang === 'es'}"
          >
  
        </label>
      </div>
      <div row center border-gray-500 b-2 p-2 rounded-xl w-72 hover:bg-gray-300 mt-6>
        <div i-carbon-search mx-2 text-secondary cp scale @click="searchQuery" /><input type="search" bg-transparent no-outline w-full text-secondary v-model="search"
          @keyup.enter="searchQuery" />
        <Ico icon="mdi-microphone" text-xl mx-1 text-secondary cp hover:text-primary v-if="!isListening" @click="start" />
        <Ico icon="mdi-microphone-off" text-xl mx-1 text-secondary cp hover:text-primary v-else
          @click="searchQueryspeech" />
      </div>
  </div>
      <div v-if="unref(results)">
      <div v-for="r in unref(results)" col center>
        <a :href="r.url" text-sm underline m-2 hover:text-primary >{{  r.title  }}</a>
      </div>
      <div row center mt-6 v-if="results">
        <Ico icon="mdi-chevron-left" text-xl mx-1 text-secondary cp hover:text-primary v-if="page > 0"
          @click="prevPage" />
        {{page+1}}
          <Ico icon="mdi-chevron-right" text-xl mx-1 text-secondary cp hover:text-primary v-if="page < 10"
          @click="nextPage" />
      </div>
  </div>
  </template>