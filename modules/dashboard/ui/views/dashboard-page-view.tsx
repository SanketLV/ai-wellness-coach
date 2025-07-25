"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { MenuIcon, PanelLeftCloseIcon } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

interface MetricData {
  date: string;
  value: number;
}

export default function DashboardPage() {
  const { toggleSidebar, isMobile } = useSidebar();

  const [sleepData, setSleepData] = useState<MetricData[] | null>(null);
  const [stepsData, setStepsData] = useState<MetricData[] | null>(null);

  useEffect(() => {
    // Simulated dummy sleep and step data for past 7 days
    const dummySleepData = [
      { date: "07-18", value: 7.2 },
      { date: "07-19", value: 6.5 },
      { date: "07-20", value: 8.1 },
      { date: "07-21", value: 6.9 },
      { date: "07-22", value: 7.0 },
      { date: "07-23", value: 6.7 },
      { date: "07-24", value: 7.4 },
    ];

    const dummyStepsData = [
      { date: "07-18", value: 8320 },
      { date: "07-19", value: 10120 },
      { date: "07-20", value: 9270 },
      { date: "07-21", value: 11030 },
      { date: "07-22", value: 9800 },
      { date: "07-23", value: 10540 },
      { date: "07-24", value: 10230 },
    ];

    setSleepData(dummySleepData);
    setStepsData(dummyStepsData);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        {isMobile ? (
          <MenuIcon className="size-6" onClick={toggleSidebar} />
        ) : (
          <PanelLeftCloseIcon
            className="size-6 cursor-pointer"
            onClick={toggleSidebar}
          />
        )}
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sleep (hrs)</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            {sleepData ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sleepData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <Skeleton className="w-full h-full" />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Steps</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            {stepsData ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stepsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <Skeleton className="w-full h-full" />
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Today’s Stats</CardTitle>
          </CardHeader>
          <CardContent className="h-20">
            {/* Placeholder - Populate from API */}
            <p className="text-xl font-semibold">7 hrs sleep, 10,230 steps</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Average</CardTitle>
          </CardHeader>
          <CardContent className="h-20">
            <p className="text-xl font-semibold">6.8 hrs sleep, 9,210 steps</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Streak</CardTitle>
          </CardHeader>
          <CardContent className="h-20">
            <p className="text-xl font-semibold">5 days</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="flex items-center space-x-4 p-6">
          <span className="text-2xl">😊</span>
          <p className="text-lg font-medium">Feeling energetic and positive</p>
        </CardContent>
      </Card>
    </div>
  );
}
