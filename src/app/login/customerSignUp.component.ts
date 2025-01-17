import { Customer, CustomerLocation } from './../model/customer.model';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CustomerSigninRepository } from '../model/customerSignIn.repository';

@Component({
  selector: 'customer-signUp',
  templateUrl: 'customerSignUp.component.html',
  styleUrls: ['customerSignUp.component.css'],
})
export class CustomerSignUpComponent {
  editing: boolean = false;
  customer: Customer = new Customer();
  phoneNumber: any;

  constructor(
    private repository: CustomerSigninRepository,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.editing = activeRoute.snapshot.params['mode'] == 'edit';
    // Initialize the student object with a new address object
    this.customer.customerlocation = new CustomerLocation();

    // if (this.editing) {
    //   console.log(activeRoute.snapshot.params['id']);
    //   Object.assign(
    //     // ES5 method
    //     this.customer, this.repository.getCustomer(activeRoute.snapshot.params['id'])

    //     // repository.getProduct(1)
    //   );

    // }
  }
  save(form: NgForm) {
    // this.customer.remaingUnits=this.property.totalUnits;

    this.customer.customerPhno = parseInt(this.phoneNumber);
    this.repository.saveCustomer(this.customer);
    console.log(this.customer);

    this.router.navigateByUrl('/signin');
  }
}
