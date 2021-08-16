import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private socketService: SocketService,
    private apiService: ApiService,
    ) {}

  getEvent(userEmail: string){
    return this.socketService.onEvent('notification'+userEmail);
  }

  getNotification() { return this.apiService.get(`/notifications/get/all`,);  }
  markAll(){ return this.apiService.get(`/notifications/mark-all`,);  }
  markAsRead(notificationSlug: string){ return this.apiService.get(`/notifications/mark-as-read/${notificationSlug}`,);  }
}
