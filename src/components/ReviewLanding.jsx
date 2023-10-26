import React from "react";
import { TbCircleDotFilled } from "react-icons/tb";

const ReviewLanding = () => {
  return (
    <section className="grid place-items-center bg-gray-100">
      <h3 className="text-2xl font-bold mt-12 md:text-4xl md:mt-20 text-center">
        Women's Wool Loungers Reviews
      </h3>
      <div className="flex items-center mt-6">
        <p className="text-5xl font-bold">4.7</p>
        <div className="rating rating-md rating-half">
          <input type="radio" name="rating-10" className="rating-hidden" />
          <input
            type="radio"
            name="rating-10"
            className=" mask mask-star-2 mask-half-1"
          />
          <input
            type="radio"
            name="rating-10"
            className=" mask mask-star-2 mask-half-2"
          />
          <input
            type="radio"
            name="rating-10"
            className=" mask mask-star-2 mask-half-1"
          />
          <input
            type="radio"
            name="rating-10"
            className=" mask mask-star-2 mask-half-2"
          />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-1"
          />
          <input
            type="radio"
            name="rating-10"
            className=" mask mask-star-2 mask-half-2"
          />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-1"
          />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-2"
          />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-1"
            checked
          />
          <input
            type="radio"
            name="rating-10"
            className="mask mask-star-2 mask-half-2"
          />
        </div>
      </div>
      <p className="text-gray-500 mt-2">12 Reviews</p>
      <div className="relative w-[420px] h-[120px] mx-auto bg-white mt-8 mb-4 py-4 px-8 text-center">
        <p className="font-semibold text-2xl border-b-2 pb-4 border-gray-300">
          Size
        </p>
        <p className="text-gray-300 absolute top-[42.5%] left-[30px]">|</p>
        <p className="text-gray-300 absolute top-[42.5%] right-[30px]">|</p>
        <p className="text-gray-300 absolute top-[42.5%] right-[50%]">|</p>
        <TbCircleDotFilled className="w-5 h-5 absolute top-[45.5%] right-[50%] translate-x-[50%]" />
        <div className="flex justify-between mt-4 text-gray-600 text-sm">
          <p>Runs Small</p>
          <p>True To Size</p>
          <p>Runs Large</p>
        </div>
      </div>
      <p className="w-[80%] lg:w-[50%] mx-auto text-center mb-12 md:mb-20 text-gray-600">
        This style is available in whole sizes only. In between sizes? We
        recommend you size up.
      </p>
    </section>
  );
};

export default ReviewLanding;
