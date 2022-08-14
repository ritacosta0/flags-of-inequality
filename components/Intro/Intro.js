import React, { useState } from "react";
import { Scrollama, Step } from "react-scrollama";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useFlagDimensions } from "../../hooks/useFlagDimensions";
import { RAINBOW_COLORS } from "../../constants";
import { Steps } from "./steps";
import { isNull } from "lodash";
import { Flag } from "../Flag";
import { motion } from "framer-motion";

function Intro() {
  const [currentStepIndex, setCurrentStepIndex] = useState(null);
  const [flagsContainer, flagDimensions] = useFlagDimensions(1);

  const onStepEnter = ({ data }) => {
    setCurrentStepIndex(data);
  };

  console.log(currentStepIndex);

  return (
    <div>
      <p>
        If countries had equal rights for their LGBTQ+ citizens, this
        visualization would not exist. We make use of the rainbow flag to
        portray to what extent different dimensions of queer life are
        disregarded by state regulations.
      </p>
      <ArrowDownwardIcon />
      <div className="mt-[20vh]">
        <div className="sticky top-10">
          <div ref={flagsContainer} className="z-0 mx-4 my-6 ">
            {isNull(currentStepIndex) ||
              (currentStepIndex < 8 && (
                <svg
                  width={flagDimensions.width}
                  height={flagDimensions.height}
                >
                  {isNull(currentStepIndex) ||
                    ([0, 1, 2, 3, 4, 5, 6].includes(currentStepIndex) && (
                      <g>
                        {RAINBOW_COLORS.reverse().map((color, index) => (
                          <rect
                            key={index}
                            width={flagDimensions.width}
                            height={flagDimensions.height / 6}
                            y={(flagDimensions.height / 6) * index}
                            fill={color}
                            fillOpacity={
                              isNull(currentStepIndex) ||
                              currentStepIndex === 0 ||
                              currentStepIndex - 1 === index
                                ? 1
                                : 0.5
                            }
                          />
                        ))}
                      </g>
                    ))}
                  {currentStepIndex === 7 && (
                    <g>
                      <rect
                        width={flagDimensions.width}
                        height={flagDimensions.height}
                        className="stroke-2 stroke-slate-700 fill-transparent"
                      />
                    </g>
                  )}
                </svg>
              ))}
            {currentStepIndex === 8 && (
              <div style={flagDimensions}>
                <Flag country={"Malta"} year={2022} isInteractive={false} />
              </div>
            )}
            {currentStepIndex === 9 && (
              <div style={flagDimensions}>
                <Flag country={"Russia"} year={2022} isInteractive={false} />
              </div>
            )}
          </div>
        </div>
        <Scrollama onStepEnter={onStepEnter} offset={0.5}>
          {Steps.map((step) => (
            <Step data={step.index} key={step.index}>
              <motion.div
                className="h-[100vh] mt-[30vh]"
                animate={{
                  opacity: step.index === currentStepIndex ? 1 : 0.4,
                }}
              >
                <div className="relative max-w-2xl p-6 mx-auto bg-white border border-gray-200 rounded-lg shadow-md h-fit">
                  {step.content}
                </div>
              </motion.div>
            </Step>
          ))}
        </Scrollama>
      </div>
    </div>
  );
}

export default Intro;
