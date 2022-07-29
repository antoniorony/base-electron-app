const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title')

const setButtonOpenFile = document.getElementById('btnOpen')
const filePathElement = document.getElementById('filePath')

setButton.addEventListener('click', () => {
    const title = titleInput.value
    window.electronAPI.setTitle(title)
});

setButtonOpenFile.addEventListener('click', async () => {
    const filePath = await window.electronAPI.openFile()
    filePathElement.innerText = filePath
  })