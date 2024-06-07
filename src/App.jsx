import { useState } from "react"
import "./App.css"
import Webcam from "react-webcam"
import { upload } from "./helpers/upload"
import CldImage from "./components/CldImage"

const videoConstraints = {
  width: 1920,
  height: 1080,
  facingMode: "user",
}

const EMPTY_IMAGE = "./empty-image.jpg"

function App() {
  const [capturedImage, setCapturedImage] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadedImage, setUploadedImage] = useState(null)

  const imageToShow = uploadedImage?.image_url ?? capturedImage ?? EMPTY_IMAGE

  const uploadImage = () => {
    setUploading(true)

    upload(capturedImage, data => {
      setUploadedImage(data)
      setUploading(false)
    })
  }

  return (
    <div>
      <div className="container">
        <div className="webcam">
          <Webcam
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
                  setUploadedImage(null)
                }}
              >
                Capture photo
              </button>
            )}
          </Webcam>
        </div>
        <div className={`${!capturedImage && "no-capture"} preview`}>
          <img src={imageToShow} />
          <button
            onClick={uploadImage}
            className="upload-btn"
            disabled={!capturedImage || uploading || uploadedImage}
          >
            Upload
          </button>
          {uploading && <span className="uploading-text">Uploading...</span>}
          {uploadedImage && (
            <span className="uploaded-text">Uploaded to Cloudinary</span>
          )}
        </div>
      </div>
      {uploadedImage && (
        <div className="cld-image">
          <CldImage public_id={uploadedImage.public_id} />
        </div>
      )}
    </div>
  )
}

export default App
