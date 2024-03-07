import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppUrlService {

  public appBaseUrl!: string;

  constructor() { 
    this.appBaseUrl = window.location.origin;
    console.log("appBaseUrl: " + this.appBaseUrl);
  }
  
}
