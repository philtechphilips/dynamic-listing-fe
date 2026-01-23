"use client";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

const chartConfig = {
  views: {
    label: "Page Views",
    color: "var(--chart-2)",
  },
  searches: {
    label: "Direct Searches",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const chartData = [
  { month: "January", views: 1860, searches: 800 },
  { month: "February", views: 3050, searches: 2000 },
  { month: "March", views: 2370, searches: 1200 },
  { month: "April", views: 7300, searches: 1900 },
  { month: "May", views: 2090, searches: 1300 },
  { month: "June", views: 2140, searches: 1400 },
];

const AppAreaChart = () => {
  return (
    <div className="">
      <h1 className="text-lg font-medium mb-6">Traffic Analysis</h1>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <AreaChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis tickLine={false} tickMargin={10} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <defs>
            <linearGradient id="fillViews" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-views)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-views)"
                stopOpacity={0.1}
              />
            </linearGradient>
            <linearGradient id="fillSearches" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-searches)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-searches)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <Area
            dataKey="searches"
            type="natural"
            fill="url(#fillSearches)"
            fillOpacity={0.4}
            stroke="var(--color-searches)"
            stackId="a"
          />
          <Area
            dataKey="views"
            type="natural"
            fill="url(#fillViews)"
            fillOpacity={0.4}
            stroke="var(--color-views)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
};

export default AppAreaChart;
