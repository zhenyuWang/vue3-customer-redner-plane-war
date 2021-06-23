import App from './App.vue'
import { getContainer } from './game'
import { createApp } from './runtime-canvas'
import './styles/index.css'

console.warn = () => { };
createApp(App).mount(getContainer())