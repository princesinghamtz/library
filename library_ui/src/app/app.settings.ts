import { environment } from '../environments/environment';

export class AppSettings {
  public static API = {
    AUTH: environment.apiUrl + "signup",
    book: environment.apiUrl + "view-book",
    add_book: environment.apiUrl + "add-book",
    delete_book: environment.apiUrl + "delete-book",
    forgot_password: environment.apiUrl + "forget_password",
    add_company: environment.apiUrl + "company",
    customer: environment.apiUrl + "customer",
    change_password:environment.apiUrl + "change_password",
    emp_details:environment.apiUrl + "emp_details",
  };
}
