import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Briefcase, Star } from "lucide-react";

const TopStudentsCard = () => {
  const topStudents = [
    { name: "Nguyễn Văn A", jobs: 45, rating: 4.9, earnings: "₫12.5M" },
    { name: "Trần Thị B", jobs: 38, rating: 4.8, earnings: "₫10.2M" },
    { name: "Lê Văn C", jobs: 32, rating: 4.7, earnings: "₫9.8M" },
    { name: "Phạm Thị D", jobs: 28, rating: 4.9, earnings: "₫8.5M" },
    { name: "Hoàng Văn E", jobs: 25, rating: 4.6, earnings: "₫7.9M" },
  ];

  return (
    <Card className="border-slate-200 bg-white">
      <CardHeader>
        <CardTitle className="text-slate-900">Top sinh viên xuất sắc</CardTitle>
        <CardDescription>Sinh viên có hiệu suất làm việc cao nhất</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topStudents.map((student, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border border-slate-200 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-100 to-pink-100 font-bold text-cyan-700">
                  #{index + 1}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{student.name}</p>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-3 w-3" />
                      {student.jobs} việc
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                      {student.rating}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-emerald-600">{student.earnings}</p>
                <p className="text-xs text-slate-500">Thu nhập</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopStudentsCard;
