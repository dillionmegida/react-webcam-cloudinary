import ReactWebcam from 'react-webcam'

const videoConstraints = {
  width: 1920,
  height: 1080,
  facingMode: "user",
}

export default function Webcam({setCapturedImage}) {
  return <div className="webcam">
  <ReactWebcam
    mirrored
    screenshotFormat="image/jpeg"
    screenshotQuality={1}
    videoConstraints={videoConstraints}
  >
    {({ getScreenshot }) => (
      <button
        className="capture-btn"
        onClick={() => {
          const imageSrc = getScreenshot({
            height: 1080,
            width: 1920,
          })
          setCapturedImage(imageSrc)
        }}
      >
        Capture photo
      </button>
    )}
  </ReactWebcam>
</div>
}