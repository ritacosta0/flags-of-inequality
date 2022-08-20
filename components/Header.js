import React, { useEffect, useRef, useState } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import * as Warp from "warpjs";
import TextPath from "./TextPath";
import { RAINBOW_COLORS } from "../constants";

export default function Header() {
  const titleWrapper = useRef();
  const title = useRef();
  const [titleWidth, setTitleWidth] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  useEffect(() => {
    setIsLargeScreen(window.innerWidth > 700);
  }, []);

  useEffect(() => {
    setTitleWidth(titleWrapper.current?.clientWidth);
  }, [titleWrapper]);

  useEffect(() => {
    const svg = title.current;
    const warp = new Warp(svg);

    warp.interpolate(2);
    warp.transform(([x, y]) => [x, y, y]);

    let offset = 0;
    function animate() {
      warp.transform(([x, y, oy]) => [
        x,
        oy + 4 * Math.sin(x / 28 + offset),
        oy,
      ]);
      offset += 0.1;
      requestAnimationFrame(animate);
    }

    animate();
    title.current = svg;
  }, [title, isLargeScreen]);

  return (
    <div className="flex flex-col justify-center h-screen ">
      <div className="w-10/12 mx-auto md:w-8/12" ref={titleWrapper}>
        <svg width={titleWidth} className="h-[30vh]" ref={title}>
          <defs>
            <linearGradient id="rainbow">
              {RAINBOW_COLORS.reverse().map((color, index) => (
                <stop
                  key={index}
                  offset={`${(100 / RAINBOW_COLORS.length) * index}%`}
                  stopColor={color}
                />
              ))}
            </linearGradient>
          </defs>
          <g transform={`translate(0,${titleWidth * 0.1})`}>
            <TextPath
              width={title}
              fill="transparent"
              stroke="white"
              strokeWidth={2}
              strokeOpacity={0.3}
              isLargeScreen={isLargeScreen}
            />
            <TextPath
              width={title}
              fill="transparent"
              stroke="url(#rainbow)"
              strokeWidth={2}
              isLargeScreen={isLargeScreen}
            />
          </g>

          {/* <Text
            y={10}
            width={titleWidth}
            scaleToFit={true}
            verticalAnchor="start"
            fill="white"
          >
            Flags of Inequality
          </Text> */}
        </svg>
      </div>
      <p className="mt-10 text-lg text-center text-slate-300">
        <span className="font-bold">
          If countries had equal rights for their LGBTQ+ citizens, this
          visualization would not exist
        </span>
        . We make use of the rainbow flag to portray to what extent different
        dimensions of queer life are disregarded by state regulations.
      </p>
      <div className="mx-auto my-12 text-center">
        <ArrowDownwardIcon className=" fill-slate-400" />
      </div>
    </div>
  );
}
