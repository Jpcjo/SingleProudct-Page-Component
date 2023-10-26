import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose, AiOutlinePlusCircle } from "react-icons/ai";
import {
  BsArrowLeftCircle,
  BsArrowRightCircle,
  BsCircle,
  BsRecordCircle,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  imageClick,
  decrementImageIndex,
  incrementImageIndex,
} from "../features/imageIndexSlice";
import SmallImgIcons from "./SmallImgIcons";

const LeftSliders = () => {
  const dispatch = useDispatch();
  const { currentImageSet, currentImageIndex } = useSelector(
    (state) => state.imageState
  );

  const handleImageClick = (index) => {
    dispatch(imageClick(index));
  };

  const handlePrevious = () => {
    dispatch(decrementImageIndex());
  };

  const handleNext = () => {
    dispatch(incrementImageIndex());
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
  };

  useEffect(() => {
    const handleResize = () => {
      // Close the modal when the screen size is smaller than tailwind 'lg' breakpoint is 1024px
      if (window.innerWidth < 1024) {
        closeModal();
      }
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const imageStyle = {
    transform: `translateX(-${currentImageIndex * 100}%)`,
    transition: "transform 0.4s ease-in-out",
  };

  const modalStyle = {
    maxHeight: isModalOpen ? "1280px" : "0px",
    transition: "max-height 0.7s ease-in-out",
  };

  return (
    <div
      className={`lg:sticky lg:z-[1] lg:top-0 flex flex-col px-0 h-fit lg:pl-8 lg:pt-8 lg:pr-8 md:flex-row w-full overflow-x-hidden lg:w-3/5 gap-x-6 `}
    >
      {/* Left side with small image icons */}
      <div className="hidden lg:block md:w-[11%] ">
        <SmallImgIcons />
      </div>

      {/* Right side with the image slider */}
      <div className="w-screen lg:w-[89%] relative h-fit">
        <div className="absolute  bottom-8 right-14 flex items-center z-10">
          <button
            className=" text-white p-2 w-12 h-12 rounded-full opacity-30 hover:scale-125 transition duration-500 hover:text-white"
            onClick={handlePrevious}
          >
            <BsArrowLeftCircle className=" w-full h-full rounded-full bg-gray-400" />
          </button>
        </div>
        <div className="absolute bottom-8 right-4 flex items-center z-10">
          <button
            className=" text-white p-2 w-12 h-12 rounded-full opacity-30 hover:scale-125 transition duration-300 hover:text-white"
            onClick={handleNext}
          >
            <BsArrowRightCircle className="w-full h-full rounded-full bg-gray-400" />
          </button>
        </div>
        <div className="overflow-hidden">
          <div
            className="relative group pointer-events-none lg:pointer-events-auto flex w-full h-full  hover:translate-x-1 duration-500 overflow-hidden"
            onClick={openModal}
            // onMouseDown={handleMouseDown}
            // onMouseMove={handleMouseMove}
            // onMouseUp={handleMouseUp}

            onDragStart={(e) => e.preventDefault()}
            // ref={slideRef}
          >
            {/* <div className="w-full h-full overflow-hidden">  */}
            {/* <img
            src={greyShoesImages[currentImageIndex]}
            alt="Current"
            style={{ imageStyle }}
            className="object-cover block shrink-0 grow-0 w-full h-auto bg-gray-100 transition-translate duration-700 ease-in-out hover:scale-105"
          /> */}
            {currentImageSet.map((image, index) => {
              if (image.endsWith(".mp4")) {
                // Render the video
                return (
                  <video
                    key={index}
                    src={image}
                    // style={{
                    //   ...imageStyle,
                    //   display: currentImageIndex === index ? "block" : "none",
                    // }}
                    style={imageStyle}
                    autoPlay
                    playsInline
                    muted
                    loop
                    className="cursor-pointer  object-cover rounded-xl mb-2 bg-gray-100 max-w-full max-h-full"
                  />
                );
              } else {
                // Render images
                return (
                  <img
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    style={imageStyle}
                    className="cursor-pointer object-cover rounded-xl mb-2 bg-gray-100 max-w-full max-h-full "
                  />
                );
              }
            })}
            {/* Button */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[2]">
              <button className=" text-white  ">
                <AiOutlinePlusCircle className="w-12 h-12 opacity-70" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="w-[10%] md:hidden">
        <SmallImgIcons />
      </div> */}

      {isModalOpen && (
        <div
          //   style={modalStyle}
          className={`bg-black bg-opacity-70 fixed inset-0 z-[999] ${
            isModalOpen ? " translate-y-0" : "-translate-y-full"
          }transition-transform duration-500 ease-in-out`}
        >
          {/* Content of your modal */}
          <div className=" fixed inset-8 bg-gray-100 z-[1000] overflow-hidden">
            <button
              className="z-[51] cursor-pointer w-10 h-10 absolute top-6 right-6 text-gray-600"
              onClick={closeModal}
            >
              <AiOutlineClose className="w-full h-full  hover:text-red-800 hover:scale-[1.20] transition duration-500 animate-pulse hover:rotate-180" />
            </button>
            {/* Place the enlarged image or any other content you want here */}
            <div className="absolute inset-y-0 left-4 flex items-center z-10">
              <button
                className="w-14 h-14  text-white p-2 rounded-full opacity-40  transition duration-500 hover:text-white hover:scale-125"
                onClick={handlePrevious}
              >
                <BsArrowLeftCircle className=" w-full h-full rounded-full bg-gray-400" />
              </button>
            </div>
            <div className="absolute inset-y-0 right-4 flex items-center z-10">
              <button
                className=" text-white p-2 w-14 h-14 rounded-full opacity-40  transition duration-500 hover:text-white hover:scale-125"
                onClick={handleNext}
              >
                <BsArrowRightCircle className="w-full h-full rounded-full bg-gray-400" />
              </button>
            </div>

            <div>
              {/* <img
                src={greyShoesImages[currentImageIndex]}
                alt="Enlarged Image"
                className="w-[60vw] max-h-[90vh] object-cover"
              /> */}
              <div className="grid place-items-center overflow-hidden">
                <div className="flex w-[60vw] max-h-[90vh] hover:scale-110 duration-300 overflow-hidden">
                  {currentImageSet.map((image, index) => {
                    if (image.endsWith(".mp4")) {
                      // Render the video
                      return (
                        <video
                          key={index}
                          src={image}
                          // style={{
                          //   ...imageStyle,
                          //   display: currentImageIndex === index ? "block" : "none",
                          // }}
                          style={imageStyle}
                          autoPlay
                          playsInline
                          muted
                          loop
                          className="cursor-pointer  object-cover rounded-xl my-1 bg-gray-100 max-w-full max-h-full"
                        />
                      );
                    } else {
                      // Render images
                      return (
                        <img
                          key={index}
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          style={imageStyle}
                          className="object-cover rounded-xl my-1 bg-gray-100 max-w-full max-h-full"
                        />
                      );
                    }
                  })}
                </div>
              </div>
            </div>
            <div className="absolute bottom-8 left-[50%] translate-x-[-50%] flex gap-4 ">
              {currentImageSet.map((_, index) => (
                <button
                  key={index}
                  className=" transition hover:scale-150 duration-300 w-3 h-3 rounded-full focus:outline-none"
                  onClick={() => handleImageClick(index)}
                >
                  {index === currentImageIndex ? (
                    <BsRecordCircle className="w-full h-full rounded-fulls" />
                  ) : (
                    <BsCircle className="w-full h-full rounded-full " />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftSliders;
