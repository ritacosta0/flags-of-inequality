import { AnimatePresence, motion } from "framer-motion";
import { isNull } from "lodash";
import { useState } from "react";
// @ts-expect-error - react-scrollama is not typed
import { Scrollama, Step } from "react-scrollama";
import { RAINBOW_COLORS } from "../../constants";
import { useFlagDimensions } from "../../hooks/useFlagDimensions";
import Flag from "@/components/Flag";
import { Steps } from "./steps";

import styles from "./Intro.module.css";
import { $FixMe } from "@/utils/defs";

function Intro() {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [flagsContainer, flagDimensions] = useFlagDimensions(1);

  const onStepEnter = ({ data }: { data: $FixMe }) => {
    setCurrentStepIndex(data);
  };

  return (
    <div className="mt-[20vh] lg:w-8/12 mx-auto">
      <div className="sticky z-0 top-1/4 ">
        <div ref={flagsContainer} className="mx-4 my-6 ">
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
                        6 - currentStepIndex === index
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
                <Flag country={"Malta"} year={2024} isInteractive={false} />
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
                <Flag country={"Russia"} year={2024} isInteractive={false} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Scrollama onStepEnter={onStepEnter} offset={1}>
        {Steps.map((step) => (
          <Step data={step.index} key={step.index}>
            <motion.div
              className={`h-screen mt-[50vh] z-20 ${styles.fixZ}`}
              initial={false}
              animate={{
                opacity: step.index === currentStepIndex ? 1 : 0.4,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="relative max-w-2xl p-6 mx-auto bg-white border border-gray-200 rounded-md shadow-md text-slate-800 h-fit"
                tabIndex={0}
              >
                {step.content}
              </div>
            </motion.div>
          </Step>
        ))}
      </Scrollama>
    </div>
  );
}

export default Intro;
