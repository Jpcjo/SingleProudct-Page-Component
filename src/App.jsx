import {
  LeftSliders,
  RightProductDetails,
  TopSlide,
  TopTitle,
  ProductCardsSlide,
  QA,
  InfoSection,
  Review,
} from "./components/index";

const App = () => {
  return (
    <>
      <TopSlide />
      <TopTitle />
      <section className="flex flex-col pt-0 lg:flex-row mx-auto max-w-6xl  lg:pt-16 lg:gap-x-[60px] justify-between">
        {/* // overflow-hidden */}
        <LeftSliders />
        <RightProductDetails />
      </section>

      <QA />

      <InfoSection />
      <ProductCardsSlide />
      <Review />
    </>
  );
};
export default App;
