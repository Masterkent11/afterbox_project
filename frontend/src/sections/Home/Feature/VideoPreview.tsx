import React, { useEffect } from 'react'
import { IconButton, Grid, useMediaQuery, useTheme } from '@mui/material'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import PauseIcon from '@mui/icons-material/Pause'
import { UseRecordWebcam } from 'react-record-webcam'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store/store'

interface VideoPreviewProps {
	videoPlaying: boolean
	handleIconButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void
	handleVideoClick: () => void
	showButton: boolean
	recordWebcam: UseRecordWebcam
	handleRetake: () => void
}

export const VideoPreview: React.FC<VideoPreviewProps> = ({
	videoPlaying,
	handleIconButtonClick,
	handleVideoClick,
	showButton,
	recordWebcam,
}) => {
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
	const savedPreview = useSelector(
		(state: RootState) => state.video.savedPreview
	)

	useEffect(() => {
    console.log(savedPreview)
		if (savedPreview) {
			const srcUrl = window.URL.createObjectURL(savedPreview)
			if (recordWebcam.previewRef.current) {
				recordWebcam.previewRef.current.src = srcUrl
			}
		}
	}, [savedPreview])

	return (
		<Grid
			display={'flex'}
			justifyContent={'center'}
			alignItems={'center'}
			position='relative'
			style={{
				display: `${
					recordWebcam.status === 'PREVIEW' || savedPreview ? 'block' : 'none'
				}`,
			}}
		>
			<video
				controls
				controlsList='nodownload  noremoteplayback disablePictureInPicture'
				disablePictureInPicture
				ref={recordWebcam.previewRef}
				onClick={handleVideoClick}
			/>
			<IconButton
				aria-label='play/pause'
				onClick={handleIconButtonClick}
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					color: 'rgba(255, 255, 255, 0.8)',
					display: isMobile ? 'none' : showButton ? 'block' : 'none',
				}}
			>
				{videoPlaying ? (
					<PauseIcon style={{ fontSize: 120 }} />
				) : (
					<PlayCircleIcon style={{ fontSize: 120 }} />
				)}
			</IconButton>
		</Grid>
	)
}
