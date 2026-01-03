import { colord, extend } from "colord";
import a11yPlugin from "colord/plugins/a11y";
import { PropsWithChildren } from "react";

extend([a11yPlugin]);

const Highlight = ({
  color,
  children,
}: PropsWithChildren & { color: string }) => {
  // example
  const textColor = colord("#fff").isReadable(color, {
    level: "AA",
    size: "large",
  })
    ? "#fff"
    : "#334155"; // hex code for slate 700

  return (
    <span
      className=" inline-block text-xs font-semibold mx-1 px-2.5 py-0.5 rounded"
      style={{ backgroundColor: color, color: textColor }}
    >
      {children}
    </span>
  );
};

export default Highlight;
