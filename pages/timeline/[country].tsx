import LinkIcon from "@mui/icons-material/Link";
import Box from "@mui/material/Box";
import { flag } from "country-emoji";
import { useEffect, useMemo, useState } from "react";

import Flag from "@/components/Flag";
import Legend from "@/components/Legend";
import RainbowLink from "@/components/RainbowLink";
import { getData } from "@/data";
import { useFlagDimensions } from "@/hooks/useFlagDimensions";
import { nth } from "@/utils";
import { ArrowBack } from "@mui/icons-material";
import { uniq } from "lodash";
import Head from "next/head";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function Timeline({ country }: { country: string }) {
  const [isVertical, setIsVertical] = useState(false);
  const data = useMemo(
    () => getData({ countries: country ? [country as string] : undefined }),
    [country]
  );
  const years = data.map((d) => d.year).sort();
  const [flagsContainer, flagDimensions] = useFlagDimensions(
    isVertical ? 1 : years.length,
    isVertical ? (containerWidth) => containerWidth * 0.8 : undefined
  );

  const url = data.find((d) => d.year === 2024)?.url;

  useEffect(() => {
    const handleResize = () => {
      setIsVertical(window.innerWidth < window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!country || data.length === 0) {
    return notFound();
  }

  return (
    <div className={`w-full mx-auto ${isVertical ? "mt-4" : "mt-[30vh]"}`}>
      <Head>
        <title>{`${country ?? "Loading"} - Flags of Inequality`}</title>
      </Head>
      <Link
        href="/#flags"
        className="font-medium cursor-pointer text-slate-300 hover:text-slate-100"
        aria-label="Press to go back to main page."
        tabIndex={0}
      >
        <ArrowBack /> Back
      </Link>
      <h2 className="mt-8 text-4xl font-medium " tabIndex={0}>{`${
        flag(country) || ""
      } ${country}`}</h2>
      <h2 className="sr-only">{`Timeline of ${country} from 2015 to 2024`}</h2>
      <div className="my-4 cursor-pointer text-slate-400 hover:text-slate-300">
        <RainbowLink href={url} target="_blank">
          <LinkIcon />
          <span className="ml-1 ">{`Read more on Rainbow Data 2024`}</span>
        </RainbowLink>
      </div>
      <div
        className={`flex ${
          isVertical ? "flex-col-reverse" : "flex-row"
        }  gap-4 mt-10`}
        ref={flagsContainer}
      >
        {years.map((year) => (
          <div
            key={`${country}-${year}`}
            className={`flex ${isVertical ? "flex-row" : "flex-col"} gap-4`}
          >
            <Box
              sx={{
                width: isVertical
                  ? flagDimensions.height
                  : flagDimensions.width,
                height: isVertical
                  ? flagDimensions.width
                  : flagDimensions.height,
              }}
            >
              <Flag
                country={country}
                year={year}
                isTimeline={true}
                orientation={isVertical ? "vertical" : "horizontal"}
              />
            </Box>
            <div className="flex gap-2 ">
              <h3 aria-hidden>
                {" "}
                {year}{" "}
                <span className="text-slate-400">{` | ${nth(
                  data.find((d) => d.year === year)?.ranking
                )}`}</span>
              </h3>
              <h3></h3>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-20">
        <Legend />
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const data = getData({});
  const countries = uniq(data.map((d) => d.country));

  const paths = countries.map((country) => ({
    params: { country },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({
  params,
}: {
  params: { country: string };
}) {
  return {
    props: {
      country: params.country,
    },
  };
}
