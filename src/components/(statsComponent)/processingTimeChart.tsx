import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChartConfig, ChartContainer, } from '@/components/ui/chart';
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';



const chartConfig = {
    volume: {
        label: 'Processing Volume',
        color: '#0D5A8A',
    },
    average: {
        label: 'Average processiong time',
        color: '#F59E0B',
    },
} satisfies ChartConfig;

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:text-black p-4 shadow-lg rounded-md border border-gray-200">
                <p className="font-bold text-center mb-2">{label}</p>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                        <span className="">Average price</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-700"></div>
                        <span>Sales Volume</span>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

const formatYAxisTick = (value: number) => {
    if (value === 0) return '0';
    return `${value}k`;
};


export interface RefData {
  completion_percent: number;
  recent_completion_percent: number;
  average_processing_time: string;  
  recent_average_processing_time: string; 
  total_schools: number;
  average_replies_per_referral: number;
}


interface ProcessingTimeChartProps {
  data: RefData | null;
}

export function ProcessingTimeChart({data} : ProcessingTimeChartProps ) {
  const [activeTimeframe, setActiveTimeframe] = useState("1W");



 const chartData =
  data
    ? [
        {
          label: "Completion %",
          volume: data.completion_percent,
          average: data.recent_completion_percent,
        },
        {
          label: "Processing Time (s)",
          volume: parseFloat(data.average_processing_time?.split(":").pop() ?? "0"),
          average: parseFloat(
            data.recent_average_processing_time?.split(":").pop() ?? "0"
          ),
        },
        {
          label: "Replies per Referral",
          volume: data.average_replies_per_referral,
          average: data.average_replies_per_referral,
        },
        {
          label: "Schools",
          volume: data.total_schools,
          average: data.total_schools,
        },
      ]
    : [];


  return (
    <Card className="w-full p-3 border">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2">
        <CardTitle className="text-md font-medium mb-2 sm:mb-0">
          Referral Processing time
        </CardTitle>
        <div className="flex space-x-2">
          {["1W", "3M", "6M", "1Y"].map((timeframe) => (
            <Button
              key={timeframe}
              size="sm"
              variant={activeTimeframe === timeframe ? "default" : "outline"}
              className={`h-7 px-3 hover:bg-blue-700 hover:text-white ${
                activeTimeframe === timeframe
                  ? "bg-blue-800 text-white"
                  : "text-blue-800 border-blue-800"
              }`}
              onClick={() => setActiveTimeframe(timeframe)}
            >
              {timeframe}
            </Button>
          ))}
        </div>
      </CardHeader>

      <p className="font-bold my-3">Metrics</p>
      <CardContent className="md:border dark:text-white border-gray-200 px-0 py-3 rounded-lg">
        <ChartContainer config={chartConfig} className="h-72 w-full max-w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="label" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="volume"
                name="Value"
                stroke="#0D5A8A"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="average"
                name="Recent Value"
                stroke="#F59E0B"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
