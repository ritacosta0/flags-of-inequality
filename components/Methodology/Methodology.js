function Methodology() {
  return (
    <>
      <hr className="mt-20 border-slate-600"></hr>
      <div className="mt-6 mb-10 text-center ">
        <h3 className="my-4 text-2xl font-medium">Methodology</h3>
        <div className="flex items-center justify-center">
          <div className="w-7/12 text-xs text-justify">
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
