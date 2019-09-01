import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  ToDateInput=function(dt: Date)
  {    
    return dt.getFullYear() + "-" + ("0" + (dt.getMonth() + 1)).slice(-2) + "-" + ("0" + (dt.getDate() )).slice(-2);
  }
  constructor() { }
}
