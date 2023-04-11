const video = document.querySelector(".player")
const canvas = document.querySelector(".photo")
const ctx = canvas.getContext("2d")
const strip = document.querySelector(".strip")
const snap = document.querySelector(".snap")

// launch the webcam and display it on the video element
function getVideo() {
	navigator.mediaDevices
		.getUserMedia({ video: true, audio: false })
		.then((localMediaStream) => {
			console.log(localMediaStream)
			video.srcObject = localMediaStream
			video.play()
		})
		.catch((err) => {
			console.error(`OH NO!!!`, err)
		})
}

// paint the video on the canvas
function paintToCanvas() {
	const width = video.videoWidth
	const height = video.videoHeight
	canvas.width = width
	canvas.height = height
	console.log(video, width, height)

	return setInterval(() => {
		ctx.drawImage(video, 0, 0, width, height)
		// take the pixels out
		let pixels = ctx.getImageData(0, 0, width, height)
		// mess with them
		// pixels = redEffect(pixels)
		pixels = rgbSplit(pixels)
		// ctx.globalAlpha = 0.1
		// put them back
		ctx.putImageData(pixels, 0, 0)
	}, 16)
}

function rgbSplit(pixels) {
	for (let i = 0; i < pixels.data.length; i += 4) {
		pixels.data[i - 150] = pixels.data[i + 0] // red
		pixels.data[i + 100] = pixels.data[i + 1] // green
		pixels.data[i - 150] = pixels.data[i + 2] // blue
	}
	return pixels
}

// take a photo
function takePhoto() {
	snap.currentTime = 0
	snap.play()

	// take the data out of the canvas
	const data = canvas.toDataURL("image/jpeg")

	const link = document.createElement("a")
	link.href = data
	link.setAttribute("download", "handsome")
	link.innerHTML = `<img src=${data}></img>`
	strip.insertBefore(link, strip.firstChild)
}

getVideo()

video.addEventListener("canplay", paintToCanvas)
