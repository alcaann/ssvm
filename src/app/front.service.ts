import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastData } from 'types';

@Injectable({
  providedIn: 'root'
})
export class FrontService {


toastEmitter: Subject<ToastData> = new Subject<ToastData>();


  constructor() { }




}
