const video = document.querySelector(".player__video")
const playerPlayButton = document.querySelector(".player__button")
const videoProgress = document.querySelector(".progress")
const videoProgressBar = document.querySelector(".progress__filled")
const soundInput = document.querySelector("input[name=volume]")
const playSpeedInput = document.querySelector("input[name=playbackRate]")
const skipButtons = document.querySelectorAll("[data-skip]")
const fullScreenButton = document.querySelector(".fullScreen")

playerPlayButton.addEventListener("click", togglePlay)
// video.addEventListener("click", togglePlay)

// update video progress bar as video plays
video.addEventListener("timeupdate", handleProgress)

// navigate video time by clicking on progress bar
videoProgress.addEventListener("click", scrub)

//full screen on double click
video.addEventListener("dblclick", () => video.requestFullscreen())

// navigate video time by dragging progress bar
let mousedown = false
videoProgress.addEventListener("mousemove", (e) => mousedown && scrub(e))
videoProgress.addEventListener("mousedown", () => (mousedown = true))
videoProgress.addEventListener("mouseup", () => (mousedown = false))

// update video volume
soundInput.addEventListener("input", handleRangeUpdate)

// update video play speed
playSpeedInput.addEventListener("input", handleRangeUpdate)

// skip video time
skipButtons.forEach((button) => button.addEventListener("click", skip))

// full screen
fullScreenButton.addEventListener("click", () => video.requestFullscreen())

function skip() {
	video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate() {
	video[this.name] = this.value
}

function scrub(e) {
	const scrubTime = (e.offsetX / videoProgress.offsetWidth) * video.duration
	video.currentTime = scrubTime
}

function handleProgress() {
	const percent = (video.currentTime / video.duration) * 100
	videoProgressBar.style.flexBasis = `${percent}%`
}

function togglePlay() {
	video.paused ? video.play() : video.pause()
	updateButton(video)
}

function updateButton(video) {
	const icon = video.paused ? "►" : "❚ ❚"
	playerPlayButton.textContent = icon
}
