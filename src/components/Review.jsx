import React from "react";
import ReviewLanding from "./ReviewLanding";
import { reviews } from "../utilis/reviewArrays";
import { useState, useEffect } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const ReviewsPerPage = 3;

const Review = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  //   console.log(searchQuery);
  const [filteredReviews, setFilteredReviews] = useState([]);
  //   console.log(Math.ceil(filteredReviews.length / ReviewsPerPage));
  const [searchExecuted, setSearchExecuted] = useState(false);
  const [review, setReview] = useState(reviews);
  const [sortingCriteria, setSortingCriteria] = useState("highest-rated");
  const [sortChangeInvoked, setSortChangeInvoked] = useState(false);
  const [isSearchButtonClickInvoked, setIsSearchButtonClickInvoked] =
    useState(false);
  const totalPages = Math.ceil(
    filteredReviews.length > 0
      ? filteredReviews.length / ReviewsPerPage
      : reviews.length / ReviewsPerPage
  );

  const handleSearchButtonClick = () => {
    const lowerSearchQuery = searchQuery.toLowerCase();
    const filtered = reviews.filter(
      (review) =>
        review.title.toLowerCase().includes(lowerSearchQuery) ||
        review.description.toLowerCase().includes(lowerSearchQuery)
    );

    // console.log(filtered);
    const filteredSpread = [...filtered];

    if (sortingCriteria === "highest-rated") {
      filteredSpread.sort((a, b) => b.star - a.star);
    } else if (sortingCriteria === "lowest-rated") {
      filteredSpread.sort((a, b) => a.star - b.star);
    } else if (sortingCriteria === "newest") {
      filteredSpread.sort((a, b) => b.dateSelect - a.dateSelect);
    } else if (sortingCriteria === "oldest") {
      filteredSpread.sort((a, b) => a.dateSelect - b.dateSelect);
    }
    setFilteredReviews(filteredSpread);
    setCurrentPage(1);
    setSearchExecuted(true);
    setIsSearchButtonClickInvoked(true);
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleReset = () => {
    setSearchQuery(""); // Clear the search query
    setFilteredReviews([]); // Clear the filtered reviews
    setSearchExecuted(false); // Reset search execution
    setCurrentPage(1); // Reset pagination
    const simpleFilter = [...reviews];
    if (sortingCriteria === "highest-rated") {
      simpleFilter.sort((a, b) => b.star - a.star);
    } else if (sortingCriteria === "lowest-rated") {
      simpleFilter.sort((a, b) => a.star - b.star);
    } else if (sortingCriteria === "newest") {
      simpleFilter.sort((a, b) => b.dateSelect - a.dateSelect);
    } else if (sortingCriteria === "oldest") {
      simpleFilter.sort((a, b) => a.dateSelect - b.dateSelect);
    }
    setFilteredReviews(simpleFilter);
    setIsSearchButtonClickInvoked(false);
    setIsSearchButtonClickInvoked(false);

    // setReview(reviews); // Reset reviews to the original set
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getPageReviews = () => {
    const startIndex = (currentPage - 1) * ReviewsPerPage;
    const endIndex = startIndex + ReviewsPerPage;
    const reviewsToDisplay =
      filteredReviews.length > 0 ? filteredReviews : reviews;
    return reviewsToDisplay.slice(startIndex, endIndex);
  };

  const handleSortChange = (criteria) => {
    setSortingCriteria(criteria);
    const filteredResults = [
      ...(filteredReviews.length > 0 ? filteredReviews : reviews),
    ];

    if (criteria === "highest-rated") {
      filteredResults.sort((a, b) => b.star - a.star);
    } else if (criteria === "lowest-rated") {
      filteredResults.sort((a, b) => a.star - b.star);
    } else if (criteria === "newest") {
      filteredResults.sort((a, b) => b.dateSelect - a.dateSelect);
    } else if (criteria === "oldest") {
      filteredResults.sort((a, b) => a.dateSelect - b.dateSelect);
    }
    // console.log(filteredResults);

    setFilteredReviews(filteredResults);
    setSortChangeInvoked(true);
    setIsSearchButtonClickInvoked(true);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (
      currentPage >= 1 ||
      searchExecuted ||
      sortChangeInvoked ||
      isSearchButtonClickInvoked
    ) {
      // Get the top position of the reviews section
      const reviewsSection = document.querySelector(".mb-16");
      if (reviewsSection) {
        const topPosition =
          window.scrollY + reviewsSection.getBoundingClientRect().top;
        // Scroll the page to the top of the reviews section
        window.scrollTo({ top: topPosition, behavior: "smooth" });
      }
    }
  }, [
    currentPage,
    searchExecuted,
    sortChangeInvoked,
    isSearchButtonClickInvoked,
  ]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section>
      <ReviewLanding />

      <section className="flex-row">
        {/* search/filter */}
        <div className="flex flex-col space-y-6 sm:flex-row sm:space-x-8 sm:space-y-0 mx-auto max-w-[80%] mt-16">
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="search"
              placeholder="Search..."
              className="px-3 py-2 bg-gray-100 w-[200px] sm:w-[300px] h-[40px] focus:outline-none   focus:ring-gray-700"
              value={searchQuery}
              // style={{
              //   appearance: "none",
              //   WebkitAppearance: "none",
              //   MozAppearance: "none",
              // }}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {searchExecuted === false ? (
              <button
                type="submit"
                className=" w-[30px] h-[40px] bg-none pl-2 sm:bg-gray-100 text-black  "
                onClick={handleSearchButtonClick}
              >
                <IoSearchOutline className="w-6 h-6 pr-2 hover:scale-150 duration-300" />
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="w-[30px] h-[40px] bg-none pl-2 sm:bg-gray-100 font-semibold  underline text-md  text-gray-400"
              >
                <IoClose className="w-6 h-6 pr-2 hover:scale-150 duration-300 hover:text-gray-600" />
              </button>
            )}
          </form>

          <select
            className="h-[40px] max-w-[160px] px-4 bg-gray-100 "
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option disabled selected>
              Sort By
            </option>
            <option value="highest-rated">Highest Rated</option>
            <option value="lowest-rated">Lowest Rated</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
        {/* reviews */}
        <div className="mb-16 mt-12">
          <h3 className="font-bold text-2xl mx-auto max-w-[80%] pt-4 mb-8">
            {filteredReviews.length > 0
              ? `${filteredReviews.length} ${
                  filteredReviews.length === 1 ? "Review" : "Reviews"
                }`
              : searchExecuted
              ? "0 Review"
              : `${reviews.length} Reviews`}
          </h3>

          {filteredReviews.length === 0 && searchExecuted ? (
            <p className="mx-auto max-w-[80%] py-12">
              No result. Please search again.
            </p>
          ) : (
            getPageReviews().map((review) => {
              const {
                id,
                star,
                title,
                description,
                date,
                buyerName,
                verification,
              } = review;

              const starInputs = Array.from({ length: 5 }, (_, index) => (
                <input
                  key={index}
                  type="radio"
                  name={`rating-${id}`}
                  className={`mask mask-star w-5 h-5`}
                  defaultChecked={index === star - 1}
                />
              ));
              return (
                <div
                  key={id}
                  className={`flex flex-col items-center lg:flex-row md:justify-between mx-auto max-w-[80%] py-12 border-t ${
                    id % 3 === 0 ? "border-b" : ""
                  }`}
                >
                  <section className="w-[85%] lg:w-[65%]">
                    <div className="rating mb-4">{starInputs}</div>
                    <h3 className="font-bold text-xl mb-2 tracking-wide">
                      {title}
                    </h3>
                    <p className="mb-8 tracking-wide text-gray-700">
                      {description}
                    </p>
                    <p className="text-sm">{date}</p>
                  </section>
                  <section className="flex mt-6 lg:mt-0 py-4 px-6 w-[240px] h-fit justify-center items-center bg-gray-100">
                    <p className="font-bold mr-2">{buyerName}</p>
                    <p className="text-xs -skew-x-12">{verification}</p>
                  </section>
                </div>
              );
            })
          )}
        </div>
        {/* Pagination component */}
        <div className="flex justify-center mb-12">
          <button
            onClick={() => {
              handlePrevious();
              scrollToTopOfReviews();
            }}
            disabled={currentPage === 1}
            className="mr-2 px-4 py-2 hover:scale-1 duration-300"
          >
            {currentPage === 1 ? "" : <RiArrowLeftSLine />}
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentPage(index + 1);
                scrollToTopOfReviews();
              }}
              className={`px-3 py-2 hover:scale-150 duration-300 ${
                currentPage === index + 1 ? "text-black" : "text-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => {
              handleNext();
              scrollToTopOfReviews();
            }}
            disabled={currentPage === totalPages}
            className="ml-2 px-4 py-2 hover:scale-150 duration-300 "
          >
            {currentPage === totalPages ? "" : <RiArrowRightSLine />}
          </button>
        </div>
      </section>
    </section>
  );
};

export default Review;
