import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from './property.model';
import { PropertyOrder } from './order.model';
import { Customer } from './customer.model';
import { Admin } from './admin.model';

const PROTOCOL = 'http';
const PORT = 8082;

@Injectable({
  providedIn: 'root',
 })
export class RestDataSource {
   
  // baseUrl: string;

  constructor(private http: HttpClient) {
    // this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }

  getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`http://localhost:8080/api/property`);
  }

  getProperty(pid:number): Observable<Property> {
    return this.http.get<Property>(`http://localhost:8080/api/property/${pid}`);
  }

  saveProperty(property: Property, adminId: number): Observable<Property> {
    if (property.id == null || property.id == 0) {
      return this.http.post<Property>(
        `http://localhost:8080/api/property/${adminId}`,
        property
      );
    } else {
      return this.http.put<Property>(
        `http://localhost:8080/api/update-property/${adminId}`,
        property
      );
    }
  }

  deleteProperty(id: Number): Observable<Property> {
    return this.http.delete<Property>(`http://localhost:8080/api/property/${id}`);
  }

  saveOrder(order: PropertyOrder,customerId:number,propertyId:number): Observable<PropertyOrder> {
    return this.http.post<PropertyOrder>(  `http://localhost:8082/api/saveorder/customer/${customerId}/property/${propertyId}`, order);
  }

  getOrders(): Observable<PropertyOrder[]> {
    return this.http.get<PropertyOrder[]>( 'http://localhost:8082/api/allorders');
  }

  deleteOrder(id: number): Observable<PropertyOrder> {
    return this.http.delete<PropertyOrder>(`http://localhost:8082/api/propertyorder/${id}`);
  }

  updateOrder(order: PropertyOrder,cid:number,pid:number): Observable<PropertyOrder> {
    return this.http.put<PropertyOrder>(
      `http://localhost:8082/api/saveorder/customer/${cid}/property/${pid}`, order);
  }

  getAdminDetails(): Observable<Admin[]> {
    return this.http.get<Admin[]>('http://localhost:8083/api/admin');
  }

  verifyAdmin(adminName: any, password: any): Observable<String> {
    console.log('verify');
    return this.http.get<String>(
      `http://localhost:8083/api/verify-admin/${adminName}/${password}`
    );
  }

  getAdmin(adminName: any, password: any): Observable<Admin> {
    console.log('getAdmin');
    return this.http.get<Admin>(
     `http://localhost:8083/api/admin/${adminName}/${password}`
    );
  }


  saveCustomer(customer: Customer): Observable<Customer> {
    console.log('rest ->'+customer);
    return this.http.post<Customer>( 'http://localhost:8081/api/customer', customer);
  }

  getAllCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`http://localhost:8081/api/customer/`);
  }


  verifyCustomer(customerMail:any, password:any): Observable<String>{
    return this.http.get<String>(`http://localhost:8081/api/verify-customer/${customerMail}/${password}`);
  }

   getCustomer(customerEmail: string, password: string) : Observable<Customer> {
    console.log('in data source'+customerEmail+' '+password)
    return this.http.get<Customer>(
     `http://localhost:8081/api/customer/${customerEmail}/${password}`
    );
  }
}
