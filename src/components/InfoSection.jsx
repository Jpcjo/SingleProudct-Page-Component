import React from "react";
import { infoSection1, infoSection2 } from "../utilis/productsArray";

const InfoSection = () => {
  return (
    <section className="flex flex-col mb-8 h-fit max-w-[100%] md:max-w-[87.5%] mx-auto tracking-wide">
      <div className="flex flex-col md:flex-row items-center">
        <div className="flex flex-col w-[88%] md:w-1/2">
          <h3 className="text-xl font-bold mb-4">WOOL UPPER</h3>
          <p className="text-3xl font-[850] mb-4">Superfine And Cozy</p>
          <p className="pr-[10%]">
            It’s soft and itch-free on the inside, durable on the outside, and
            ethically sourced to ZQ Merino’s high standards for a cozy fit that
            treads light on the planet.
          </p>
        </div>
        <img
          src={infoSection1}
          className="  hidden w-[100%] mt-8 md:w-1/2 md:mt-0 md:block"
        />
      </div>
      <div className="flex flex-col mt-8 md:flex-row md:space-x-16 items-center">
        <img src={infoSection2} className="md:w-[54%]" />
        <div className="flex flex-col mt-8 w-[88%] md:w-[46%] md:mt-0">
          <h3 className="text-xl font-bold mb-4">SUGARDCANE MIDSOLE</h3>
          <p className="text-3xl font-[850] mb-4">Sweet On The Planet</p>
          <p className="pr-[4%]">
            Contoured and delightfully bouncy, our Brazilian sugarcane midsole
            is called SweetFoam®, which is made with the world’s first carbon
            negative green EVA.
          </p>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
