import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserModel } from '../models/userModel';

@Injectable({
  providedIn: 'root',
})
export class ApiServices {
  // server_url = 'http://localhost:3000';
  server_url = 'https://user-hub-server.onrender.com';
  http = inject(HttpClient);

  addUserAPI(reqBody : UserModel){
   return this.http.post(`${this.server_url}/user/add`,reqBody)
  }

  updateUserAPI(reqBody : UserModel, userId : string){
   return this.http.put(`${this.server_url}/user/${userId}/update`,reqBody)
  }

  removeUserAPI(userId : string){
   return this.http.delete(`${this.server_url}/user/${userId}/delete`)
  }

  getAllUsersAPI(){
    return this.http.get(`${this.server_url}/users`)
  }
}
