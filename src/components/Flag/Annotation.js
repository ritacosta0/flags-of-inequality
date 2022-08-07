import { Annotation as AnnotationVisx, HtmlLabel } from "@visx/annotation";
import { Text } from "@visx/text";
import { format } from "d3-format";
import { motion } from "framer-motion";
import React from "react";

export default function Annotation({
  dimensions,
  pointerPosition,
  color,
  value,
  label,
}) {
  const isTextFlipped = pointerPosition?.x > dimensions.boundedWidth * 0.7;
  return (
    <>
      {/* <AnnotationVisx x={0} y={dimensions.boundedHeight} dy={-4}>
        <HtmlLabel
          horizontalAnchor="start"
          verticalAnchor="start"
          showAnchorLine={false}
        >
          <motion.div
            className="px-2 py-1 text-xs"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              color,
            }}
            exit={{
              opacity: 0,
            }}
            style={{
              width: dimensions.boundedWidth,
              maxHeight: dimensions.marginBottom,
            }}
          >
            <motion.p initial={{ scale: 0.7 }} animate={{ scale: 1 }}>
              {label}
            </motion.p>
          </motion.div>
        </HtmlLabel>
      </AnnotationVisx> */}
      <motion.g
        initial={{
          x: pointerPosition.x,
          y: pointerPosition.y,
        }}
        animate={{
          x: pointerPosition.x,
          y: pointerPosition.y,
        }}
      >
        <Text
          textAnchor={isTextFlipped ? "end" : "start"}
          dx={isTextFlipped ? -20 : 20}
          dy={5}
          fontSize={14}
          fontWeight="bold"
          fill={color}
          paintOrder="stroke"
          stroke="white"
          strokeWidth={3}
          strokeLinecap="butt"
          strokeLinejoin="round"
        >
          {format(".0%")(value)}
        </Text>
      </motion.g>
    </>
  );
}
