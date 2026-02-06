"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";

const chartData = [
  { month: "January", newUsers: 450, activeUsers: 1200 },
  { month: "February", newUsers: 520, activeUsers: 1400 },
  { month: "March", newUsers: 480, activeUsers: 1350 },
  { month: "April", newUsers: 610, activeUsers: 1600 },
  { month: "May", newUsers: 750, activeUsers: 1900 },
  { month: "June", newUsers: 820, activeUsers: 2100 },
];
const chartConfig = {
  newUsers: {
    label: "New Users",
    color: "var(--chart-1)",
  },
  activeUsers: {
    label: "Active Users",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const AppLineChart = () => {
  return (
    <div className="">
      <h1 className="text-lg font-medium mb-6">User Growth & Engagement</h1>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Line
            dataKey="newUsers"
            type="monotone"
            stroke="var(--color-newUsers)"
            strokeWidth={2}
            dot={false}
          />
          <Line
            dataKey="activeUsers"
            type="monotone"
            stroke="var(--color-activeUsers)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
};

export default AppLineChart;
