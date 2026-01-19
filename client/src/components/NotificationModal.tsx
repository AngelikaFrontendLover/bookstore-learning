import { useNotification } from '../contexts/NotificationContext';

export default function NotificationModal() {
  const { notification, clearNotification } = useNotification();

  if (!notification) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div
        className={`rounded-lg p-6 shadow-lg w-96 ${
          notification.type === 'error'
            ? 'bg-red-100 border border-red-300 text-red-400'
            : notification.type === 'success'
              ? 'bg-cyan-200 border border-cyan-300 green-200'
              : 'bg-blue-300 border border-blue-300 text-blue-400'
        }`}
      >
        <p className="mb-4">{notification.message}</p>
        <button
          onClick={clearNotification}
          className="px-4 py-2 bg-slate-400 text-white rounded hover:bg-gray-500"
        >
          Close
        </button>
      </div>
    </div>
  );
}
