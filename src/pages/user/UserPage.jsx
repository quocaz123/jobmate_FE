import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { getUserInfo } from '../../utils/userUtils';
import { userMenuItems } from '../../utils/menuConfig';
import Dashboard from './Dashboard';
import JobList from './JobList';
import JobListDetail from './JobListDetail';
import Application from './Application';
import ApplicationDetail from './ApplicationDetail';
import JobRequest from './JobRequest';
import Profile from './Profile';
import WorkSchedule from './WorkSchedule';
import VerifyCCCD from './VerifyCCCD';
import Chat from './Chat';

const UserPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Dashboard onGoToJobRequest={() => setActiveTab('job-requests')} />;
      case 'find-jobs':
        return (
          <JobList
            onViewDetail={(id) => {
              setSelectedJobId(id);
              setActiveTab('job-detail');
            }}
          />
        );
      case 'job-detail':
        return (
          <JobListDetail
            id={selectedJobId}
            onBack={() => setActiveTab('find-jobs')}
          />
        );
      case 'applications':
        return (
          <Application
            onViewDetail={(id) => {
              setSelectedApplicationId(id);
              setActiveTab('application-detail');
            }}
          />
        );
      case 'application-detail':
        return (
          <ApplicationDetail
            id={selectedApplicationId}
            onBack={() => setActiveTab('applications')}
          />
        );
      case 'messages':
        return <Chat />;
      case 'schedule':
        return <WorkSchedule events={[]} />;
      case 'profile':
        return <Profile />;
      case 'verify-id':
        return <VerifyCCCD />;
      case 'job-requests':
        return <JobRequest />;
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">{activeTab}</h2>
            <p className="text-gray-600">Nội dung đang được phát triển...</p>
          </div>
        );
    }
  };

  return (
    <DashboardLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      menuItems={userMenuItems}
      logo="/vite.svg"
      logoText="JobMate"
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default UserPage;
