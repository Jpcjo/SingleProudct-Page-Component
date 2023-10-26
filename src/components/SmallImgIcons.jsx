import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { imageClick } from "../features/imageIndexSlice";

const SmallImgIcons = () => {
  const dispatch = useDispatch();

  const handleImageClick = (index) => {
    dispatch(imageClick(index));
  };

  const { currentImageSet, currentImageIndex } = useSelector(
    (state) => state.imageState
  );

  const imageStyle = {
    transform: `translateX(-${currentImageIndex * 100}%)`,
    transition: "transform 0.4s ease-in-out",
  };

  return (
    <div className="flex gap-2 md:flex-col md:gap-0 overflow-y-scroll h-[505px] ">
      {currentImageSet.map((image, index) => {
        if (image.endsWith(".mp4")) {
          // Render the video
          return (
            <video
              key={index}
              src={image}
              style={{ imageStyle }}
              autoPlay
              muted
              loop
              className={`cursor-pointer rounded-md mb-2 bg-gray-100 max-w-full max-h-full ${
                currentImageIndex === index
                  ? "opacity-40 filter duration-300 ease-in-out border border-gray-500"
                  : ""
              }`}
              onMouseEnter={() => handleImageClick(index)}
            />
          );
        } else {
          // Render images
          return (
            <img
              key={index}
              src={image}
              style={{ imageStyle }}
              alt={`Thumbnail ${index + 1}`}
              className={`cursor-pointer rounded-md mb-2 bg-gray-100 ${
                currentImageIndex === index
                  ? "opacity-40 filter duration-300 ease-in-out border border-gray-500"
                  : ""
              }`}
              onMouseEnter={() => handleImageClick(index)}
            />
          );
        }
      })}
    </div>
  );
};

export default SmallImgIcons;
