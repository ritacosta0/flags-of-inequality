import { CATEGORIES_FULL_NAME, RAINBOW_COLORS } from "../constants";
import Stack from "@mui/material/Stack";

export default function Legend() {
  const Highlight = ({ color, children }) => (
    <span
      className=" inline-block text-white text-xs font-semibold mx-1 px-2.5 py-0.5 rounded"
      style={{ backgroundColor: color }}
    >
      {children}
    </span>
  );
  return (
    <div aria-hidden>
      <Stack
        direction={{ sm: "row", xs: "column" }}
        flexWrap="wrap"
        spacing={1}
        my={2}
        justifyContent="center"
        alignItems="center"
      >
        {CATEGORIES_FULL_NAME.map((cat, index) => {
          return (
            <div>
              <Highlight color={RAINBOW_COLORS[index]}> {cat}</Highlight>
            </div>
          );
        })}
      </Stack>
    </div>
  );
}
