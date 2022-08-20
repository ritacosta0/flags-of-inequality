import { RAINBOW_COLORS } from "../../constants";

const Highlight = ({ color, children }) => (
  <span
    className=" inline-block text-white text-xs font-semibold mx-1 px-2.5 py-0.5 rounded"
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
        represents the <span className="font-bold ">Asylum</span> category. This
        looks at how LGBTQ+ asylum seekers are treated in each country.
      </span>
    ),
  },
  {
    index: 2,
    content: (
      <span>
        With <Highlight color={RAINBOW_COLORS[1]}>blue</Highlight>, we encode
        the <span className="font-bold ">Civil society space</span> category. It
        covers the ability for organizations to safely operate; the organization
        of public events; freedom of expression; and funding laws.
      </span>
    ),
  },
  {
    index: 3,
    content: (
      <span>
        The <Highlight color={RAINBOW_COLORS[2]}>green</Highlight> covers the
        protection of{" "}
        <span className="font-bold ">Legal gender recognition</span> and{" "}
        <span className="font-bold ">Intersex bodily integrity</span>. Up until
        2022, this used to be a single category but was split in two this year.
        For consistency among years, we decided to keep these categories
        together.
      </span>
    ),
  },
  {
    index: 4,
    content: (
      <span>
        <Highlight color={RAINBOW_COLORS[3]}>yellow</Highlight> depicts the
        protection (or lack of) against{" "}
        <span className="font-bold">hate crime and hate speech</span>.
      </span>
    ),
  },
  {
    index: 5,
    content: (
      <span>
        <Highlight color={RAINBOW_COLORS[4]}>orange</Highlight> covers the
        recognition of <span className="font-bold">LGBTQ+ families</span> by
        assessing if there are rights such as marriage equality or joint
        adoption, for example.
      </span>
    ),
  },
  {
    index: 6,
    content: (
      <span>
        And lastly, <Highlight color={RAINBOW_COLORS[5]}>red</Highlight>{" "}
        represents{" "}
        <span className="font-bold">Equality and non-discrimination</span>. It
        encompasses the constitutional protection of rights such as
        non-discrimination based on sexual orientation, right to employment,
        access to goods and services, access to healthcare and education, among
        others.
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
        Take <span className="font-bold">Malta</span> for example. It is one of
        the countries which is constantly on the top of the ranking. But because
        it is lacking in some areas on "Equality and non-discrimination" and
        "Intersex bodily integrity" its flag is still incomplete.
      </span>
    ),
  },
  {
    index: 9,
    content: (
      <span>
        On the other side of the spectrum, there are countries like{" "}
        <span className="font-bold">Russia</span>, still a long way from full
        equality.
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
