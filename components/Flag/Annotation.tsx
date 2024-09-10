import { Text } from "@visx/text";
import { format } from "d3-format";

const Annotation = ({ value, color }: { value: number; color: string }) => (
  <svg width={42} height={16}>
    <Text
      x={21}
      y={0}
      verticalAnchor="start"
      textAnchor="middle"
      dy={2}
      dx={0}
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
  </svg>
);

export default Annotation;
