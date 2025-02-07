import { usePrefecturesSelector } from "@/domain/prefecture/hooks/use-prefectures-selector";
import { zip } from "es-toolkit";
import { useEffect, useMemo } from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { usePopulations } from "../../api";

type PopulationsData = ReturnType<typeof usePopulations>["data"];

type ChartData = {
  year: number;
  [key: PropertyKey]: number;
};

export type Props = {
  populationType: string;
};

export function PopulationChart({ populationType }: Props) {
  const {
    selectedPrefectureCodes,
    selectedPrefectures,
    setSelectedPrefectureCodes,
  } = usePrefecturesSelector();
  const { data: prefectures, error } = usePopulations(selectedPrefectureCodes);

  const data = useMemo(
    () => convertPopulationsDataToChartData(prefectures, populationType),
    [prefectures, populationType],
  );

  const fetchedPrefectures = selectedPrefectures.filter(({ prefCode }) =>
    prefectures.some((d) => d.prefCode === prefCode),
  );

  useEffect(() => {
    setSelectedPrefectureCodes((prev) =>
      prev.filter((code) => !error.some((e) => e.prefCode === code)),
    );
  }, [error, setSelectedPrefectureCodes]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        margin={{
          top: 5,
          left: 20,
          right: 20,
          bottom: 5,
        }}
        data={data}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" height={50}>
          <Label value="年度" position="insideBottom" />
        </XAxis>
        <YAxis width={100}>
          <Label value="人口数" angle={-90} position="insideLeft" />
        </YAxis>
        <Tooltip />
        <Legend verticalAlign="top" />
        {fetchedPrefectures.map(({ prefCode, prefName }) => (
          <Line
            key={prefCode}
            type="monotone"
            dataKey={prefCode}
            name={prefName}
            stroke={selectPrefectureColor(prefCode)}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

function convertPopulationsDataToChartData(
  populations: PopulationsData,
  populationType: string,
): ChartData[] {
  const prefCodes = populations.map((d) => d.prefCode);
  const years =
    populations[0]?.data.data
      .find((d) => d.label === populationType)
      ?.data.map((d) => d.year) ?? [];
  return years.map((year) => {
    const data = populations.map((d) => {
      const population = d.data.data.find((d) => d.label === populationType);
      return population?.data.find((d) => d.year === year)?.value ?? 0;
    });
    return { year, ...Object.fromEntries(zip(prefCodes, data)) };
  });
}

function selectPrefectureColor(prefCode: number) {
  const hue = (prefCode - 1) * (360 / 47);

  const saturation = 70;
  const lightness = 50;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
