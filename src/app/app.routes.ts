import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { UserManager } from './components/user-manager/user-manager';
export const routes: Routes = [
    {
        path : "",
        component : Login,
        title : "Login | UserHub"
    },
    {
        path : "dashboard",
        component : Dashboard,
        title : "Dashboard | UserHub"
    },
    {
        path : "user/add",
        component : UserManager,
        title : "Add User | UserHub"
    },
    {
        path : "user/edit/:id",
        component : UserManager,
        title : "Edit User | UserHub"
    }
];
