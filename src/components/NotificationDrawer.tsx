import React from 'react';
import { X, Clock } from 'lucide-react';

export interface ClinicalNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'critical' | 'info' | 'success';
  read: boolean;
}

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: ClinicalNotification[];
  onMarkAllAsRead: () => void;
  onDismiss: (id: string) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onDismiss,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs font-['Roboto',sans-serif]">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200 border-l border-[#D4D8D5]">
        {/* Drawer Header */}
        <div className="p-4 border-b border-[#D4D8D5] flex items-center justify-between bg-[#EDEFEE]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#D08856] text-[22px]">notifications</span>
            <h3 className="text-[18px] font-bold text-[#41403C]">
              Clinical Alerts &amp; Activity
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#6F6D68] hover:text-[#41403C] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-[#6F6D68]">
              <span className="material-symbols-outlined text-[36px] text-[#A2A6A3] mb-2">done_all</span>
              <p className="text-[14px]">No active clinical alerts.</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`p-3.5 rounded-xl border relative transition-all ${
                  n.type === 'critical'
                    ? 'bg-[#FDF1EF] border-[#F5C2BA]'
                    : n.type === 'success'
                    ? 'bg-[#FAF2EB] border-[#EACAB2]'
                    : 'bg-white border-[#D4D8D5]'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`material-symbols-outlined text-[18px] ${
                        n.type === 'critical'
                          ? 'text-[#AA210F]'
                          : n.type === 'success'
                          ? 'text-[#D08856]'
                          : 'text-[#41403C]'
                      }`}
                    >
                      {n.type === 'critical' ? 'emergency' : n.type === 'success' ? 'check_circle' : 'info'}
                    </span>
                    <h4 className="text-[13px] font-bold text-[#41403C]">{n.title}</h4>
                  </div>
                  <button
                    onClick={() => onDismiss(n.id)}
                    className="text-[#6F6D68] hover:text-[#41403C] p-0.5 cursor-pointer"
                    title="Dismiss"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[12px] text-[#6F6D68] leading-relaxed pl-6">{n.message}</p>
                <div className="text-[11px] text-[#A2A6A3] mt-2 pl-6 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{n.time}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#D4D8D5] bg-[#EDEFEE] flex justify-between items-center">
          <button
            onClick={onMarkAllAsRead}
            className="text-[13px] text-[#D08856] hover:underline font-semibold cursor-pointer"
          >
            Mark all as read
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-[#D4D8D5] text-[#41403C] text-[13px] font-medium rounded-xl hover:bg-[#EDEFEE] cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
