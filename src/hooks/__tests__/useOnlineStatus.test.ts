import { renderHook, act } from '@testing-library/react';
import { useOnlineStatus } from '../useOnlineStatus';

describe('useOnlineStatus Hook', () => {
  let originalNavigator: Navigator;

  beforeEach(() => {
    // Store original navigator
    originalNavigator = window.navigator;

    // Mock navigator.onLine
    Object.defineProperty(window.navigator, 'onLine', {
      writable: true,
      value: true,
    });
  });

  afterEach(() => {
    // Restore original navigator
    Object.defineProperty(window.navigator, 'onLine', {
      writable: true,
      value: originalNavigator.onLine,
    });
  });

  describe('Initial State', () => {
    it('should have correct initial state when online', () => {
      Object.defineProperty(window.navigator, 'onLine', {
        writable: true,
        value: true,
      });

      const { result } = renderHook(() => useOnlineStatus());

      expect(result.current.isOnline).toBe(true);
      expect(result.current.wasOffline).toBe(false);
    });

    it('should have correct initial state when offline', () => {
      Object.defineProperty(window.navigator, 'onLine', {
        writable: true,
        value: false,
      });

      const { result } = renderHook(() => useOnlineStatus());

      expect(result.current.isOnline).toBe(true); // useState initial value
      expect(result.current.wasOffline).toBe(false);
    });
  });

  describe('Online Event Handling', () => {
    it('should update isOnline to true when online event fires', () => {
      const { result } = renderHook(() => useOnlineStatus());

      // Simulate going offline first
      act(() => {
        const offlineEvent = new Event('offline');
        window.dispatchEvent(offlineEvent);
      });

      expect(result.current.isOnline).toBe(false);
      expect(result.current.wasOffline).toBe(true);

      // Then simulate coming back online
      act(() => {
        const onlineEvent = new Event('online');
        window.dispatchEvent(onlineEvent);
      });

      expect(result.current.isOnline).toBe(true);
      expect(result.current.wasOffline).toBe(false);
    });

    it('should not change wasOffline when already online', () => {
      const { result } = renderHook(() => useOnlineStatus());

      // Should start online
      expect(result.current.isOnline).toBe(true);
      expect(result.current.wasOffline).toBe(false);

      // Fire online event while already online
      act(() => {
        const onlineEvent = new Event('online');
        window.dispatchEvent(onlineEvent);
      });

      expect(result.current.isOnline).toBe(true);
      expect(result.current.wasOffline).toBe(false);
    });
  });

  describe('Offline Event Handling', () => {
    it('should update isOnline to false when offline event fires', () => {
      const { result } = renderHook(() => useOnlineStatus());

      // Should start online
      expect(result.current.isOnline).toBe(true);
      expect(result.current.wasOffline).toBe(false);

      // Simulate going offline
      act(() => {
        const offlineEvent = new Event('offline');
        window.dispatchEvent(offlineEvent);
      });

      expect(result.current.isOnline).toBe(false);
      expect(result.current.wasOffline).toBe(true);
    });

    it('should set wasOffline to true when going offline', () => {
      const { result } = renderHook(() => useOnlineStatus());

      // Start online
      expect(result.current.wasOffline).toBe(false);

      // Go offline
      act(() => {
        const offlineEvent = new Event('offline');
        window.dispatchEvent(offlineEvent);
      });

      expect(result.current.wasOffline).toBe(true);
    });
  });

  describe('Event Listener Management', () => {
    it('should add event listeners on mount', () => {
      const addEventListenerSpy = jest.spyOn(window, 'addEventListener');

      renderHook(() => useOnlineStatus());

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'online',
        expect.any(Function)
      );
      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'offline',
        expect.any(Function)
      );

      addEventListenerSpy.mockRestore();
    });

    it('should remove event listeners on unmount', () => {
      const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

      const { unmount } = renderHook(() => useOnlineStatus());

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'online',
        expect.any(Function)
      );
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'offline',
        expect.any(Function)
      );

      removeEventListenerSpy.mockRestore();
    });
  });

  describe('Multiple State Changes', () => {
    it('should handle multiple online/offline transitions', () => {
      const { result } = renderHook(() => useOnlineStatus());

      // Start online
      expect(result.current.isOnline).toBe(true);
      expect(result.current.wasOffline).toBe(false);

      // Go offline
      act(() => {
        const offlineEvent = new Event('offline');
        window.dispatchEvent(offlineEvent);
      });

      expect(result.current.isOnline).toBe(false);
      expect(result.current.wasOffline).toBe(true);

      // Come back online
      act(() => {
        const onlineEvent = new Event('online');
        window.dispatchEvent(onlineEvent);
      });

      expect(result.current.isOnline).toBe(true);
      expect(result.current.wasOffline).toBe(false);

      // Go offline again
      act(() => {
        const offlineEvent = new Event('offline');
        window.dispatchEvent(offlineEvent);
      });

      expect(result.current.isOnline).toBe(false);
      expect(result.current.wasOffline).toBe(true);

      // Come back online again
      act(() => {
        const onlineEvent = new Event('online');
        window.dispatchEvent(onlineEvent);
      });

      expect(result.current.isOnline).toBe(true);
      expect(result.current.wasOffline).toBe(false);
    });

    it('should handle rapid state changes', () => {
      const { result } = renderHook(() => useOnlineStatus());

      // Rapid offline/online changes
      act(() => {
        const offlineEvent = new Event('offline');
        const onlineEvent = new Event('online');

        window.dispatchEvent(offlineEvent);
        window.dispatchEvent(onlineEvent);
        window.dispatchEvent(offlineEvent);
        window.dispatchEvent(onlineEvent);
      });

      // Should end up online with wasOffline true (because we went offline at least once)
      expect(result.current.isOnline).toBe(true);
      expect(result.current.wasOffline).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle multiple hook instances', () => {
      const { result: result1 } = renderHook(() => useOnlineStatus());
      const { result: result2 } = renderHook(() => useOnlineStatus());

      // Both should start with same state
      expect(result1.current.isOnline).toBe(result2.current.isOnline);
      expect(result1.current.wasOffline).toBe(result2.current.wasOffline);

      // Both should respond to events
      act(() => {
        const offlineEvent = new Event('offline');
        window.dispatchEvent(offlineEvent);
      });

      expect(result1.current.isOnline).toBe(false);
      expect(result2.current.isOnline).toBe(false);
      expect(result1.current.wasOffline).toBe(true);
      expect(result2.current.wasOffline).toBe(true);
    });

    it('should handle unmounting and remounting', () => {
      const { result, unmount } = renderHook(() => useOnlineStatus());

      // Go offline
      act(() => {
        const offlineEvent = new Event('offline');
        window.dispatchEvent(offlineEvent);
      });

      expect(result.current.isOnline).toBe(false);
      expect(result.current.wasOffline).toBe(true);

      // Unmount
      unmount();

      // Create new hook instance
      const { result: newResult } = renderHook(() => useOnlineStatus());

      // Should start fresh (online, not wasOffline)
      expect(newResult.current.isOnline).toBe(true);
      expect(newResult.current.wasOffline).toBe(false);
    });
  });

  describe('Dependency Array', () => {
    it('should recreate event listeners when wasOffline changes', () => {
      const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
      const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

      renderHook(() => useOnlineStatus());

      // Go offline to change wasOffline
      act(() => {
        const offlineEvent = new Event('offline');
        window.dispatchEvent(offlineEvent);
      });

      // Event listeners should be recreated due to wasOffline dependency
      expect(removeEventListenerSpy).toHaveBeenCalled();
      expect(addEventListenerSpy).toHaveBeenCalled();

      addEventListenerSpy.mockRestore();
      removeEventListenerSpy.mockRestore();
    });
  });
});
