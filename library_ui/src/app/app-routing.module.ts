import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { LoginComponent } from './login/login.component';
import { StudentComponent } from './student/student.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: 'books',
    component: BooksComponent,
  },

  {
    path: 'library',
    component: StudentComponent,
  },
 
  { path: '', redirectTo: 'library', pathMatch: 'full' },
  { path: '**', redirectTo: 'library' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

