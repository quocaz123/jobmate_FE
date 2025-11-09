import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select";

const AnalyticsHeader = () => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Thống kê & Phân tích</h1>
        <p className="text-sm text-slate-600">Báo cáo chi tiết về hoạt động hệ thống</p>
      </div>
      <Select defaultValue="30days">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Chọn khoảng thời gian" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="7days">7 ngày qua</SelectItem>
          <SelectItem value="30days">30 ngày qua</SelectItem>
          <SelectItem value="90days">90 ngày qua</SelectItem>
          <SelectItem value="year">Năm nay</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default AnalyticsHeader;
