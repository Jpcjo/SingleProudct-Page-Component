import React, { useState, useRef, useEffect } from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { productCards, firstImage } from "../utilis/productsArray";

const ProductCardsSlide = () => {
  // State to track the current slide index
  const [currentSlide, setCurrentSlide] = useState(0);
  const [testWidth, setTestWidth] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(2);
  const [changeImage, setChangeImage] = useState(firstImage);
  const [hoveredCard, setHoveredCard] = useState(-1); // Initialize with -1 indicating no card is hovered

  const [clickImageId, setClickImageId] = useState(null);
  const [selectImage, setSelectImage] = useState(null);
  const [cardIndex, setCardIndex] = useState(-1);
  //   console.log(selectImage);
  const [image01, setImage01] = useState(null);
  const [didClick, setDidClick] = useState(false);
  const [smallIndex, setSmallIndex] = useState(-1);

  const [selectedImages, setSelectedImages] = useState({});
  //   console.log(selectedImages);
  const [hasScreenSizeChanged, setHasScreenSizeChanged] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [productName, setProductName] = useState(null);
  const [selectProductName, setSelectProductName] = useState({});
  // console.log(selectProductName);

  const testRef = useRef(null);

  const nextSlide = () => {
    if (currentSlide < productCards.length - cardsToShow) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const toChangeImage = (newImage) => {
    setChangeImage(newImage);
  };

  const toMouseEnter = (imgID, index) => {
    setHoveredCard(imgID);
    // Change the big image when hovering over the big image

    if (clickImageId !== null) {
      const cardData = productCards[cardIndex][0];
      const smallImageIndex = smallIndex; // Calculate the index of the small image
      if (cardData[smallImageIndex] && index === cardIndex) {
        // Replace '01' with '02' to get the secondary image
        const secondaryImage = cardData[smallImageIndex + 1].image;

        setSelectedImages((prevSelectedImages) => ({
          ...prevSelectedImages,
          [cardIndex]: secondaryImage,
        }));
      }
    }
  };
  const toMouseLeave = () => {
    setHoveredCard(-1); // Reset to indicate no card is hovered
    // Reset the big image to the currently selected image
    if (clickImageId !== null) {
      setSelectedImages((prevSelectedImages) => ({
        ...prevSelectedImages,
        [cardIndex]: image01,
      }));
    }
  };

  const getImgId = (Id, image01, cardIndex, smallIndex, shoesName) => {
    setDidClick(true);
    setClickImageId(Id);
    setCardIndex(cardIndex);
    setImage01(image01);
    setSmallIndex(smallIndex * 2);
    setProductName(shoesName);
    // setQaz(productCards[cardIndex][0][smallIndex * 2].image);
    setSelectedImages((prevSelectedImages) => ({
      ...prevSelectedImages,
      [cardIndex]: image01,
    }));

    // console.log(
    //   `Clicked image with ID ${Id} on card ${cardIndex} and
    //   name ${image01}, did click ${didClick}, small Index ${smallIndex} `
    // );
    setSelectProductName((prevName) => ({
      ...prevName,
      [cardIndex]: shoesName,
    }));
  };

  const isCardHovered = (index) => {
    return index === hoveredCard;
  }; // If index matches the value stores in hoveredCard, it returns true,
  //indicating that the card is hovered.

  const imageStyle = {
    transform: `translateX(-${
      currentSlide *
      (testWidth +
        (window.innerWidth - testWidth * cardsToShow) / (cardsToShow + 1))
    }px)`,
    transition: "transform 0.4s ease-in-out",
  };

  const [imgStyle, setImgStyle] = useState(imageStyle);

  useEffect(() => {
    // Use this useEffect to monitor changes in clickImageId
    // and update the selected image accordingly
    const selectImageId = productCards.map((card) => {
      return card[0].find((imageData) => imageData.id === clickImageId);
    });
    // Make sure selectImageId is not empty before updating the state
    if (selectImageId[0]) {
      setSelectImage(selectImageId[0].image);
    }
  }, [clickImageId]);

  useEffect(() => {
    // Set initial state for the first small image of the first card
    const firstImageId = productCards[0][0][0].id;
    const firstImageSrc = productCards[0][0][0].image;
    getImgId(firstImageId, firstImageSrc, 0, 0);
  }, []);

  useEffect(() => {
    if (testRef.current) {
      setTestWidth(testRef.current.offsetWidth);
      //   console.log(testRef.current.offsetWidth);
    }
  }, [currentSlide]);

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setCardsToShow(2);
    } else {
      setCardsToShow(4);
    }

    const newWindowWidth = window.innerWidth;
    // Check if window width has changed
    if (newWindowWidth !== windowWidth) {
      setWindowWidth(newWindowWidth);
      setHasScreenSizeChanged(true);
      setCurrentSlide(0);
    }
  };

  useEffect(() => {
    if (hasScreenSizeChanged) {
      setCurrentSlide(0);
      setTestWidth(0);
      setCardsToShow(2);
      const newImageStyle = {
        transform: `translateX(-${
          currentSlide *
          (testWidth +
            (window.innerWidth - testWidth * cardsToShow) / (cardsToShow + 1))
        }px)`,
        transition: "transform 0.4s ease-in-out",
      };

      // Set the calculated imageStyle
      setImgStyle(newImageStyle);
      setHasScreenSizeChanged(false); // Reset the screen size change flag
    }
  }, [hasScreenSizeChanged, currentSlide, testWidth, cardsToShow]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [currentSlide]);

  return (
    <>
      <div className="grid place-items-center mt-16">
        <h3 className="font-bold text-3xl">YOU MAY ALSO LIKE</h3>
      </div>
      <div className="relative w-full h-fit overflow-hidden mt-8 mb-12">
        {/* Previous Button */}
        <button
          className="absolute top-1/2 left-2 transform -translate-y-1/2 opacity-30 hover:scale-[1.18] transition duration-300 hover:text-gray-800 z-[1]"
          onClick={prevSlide}
        >
          <BsArrowLeftCircle className="w-8 h-8" />
        </button>

        {/* Product Cards */}
        <div
          className={`flex flex-row space-x-[4vw] p-[4vw] md:space-x-[2vw] md:p-[2vw]`}
          style={{ width: `${(productCards.length / cardsToShow) * 100}%` }}
        >
          {productCards.map((card, index) => {
            const firstImageId = card[0][0].id;
            // console.log(card[0]);

            const productImages = card[0].filter((imageData) =>
              imageData.id.endsWith("01")
            );

            return (
              <div
                className={`card card-compact w-[44vw] md:w-[22.5vw] bg-base-100 shadow-md  hover:shadow-2xl  mb-2`}
                ref={testRef}
                key={index}
                style={imageStyle}
                onDragStart={(e) => e.preventDefault()}
              >
                <figure>
                  <img
                    src={
                      clickImageId !== null
                        ? selectedImages[index] || card[0][0].image
                        : isCardHovered(firstImageId)
                        ? selectedImages[index] || card[0][0].image
                        : card[0][0].image
                    }
                    alt={`Thumbnail ${index + 1}`}
                    className={`cursor-pointer rounded-xl max-w-full max-h-full bg-neutral-100 transition duration-500`}
                    onMouseEnter={() => {
                      toMouseEnter(firstImageId, index);
                    }}
                    onMouseLeave={toMouseLeave}
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title text-base">{card[1]}</h3>
                  <p>{selectProductName[index] || card[0][0].name}</p>

                  <p>{card[2]}</p>
                  <p className="text-gray-400">{card[3]}</p>
                  {/* <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                  </div> */}
                  <div className="flex flex-row flex-nowrap space-x-1  overflow-x-scroll overflow-y-hidden">
                    {productImages.map((productImage, eventIndex) => {
                      // console.log(productImage.name);
                      return (
                        <img
                          src={productImage.image}
                          key={eventIndex}
                          alt={`Thumbnail ${eventIndex + 1}`}
                          className={`cursor-pointer rounded-xl w-[50px] bg-neutral-100 duration-100 ${
                            didClick && clickImageId === productImage.id
                              ? "border border-gray-400"
                              : ""
                          }`}
                          onClick={() =>
                            getImgId(
                              productImage.id,
                              productImage.image,
                              index,
                              eventIndex,
                              productImage.name
                            )
                          }
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          className="absolute top-1/2 right-2 transform -translate-y-1/2 opacity-30 hover:scale-[1.18] transition duration-300 hover:text-gray-800  z-[1]"
          onClick={nextSlide}
        >
          <BsArrowRightCircle className="w-8 h-8" />
        </button>
      </div>
    </>
  );
};

export default ProductCardsSlide;
