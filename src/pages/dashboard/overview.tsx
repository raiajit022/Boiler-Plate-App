import React from 'react';
import Head from 'next/head';
import Card from '../../components/ui/Card';

// Dummy stats data
const stats = [
  { id: 1, name: 'Total Users', value: '8,234', change: '+12.5%', trend: 'up' },
  { id: 2, name: 'New Signups', value: '432', change: '+5.7%', trend: 'up' },
  { id: 3, name: 'Active Sessions', value: '1,256', change: '+18.2%', trend: 'up' },
  { id: 4, name: 'Bounce Rate', value: '24.3%', change: '-2.1%', trend: 'down' }
];

export default function DashboardOverview() {
  return (
    <>
      <Head>
        <title>Dashboard Overview | My Next.js App</title>
      </Head>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <div className="text-gray-500">Last updated: {new Date().toLocaleDateString()}</div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.id} className="text-center">
              <h3 className="text-gray-500 text-sm font-medium">{stat.name}</h3>
              <p className="text-3xl font-bold mt-2">{stat.value}</p>
              <div className={`flex items-center justify-center mt-2 ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                <span>{stat.change}</span>
                <svg 
                  className="h-4 w-4 ml-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  {stat.trend === 'up' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  )}
                </svg>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card title="Recent Activity">
            <p className="text-gray-500">No recent activity to display.</p>
          </Card>
          
          <Card title="Quick Actions">
            <div className="space-y-2">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                Create New Report
              </button>
              <button className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300">
                Invite Team Member
              </button>
              <button className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300">
                Update Profile
              </button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
