import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { Pie, PieChart, Cell, ResponsiveContainer } from 'recharts';

const chartData = [
    { name: 'Academic', value: 40, color: '#10B981' },
    { name: 'Behavioural', value: 30, color: '#0E76A8' },
    { name: 'Special Features', value: 20, color: '#F59E0B' },
    { name: 'Social', value: 10, color: '#8B5CF6' },
];

const chartConfig = {
    academic: {
        label: 'Academic',
        color: '#10B981',
    },
    behavioural: {
        label: 'Behavioural',
        color: '#0E76A8',
    },
    specialFeatures: {
        label: 'Special Features',
        color: '#F59E0B',
    },
    social: {
        label: 'Social',
        color: '#8B5CF6',
    },
} satisfies ChartConfig;

export function DistrictStats() {
    return (
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle className="text-md font-medium">Districts wide Statistics</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 gap-4">
                 
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                        
                        <div className="flex items-center space-x-2 min-w-[110px]">
                            <div className="h-6 w-14 rounded-md bg-emerald-500" />
                            <span className="text-sm">Academic</span>
                        </div>
                        <div className="flex items-center space-x-2 min-w-[110px]">
                            <div className="h-6 w-14 rounded-md bg-blue-600" />
                            <span className="text-sm">Behavioural</span>
                        </div>
                        <div className="flex items-center space-x-2 min-w-[110px]">
                            <div className="h-6 w-14 rounded-md bg-amber-500" />
                            <span className="text-sm">Special Features</span>
                        </div>
                        <div className="flex items-center space-x-2 min-w-[110px]">
                            <div className="h-6 w-14 rounded-md bg-purple-500" />
                            <span className="text-sm">Social</span>
                        </div>
                    </div>

                    {/* Pie chart container */}
                    <div className="h-48 sm:h-56 md:h-64 w-full max-w-md mx-auto">
                        <ChartContainer config={chartConfig}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={40}  // smaller inner radius for smaller containers
                                        outerRadius={60}  // smaller outer radius
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                </PieChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </div>
                </div>

                <div className="mt-4 text-center">
                    <h3 className="font-semibold">Academic</h3>
                    <p className="text-xs text-gray-500">High Risk 560</p>
                </div>
            </CardContent>

        </Card>
    );
}
