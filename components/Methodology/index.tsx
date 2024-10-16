import RainbowLink from "@/components/RainbowLink";

const Methodology = () => {
  return (
    <div className="mx-auto mt-20 mb-10 text-slate-400 ">
      <hr className=" border-slate-600" />
      <h3 className="my-6 text-2xl font-medium text-center">Methodology</h3>
      <div className="mx-auto text-xs text-justify lg:w-8/12">
        <p>
          The data in this project comes from ILGA-Europe&apos;s yearly
          <RainbowLink href="https://www.ilga-europe.org/rainbow-europe/">
            Rainbow Index
          </RainbowLink>
          Because data is not currently made available in a manageable format,
          we scraped it from the website for the years between 2015 to 2024. All
          the raw data and the scrapper code is made available in the
          <RainbowLink href="https://github.com/ritacosta0/flags-of-inequality">
            project&apos;s repository.
          </RainbowLink>
        </p>
        <p>
          We collected the rating that ILGA provides for each category for each
          country over the years. We also gathered the assessment that the
          organization does of the different criteria inside each category. The
          first set of information is used in the construction of the different
          flags, where the size is proportional to how accomplished the
          countries are in the promotion of equality for their LGBTQ+ community.
          In 2022, Rainbow Data introduced &quot;Intersex bodily integrity&quot;
          as a seventh category. Criteria covered in this category was
          previously part of &quot;Legal gender recognition and bodily
          integrity&quot;. To allow comparison across different years, we merged
          the new category with &quot;Legal gender recognition&quot; for the
          years 2022 to 2024. To do so, we calculated the weighted average of
          the two categories based on the number of criteria covered by each.
        </p>
      </div>
    </div>
  );
};

export default Methodology;
