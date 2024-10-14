import './style.css'
import { initializeApp } from "firebase/app";

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './core/ApiService'

import App from './App.vue'
import router from './router'

const firebaseConfig = {
  apiKey: "AIzaSyD4VOld6sJez388qyIyu65V_i7hP5mVpws",
  authDomain: "vue-jwt-ce647.firebaseapp.com",
  projectId: "vue-jwt-ce647",
  storageBucket: "vue-jwt-ce647.appspot.com",
  messagingSenderId: "432088282251",
  appId: "1:432088282251:web:c0cdda46837c06b6c4d08e"
};

initializeApp(firebaseConfig)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
