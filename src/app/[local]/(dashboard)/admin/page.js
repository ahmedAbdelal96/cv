/**
 * Admin Dashboard Overview Page
 * Main dashboard with statistics and quick actions
 */
import {
  EnvelopeIcon,
  FolderIcon,
  DocumentTextIcon,
  StarIcon,
  EyeIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import connectDB from '@/lib/db';
import Message from '@/models/Message';
import Project from '@/models/Project';
import Article from '@/models/Article';
import Review from '@/models/Review';
import Link from 'next/link';

// Fetch dashboard statistics
async function getDashboardStats() {
  try {
    await connectDB();

    const [
      messagesCount,
      projectsCount,
      articlesCount,
      reviewsCount,
      recentMessages,
    ] = await Promise.all([
      Message.countDocuments(),
      Project.countDocuments(),
      Article.countDocuments(),
      Review.countDocuments(),
      Message.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    // Get unread messages count
    const unreadMessages = await Message.countDocuments({ isRead: false });

    return {
      messagesCount,
      projectsCount,
      articlesCount,
      reviewsCount,
      unreadMessages,
      recentMessages,
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      messagesCount: 0,
      projectsCount: 0,
      articlesCount: 0,
      reviewsCount: 0,
      unreadMessages: 0,
      recentMessages: [],
    };
  }
}

// Stats Card Component
function StatsCard({ title, value, icon: Icon, href, color = 'blue' }) {
  const colorClasses = {
    blue: 'bg-blue-500 text-white',
    green: 'bg-green-500 text-white',
    purple: 'bg-purple-500 text-white',
    orange: 'bg-orange-500 text-white',
    red: 'bg-red-500 text-white',
  };

  const content = (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">
            {value}
          </p>
        </div>
      </div>
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}

// Recent Messages Component
function RecentMessages({ messages }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Recent Messages
          </h3>
          <Link
            href="/admin/messages"
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500"
          >
            View all
          </Link>
        </div>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {messages.length === 0 ? (
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">
            No messages yet
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message._id}
              className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {message.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {message.name}
                    </p>
                    {!message.isRead && (
                      <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {message.email}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1 line-clamp-2">
                    {message.message}
                  </p>
                  <div className="flex items-center mt-2 text-xs text-gray-400 dark:text-gray-500">
                    <ClockIcon className="h-3 w-3 mr-1" />
                    {new Date(message.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default async function AdminDashboard({ params }) {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Welcome back! Here's what's happening with your portfolio.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Messages"
          value={stats.messagesCount}
          icon={EnvelopeIcon}
          href="/admin/messages"
          color="blue"
        />
        <StatsCard
          title="Unread Messages"
          value={stats.unreadMessages}
          icon={EnvelopeIcon}
          href="/admin/messages?filter=unread"
          color="red"
        />
        <StatsCard
          title="Projects"
          value={stats.projectsCount}
          icon={FolderIcon}
          href="/admin/projects"
          color="green"
        />
        <StatsCard
          title="Blog Posts"
          value={stats.articlesCount}
          icon={DocumentTextIcon}
          href="/admin/blog"
          color="purple"
        />
      </div>

      {/* Second Row Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Reviews"
          value={stats.reviewsCount}
          icon={StarIcon}
          href="/admin/reviews"
          color="orange"
        />
        <StatsCard
          title="Page Views"
          value="1,234"
          icon={EyeIcon}
          color="blue"
        />
        <StatsCard
          title="This Month"
          value="89"
          icon={ClockIcon}
          color="green"
        />
      </div>

      {/* Recent Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentMessages messages={stats.recentMessages} />

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Quick Actions
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <Link
              href="/admin/projects"
              className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add New Project
            </Link>
            <Link
              href="/admin/blog"
              className="block w-full bg-green-600 text-white text-center py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
            >
              Write Blog Post
            </Link>
            <Link
              href="/admin/messages"
              className="block w-full bg-purple-600 text-white text-center py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Check Messages
            </Link>
            <Link
              href="/admin/settings"
              className="block w-full bg-gray-600 text-white text-center py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
