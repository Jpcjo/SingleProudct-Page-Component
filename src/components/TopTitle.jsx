import React from "react";
import { useSelector } from "react-redux";

const TopTitle = () => {
  const { currentPrice } = useSelector((state) => state.imageState);
  return (
    <div className="mx-auto max-w-6xl py-6 px-8 lg:p-8 lg:hidden">
      <h3 className="text-3xl font-semibold pb-2">Women's Wool Loungers</h3>
      <p>Women's shoes</p>

      <div className="text-sm sm:text-base flex justify-between items-end flex-wrap space-y-2 mt-4  ">
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
            <p className="text-red-500 font-bold px-2 -skew-x-12">CLEARANCE</p>
          ) : null}
        </div>

        <p className="bg-gray-200 px-2 -skew-x-12 rounded-md whitespace-nowrap">
          {parseInt(currentPrice) <= 90 ? "Delivery $10" : "Free Delivery"}
        </p>
      </div>
    </div>
  );
};

export default TopTitle;
