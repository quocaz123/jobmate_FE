import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Users, Briefcase, TrendingUp, DollarSign, CheckCircle } from "lucide-react";

const OverviewStats = () => {
  const overviewStats = [
    {
      title: "Tổng doanh thu",
      value: "₫542.8M",
      change: "+18.7%",
      icon: DollarSign,
      color: "text-emerald-600",
    },
    {
      title: "Người dùng hoạt động",
      value: "8,234",
      change: "+12.3%",
      icon: Users,
      color: "text-cyan-600",
    },
    {
      title: "Công việc hoàn thành",
      value: "3,847",
      change: "+23.1%",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Tỷ lệ thành công",
      value: "87.3%",
      change: "+2.4%",
      icon: TrendingUp,
      color: "text-pink-600",
    },
  ];

  return (
    <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {overviewStats.map((stat, index) => (
        <Card key={index} className="border-slate-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            <p className={`text-xs ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
              {stat.change} so với kỳ trước
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OverviewStats;
