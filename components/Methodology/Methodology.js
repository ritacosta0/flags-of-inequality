function Methodology() {
  return (
    <>
      <div className="mt-10">
        <hr></hr>
      </div>
      <div className="text-center mt-6 mb-10 ">
        <h3 className="text-2xl font-bold">Methodology</h3>
        <div className="flex items-center justify-center">
          {" "}
          <div className="text-xs w-7/12 text-justify">
            <p>
              The data in this project comes from ILGA-Europe's yearly Rainbow
              Index. Because data is not currently made available in a
              manageable format, we scraped it from the website for the years
              between 2015 to 2022. All the raw data and the scrapper code is
              made available in the project's repository.
            </p>
            <p>
              We collected the rating that ILGA provides for each category for
              each country over the years. We also gathered the assessment that
              the organization does of the different criteria inside each
              category. The first set of information is used in the construction
              of the different flags, where the size is proportional to how
              accomplished the countries are in the promotion of equality for
              their LGBTQ+ community.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Methodology;
