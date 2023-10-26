import React from "react";
import { productsArray, shoesSizes } from "../utilis/productsArray";
import { useDispatch, useSelector } from "react-redux";

import {
  setSelectedSize,
  setBorder,
  setChange,
} from "../features/imageIndexSlice";

const RightProductDetails = ({ isLeftFixed }) => {
  const dispatch = useDispatch();
  const { selectedSize, border, currentPrice } = useSelector(
    (state) => state.imageState
  );

  const handleBuy = (index) => {
    dispatch(setSelectedSize(index));
  };

  const handleSetChange = (imageSet, price, index) => {
    dispatch(setChange({ imageSet, price }));
    dispatch(setBorder(index));
  };

  return (
    <div className={` flex flex-col w-screen lg:mt-8 lg:pr-5 lg:w-2/5 gap-8`}>
      <div className="hidden lg:block">
        <h3 className="text-4xl font-semibold pb-2">Women's Wool Loungers</h3>
        <p>Women's shoes</p>

        <div className="z-0 flex justify-between items-end flex-wrap space-y-2 mt-4  ">
          <div className="flex gap-x-2">
            <p
              className={`whitespace-nowrap ${
                parseInt(currentPrice) <= 90 ? "text-red-500 font-semibold" : ""
              }`}
            >
              ${currentPrice} AUD
            </p>
            {currentPrice === "140" ? (
              ""
            ) : (
              <p className=" whitespace-nowrap line-through text-gray-400">
                $140 AUD
              </p>
            )}
            {parseInt(currentPrice) <= 90 ? (
              <p className="text-red-500 font-bold px-2 -skew-x-12 z-[-1]">
                CLEARANCE
              </p>
            ) : null}
          </div>

          <p className="bg-gray-200 px-2 -skew-x-12 rounded-md whitespace-nowrap z-[-1]">
            {parseInt(currentPrice) <= 90 ? "Delivery $10" : "Free Delivery"}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto  py-2 sm:p-6 lg:px-0 flex  gap-x-2">
        {productsArray.map((product, index) => {
          // console.log(product[0]);
          return (
            <img
              key={index}
              src={product[0][0]}
              className={`${
                border === index ? "border border-black" : ""
              } w-28 h-28 lg:w-16 lg:h-16 cursor-pointer rounded-md mb-2 bg-gray-100 hover:opacity-60 transition duration-300 `}
              onClick={() => handleSetChange(product[0], product[1], index)}
            />
          );
        })}
      </div>

      <section className="px-8 lg:px-0 flex-col  place-items-center">
        <h4 className="mb-3 ">Select Size</h4>
        <div className="grid grid-cols-3 gap-2">
          {shoesSizes.map((size, index) => {
            return (
              <button
                key={index}
                className={` border p-3 rounded-md text-black hover:border-gray-700 transition duration-[200ms] ${
                  index === selectedSize ? "border-2 border-black" : ""
                }
                  `}
                onClick={() => handleBuy(index)}
              >
                {size}
              </button>
            );
          })}
        </div>
      </section>

      <section className="px-8 lg:px-0">
        <button
          className={`${
            selectedSize === -1
              ? "bg-gray-300 text-white"
              : " text-white bg-black"
          }  mb-3 rounded-xl border w-full h-12 font-bold`}
          disabled={selectedSize === -1}
        >
          {selectedSize === -1
            ? "SELECT A SIZE"
            : `ADD TO CARD - $${
                parseInt(currentPrice) <= 100 ? currentPrice : currentPrice
              } AUD ${parseInt(currentPrice) <= 100 ? "+ $10 AUD" : ""}`}
        </button>
      </section>
      <section className="text-center mx-[5%] lg:mx-0">
        <h3 className="font-bold text-xl p-4 bg-gray-100 border-b border-gray-300">
          Wool Lounger Highlights
        </h3>
        <p className=" p-3 bg-gray-100 border-b border-gray-300">
          Designed to slip-on and go
        </p>
        <p className=" py-3 px-6 bg-gray-100 border-b border-gray-300">
          Soft and comfy ZQ Merino wool provides next-level comfort
        </p>
        <p className=" py-4 bg-gray-100 border-b border-gray-300">
          Cushioned midsole gives softer landings
        </p>
      </section>
    </div>
  );
};

export default RightProductDetails;
