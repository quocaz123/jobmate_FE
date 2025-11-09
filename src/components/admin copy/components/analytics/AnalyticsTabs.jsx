import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs";
import TopStudentsCard from './TopStudentsCard';
import TopEmployersCard from './TopEmployersCard';
import JobCategoriesCard from './JobCategoriesCard';
import LocationStatsCard from './LocationStatsCard';

const AnalyticsTabs = () => {
  return (
    <Tabs defaultValue="users" className="space-y-6">
      <TabsList className="bg-white">
        <TabsTrigger value="users">Người dùng</TabsTrigger>
        <TabsTrigger value="jobs">Công việc</TabsTrigger>
        <TabsTrigger value="locations">Khu vực</TabsTrigger>
      </TabsList>

      {/* Users Tab */}
      <TabsContent value="users" className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <TopStudentsCard />
          <TopEmployersCard />
        </div>
      </TabsContent>

      {/* Jobs Tab */}
      <TabsContent value="jobs">
        <JobCategoriesCard />
      </TabsContent>

      {/* Locations Tab */}
      <TabsContent value="locations">
        <LocationStatsCard />
      </TabsContent>
    </Tabs>
  );
};

export default AnalyticsTabs;
