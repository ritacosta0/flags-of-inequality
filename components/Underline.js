const Underline = ({ color, children }) => (
  <span
    className="mx-1 font-bold underline"
    style={{ textDecorationColor: color }}
  >
    {children}
  </span>
);

export default Underline;
