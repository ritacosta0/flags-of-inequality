import { PropsWithChildren } from "react";

const Underline = ({
  color,
  children,
}: {
  color: string;
} & PropsWithChildren) => (
  <span
    className="mx-1 font-bold underline"
    style={{ textDecorationColor: color }}
  >
    {children}
  </span>
);

export default Underline;
