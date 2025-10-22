/**
 * Messages Management Page
 * View, manage, and respond to contact form submissions
 */
'use client';

import { useState, useEffect } from 'react';
import {
  EnvelopeIcon,
  EnvelopeOpenIcon,
  TrashIcon,
  EyeIcon,
  PhoneIcon,
  CalendarIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

export default function MessagesPage({ params }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});

  // Fetch messages
  const fetchMessages = async (page = 1, filterType = 'all') => {
    try {
      setLoading(true);
      const response = await fetch(`/api/contact?page=${page}&limit=10`);
      const data = await response.json();

      if (data.success) {
        let filteredMessages = data.data.messages;

        if (filterType === 'unread') {
          filteredMessages = filteredMessages.filter((msg) => !msg.isRead);
        } else if (filterType === 'read') {
          filteredMessages = filteredMessages.filter((msg) => msg.isRead);
        }

        setMessages(filteredMessages);
        setPagination(data.data.pagination);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  // Mark message as read
  const markAsRead = async (messageId) => {
    try {
      const response = await fetch(`/api/contact/${messageId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: true }),
      });

      if (response.ok) {
        setMessages(
          messages.map((msg) =>
            msg._id === messageId ? { ...msg, isRead: true } : msg
          )
        );
      }
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  // Delete message
  const deleteMessage = async (messageId) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const response = await fetch(`/api/contact/${messageId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessages(messages.filter((msg) => msg._id !== messageId));
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  useEffect(() => {
    fetchMessages(currentPage, filter);
  }, [currentPage, filter]);

  // Message list item component
  const MessageListItem = ({ message }) => (
    <div
      className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${
        !message.isRead ? 'bg-blue-50 dark:bg-blue-900/20' : ''
      }`}
      onClick={() => {
        setSelectedMessage(message);
        if (!message.isRead) markAsRead(message._id);
      }}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {message.name.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <p
              className={`text-sm font-medium truncate ${
                !message.isRead
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {message.name}
            </p>
            {!message.isRead ? (
              <EnvelopeIcon className="h-4 w-4 text-blue-500" />
            ) : (
              <EnvelopeOpenIcon className="h-4 w-4 text-gray-400" />
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {message.email}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1 line-clamp-2">
            {message.subject || 'No subject'} - {message.message}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            {new Date(message.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );

  // Message detail component
  const MessageDetail = ({ message }) => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Message Details
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => deleteMessage(message._id)}
            className="p-2 text-red-600 hover:text-red-700 dark:text-red-400"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-gray-600 dark:text-gray-400">Name:</span>
            <span className="ml-2 text-gray-900 dark:text-white">
              {message.name}
            </span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Email:</span>
            <span className="ml-2 text-gray-900 dark:text-white">
              {message.email}
            </span>
          </div>
          {message.phone && (
            <div className="flex items-center">
              <PhoneIcon className="h-4 w-4 text-gray-400 mr-1" />
              <span className="text-gray-900 dark:text-white">
                {message.phone}
              </span>
            </div>
          )}
          {message.budget && (
            <div className="flex items-center">
              <CurrencyDollarIcon className="h-4 w-4 text-gray-400 mr-1" />
              <span className="text-gray-900 dark:text-white">
                {message.budget}
              </span>
            </div>
          )}
          {message.timeLine && (
            <div className="flex items-center">
              <CalendarIcon className="h-4 w-4 text-gray-400 mr-1" />
              <span className="text-gray-900 dark:text-white">
                {message.timeLine}
              </span>
            </div>
          )}
          <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 text-gray-400 mr-1" />
            <span className="text-gray-900 dark:text-white">
              {new Date(message.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Subject */}
      {message.subject && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            Subject
          </h3>
          <p className="text-gray-700 dark:text-gray-300">{message.subject}</p>
        </div>
      )}

      {/* Message */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
          Message
        </h3>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {message.message}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-3">
        <a
          href={`mailto:${message.email}?subject=Re: ${message.subject || 'Your message'}`}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Reply via Email
        </a>
        <a
          href={`tel:${message.phone}`}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          disabled={!message.phone}
        >
          Call
        </a>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Messages
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage contact form submissions
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex space-x-2">
          {['all', 'unread', 'read'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-3 py-1 rounded-lg text-sm capitalize ${
                filter === filterType
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {filterType}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
        {/* Messages List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-medium text-gray-900 dark:text-white">
              Messages ({messages.length})
            </h3>
          </div>
          <div className="overflow-y-auto h-full">
            {loading ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                Loading messages...
              </div>
            ) : messages.length === 0 ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                No messages found
              </div>
            ) : (
              messages.map((message) => (
                <MessageListItem key={message._id} message={message} />
              ))
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          {selectedMessage ? (
            <MessageDetail message={selectedMessage} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
              <div className="text-center">
                <EyeIcon className="h-12 w-12 mx-auto mb-4" />
                <p>Select a message to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
