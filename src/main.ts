import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";
import { createAuth0 } from "@auth0/auth0-vue"
import routes from "virtual:generated-pages";
import App from "./App.vue";
import "./styles.scss"

import "@unocss/reset/tailwind.css";
import "uno.css";

createApp(App)
  .use(
    createRouter({
      history: createWebHistory(import.meta.env.BASE_URL),
      routes,
    })
  )
  .use(createPinia())
  .use(createAuth0({
    domain: "dev-tvhqmk7a.us.auth0.com",
    client_id: "53p0EBRRWxSYA3mSywbxhEeIlIexYWbs",
    redirect_uri: window.location.origin
  })
  )
  .mount("#root");