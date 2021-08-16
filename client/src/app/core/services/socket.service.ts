import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket!: Socket;
  constructor() { this.socket = io(environment.api_url, {'forceNew': true });}
  emit(event:string, data:any){
    this.socket.emit(event,data);
  }
  onEvent(event:string):Observable<any>{
    return Observable.create((observer: any)=>{
     this.socket.on(event,(data: any)=>{
      observer.next(data);
     });
    })
   }
}
