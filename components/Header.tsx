import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Text } from "@visx/text";
import { isNull, isUndefined } from "lodash";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useIntersection } from "react-use";
import { twMerge } from "tailwind-merge";
// @ts-expect-error - Warpjs is not typed
import * as Warp from "warpjs";
import { RAINBOW_COLORS } from "../constants";
import RainbowLink from "@/components/RainbowLink";
import TextPath from "@/components/TextPath";
import OutlineButton from "./OutlineButton";

export default function Header({ type }: { type: "main" | "expo" }) {
  const titleWrapper = useRef<HTMLDivElement | null>(null);
  const title = useRef<SVGSVGElement | null>(null);
  const [titleWidth, setTitleWidth] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  const intersection = useIntersection(titleWrapper, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 860);
      if (titleWrapper.current === null) return;
      setTitleWidth(titleWrapper.current?.clientWidth);
    };
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [titleWrapper]);

  useEffect(() => {
    const svg = title.current;
    if (isUndefined(svg) || isNull(svg)) return;
    const warp = new Warp(svg);

    warp.interpolate(2);
    warp.transform(([x, y]: [number, number]) => [x, y, y]);

    let offset = 0;
    function animate() {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      warp.transform(([x, y, oy]: [number, number, number]) => [
        x,
        oy + 4 * Math.sin(x / 28 + offset),
        oy,
      ]);
      offset += 0.1;
      requestAnimationFrame(animate);
    }

    animate();
    title.current = svg;
  }, [title, isLargeScreen, intersection]);

  return (
    <div className="flex flex-col justify-center h-screen ">
      <div className="w-full mx-auto xl:w-10/12" ref={titleWrapper}>
        {intersection?.isIntersecting && (
          <svg width={titleWidth} className="h-[20vh]" ref={title} aria-hidden>
            <defs>
              <linearGradient id="rainbow">
                {RAINBOW_COLORS.map((color, index) => (
                  <stop
                    key={index}
                    offset={`${(100 / RAINBOW_COLORS.length) * index}%`}
                    stopColor={color}
                  />
                ))}
              </linearGradient>
            </defs>
            <g transform={`translate(0,${titleWidth * 0})`}>
              <TextPath
                width={title.current?.clientWidth}
                fill="transparent"
                stroke="white"
                strokeWidth={2}
                strokeOpacity={0.3}
                isLargeScreen={isLargeScreen}
              />
              <TextPath
                width={title.current?.clientWidth}
                fill="transparent"
                stroke="url(#rainbow)"
                strokeWidth={2}
                isLargeScreen={isLargeScreen}
              />
            </g>
            <Text
              y={10}
              width={titleWidth}
              scaleToFit={true}
              verticalAnchor="start"
              fill="transparent"
            >
              Flags of Inequality
            </Text>
          </svg>
        )}
      </div>
      <h1 className="sr-only" tabIndex={0}>
        Flags of Inequality
      </h1>
      <p
        className={twMerge(
          "mt-10 text-sm text-center md:text-base lg:text-lg text-slate-300",
          type === "expo" && "w-10/12 mx-auto"
        )}
        tabIndex={0}
      >
        <span className="font-bold">
          If countries had equal rights for their LGBTQ+ citizens this
          visualization would not exist.
        </span>
        {type === "expo" && <br />} We make use of the rainbow flag to portray
        to what extent different dimensions of queer life are disregarded by
        state regulations.
      </p>
      <p
        className="m-5 text-xs text-center md:text-sm text-slate-300"
        tabIndex={0}
      >
        By
        <RainbowLink>Rita Costa</RainbowLink>
        and
        <RainbowLink href="https://twitter.com/biased_bia">
          Beatriz Malveiro
        </RainbowLink>
      </p>
      {type === "expo" && (
        <div className="mx-auto text-center">
          <Link href="expo/grid">
            <OutlineButton
              className="w-full py-2 my-1 text-left lg:w-fit lg:ml-4 h-fit"
              variant="outlined"
              size="small"
            >
              Grid
            </OutlineButton>
          </Link>
          <Link href="expo/singleflag">
            <OutlineButton
              className="w-full py-2 my-1 text-left lg:w-fit lg:ml-4 h-fit"
              variant="outlined"
              size="small"
            >
              Single flag
            </OutlineButton>
          </Link>
        </div>
      )}
      {type === "main" && (
        <div className="mx-auto my-12 text-center">
          <ArrowDownwardIcon className=" fill-slate-400 animate-bounce" />
        </div>
      )}
    </div>
  );
}
