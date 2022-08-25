import styles from "./RainbowLink.module.css";

const RainbowLink = ({ children, ...props }) => (
  <a
    {...props}
    className={`${styles.rainbowUnderline} underline hover:no-underline underline-offset-2 hover:text-slate-100 mx-1 duration-200`}
  >
    {children}
  </a>
);

export default RainbowLink;
