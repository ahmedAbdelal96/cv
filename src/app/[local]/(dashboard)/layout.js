/**
 * Dashboard layout component
 * Protected layout - requires authentication
 * Includes sidebar navigation and auth guard
 */
import { redirect } from 'next/navigation';
import { auth } from '@/app/api/auth/[...nextauth]/route';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

// Get user session
async function getUser() {
  const session = await auth();

  if (!session || !session.user || session.user.role !== 'admin') {
    return null;
  }

  return session.user;
}

export default async function DashboardLayout({ children, params }) {
  console.log('DashboardLayout params:', params.local);
  const user = await getUser();

  // Redirect to login if not authenticated
  if (!user) {
    redirect(`/${params.local}/auth/login`);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <DashboardSidebar user={user} />

      {/* Main Content */}
      <div className="lg:ml-72">
        {/* Dashboard Header */}
        <DashboardHeader user={user} />

        {/* Main Content Area */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
