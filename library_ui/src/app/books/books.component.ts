import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CompanyService } from './books.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  viewBooks = false;
  bookForm = new FormGroup({});
  itemImage = '';
  bookData = [];
  imagePath = '';
  editId = '';
  submitted = false;
  spinner = false;
  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    public service: CompanyService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.get_book();
    this.valiDate();
    this.imagePath = environment.book_logo;
  }
 
  showBookForm = () => {
    this.viewBooks = true;
    this.bookForm.reset();
    this.submitted = false;
    this.spinner = false;
  }
  showBookList = () => {
    this.viewBooks = false;
    this.spinner = false;
  }
  get f() {
    return this.bookForm.controls;
  }

  // Validation Funcation of company Form
  valiDate() {
    this.bookForm = this.formBuilder.group({
      id: [''],
      logo: [''],
      book: ['', Validators.required],
      author: ['', Validators.required],
      description :['', Validators.required],
    });
  }

  submit() {
    this.spinner = true;
    this.submitted = true;
    if (this.bookForm.invalid) {
      this.spinner = false;
      return;

    }
    // console.log(this.bookForm.value);
    if (this.editId) {
      this.bookForm.value.id = this.editId;
    }
    const body = this.prepareSave();
    console.log(body)
    this.service.add_book(body).subscribe((data:any) => {
      console.log(data.message)
      if (data.message == "Success") {
        this.spinner = false;
        if (this.editId) {
          this.toastr.success(`Updated Successfully`);
        } else {
          this.toastr.success(`Book Added Successfully`);
        }
        this.bookForm.reset();
        this.editId = '';
        this.showBookList();
        this.get_book();
      }
    });
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
  onFileChange(event) {
  
    console.log(event);
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.itemImage = file;
    }
  }

  // Convert the data into json and also add the logo
  private prepareSave(): any {
    const input = new FormData();
    input.append('logo', this.itemImage);
    input.append('data', JSON.stringify(this.bookForm.value));
    return input;
  }
  
// Update the Book details

  edit(item) {
    this.spinner = false;
    console.log(item);
    this.editId = item.id;
    this.showBookForm();
    this.bookForm.patchValue({
      book: item.name,
      author: item.author,
      description :item.description,
    });
  }
// delete the Book details 

  delete(item){
    this.spinner = true;
    console.log(item);
    this.bookForm.value.id = item;
    const body = this.prepareSave();
    console.log(body)
    this.service.delete_book(body).subscribe((data:any) => {
      if (data.message == "Success") {
        this.spinner = false;
        this.toastr.warning(`Book Deleted Successfully`);
        this.showBookList();
        this.get_book();
      }
    }
     
    );
}

}




