import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {
  private notifications: string[] = [];

  getNotifications(): string[] {
    return this.notifications;
  }

  addNotification(message: string): void {
    const time = new Date().toLocaleTimeString();
    this.notifications.push(`[${time}] ${message}`);
  }

  clear(): void {
    this.notifications = [];
  }
}
