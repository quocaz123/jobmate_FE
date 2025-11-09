import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card";
import { MapPin } from "lucide-react";

const LocationStatsCard = () => {
  const locationStats = [
    { district: "Quận 1", jobs: 487, students: 1234 },
    { district: "Quận 3", jobs: 423, students: 1089 },
    { district: "Quận 5", jobs: 356, students: 892 },
    { district: "Quận 7", jobs: 298, students: 756 },
    { district: "Quận 10", jobs: 267, students: 678 },
  ];

  return (
    <Card className="border-slate-200 bg-white">
      <CardHeader>
        <CardTitle className="text-slate-900">Thống kê theo khu vực</CardTitle>
        <CardDescription>Phân bố công việc và sinh viên theo quận</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {locationStats.map((location, index) => (
            <div key={index} className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-100 to-blue-100">
                  <MapPin className="h-5 w-5 text-cyan-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{location.district}</p>
                  <p className="text-sm text-slate-600">TP. Hồ Chí Minh</p>
                </div>
              </div>
              <div className="flex gap-8 text-sm">
                <div className="text-right">
                  <p className="font-bold text-cyan-600">{location.jobs}</p>
                  <p className="text-xs text-slate-500">Công việc</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-purple-600">{location.students}</p>
                  <p className="text-xs text-slate-500">Sinh viên</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationStatsCard;
