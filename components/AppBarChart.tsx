"use client";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  added: {
    label: "Added",
    color: "var(--chart-1)",
  },
  published: {
    label: "Published",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const chartData = [
  { month: "January", added: 120, published: 80 },
  { month: "February", added: 210, published: 150 },
  { month: "March", added: 180, published: 120 },
  { month: "April", added: 250, published: 200 },
  { month: "May", added: 300, published: 240 },
  { month: "June", added: 350, published: 310 },
];

const AppBarChart = () => {
  return (
    <div className="">
      <h1 className="text-lg font-medium mb-6">Listings Growth</h1>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData}>
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
          <Bar dataKey="added" fill="var(--color-added)" radius={4} />
          <Bar dataKey="published" fill="var(--color-published)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default AppBarChart;
