/* eslint-disable no-restricted-globals */
// import ContentScripts from './ContentScripts'

// new ContentScripts()

// import './cookies.js'
chrome.runtime.onMessage.addListener((data) => {
  data.cookies.forEach(({ name, value }) => {
    document.cookie = `${name}=${value};path=/`
  })

  location.reload()
})
