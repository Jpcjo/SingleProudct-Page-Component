import React, { useState, useRef, useEffect } from "react";
import { QNA } from "../utilis/productsArray";
import { RiArrowDownSLine } from "react-icons/ri";
import { infoSection3 } from "../utilis/productsArray";

const Accordion = () => {
  const [accordions, setAccordions] = useState([false, false, false, false]);
  const [contentHeights, setContentHeights] = useState(
    Array(QNA.length).fill(0)
  ); //   console.log(contentHeights); result: Array(4)[(0, 0, 0, 0)];
  //   console.log(contentHeights[2]);

  const contentRefs = useRef(QNA.map(() => React.createRef()));
  // React.createRef() is a function provided by React that creates a new ref object.
  // contentRefs is an array of refs, one for each item in your accordion.
  // You can then attach these refs to the respective content elements in your accordion.
  //   console.log(contentRefs); 4 accordins now all have useRefs.
  //   console.log(contentRefs.current);

  const toggleAccordion = (index) => {
    setAccordions((prevAccordions) =>
      prevAccordions.map((accordion, i) => (i === index ? !accordion : false))
    );
  };

  useEffect(() => {
    if (accordions.some((isOpen) => isOpen)) {
      //.some method is an array method that checks if at least one element in an array
      // meets a specified condition. If yes, returns true.
      // The some method is used to check if at least one element in the accordions array
      // is true. if isOpen = false, return false, if isOpen = true, return true, then
      // if(true), then the following code proceed

      // Measure the height of visible content
      const newHeights = contentRefs.current.map((ref, index) => {
        return ref.current ? ref.current.offsetHeight : 0;
      });
      setContentHeights(newHeights);
    }
  }, [accordions]);

  return (
    <div className="mt-16 mb-12 max-w-[94%] md:mb-20 space-y-4 md:max-w-[88%] mx-auto">
      {accordions.map((isOpen, index) => (
        <div key={index} className="relative rounded-lg">
          <button
            className="w-full py-2 px-4 flex justify-between items-center text-left text-gray-700 border-b text-xl font-bold  "
            onClick={() => toggleAccordion(index)}
          >
            {QNA[index].title}

            <RiArrowDownSLine
              className={`h-7 w-7 transform ${
                isOpen
                  ? "transition rotate-[180deg]  duration-300 text-red-700"
                  : "transition rotate-0 duration-300"
              } `}
            />
          </button>

          <div
            style={{
              maxHeight: isOpen ? contentHeights[index] + "px" : "0",
              marginTop: isOpen ? "25px" : "0px",
              marginBottom: isOpen ? "25px" : "0px",
              overflow: "hidden",
              transition:
                "max-height 0.4s ease-in-out, margin-top 0.4s ease-in-out, margin-bottom 0.4s ease-in-out",
            }}
            className={` max-w-[75%] mx-auto overflow-hidden`}
          >
            {/* {QNA[index].content} */}
            <div ref={contentRefs.current[index]}>
              {index === 0 && (
                <div className="leading-7">
                  <p className="mb-4">
                    Kick back in our extra cosy slip-on sneakers made with
                    superfine ZQ Merino wool that gives you maximum comfort in a
                    minimalist design.
                  </p>
                  <span className="font-bold">Best For:</span> Walking, cooler
                  weather, everyday wear.
                  <br />
                  <span className="font-bold"> Super Soft Material:</span> Warm
                  and cosy premium ZQ Merino wool provides next-level comfort.
                  <br />
                  <span className="font-bold"> Versatile Design:</span>
                  Wear-with-everything classic style, great for travel. <br />
                  <span className="font-bold"> Where It’s Made:</span> South
                  Korea. Learn more about our operations.
                </div>
              )}
              {index === 1 && (
                <div className="flex flex-row items-center space-x-12 leading-7">
                  <div className="w-[100%] lg:w-[50%]">
                    <p className="mb-4">
                      Our Wool Loungers has a carbon footprint of 0,79kg CO2e.
                      Learn more about carbon footprint labeling and our
                      commitments to reduce our impact. As a carbon neutral
                      business certified by Climate Neutral, we balance our
                      emissions by funding high impact carbon projects.
                    </p>
                    <h3 className="font-bold">Sustainable Materials:</h3>
                    <ul>
                      <li>
                        1. ZQ certified Merino wool upper that meets high
                        standards of animal welfare, environmental care, and
                        social sustainability.
                      </li>
                      <li>
                        2. SweetFoam® midsole made with sugarcane-based green
                        EVA.
                      </li>
                      <li>3. Castor bean oil-based insole foam.</li>
                    </ul>
                  </div>
                  <div className="hidden lg:w-[50%] lg:block">
                    <img
                      src={infoSection3}
                      className="max-w-full max-h-full rounded-full "
                    />
                  </div>
                </div>
              )}
              {index === 2 && (
                <div>
                  <ul className="list-inside leading-7 mb-4">
                    <li>1. Remove the insoles.</li>
                    <li>
                      2. Place shoes in a delicates bag (pro tip: a pillowcase
                      works too).
                    </li>
                    <li>
                      3. Choose a gentle cycle with cold water & mild detergent.
                    </li>
                    <li>
                      4. Shake out any excess water & set aside to air dry.
                    </li>
                    <li>
                      5. Shoes will regain their original shape with one or two
                      wears.
                    </li>
                  </ul>
                  <p>
                    Want the full refresh experience? Swap in some new insoles.
                  </p>
                </div>
              )}
              {index === 3 && (
                <p className="leading-7 mb">
                  Free shipping on orders over $60, and our 30 days, no
                  questions asked return policy. Lightly worn shoes get donated
                  to Soles4Souls
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
