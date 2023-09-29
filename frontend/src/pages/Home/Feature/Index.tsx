import React, { useState, useEffect, useRef, useContext } from 'react'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useRecordWebcam } from 'react-record-webcam'
import { Index } from '../../../sections/Home/Feature/Index'
import AfterboxLibrary from '../Library/AfterboxLibrary'
import { UserContext } from '../../../context/UserContext'
import { AppDispatch, RootState } from '../../../redux/store/store'
import { fetchVideoPlaying } from '../../../redux/actions/videoPlayingAction'
import { useDispatch, useSelector } from 'react-redux'
import {
	setVideoPlaying,
	setSubmittedData,
	savePreview,
} from '../../../redux/slices/videoSlice'
import { fetchVideos } from '../../../redux/actions/videoDetailAction'
import { toast } from 'react-toastify'

const OPTIONS = {
	fileName: 'test-filename',
	mimeType: 'video/x-matroska;codecs=avc1',
	width: 1920,
	height: 1080,
	disableLogs: true,
} as const

const Home = () => {
	// Redux
	const savedPreview = useSelector(
		(state: RootState) => state.video.savedPreview
	)

	const videoPlaying = useSelector(
		(state: RootState) => state.video.videoPlaying
	)
	const dispatch: AppDispatch = useDispatch()

	// const [isFrontCamera, setIsFrontCamera] = useState(true);
	const recordWebcam = useRecordWebcam(OPTIONS)

	// Email state
	const [email, setEmail] = useState<string[]>([])

	// Delivery date state
	const [deliveryDate, setDeliveryDate] = useState<Date | null>(null)

	// Timer and countdown states
	const [timer, setTimer] = useState<number>(0)
	const [countdown, setCountdown] = useState<number | null>(null)
	const countRef = useRef<number | null>(null)

	// Active status states
	const [countdownActive, setCountdownActive] = useState(false)
	const [recordingActive, setRecordingActive] = useState(false)

	// Button visibility and timeout states
	const [showButton, setShowButton] = useState(true)
	const buttonTimeout = useRef<number | null>(null)

	// Update the payload of showVideoDetails, setShowVideoDetails
	const [videoSubmitted, setVideoSubmitted] = useState(false)

	// Context and navigation
	const userContext = useContext(UserContext)
	const { isLoggedIn } = userContext
	const navigate = useNavigate()

	// Play and Pause
	const handleVideoPlayPause = () => {
		const video = recordWebcam.previewRef.current
		if (video) {
			if (videoPlaying) {
				video.pause()
			} else {
				video.play()
			}
			dispatch(setVideoPlaying(!videoPlaying))
		}
	}

	// Video playback review
	useEffect(() => {
		const video = recordWebcam.previewRef.current
		if (video) {
			video.addEventListener('ended', () => dispatch(setVideoPlaying(false)))
			return () => {
				video.removeEventListener('ended', () =>
					dispatch(setVideoPlaying(false))
				)
			}
		}
	}, [recordWebcam.previewRef, dispatch])

	/* This function are group in Hooks 
  // Icon Click
  */
	const handleIconButtonClick = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.stopPropagation() // stop click event from propagating up to video tag
		handleVideoPlayPause()

		// Hide the button after 0.5 seconds
		setTimeout(() => {
			setShowButton(false)
		}, 500)
	}

	// Show the button, but don't hide it after 0.5 seconds
	const handleVideoClick = () => {
		setShowButton(true)
	}

	// Cleanup function to clear any timer when the component is unmounted
	useEffect(() => {
		return () => {
			if (buttonTimeout.current !== null) {
				clearTimeout(buttonTimeout.current)
			}
		}
	}, [])

	// Record
	const getRecordingFile = async () => {
		const blob = recordWebcam.getRecording()
		return blob
	}

	// const getBlob = async (blob: Blob | null) => {
	//   console.log({ blob });
	// };

	//  Open the camera once after the initial render
	useEffect(() => {
		recordWebcam.open()
	}, [])

	// Countdown Action
	useEffect(() => {
		let countdownInterval: number | null = null

		// Start the countdown
		if (countdownActive && countdown !== null && countdown > 0) {
			countdownInterval = window.setInterval(() => {
				setCountdown((prevCountdown) =>
					prevCountdown !== null && prevCountdown > 0 ? prevCountdown - 1 : null
				)
			}, 1000)
		}

		// Stop countdown and start recording when countdown reaches 0
		if (countdownActive && countdown === 0) {
			if (countdownInterval) {
				clearInterval(countdownInterval)
			}
			setCountdownActive(false)
			setRecordingActive(true)
		}

		// Start timer when recording is active
		if (recordingActive) {
			recordWebcam.start()
			setTimer(0) // reset timer to 0 when starting
			countRef.current = window.setInterval(() => {
				setTimer((timer) => timer + 1)
			}, 1000)
		}

		// Clean up on unmount or when countdown or recording status changes
		return () => {
			if (countdownInterval) {
				clearInterval(countdownInterval)
			}
			if (countRef.current) {
				clearInterval(countRef.current)
			}
		}
	}, [countdown, countdownActive, recordingActive])

	// Start countdown from 3
	const handleStart = () => {
		dispatch(savePreview(null))
		setCountdown(3)
		setCountdownActive(true)
	}

	// Stop Recording
	const handleStopRecording = () => {
		// Stop recording
		recordWebcam.stop()

		// Clear intervals
		if (countRef.current) window.clearInterval(countRef.current)

		// Reset states
		setCountdown(null)
		setTimer(0)
		setCountdownActive(false)
		setRecordingActive(false)
	}

	// Next
	const handleNext = () => {
		dispatch(setVideoPlaying(true))
	}

	// Retake
	const handleRetake = () => {
		dispatch(savePreview(null))
		recordWebcam.retake()

		const video = recordWebcam.previewRef.current
		if (video && videoPlaying) {
			video.pause()
			dispatch(setVideoPlaying(false))
		}

		// Reset all states to their initial values
		setCountdown(null)
		setTimer(0)
		setCountdownActive(false)
		setRecordingActive(false)
		setShowButton(true)
	}

	// Video Duration
	const getVideoDuration = (blob: Blob): Promise<number> => {
		return new Promise((resolve, reject) => {
			const videoEl = document.createElement('video')

			document.body.appendChild(videoEl) // Append to body to avoid GC issues

			videoEl.src = URL.createObjectURL(blob)

			videoEl.onloadedmetadata = function () {
				if (videoEl.duration === Infinity) {
					videoEl.currentTime = 10000000 // Seek ahead to force duration population
					videoEl.ontimeupdate = function () {
						this.ontimeupdate = () => {
							return
						} // Clean up the event
						resolveDuration(videoEl.duration)
					}
				} else {
					resolveDuration(videoEl.duration)
				}
			}

			videoEl.onerror = (error) => {
				cleanUp()
				reject(error)
			}

			function resolveDuration(duration: number) {
				cleanUp()
				resolve(duration)
			}

			function cleanUp() {
				document.body.removeChild(videoEl)
				URL.revokeObjectURL(videoEl.src)
			}
		})
	}

	// // Form Submit
	const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		// Check if the user is logged in or authenticated
		// if (!isLoggedIn) {
		//   navigate("/login");
		//   return;
		// }

		// Get the recorded video data
		const videoBlob = await getRecordingFile()

		// Ensure the blob's MIME type is set to video/mp4
		const mp4Blob = videoBlob
			? new Blob([savedPreview ?? videoBlob], { type: 'video/mp4' })
			: null

		// Only proceed if we actually have a video blob
		if (mp4Blob !== null) {
			// Calculate the size of the blob in MB
			const blobSizeInMB = (mp4Blob.size / (1024 * 1024)).toFixed(2)
			console.log(`Video size: ${blobSizeInMB} MB`)

			// Video duration
			let videoDurationInSeconds
			try {
				videoDurationInSeconds = await getVideoDuration(mp4Blob)
				console.log(`Video duration: ${videoDurationInSeconds} seconds`)
			} catch (error) {
				console.warn("Couldn't determine video duration:", error)
			}

			const data = {
				name, // From the form
				deliveryDate: deliveryDate?.toISOString() || '',
				email, // This is an array from the form
			}

			const formData = new FormData()
			// formData.append("name", data.name);
			formData.append('deliveryDate', data.deliveryDate)

			// Check if the email is indeed an array and append emails to the formData
			if (Array.isArray(data.email)) {
				data.email.forEach((emailAddr) => {
					formData.append('emails[]', emailAddr)
				})
			} else {
				console.warn('Email data is not in array format.')
			}

			// Add the video blob as a file to the FormData
			formData.append('video', mp4Blob, 'videoRecording.mp4') // Using "video" as the key here

			// Log FormData entries to ensure data structure
			console.log('Sending FormData with entries:', [...formData.entries()])

			if (!isLoggedIn) {
				if (videoBlob) {
					dispatch(savePreview(videoBlob)) // not serializable data, not good. mb need to convert to 
				}

				navigate('/register')
			} else {
				try {
					const response = await dispatch(
						fetchVideoPlaying({ formData, shouldSubmitPending: true })
					)

					if (fetchVideoPlaying.fulfilled.match(response)) {
						console.log('Response Payload:', response.payload)
						dispatch(setSubmittedData(response.payload))

						setVideoSubmitted(true)
						toast.success('Successfully added!')
						dispatch(savePreview(null))
					}
				} catch (error) {
					console.error('Error in dispatching fetchVideoPlaying:', error)
				}
			}
		}
	}

	useEffect(() => {
		if (videoSubmitted) {
			dispatch(fetchVideos())
			setVideoSubmitted(false) // Reset the flag after fetching videos
		}
	}, [videoSubmitted, dispatch])

	// Camera Flip
	// const handleCameraFlip = () => {
	//   setIsFrontCamera(!isFrontCamera);
	//   navigator.mediaDevices
	//     .getUserMedia({
	//       video: { facingMode: isFrontCamera ? "user" : "environment" },
	//     })
	//     .then((stream) => {
	//       const video = document.querySelector("video");
	//       if (video) {
	//         video.srcObject = stream;
	//       }
	//     })
	//     .catch((err) => {
	//       console.log("An error occurred: " + err);
	//     });
	// };

	return (
		<Box>
			<Index
				showButton={showButton}
				// handleCameraFlip={handleCameraFlip}
				handleIconButtonClick={handleIconButtonClick}
				handleVideoClick={handleVideoClick}
				handleVideoPlayPause={handleVideoPlayPause}
				timer={timer}
				setTimer={setTimer}
				recordingActive={recordingActive}
				countdown={countdown}
				handleStart={handleStart}
				handleStopRecording={handleStopRecording}
				handleNext={handleNext}
				handleRetake={handleRetake}
				handleFormSubmit={handleFormSubmit}
				setDeliveryDate={setDeliveryDate}
				setEmail={setEmail}
				videoPlaying={videoPlaying}
				recordWebcam={recordWebcam}
				deliveryDate={deliveryDate}
				email={email}
			/>
			{isLoggedIn ? <AfterboxLibrary /> : null}
		</Box>
	)
}
export default Home
