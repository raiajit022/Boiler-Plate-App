import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Projects</span>
              <span className="font-medium">5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tasks</span>
              <span className="font-medium">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Completed</span>
              <span className="font-medium">8</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <p className="text-gray-600 text-sm">Project "Website Redesign" updated 2 hours ago</p>
            <p className="text-gray-600 text-sm">Task "Design Homepage" completed yesterday</p>
            <p className="text-gray-600 text-sm">New comment on "API Integration" 2 days ago</p>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <div className="space-y-3">
            <Link href="/dashboard/projects" className="text-blue-600 hover:underline block">
              Projects
            </Link>
            <Link href="/dashboard/billing" className="text-blue-600 hover:underline block">
              Billing
            </Link>
            <Link href="/dashboard/settings" className="text-blue-600 hover:underline block">
              Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
