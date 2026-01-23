"use client";

import { Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { TrendingUp } from "lucide-react";

const chartConfig = {
  listings: {
    label: "Listings",
  },
  realestate: {
    label: "Real Estate",
    color: "var(--chart-1)",
  },
  restaurants: {
    label: "Restaurants",
    color: "var(--chart-2)",
  },
  services: {
    label: "Services",
    color: "var(--chart-3)",
  },
  automotive: {
    label: "Automotive",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

const chartData = [
  { category: "realestate", listings: 450, fill: "var(--color-realestate)" },
  { category: "restaurants", listings: 380, fill: "var(--color-restaurants)" },
  { category: "services", listings: 290, fill: "var(--color-services)" },
  { category: "automotive", listings: 120, fill: "var(--color-automotive)" },
  { category: "other", listings: 95, fill: "var(--color-other)" },
];

const AppPieChart = () => {

  // If you don't use React compiler use useMemo hook to improve performance
  const totalListings = chartData.reduce((acc, curr) => acc + curr.listings, 0);

  return (
    <div className="">
      <h1 className="text-lg font-medium mb-6">Category Distribution</h1>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="listings"
            nameKey="category"
            innerRadius={60}
            strokeWidth={5}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {totalListings.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Listings
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="mt-4 flex flex-col gap-2 items-center">
        <div className="flex items-center gap-2 font-medium leading-none">
          Growing by 12% this month <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total listings across all categories
        </div>
      </div>
    </div>
  );
};

export default AppPieChart;
