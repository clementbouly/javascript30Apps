window.addEventListener("keydown", (e) => {
	if (e.repeat) return
	playSound(e)
})

window.addEventListener("keyup", (e) => {
	const key = getKeyElement(e)
	togglePlayingEffect(key)
})

window.addEventListener("mousedown", (e) => {
	const key = e.target as HTMLDivElement
	const keyDiv = key.parentElement as HTMLDivElement
	const keyCode = keyDiv.getAttribute("data-key")
	const audio = document.querySelector(`audio[data-key="${keyCode}"]`) as HTMLAudioElement

	if (!audio) return

	audio.currentTime = 0
	audio.play()
	togglePlayingEffect(keyDiv)
})

// event quand on lache le click
window.addEventListener("mouseup", (e) => {
	const key = e.target as HTMLDivElement
	const keyDiv = key.parentElement as HTMLDivElement
	// test if keyDiv as a data-key attribute
	if (!keyDiv.hasAttribute("data-key")) return
	togglePlayingEffect(keyDiv)
})

function playSound(e: KeyboardEvent) {
	const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`) as HTMLAudioElement
	const key = getKeyElement(e)

	if (!audio) return

	audio.currentTime = 0
	audio.play()
	togglePlayingEffect(key)
}

function getKeyElement(e: KeyboardEvent) {
	return document.querySelector(`div[data-key="${e.keyCode}"]`) as HTMLDivElement
}

function togglePlayingEffect(key: HTMLDivElement) {
	if (!key) return
	key.classList.toggle("playing")
}
