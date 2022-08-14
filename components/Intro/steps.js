import { RAINBOW_COLORS } from "../../constants";

const Highlight = ({ color, children }) => (
  <span
    className="text-white text-xs font-semibold mx-1 px-2.5 py-0.5 rounded"
    style={{ backgroundColor: color }}
  >
    {children}
  </span>
);

export const Steps = [
  {
    index: 0,
    content: (
      <span>
        First, let's learn how to interpret the flags. <br /> Each has six
        colors: <Highlight color={RAINBOW_COLORS[0]}>purple</Highlight>,{" "}
        <Highlight color={RAINBOW_COLORS[1]}>blue</Highlight>,
        <Highlight color={RAINBOW_COLORS[2]}>green</Highlight>,
        <Highlight color={RAINBOW_COLORS[3]}>yellow</Highlight>,
        <Highlight color={RAINBOW_COLORS[4]}>orange</Highlight> and
        <Highlight color={RAINBOW_COLORS[5]}>red</Highlight>. Every segment has
        the same width and height. We match these to the categories that ILGA
        assesses in its reports.
      </span>
    ),
  },
  {
    index: 1,
    content: (
      <span>
        In our metaphor, <Highlight color={RAINBOW_COLORS[0]}>purple</Highlight>{" "}
        represents the "Asylum" category. This looks at how LGBTQ+ asylum
        seekers are treated in each country.
      </span>
    ),
  },
  {
    index: 2,
    content: (
      <span>
        With <Highlight color={RAINBOW_COLORS[1]}>blue</Highlight>, we encode
        the "Civil society space" category. It covers the ability for
        organizations to safely operate; the organization of public events;
        freedom of expression; and funding laws.
      </span>
    ),
  },
  {
    index: 3,
    content: (
      <span>
        The <Highlight color={RAINBOW_COLORS[2]}>green</Highlight> covers the
        protection of "Equality and non-discrimination". It encompasses the
        constitutional protection of rights such as non-discrimination based on
        sexual orientation, right to employment, access to goods and services,
        access to healthcare and education, among others.
      </span>
    ),
  },
  {
    index: 4,
    content: (
      <span>
        <Highlight color={RAINBOW_COLORS[3]}>yellow</Highlight> depicts the
        protection (or lack of) against hate crime and hate speech.
      </span>
    ),
  },
  {
    index: 5,
    content: (
      <span>
        <Highlight color={RAINBOW_COLORS[4]}>orange</Highlight> covers the
        recognition of LGBTQ+ families by assessing if there are rights such as
        marriage equality or joint adoption, for example.
      </span>
    ),
  },
  {
    index: 6,
    content: (
      <span>
        And lastly, <Highlight color={RAINBOW_COLORS[5]}>red</Highlight>{" "}
        represents "Legal gender recognition" and "Intersex bodily integrity".
        Up until 2022, this used to be a single category but was split in two
        this year. For consistency among years, we decided to keep these
        categories together.
      </span>
    ),
  },
  {
    index: 7,
    content: (
      <span>
        In the ideal flag, all the segments would be equally sized and
        completely fill the area represented by this black border.
        Unfortunately, no country has achieved full equality yet, so no flag is
        complete.
      </span>
    ),
  },
  {
    index: 8,
    content: (
      <span>
        Take Malta for example. It is one of the countries which is constantly
        on the top of the ranking. But because it is lacking in some areas on
        "Equality and non-discrimination" and "Intersex bodily integrity" its
        flag is still incomplete.
      </span>
    ),
  },
  {
    index: 9,
    content: (
      <span>
        On the other side of the spectrum, there are countries like Russia,
        still a long way from full equality.
      </span>
    ),
  },
  {
    index: 10,
    content: (
      <span>
        Below, you will find the flags for 49 European countries with sizes
        proportional to the coverage of rights for their LGBTQ+ communites. This
        work uses the data gathered yearly by ILGA Europe in their Rainbow
        Index. Our goal is to showcase the huge disparaties between different
        countries but also to make clear that in no country full equality as
        been achieved yet.
      </span>
    ),
  },
];
