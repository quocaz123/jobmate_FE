import React from 'react'
import Sidebar from '../components/Sidebar'
import StatisticsHeader from '../components/StatisticsHeader'
import MetricsCards from '../components/MetricsCards'
import TopJobsSection from '../components/TopJobsSection'
import RecentActivitySection from '../components/RecentActivitySection'
import DetailedAnalysisSection from '../components/DetailedAnalysisSection'

const Statistics = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Statistics Header */}
            <StatisticsHeader />
            
            {/* Metrics Cards */}
            <div className="mb-8">
              <MetricsCards />
            </div>
            
            {/* Top Jobs and Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <TopJobsSection />
              <RecentActivitySection />
            </div>
            
            {/* Detailed Analysis */}
            <DetailedAnalysisSection />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statistics
