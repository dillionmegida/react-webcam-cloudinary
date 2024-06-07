import { AdvancedImage } from "@cloudinary/react"
import { grayscale, sepia } from "@cloudinary/url-gen/actions/effect"
import { Cloudinary } from "@cloudinary/url-gen/index"
import { act, useState } from "react"

const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  },
})

const EFFECTS = { sepia: sepia(), grayscale: grayscale() }

export default function CldImage({ public_id }) {
  const [activeEffect, setActiveEffect] = useState(null)

  const myImage = cld.image(public_id)

  if (activeEffect) myImage.effect(EFFECTS[activeEffect])

  return (
    <div>
      <AdvancedImage cldImg={myImage} />
      <div className="effects">
        {Object.keys(EFFECTS).map(effect => {
          const imageWithFilter = cld.image(public_id)
          imageWithFilter.effect(EFFECTS[effect])

          return (
            <AdvancedImage
              className={activeEffect === effect && "active"}
              onClick={() => setActiveEffect(effect)}
              key={effect}
              cldImg={imageWithFilter}
            />
          )
        })}
      </div>
    </div>
  )
}
