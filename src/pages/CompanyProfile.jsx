import React from 'react'
import Sidebar from '../components/Sidebar'
import CompanyProfileHeader from '../components/CompanyProfileHeader'
import CompanyOverviewCard from '../components/CompanyOverviewCard'
import CompanyInfoCard from '../components/CompanyInfoCard'
import AreasOfOperationSection from '../components/AreasOfOperationSection'
import ApplicantReviewsSection from '../components/ApplicantReviewsSection'

const CompanyProfile = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Company Profile Header */}
            <CompanyProfileHeader />
            
            {/* Company Overview Card */}
            <div className="mb-8">
              <CompanyOverviewCard />
            </div>
            
            {/* Company Info and Areas of Operation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <CompanyInfoCard />
              <AreasOfOperationSection />
            </div>
            
            {/* Applicant Reviews */}
            <ApplicantReviewsSection />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyProfile
