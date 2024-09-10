import Flag from "@/components/Flag";
import { getData } from "@/data";
import { useFlagDimensions } from "@/hooks/useFlagDimensions";
import { nth } from "@/utils";
import { $FixMe } from "@/utils/defs";
import { flag } from "country-emoji";
import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo } from "react";
import { useControlsStore } from "./Controls";

export default function Grid() {
  const { year, selectedSort } = useControlsStore();
  const order = useControlsStore((state) => state.sort[state.selectedSort]);
  const [flagsContainer, flagDimensions] = useFlagDimensions();

  const data = useMemo(
    () =>
      getData({
        years: [year],
        sortingParams: {
          ascending: order === "ascending",
          type: selectedSort === "ranking" ? "ranking" : "country",
        },
      }),
    [year, order, selectedSort]
  );

  const countries = useMemo(() => data.map((d) => d.country), [data]);

  return (
    <div
      className="flex flex-row flex-wrap justify-center gap-x-10 gap-y-20"
      ref={flagsContainer as $FixMe}
      aria-label={`Showing data from ${year}. Countries are sorted ${
        selectedSort === "alphabetical" ? "alphabetically" : "by global ranking"
      } and in ${{ order }} order.`}
      tabIndex={0}
    >
      {countries.map((country) => {
        return (
          <motion.div key={country} className="mt-4" layout>
            <Link href={`/timeline/${encodeURIComponent(country)}`}>
              <motion.div
                style={{
                  ...flagDimensions,
                  cursor: "pointer",
                }}
              >
                <Flag country={country} year={year} isTimeline={false} />
                <div className="flex gap-2 mt-2">
                  <h3 className="font-medium" aria-hidden>
                    {`${flag(country) || ""} ${country}`}{" "}
                    <span className="text-slate-400">{` | ${nth(
                      data.find((d) => d.country === country && d.year === year)
                        ?.ranking
                    )}`}</span>
                  </h3>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
