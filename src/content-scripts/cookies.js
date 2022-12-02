/* eslint-disable no-restricted-globals */

chrome.runtime.onMessage.addListener((data) => {
  data.cookies.forEach(({ name, value }) => {
    document.cookie = `${name}=${value};path=/`
  })

  location.reload()
})
