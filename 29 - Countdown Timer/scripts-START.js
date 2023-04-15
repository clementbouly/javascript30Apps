const displayTimeLeft = document.querySelector(".display__time-left")
const displayEndTime = document.querySelector(".display__end-time")
const buttons = document.querySelectorAll("[data-time]")
const form = document.querySelector("#custom")
let timeClickingInterval

buttons.forEach((button) => {
	const minutesToAdd = button.dataset.time
	button.addEventListener("click", () => launchClock(minutesToAdd))
})

form.addEventListener("submit", (e) => {
	e.preventDefault()
	const minutesToAdd = form.minutes.value
	const secondsToAdd = minutesToAdd * 60
	launchClock(secondsToAdd)
	form.reset()
})

function launchClock(seconds) {
	clearInterval(timeClickingInterval)
	const now = Date.now()
	const then = now + seconds * 1000

	updateClock(now, then)
	displayEndTime.textContent = `Be back at ${new Date(then).toLocaleTimeString()}`

	timeClickingInterval = setInterval(() => {
		const currentTime = Date.now()
		const isTimeUp = updateClock(currentTime, then)

		if (isTimeUp) {
			clearInterval(timeClickingInterval)
			console.log("done")
		}
	}, 1000)
}

function updateClock(now, then) {
	const secondsLeft = Math.round((then - now) / 1000)

	if (secondsLeft <= 0) {
		return true
	}

	const minutesLeft = Math.floor(secondsLeft / 60)
	const seconds = secondsLeft % 60

	const displaySeconds = seconds < 10 ? `0${seconds}` : seconds

	const display = `${minutesLeft}:${displaySeconds}`
	document.title = display
	displayTimeLeft.textContent = display

	return false
}
