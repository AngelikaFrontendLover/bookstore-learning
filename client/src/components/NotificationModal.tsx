import { useNotification } from '../contexts/NotificationContext';

export default function NotificationModal() {
  const { notification, clearNotification } = useNotification();

  if (!notification) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div
        className={`rounded-lg p-6 shadow-lg w-96 ${
          notification.type === 'error'
            ? 'bg-red-100 border border-red-400 text-red-700'
            : notification.type === 'success'
              ? 'bg-green-100 border border-green-400 text-green-700'
              : 'bg-blue-100 border border-blue-400 text-blue-700'
        }`}
      >
        <p className="mb-4">{notification.message}</p>
        <button
          onClick={clearNotification}
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
}
