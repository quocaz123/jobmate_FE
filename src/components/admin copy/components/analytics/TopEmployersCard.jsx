import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Briefcase, Star } from "lucide-react";

const TopEmployersCard = () => {
  const topEmployers = [
    { name: "Nhà hàng Italia", jobs: 125, rating: 4.8, spent: "₫45.2M" },
    { name: "Trung tâm gia sư ABC", jobs: 98, rating: 4.9, spent: "₫38.7M" },
    { name: "Siêu thị XYZ", jobs: 87, rating: 4.5, spent: "₫32.1M" },
    { name: "Công ty TNHH DEF", jobs: 76, rating: 4.7, spent: "₫28.9M" },
    { name: "Cửa hàng GHI", jobs: 65, rating: 4.6, spent: "₫24.3M" },
  ];

  return (
    <Card className="border-slate-200 bg-white">
      <CardHeader>
        <CardTitle className="text-slate-900">Top nhà tuyển dụng</CardTitle>
        <CardDescription>Nhà tuyển dụng đăng tin nhiều nhất</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topEmployers.map((employer, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border border-slate-200 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-pink-100 font-bold text-purple-700">
                  #{index + 1}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{employer.name}</p>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-3 w-3" />
                      {employer.jobs} tin
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                      {employer.rating}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-cyan-600">{employer.spent}</p>
                <p className="text-xs text-slate-500">Chi tiêu</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopEmployersCard;
