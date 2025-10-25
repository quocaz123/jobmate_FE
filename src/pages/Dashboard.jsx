import React from 'react'
import Sidebar from '../components/Sidebar'
import JobPostingOverviewStats from '../components/JobPostingOverviewStats'
import NotificationBell from '../components/NotificationBell'
import JobPostingsListSection from '../components/JobPostingsListSection'

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Top Bar with Notification Bell */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-end">
          <NotificationBell />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Job Posting Overview Stats */}
            <JobPostingOverviewStats />
            
            {/* Job Postings List Section */}
            <JobPostingsListSection />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
