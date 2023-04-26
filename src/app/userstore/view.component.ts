// Testing file testing 2
import { PropertyOrder } from './../model/order.model';
import { OrderRepository } from './../model/order.repository';

import { ActivatedRoute } from '@angular/router';

import { Component, HostListener, OnInit } from '@angular/core';
import { PropertyRepositary } from '../model/property.repository';
import { Property } from '../model/property.model';
import { CustomerSigninRepository } from '../model/customerSignIn.repository';
import { Customer } from '../model/customer.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'order-model',
  templateUrl: './propertyviewer.component.html',
  styleUrls: ['propertyviewer.component.css'],
})
export class ViewComponent {
  isBooked: boolean = false;
  orderPrice?: number;
  orderStatus?: string='pending';
  color:string='btn btn-primary';
  order: PropertyOrder = new PropertyOrder();
  property: Property = new Property();
  customer?: Customer = new Customer();


  orderForm: FormGroup;
  constructor(
    private repository: PropertyRepositary,
    private activeRoute: ActivatedRoute,
    private orderRepository: OrderRepository,
    private repo: CustomerSigninRepository,
    private formBuilder: FormBuilder,
    private customerRepo: CustomerSigninRepository
  ) {
    this.property = this.repository.getProperty(
      this.activeRoute.snapshot.params['id']
    );
    this.orderForm = this.formBuilder.group({
      noOfUnits: ['this.order.noOfUnits', [Validators.required, Validators.min(1), Validators.min(this.property.remainingUnits!)]] // create a form control for the number of units input
    });
    this.customer = this.repo.getLogedInCustomer();

  }



  get logedInCustomer(): Customer {
    return this.customerRepo.getLogedInCustomer();
  }

  saveOrder() {
    this.order.orderStatus='pending';
    this.order.orderPrice=this.order.noOfUnits!*this.property.shareVal!;
    this.order.customerId=this.customer;
    this.order.propertyId=this.property;

    this.orderRepository.saveOrder(this.order,this.logedInCustomer.id!,this.property.id!);

  }

  show = false;
  openpop() {
    this.show = true;
  }
  closepop() {
    this.show = false;
    this.isBooked=false;
  }

  bookProperty() {
    this.saveOrder();
    this.openpop();
    this.color='btn btn-warning';
    this.isBooked = true;
  }
}

