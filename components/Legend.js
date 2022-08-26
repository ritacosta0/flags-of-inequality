import { CATEGORIES_FULL_NAME, RAINBOW_COLORS } from "../constants";
import Stack from "@mui/material/Stack";
import Highlight from "./Highlight";

export default function Legend({ position }) {
  return (
    <div aria-hidden>
      <Stack
        direction={{ sm: "row", xs: "column" }}
        flexWrap="wrap"
        spacing={1}
        my={2}
        justifyContent={position}
        alignItems="center"
      >
        {CATEGORIES_FULL_NAME.map((cat, index) => {
          return (
            <div key={index}>
              <Highlight color={RAINBOW_COLORS[index]}>{cat}</Highlight>
            </div>
          );
        })}
      </Stack>
    </div>
  );
}
