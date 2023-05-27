import React from "react";
import Image from "next/image";
import { imageLoader } from "@shared/lib";


interface IMedia {
    type: string
    image: string,
    file: string
}

interface IMediaImageSliderProps {
    images: [IMedia]
}

export const MediaImageSlider: React.FC<IMediaImageSliderProps> = ({ images }) => {
    images = images.filter((media) => media.type == 'image')
    return (
        <div>
            { images.map((image) => <Image loader={imageLoader} src={image.image} width={300} height={300}/>) }
        </div>
    )
}
