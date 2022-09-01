<script setup lang="ts">
    const showSidebar = ref(true)
    const ux = ref("Welcome to my website!")
    const socialMedia = reactive(
        [
            {
                name: "mdi-github",
                link: "https://github.com/obahamonde",
            },
            {
                name: "mdi-linkedin",
                link: "https://www.linkedin.com/in/obahamondem/",
            },
            {
                name: "mdi-twitter",
                link: "https://twitter.com/ssc_obahamonde"
            },
            {
                name: "mdi-youtube",
                link: "https://www.youtube.com/channel/UCSYqS3DhVLNBqoRKvjE4tGg"
            }
        ])
    
    const { data } = useFetch("https://programming-quotes-api.herokuapp.com/Quotes/random").json()
    
    </script>
    
    <template>
        <h1 text-6xl col center font-script>{{ ux }}</h1>
        <main row>
            <Ico icon="mdi-menu" m-2 z-50 tl text-xl text-accent dark:text-primary cp scale
                @click="showSidebar = !showSidebar" fixed :class="{ 'animate-bounce': !showSidebar }" />
    
            <section>
                <div col items-center bg-primary dark:bg-accent tl fixed shadow-accent dark:shadow-success shadow-lg h-full
                    w-48 v-if="showSidebar" animate-fade-in-left>
    
                    <img src="/images/ob.png" h-32 alt="ob" bg-gray-300 dark:bg-gray-300 px-1 rf m-2 mt-8 sh-md
                        backdrop-blur-xl />
                    <div col center m-1>
                        <h1 text-md my-1 font-bold text-black dark:text-primary>Oscar Bahamonde</h1>
                        <h2 text-sm mb-2 font-mono font-extrabold text-accent dark:text-success>Developer and Engineer</h2>
                        <a href="mailto:oscar.bahamonde.dev@gmail.com" text-xs mb-2 font-mono font-extrabold hover:underline
                            cp text-accent dark:text-success>oscar.bahamonde.dev@gmail.com</a>
                        <a href="/cv.pdf" btn-post my-1 row center><small text-xs>Download Resume</small>
                            <Ico icon="mdi-download" cp scale x1 />
                        </a>
                    </div>
                    <h3 mt-4 text-md font-bold text-accent dark:text-success>Let's get in touch!</h3>
                    <div row center m-2>
                        <a v-for="social in socialMedia" :key="social.name" :href="social.link" m-1 cp>
                            <Ico :icon="social.name" scale x2 dark:text-primary text-accent hover:outline rf />
                        </a>
                    </div>
                </div>
            </section>
            <section col center m-auto>
    
               <h2 text-2xl w-192 mt-8 font-script animate-fade-in>I'm Oscar and I love building useful tools for
                    professional teams and individuals.</h2>
                    <h2 mt-8 >Quote of the day 🤓</h2>
             
                    <blockquote text-sm w-192 font-script animate-fade-in-down  text-accent dark:text-primary>"{{  data.en 
                    }}"</blockquote>
                       <author text-sm w-192 font-sans animate-fade-in-down mt-2 text-black dark:text-white font-extrabold>-{{
                     data.author  }}</author>
    
                <p mt-12 animate-fade-in>Please tell me who you are so you can have the nicest time here:</p>
                <div grid2 gap-4 mt-12 animate-fade-in-up>
                    <RouterLink to="/app/recruiter">
                        <div dark:invert h-24 bg-amber col center p-4 rounded-lg text-accent shadow-accent shadow-md
                            font-extrabold hover:underline cp >HR professional/recruiter</div>
                    </RouterLink>
                    <RouterLink to="/app/developer">
                        <div dark:invert h-24 bg-blue col center p-4 rounded-lg text-accent shadow-accent shadow-md
                            font-extrabold hover:underline cp >Developer/Engineer</div>
                    </RouterLink>
                    <RouterLink to="/app/manager">
                        <div dark:invert h-24 bg-cyan col center p-4 rounded-lg text-accent shadow-accent shadow-md
                            font-extrabold hover:underline cp >Business person</div> </RouterLink>
                            <RouterLink to="/foobar"><div dark:invert h-24 bg-green col center p-4 rounded-lg text-accent shadow-accent shadow-md
                            font-extrabold hover:underline cp >Just curious</div></RouterLink>
               
                            
                </div>
            </section>
    
        </main>
    </template>
    <style scoped>
    .active {
        @apply text-red-500;
    }
    </style>