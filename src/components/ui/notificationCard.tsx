
import React from "react";

interface NotificationCardProps {
  title: string;
  message: string;
  time: string;
  onMarkRead: () => void;
  onDismiss: () => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  title,
  message,
  time,
  onMarkRead,
  onDismiss,
}) => {
  return (
    <div className="w-full bg-white  p-4 mb-3">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-base font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-600">{message}</p>
          <span className="text-xs text-gray-400">{time}</span>
        </div>
      </div>

      <div className="flex border-b border-gray-200 mt-3">
        <button
          onClick={onMarkRead}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition"
        >
          Mark as Read
        </button>
        <button
          onClick={onDismiss}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 border-b-2 border-transparent hover:border-red-600 transition"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default NotificationCard;
