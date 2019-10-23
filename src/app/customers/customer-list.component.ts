import { Component, OnInit } from "@angular/core";
import { Icustomer } from "./customer";
import { customerService } from "./customer.service";

@Component ({
    selector : 'pm-customers',
    templateUrl : './customer-list.component.html',
    styleUrls: ['./customer-list.component.css']
})

export class customerListComponent implements OnInit {
    pageTitle: string ='customer List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage : boolean = false;
    errorMessage : string;

    _listFilter : string;
    get listFilter(): string{
      return this._listFilter;
    }
    set listFilter(value:string){
      this._listFilter = value;
      this.filteredcustomers = this.listFilter ? this.performFilter(this.listFilter) : this.customers;
    }

    filteredcustomers : Icustomer[];
    customers : Icustomer[] = [];

    constructor(private customerService : customerService){

    }

    onRatingClicked(message:string):void{
      this.pageTitle = 'customer List: '+message;
    }

    performFilter(filterBy : string): Icustomer[]{
      filterBy = filterBy.toLocaleLowerCase();
      return this.customers.filter((customer: Icustomer) => 
            customer.customerName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    toggleImage() : void {
      this.showImage = !this.showImage;
    }

    ngOnInit() : void {
        this.customerService.getcustomers().subscribe(
        customers => {
           this.customers = customers;
           this.filteredcustomers = this.customers;
        },
        error => this.errorMessage = <any>error
        );
    }
}