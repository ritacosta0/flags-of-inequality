import {
  CATEGORIES_FULL_NAME,
  CATEGORIES_ORDERED_LIST,
  RAINBOW_COLORS,
} from "../constants";
import Highlight from "./Highlight";

export default function Legend() {
  return (
    <div
      aria-hidden
      className="flex flex-col flex-wrap items-center justify-center gap-2 my-2 text-center sm:flex-row "
    >
      {CATEGORIES_ORDERED_LIST.map((cat, index) => {
        return (
          <div key={index}>
            <Highlight color={RAINBOW_COLORS[index]}>
              {CATEGORIES_FULL_NAME[cat]}
            </Highlight>
          </div>
        );
      })}
    </div>
  );
}
