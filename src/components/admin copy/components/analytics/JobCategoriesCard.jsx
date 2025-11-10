import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card";

const JobCategoriesCard = () => {
  const jobCategories = [
    { name: "Nhà hàng/Quán ăn", count: 1247, percentage: 32 },
    { name: "Gia sư", count: 892, percentage: 23 },
    { name: "Bán hàng", count: 654, percentage: 17 },
    { name: "Văn phòng", count: 478, percentage: 12 },
    { name: "Khác", count: 623, percentage: 16 },
  ];

  return (
    <Card className="border-slate-200 bg-white">
      <CardHeader>
        <CardTitle className="text-slate-900">Phân loại công việc</CardTitle>
        <CardDescription>Thống kê theo ngành nghề</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {jobCategories.map((category, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-900">{category.name}</span>
                <span className="text-slate-600">
                  {category.count} việc ({category.percentage}%)
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-pink-500"
                  style={{ width: `${category.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCategoriesCard;
