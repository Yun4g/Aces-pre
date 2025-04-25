import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    ChartConfig,
    ChartContainer,
} from '@/components/ui/chart';
import {
    Line,
    LineChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    TooltipProps
} from 'recharts';

const chartData = [
    { month: 'Jan', volume: 15, average: 20 },
    { month: 'Feb', volume: 22, average: 25 },
    { month: 'Feb', volume: 25, average: 35 },
    { month: 'Mar', volume: 35, average: 25 },
    { month: 'Mar', volume: 40, average: 35 },
    { month: 'Apr', volume: 45, average: 40 },
    { month: 'Apr', volume: 40, average: 45 },
    { month: 'May', volume: 40, average: 50 },
    { month: 'May', volume: 35, average: 45 },
    { month: 'Jun', volume: 50, average: 45 },
    { month: 'Jun', volume: 45, average: 40 },
    { month: 'Jul', volume: 60, average: 50 },
    { month: 'Jul', volume: 50, average: 45 },
];

const chartConfig = {
    volume: {
        label: 'Sales Volume',
        color: '#0D5A8A',
    },
    average: {
        label: 'Average price',
        color: '#F59E0B',
    },
} satisfies ChartConfig;

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-4 shadow-lg rounded-md border border-gray-200">
                <p className="font-bold text-center mb-2">{label}</p>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                        <span>Average price</span>
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

export function ProcessingTimeChart() {
    const [activeTimeframe, setActiveTimeframe] = useState('1W');

    return (
        <Card className=" w-full p-3">
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2">
                <CardTitle className="text-md font-medium mb-2 sm:mb-0">Referral Processing time</CardTitle>
                <div className="flex space-x-2">
                    {['1W', '3M', '6M', '1Y'].map((timeframe) => (
                        <Button
                            key={timeframe}
                            size="sm"
                            variant={activeTimeframe === timeframe ? "default" : "outline"}
                            className={`h-7 px-3 ${activeTimeframe === timeframe ? 'bg-blue-800 text-white' : 'text-blue-800 border-blue-800'}`}
                            onClick={() => setActiveTimeframe(timeframe)}
                        >
                            {timeframe}
                        </Button>
                    ))}
                </div>
            </CardHeader>

            <p className='font-bold my-3'>Hours</p>
            <CardContent className='border dark:text-white border-gray-200 py-3 rounded-lg'>
                <ChartContainer config={chartConfig} className="h-[300px]   w-[300px] lg:w-[700px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={chartData}
                            margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis
                                dataKey="month"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#666', fontSize: 12 }}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#666', fontSize: 12 }}
                                tickFormatter={formatYAxisTick}
                                domain={[0, 100]}
                                ticks={[0, 20, 40, 60, 80, 100]}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Line
                                type="monotone"
                                dataKey="volume"
                                name="Sales Volume"
                                stroke="#0D5A8A"
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 6, strokeWidth: 2 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="average"
                                name="Average price"
                                stroke="#F59E0B"
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 6, strokeWidth: 2 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
