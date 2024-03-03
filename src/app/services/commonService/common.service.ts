import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }


  // behaviour subject for adding data bto table from create account

  behaviourTableData=new BehaviorSubject(false)

  // behaviour subject to delete and update table

  behaviourDelete=new BehaviorSubject(false)


  // function to encrypt data

  encryptData(data: any): string {

    return CryptoJS.AES.encrypt(JSON.stringify(data), environment.encryptionKey).toString();
  }


          // Function to decrypt data
 decryptData(encryptedData: string): any {
  const bytes = CryptoJS.AES.decrypt(encryptedData, environment.encryptionKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
}
