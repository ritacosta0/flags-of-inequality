import styles from "./RainbowLink.module.css";

const RainbowLink = ({
  children,
  className,
  ...props
}: React.HTMLProps<HTMLAnchorElement>) => (
  <a
    className={`${styles.rainbowUnderline} underline hover:no-underline underline-offset-2 mx-1 duration-200 hover:text-slate-100 ${className}`}
    {...props}
  >
    {children}
  </a>
);

export default RainbowLink;
