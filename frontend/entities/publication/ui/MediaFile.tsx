import React from "react";
import Image from "next/image";
import { imageLoader } from "@shared/lib";


interface IMedia {
    type: string
    image: string,
    file: string
}

interface IMediaImageSliderProps {
    files: [IMedia]
}

export const MediaFile: React.FC<IMediaImageSliderProps> = ({ files }) => {
    files = files.filter((media) => media.type == 'file')

    const getFileName = (path) => {
        const pathArray = path.split('/')
        return pathArray[pathArray.length-1]
    }

    return (
        <div>
            { files.map((file) => <a href={imageLoader({src: file.file})} download={getFileName(file.file)}>{file.file}</a>) }
        </div>
    )
}
