import { Scrollama, Step } from "react-scrollama";
import React, { useState } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import "./intro.css";

export default function Intro() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const onStepEnter = ({ data }) => {
    setCurrentStepIndex(data);
  };

  return (
    <div>
      <div
        style={{ textAlign: "center", display: "inline-block", width: "80% " }}
      >
        <p>
          If countries had equal rights for their LGBTQ+ citizens, this
          visualization would not exist. Understand to what extent different
          dimensions of queer life are disregarded by state regulations.
          <br /> This work uses the data gathered yearly by ILGA Europe in their
          Rainbow Index. It is an exercise in visualizing how differently
          countries embrace and accept people who identify as LGBTQ+.We use the
          LGBTQ+ flag as a metaphor for the inequalities. <br /> Our goal is to
          showcase the huge disparaties between different countries but also to
          make clear that in no country full equality as been achieved yet.
        </p>
        <ArrowDownwardIcon />
      </div>
      <div
        className="sticky-right-step"
        // style={{ height: window.screen.height / 1.5 }}
      >
        {currentStepIndex == 0 ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 777 480">
            <path d="M0 400H777V480H0V400Z" fill="#750787" />
            <path d="M0 320H777V400H0V320Z" fill="#004DFF" />
            <path d="M0 240H777V320H0V240Z" fill="#008026" />
            <path d="M0 160H777V240H0V160Z" fill="#FFED00" />
            <path d="M0 80H777V160H0V80Z" fill="#FF8C00" />
            <path d="M0 0H777V80H0V0Z" fill="#E40303" />
          </svg>
        ) : currentStepIndex == 1 ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 777 480">
            <path d="M0 400H777V480H0V400Z" fill="#750787" />
            <path
              d="M0 320H777V400H0V320Z"
              fill="#004DFF"
              style={{ opacity: 0.4 }}
            />
            <path
              d="M0 240H777V320H0V240Z"
              fill="#008026"
              style={{ opacity: 0.4 }}
            />
            <path
              d="M0 160H777V240H0V160Z"
              fill="#FFED00"
              style={{ opacity: 0.4 }}
            />
            <path
              d="M0 80H777V160H0V80Z"
              fill="#FF8C00"
              style={{ opacity: 0.4 }}
            />
            <path
              d="M0 0H777V80H0V0Z"
              fill="#E40303"
              style={{ opacity: 0.4 }}
            />
          </svg>
        ) : currentStepIndex == 2 ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 777 480">
            <path
              d="M0 400H777V480H0V400Z"
              fill="#750787"
              style={{ opacity: 0.4 }}
            />
            <path d="M0 320H777V400H0V320Z" fill="#004DFF" />
            <path
              d="M0 240H777V320H0V240Z"
              fill="#008026"
              style={{ opacity: 0.4 }}
            />
            <path
              d="M0 160H777V240H0V160Z"
              fill="#FFED00"
              style={{ opacity: 0.4 }}
            />
            <path
              d="M0 80H777V160H0V80Z"
              fill="#FF8C00"
              style={{ opacity: 0.4 }}
            />
            <path
              d="M0 0H777V80H0V0Z"
              fill="#E40303"
              style={{ opacity: 0.4 }}
            />
          </svg>
        ) : currentStepIndex == 3 ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 777 480">
            <path
              d="M0 400H777V480H0V400Z"
              fill="#750787"
              style={{ opacity: 0.4 }}
            />
            <path
              d="M0 320H777V400H0V320Z"
              fill="#004DFF"
              style={{ opacity: 0.4 }}
            />
            <path d="M0 240H777V320H0V240Z" fill="#008026" />
            <path
              d="M0 160H777V240H0V160Z"
              fill="#FFED00"
              style={{ opacity: 0.4 }}
            />
            <path
              d="M0 80H777V160H0V80Z"
              fill="#FF8C00"
              style={{ opacity: 0.4 }}
            />
            <path
              d="M0 0H777V80H0V0Z"
              fill="#E40303"
              style={{ opacity: 0.4 }}
            />
          </svg>
        ) : currentStepIndex == 4 ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 777 480">
            <path
              d="M0 400H777V480H0V400Z"
              fill="#750787"
              style={{ opacity: 0.4 }}
            />
            <path
              d="M0 320H777V400H0V320Z"
              fill="#004DFF"
              style={{ opacity: 0.4 }}
            />
            <path
              d="M0 240H777V320H0V240Z"
              fill="#008026"
              style={{ opacity: 0.4 }}
            />
            <path d="M0 160H777V240H0V160Z" fill="#FFED00" />
            <path
              d="M0 80H777V160H0V80Z"
              fill="#FF8C00"
              style={{ opacity: 0.4 }}
            />
            <path
              d="M0 0H777V80H0V0Z"
              fill="#E40303"
              style={{ opacity: 0.4 }}
            />
          </svg>
        ) : currentStepIndex == 5 ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 777 480">
            <path
              d="M0 400H777V480H0V400Z"
              fill="#750787"
              style={{ opacity: 0.4 }}
            />
            <path
              d="M0 320H777V400H0V320Z"
              fill="#004DFF"
              style={{ opacity: 0.4 }}
            />
            <path
              d="M0 240H777V320H0V240Z"
              fill="#008026"
              style={{ opacity: 0.4 }}
            />
            <path
              d="M0 160H777V240H0V160Z"
              fill="#FFED00"
              style={{ opacity: 0.4 }}
            />
            <path d="M0 80H777V160H0V80Z" fill="#FF8C00" />
            <path
              d="M0 0H777V80H0V0Z"
              fill="#E40303"
              style={{ opacity: 0.4 }}
            />
          </svg>
        ) : currentStepIndex == 6 ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 777 480">
            <path
              d="M0 400H777V480H0V400Z"
              fill="#750787"
              style={{ opacity: 0.4 }}
            />
            <path
              d="M0 320H777V400H0V320Z"
              fill="#004DFF"
              style={{ opacity: 0.4 }}
            />
            <path
              d="M0 240H777V320H0V240Z"
              fill="#008026"
              style={{ opacity: 0.4 }}
            />
            <path
              d="M0 160H777V240H0V160Z"
              fill="#FFED00"
              style={{ opacity: 0.4 }}
            />
            <path
              d="M0 80H777V160H0V80Z"
              fill="#FF8C00"
              style={{ opacity: 0.4 }}
            />
            <path d="M0 0H777V80H0V0Z" fill="#E40303" />
          </svg>
        ) : currentStepIndex == 7 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 777 480"
            style={{ border: "1px solid black" }}
          ></svg>
        ) : currentStepIndex == 8 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 777 480"
            style={{ border: "1px solid black" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 777 470">
              {" "}
              <path d="M0 395H777V475H0V395Z" fill="#750787" />
              <path d="M0 315H777V395H0V315Z" fill="#004DFF" />
              <path d="M0 235H777V315H0V235Z" fill="#008026" />
              <path d="M0 155H777V235H0V155" fill="#FFED00" />
              <path d="M0 75H777V155H0V75Z" fill="#FF8C00" />
              <path d="M0 0H777V75H0V0Z" fill="#E40303" />
            </svg>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 777 480"
            style={{ border: "1px solid black" }}
          ></svg>
        )}
      </div>
      <div>
        <Scrollama offset={0.4} onStepEnter={onStepEnter}>
          <Step data={0} key={0}>
            <div className="single-step-wrapper">
              <div
                className="single-step"
                style={{
                  opacity: currentStepIndex === 0 ? 1 : 0,
                  height: window.screen.height / 2,
                }}
              >
                {" "}
                <span className="single-step-text">
                  First, let's learn how to interpret the flags. <br /> Each has
                  six colors: purple, blue, green, yellow, orange and red. Every
                  segment has the same width and height. We match these to the
                  categories that ILGA assesses in its reports.
                </span>
              </div>
            </div>
          </Step>
          <Step data={1} key={1}>
            <div className="single-step-wrapper">
              <div
                className="single-step"
                style={{
                  opacity: currentStepIndex === 1 ? 1 : 0,
                  height: window.screen.height / 2,
                }}
              >
                {" "}
                <span className="single-step-text">
                  In our metaphor, purple represents the "Asylum" category. This
                  looks at how LGBTQ+ asylum seekers are treated in each
                  country.
                </span>
              </div>
            </div>
          </Step>
          <Step data={2} key={2}>
            <div className="single-step-wrapper">
              <div
                className="single-step"
                style={{
                  opacity: currentStepIndex === 2 ? 1 : 0,
                  height: window.screen.height / 2,
                }}
              >
                <span className="single-step-text">
                  With blue, we encode the "Civil society space" category. It
                  covers the ability for organizations to safely operate; the
                  organization of public events; freedom of expression; and
                  funding laws.{" "}
                </span>
              </div>
            </div>
          </Step>
          <Step data={3} key={3}>
            <div className="single-step-wrapper">
              <div
                className="single-step"
                style={{
                  opacity: currentStepIndex === 3 ? 1 : 0,
                  height: window.screen.height / 2,
                }}
              >
                <span className="single-step-text">
                  The green covers the protection of "Equality and
                  non-discrimination". It encompasses the constitutional
                  protection of rights such as non-discrimination based on
                  sexual orientation, right to employment, access to goods and
                  services, access to healthcare and education, among others.
                </span>
              </div>
            </div>
          </Step>
          <Step data={4} key={4}>
            <div className="single-step-wrapper">
              <div
                className="single-step"
                style={{
                  opacity: currentStepIndex === 4 ? 1 : 0,
                  height: window.screen.height / 2,
                }}
              >
                <span className="single-step-text">
                  Yellow depicts the protection (or lack of) against hate crime
                  and hate speech.
                </span>
              </div>
            </div>
          </Step>
          <Step data={5} key={5}>
            <div className="single-step-wrapper">
              <div
                className="single-step"
                style={{
                  opacity: currentStepIndex === 5 ? 1 : 0,
                  height: window.screen.height / 2,
                }}
              >
                <span className="single-step-text">
                  Orange covers the recognition of LGBTQ+ families by assessing
                  if there are rights such as marriage equality or joint
                  adoption, for example.
                </span>
              </div>
            </div>
          </Step>
          <Step data={6} key={6}>
            <div className="single-step-wrapper">
              <div
                className="single-step"
                style={{
                  opacity: currentStepIndex === 6 ? 1 : 0,
                  height: window.screen.height / 2,
                }}
              >
                <span className="single-step-text">
                  And lastly, red represents "Legal gender recognition" and
                  "Intersex bodily integrity". Up until 2022, this used to be a
                  single category but was split in two this year. For
                  consistency among years, we decided to keep these categories
                  together.
                </span>
              </div>
            </div>
          </Step>
          <Step data={7} key={7}>
            <div className="single-step-wrapper">
              <div
                className="single-step"
                style={{
                  opacity: currentStepIndex === 7 ? 1 : 0,
                  height: window.screen.height / 2,
                }}
              >
                <span className="single-step-text">
                  In the ideal flag, all the segments would be equally sized and
                  completely fill the area represented by this black border.
                  Unfortunately, no country has achieved full equality yet, so
                  no flag is complete.
                </span>
              </div>
            </div>
          </Step>
          <Step data={8} key={8}>
            <div className="single-step-wrapper">
              <div
                className="single-step"
                style={{
                  opacity: currentStepIndex === 8 ? 1 : 0,
                  height: window.screen.height / 2,
                }}
              >
                <span className="single-step-text">
                  Take Malta for example. It is one of the countries which is
                  constantly on the top of the ranking. But because it is
                  lacking in some areas on "Equality and non-discrimination" and
                  "Intersex bodily integrity" its flag is still incomplete.
                </span>
              </div>
            </div>
          </Step>
          <Step data={9} key={9}>
            <div className="single-step-wrapper">
              <div
                className="single-step"
                style={{
                  opacity: currentStepIndex === 9 ? 1 : 0,
                  height: window.screen.height / 2,
                }}
              >
                <span className="single-step-text">
                  On the other side of the spectrum, there are countries like
                  Turkey, Russia and Albania — still a long way from full
                  equality.
                </span>
              </div>
            </div>
          </Step>
        </Scrollama>
      </div>
    </div>
  );
}

// Ideally, the
//               flags would be all equal to the one shown to your right. But
//               that's not the case.
