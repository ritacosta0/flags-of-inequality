import React, { useState } from "react";
import { Scrollama, Step } from "react-scrollama";
import { useFlagDimensions } from "../../hooks/useFlagDimensions";
import { RAINBOW_COLORS } from "../../constants";
import { Steps } from "./steps";
import { isNull } from "lodash";
import { Flag } from "../Flag";
import { AnimatePresence, motion } from "framer-motion";
import Header from "../Header";

function Intro() {
  const [currentStepIndex, setCurrentStepIndex] = useState(null);
  const [flagsContainer, flagDimensions] = useFlagDimensions(1);

  const onStepEnter = ({ data }) => {
    setCurrentStepIndex(data);
  };

  return (
    <div className="w-10/12 mx-auto mt-10 lg:w-3/4">
      <Header />
      <div className="mt-[20vh] lg:w-8/12 mx-auto">
        <div className="sticky top-1/4">
          <div ref={flagsContainer} className="z-0 mx-4 my-6 ">
            <AnimatePresence>
              (
              <svg
                width={flagDimensions.width}
                height={flagDimensions.height + 1}
              >
                {currentStepIndex < 7 &&
                  flagDimensions.height > 0 &&
                  RAINBOW_COLORS.map((color, index) => (
                    <motion.rect
                      key={color}
                      width={flagDimensions.width}
                      height={flagDimensions.height / 6}
                      y={(flagDimensions.height / 6) * index}
                      fill={color}
                      animate={{
                        fillOpacity:
                          isNull(currentStepIndex) ||
                          currentStepIndex === 0 ||
                          currentStepIndex - 1 === index
                            ? 1
                            : 0.3,
                      }}
                      exit={{ fillOpacity: 0 }}
                      transition={{ ease: "easeOut" }}
                    />
                  ))}

                {currentStepIndex >= 7 && currentStepIndex < 10 && (
                  <g>
                    <motion.rect
                      width={flagDimensions.width}
                      height={flagDimensions.height}
                      className="stroke-2 stroke-slate-300 fill-slate-900"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ ease: "easeOut" }}
                    />
                  </g>
                )}
              </svg>
              )
              {currentStepIndex === 8 && (
                <motion.div
                  className="absolute top-0 "
                  key={"malta-intro"}
                  style={flagDimensions}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ ease: "easeOut" }}
                >
                  <Flag country={"Malta"} year={2022} isInteractive={false} />
                </motion.div>
              )}
              {currentStepIndex === 9 && (
                <motion.div
                  className="absolute top-0 "
                  key={"russia-intro"}
                  style={flagDimensions}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ ease: "easeOut" }}
                >
                  <Flag country={"Russia"} year={2022} isInteractive={false} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <Scrollama onStepEnter={onStepEnter} offset={0.9}>
          {Steps.map((step) => (
            <Step data={step.index} key={step.index}>
              <motion.div
                className="h-screen mt-[50vh] z-20"
                initial={false}
                animate={{
                  opacity: step.index === currentStepIndex ? 1 : 0.4,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
              >
                <div className="relative max-w-2xl p-6 mx-auto bg-white border border-gray-200 rounded-md shadow-md text-slate-800 h-fit">
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
