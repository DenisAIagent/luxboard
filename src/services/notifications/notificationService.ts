import io from 'socket.io-client';
import type { Socket } from 'socket.io-client';
import { authService } from '../auth/authService';

export interface Notification {
  id: string;
  type: 'security' | 'system' | 'alert';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  inApp: boolean;
  types: {
    security: boolean;
    system: boolean;
    alert: boolean;
  };
}

class NotificationService {
  private static instance: NotificationService;
  private socket: ReturnType<typeof io> | null = null;
  private listeners: ((notification: Notification) => void)[] = [];
  private preferences: NotificationPreferences = {
    email: true,
    push: true,
    inApp: true,
    types: {
      security: true,
      system: true,
      alert: true
    }
  };

  private constructor() {
    this.initializeSocket();
  }

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  private initializeSocket() {
    const token = authService.getToken();
    if (!token) return;

    this.socket = io(process.env.REACT_APP_WS_URL || 'ws://localhost:3000', {
      auth: { token }
    });

    this.socket.on('notification', (notification: Notification) => {
      this.handleNotification(notification);
    });
  }

  private handleNotification(notification: Notification) {
    this.listeners.forEach(listener => listener(notification));
    
    if (this.preferences.push && 'Notification' in window) {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/logo.png'
      });
    }
  }

  public subscribe(listener: (notification: Notification) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  public async getPreferences(): Promise<NotificationPreferences> {
    return this.preferences;
  }

  public async updatePreferences(preferences: Partial<NotificationPreferences>) {
    this.preferences = { ...this.preferences, ...preferences };
  }

  public async markAsRead(notificationId: string): Promise<void> {
    // TODO: Implement mark as read
    throw new Error('Mark as read not implemented');
  }

  public async markAllAsRead(): Promise<void> {
    // TODO: Implement mark all as read
    throw new Error('Mark all as read not implemented');
  }

  public async deleteNotification(notificationId: string): Promise<void> {
    // TODO: Implement delete notification
    throw new Error('Delete notification not implemented');
  }

  public async getNotifications(): Promise<Notification[]> {
    // TODO: Implement get notifications
    throw new Error('Get notifications not implemented');
  }

  public async getUnreadCount(): Promise<number> {
    // TODO: Implement get unread count
    throw new Error('Get unread count not implemented');
  }

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export const notificationService = NotificationService.getInstance(); 