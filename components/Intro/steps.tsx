import { RAINBOW_COLORS } from "@/constants";
import Highlight from "@/components/Highlight";
import Underline from "@/components/Underline";
import { flag } from "country-emoji";

export const Steps = [
  {
    index: 0,
    content: (
      <span>
        First, let&apos;s learn how to interpret the flags. <br /> Each has six
        colors: <Highlight color={RAINBOW_COLORS[5]}>purple</Highlight>,{" "}
        <Highlight color={RAINBOW_COLORS[4]}>blue</Highlight>,
        <Highlight color={RAINBOW_COLORS[3]}>green</Highlight>,
        <Highlight color={RAINBOW_COLORS[2]}>yellow</Highlight>,
        <Highlight color={RAINBOW_COLORS[1]}>orange</Highlight> and
        <Highlight color={RAINBOW_COLORS[0]}>red</Highlight>. Every segment has
        the same width and height. We match these to the categories that{" "}
        <a
          className="text-blue-600 underline hover:text-blue-500"
          href="https://www.ilga-europe.org/rainbow-europe/"
        >
          ILGA assesses in its reports
        </a>
        .
      </span>
    ),
  },
  {
    index: 1,
    content: (
      <span>
        In our metaphor, <Highlight color={RAINBOW_COLORS[5]}>purple</Highlight>{" "}
        represents the <Underline color={RAINBOW_COLORS[5]}>Asylum</Underline>{" "}
        category. This looks at how LGBTQ+ asylum seekers are treated in each
        country.
      </span>
    ),
  },
  {
    index: 2,
    content: (
      <span>
        With <Highlight color={RAINBOW_COLORS[4]}>blue</Highlight>, we encode
        the <Underline color={RAINBOW_COLORS[4]}>Civil society space</Underline>
        category. It covers the ability for organizations to safely operate; the
        organization of public events; freedom of expression; and funding laws.
      </span>
    ),
  },
  {
    index: 3,
    content: (
      <span>
        The <Highlight color={RAINBOW_COLORS[3]}>green</Highlight> covers the
        protection of
        <Underline color={RAINBOW_COLORS[3]}>
          Legal gender recognition
        </Underline>
        and
        <Underline color={RAINBOW_COLORS[3]}>
          Intersex bodily integrity
        </Underline>
        . Up until 2022, this used to be a single category but was split in two
        this year. For consistency among years, we decided to keep these
        categories together.
      </span>
    ),
  },
  {
    index: 4,
    content: (
      <span>
        <Highlight color={RAINBOW_COLORS[2]}>yellow</Highlight> depicts the
        protection (or lack of) against
        <Underline color={RAINBOW_COLORS[2]}>
          hate crime and hate speech
        </Underline>
        .
      </span>
    ),
  },
  {
    index: 5,
    content: (
      <span>
        <Highlight color={RAINBOW_COLORS[1]}>orange</Highlight> covers the
        recognition of
        <Underline color={RAINBOW_COLORS[1]}>LGBTQ+ families</Underline>by
        assessing if there are rights such as marriage equality or joint
        adoption, for example.
      </span>
    ),
  },
  {
    index: 6,
    content: (
      <span>
        And lastly, <Highlight color={RAINBOW_COLORS[0]}>red</Highlight>{" "}
        represents{" "}
        <Underline color={RAINBOW_COLORS[0]}>
          Equality and non-discrimination
        </Underline>
        . It encompasses the constitutional protection of rights such as
        non-discrimination based on sexual orientation, right to employment,
        access to goods and services, access to healthcare and education, among
        others.
      </span>
    ),
  },
  {
    index: 7,
    content: (
      <>
        <span aria-hidden>
          In the ideal flag, all the segments would be equally sized and
          completely fill the area represented by this white border.
          Unfortunately, no country has achieved full equality yet, so no flag
          is complete.
        </span>
        <span className="sr-only">
          In the ideal flag, all the segments would be equally sized and
          completely fill the area of the flag. Unfortunately, no country has
          achieved full equality yet, so no flag is complete.
        </span>
      </>
    ),
  },
  {
    index: 8,
    content: (
      <>
        <span>
          Take <span className="font-bold">Malta</span> {flag("Malta")} for
          example. It is one of the countries which is constantly on the top of
          the ranking and very close to full coveraging the rights of their
          LGBTQ+ citizens. But because it is lacking in some areas on
          <Underline color={RAINBOW_COLORS[0]}>
            Equality and non-discrimination
          </Underline>
          and
          <Underline color={RAINBOW_COLORS[3]}>
            Intersex bodily integrity
          </Underline>
          , its flag is still incomplete.
        </span>
      </>
    ),
  },
  {
    index: 9,
    content: (
      <span>
        On the other side of the spectrum, there are countries like{" "}
        <span className="font-bold">Russia</span> {flag("Russia")}, with a
        barely visible flag, still a long way from full equality.
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
