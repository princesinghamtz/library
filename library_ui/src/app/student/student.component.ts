import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../books/books.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  bookData = [];
  spinner = false;
  imagePath = '';
  constructor(
    public router: Router,
    public service: CompanyService,
  ) { }

  ngOnInit() {
    this.get_book();
    this.imagePath = environment.book_logo;

  }

   // Get the Book from Backend 
   get_book() {
    this.spinner = true;
    this.service.get_book().subscribe(
      (data:any) => {
        if (data.message=="Success") {
          console.log(data.message)
          this.spinner = false;
          console.log(data['result']);
          this.bookData = data['result'];
        } else {
          this.spinner = false;
        }
      },
      (err) => {
        this.spinner = false;
      }
    );
  }

}
