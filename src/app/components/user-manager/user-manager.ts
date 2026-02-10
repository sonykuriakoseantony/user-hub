import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { ApiServices } from '../../services/api-services';
import { UserModel } from '../../models/userModel';

@Component({
  selector: 'app-user-manager',
  imports: [FormsModule, RouterLink],
  templateUrl: './user-manager.html',
  styleUrl: './user-manager.css',
})
export class UserManager {

  router = inject(Router);
  apiService = inject(ApiServices);
  route = inject(ActivatedRoute);

  userId = this.route.snapshot.params['id'];

  // Header
  appTitle = 'User Manager';
  userEmail = 'sonykantony@gmail.com';

  userDetails = signal<UserModel>({});
  
  ngOnInit(){
    if(this.userId){
      this.apiService.getAllUsersAPI().subscribe((res:any)=>{
        this.userDetails.set(res.find((user:any) => user._id == this.userId));
      })
    }
  }
  // Actions
  signOut(): void {
    console.log('Sign out clicked');
    this.router.navigate(['/']);
  }

  addUser(): void {
    const {name, email } = this.userDetails()
    if(name && email){
      this.apiService.addUserAPI(this.userDetails()).subscribe({
        next : (res:any) => {
          alert('User added successfully');
          this.router.navigate(['/dashboard']);
        },
        error : (reason : any) => {
          console.error('Error adding User:', reason.error.message);
          alert(reason.error);
        }
      });
    }
    else{
      alert("Atleaset Name and Email should be provided to add a user")
    }
    
  }

  updateUser() {
    const {name, email } = this.userDetails()
    if(name && email){
      this.apiService.updateUserAPI(this.userDetails(), this.userId).subscribe({
        next : (res:any) => {
          alert('User updated successfully');
          this.router.navigate(['/dashboard']);
        },
        error : (reason : any) => {
          console.error('Error updating User:', reason.error.message);
          alert(reason.error);
        }
      });
    }
    else{
      alert("Atleaset Name and Email should be provided to add a user")
    }
  }

  cancel(): void {
    console.log('Cancelled');
    // Typically navigate back to users list
  }

}
