import React from 'react';
import Card from './Card';

const StatsCard = ({ title, value, change, timeAgo, status, icon }) => {
  return (
    <Card className="relative overflow-hidden">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
        </div>

        {icon ? (
          <div className="text-gray-300 ml-4">{icon}</div>
        ) : null}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div>{timeAgo}</div>
        <div className={`font-medium ${change && change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;
