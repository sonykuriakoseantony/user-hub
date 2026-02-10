import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiServices } from '../../services/api-services';
import { NgForOf } from '@angular/common';

interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, NgForOf],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  router = inject(Router);
  apiService = inject(ApiServices);
  // Header
  appTitle = 'User Manager';
  userEmail = 'sonykantony@gmail.com';

  // Users
  allUsers : any = signal([]);
  searchTerm : string = "";

  ngOnInit(){
    this.getallUsres();
  }

  // Actions
  signOut(): void {
    console.log('Sign out clicked');
    this.router.navigate(['/']);
  }

  onSearch(value: string): void {
    this.searchTerm = value;
    console.log('Searching for:', value);
  }

  getallUsres(){
    this.apiService.getAllUsersAPI().subscribe((res:any) => {
      this.allUsers.set(res);
    })
  } 

  editUser(id:string){

  }

  deleteUser(id:string){
    this.apiService.removeUserAPI(id).subscribe((res:any)=>{
      alert('User removed successfully');
      this.getallUsres();
    })
  }

  get userCount(): number {
    return this.allUsers().length;
  }
}
