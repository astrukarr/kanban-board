'use client';

import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { useState, useEffect } from 'react';

export default function OfflineBanner() {
  const { isOnline, wasOffline, resetWasOffline } = useOnlineStatus();
  const [showSyncMessage, setShowSyncMessage] = useState(false);
  const [hasShownSyncMessage, setHasShownSyncMessage] = useState(false);

  useEffect(() => {
    if (isOnline && wasOffline && !hasShownSyncMessage) {
      setShowSyncMessage(true);
      setHasShownSyncMessage(true);
      setTimeout(() => {
        setShowSyncMessage(false);
        // Reset wasOffline after sync message is shown
        resetWasOffline();
      }, 3000);
    }
  }, [isOnline, wasOffline, hasShownSyncMessage, resetWasOffline]);

  useEffect(() => {
    const body = document.body;
    const sidebar = document.querySelector(
      '[aria-label="App Sidebar"]'
    ) as HTMLElement;

    if (!isOnline || showSyncMessage) {
      body.style.paddingTop = '48px';
      if (sidebar) {
        sidebar.style.top = '48px';
        sidebar.style.height = 'calc(100vh - 48px)';
      }
    } else {
      body.style.paddingTop = '0px';
      if (sidebar) {
        sidebar.style.top = '0px';
        sidebar.style.height = '100vh';
      }
    }

    return () => {
      body.style.paddingTop = '0px';
      if (sidebar) {
        sidebar.style.top = '0px';
        sidebar.style.height = '100vh';
      }
    };
  }, [isOnline, showSyncMessage]);

  if (!isOnline) {
    return (
      <div className="fixed top-0 left-0 right-0 z-[9999] bg-amber-500 text-white text-center py-3 px-4 shadow-lg">
        📡 Offline – changes will sync when online
      </div>
    );
  }

  if (isOnline && showSyncMessage) {
    return (
      <div className="fixed top-0 left-0 right-0 z-[9999] bg-green-500 text-white text-center py-3 px-4 shadow-lg">
        ✅ Synced successfully!
      </div>
    );
  }

  return null;
}
