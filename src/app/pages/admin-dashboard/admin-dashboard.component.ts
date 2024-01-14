import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from 'src/app/core/services/http.service';
import { AddBillingComponent } from 'src/app/shared/components/add-billing/add-billing.component';
import { EditPriceComponent } from 'src/app/shared/components/edit-price/edit-price.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  displayedColumns: string[] = ['S.No', 'Email', 'Address', 'Date', 'E-bill-day', 'E-bill-night', 'G-bill', 'Total Amount', 'Status', 'E Usage /day', 'G Usage / Day'];
  dataSource = new MatTableDataSource();

  priceColumns: string[] =['E-day/kWh', 'E-night/kWh', 'G/kWh','standingCharge'];
  priceDataSource= new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private httpService: HttpService,
    private datePipe: DatePipe
    ) { }

  ngOnInit(): void {
    // this.dataSource.data = [
    //   {
    //     date: 'today', eBillDay: '089', email: 'rajini@gmail.com', address: 'new york ,chennai', eBillNight: '132', gBill: '678', total: '234', status: 'Paid', eUsage: '344', gUsage: '24'
    //   },
    //   {
    //     date: 'today', eBillDay: '347', eBillNight: '445', email: 'kamal@gmail.com', address: 'landon,chennai', gBill: '123', total: '200', status: 'Not Paid', eUsage: '978', gUsage: '54'
    //   },
    //   {
    //     date: 'yesterday', eBillDay: '989', eBillNight: '56', email: 'surya@gmail.com', address: 'mount road,us', gBill: '32', total: '234', status: 'Paid', eUsage: '344', gUsage: '24'
    //   },
    //   {
    //     date: 'today', eBillDay: '54', eBillNight: '67', gBill: '7654', total: '190', status: 'Not Paid', eUsage: '978', gUsage: '54'
    //   },
    //   {
    //     date: 'today', eBillDay: '9786', eBillNight: '234', gBill: '987', total: '234', status: 'Not Paid', eUsage: '978', gUsage: '54'
    //   },
    //   {
    //     date: 'tomrrow', eBillDay: '089', email: 'rajini@gmail.com', address: 'new york ,chennai', eBillNight: '132', gBill: '678', total: '234', status: 'Paid', eUsage: '344', gUsage: '24'
    //   },
    //   {
    //     date: 'today', eBillDay: '347', eBillNight: '445', email: 'kamal@gmail.com', address: 'landon,chennai', gBill: '123', total: '234', status: 'Not Paid', eUsage: '978', gUsage: '54'
    //   },
    //   {
    //     date: 'today', eBillDay: '989', eBillNight: '56', email: 'surya@gmail.com', address: 'mount road,us', gBill: '32', total: '234', status: 'Paid', eUsage: '344', gUsage: '24'
    //   },
    //   {
    //     date: 'today', eBillDay: '54', eBillNight: '67', gBill: '7654', total: '234', status: 'Not Paid', eUsage: '978', gUsage: '54'
    //   },
    //   {
    //     date: 'today', eBillDay: '9786', eBillNight: '234', gBill: '987', total: '234', status: 'Not Paid', eUsage: '978', gUsage: '54'
    //   },
    // ]
    this.getAllReadings();
    this.getCurrentPrice();
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  formatDate(date: Date) {
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }

  getCurrentPrice(){
    this.httpService.get("/admin/getCurrentPrice",'').subscribe(response=>{
      if(response){
        this.priceDataSource.data = response.data;
      }
    })
  }

  getAllReadings(){
    this.httpService.get("/admin/getAllReadings",'').subscribe(response=>{
      console.log(response);
      if(response){
        this.dataSource.data = response.data
      }      
    })
  }

  EditBillingData() {


    const config: MatDialogConfig = {
      panelClass: 'dialog-responsive',
      width: '80%',
      minWidth: '80%',
      minHeight: 'auto',
      maxHeight: '20rem',
      disableClose: true,
      data: {
        title: 'Edit Billing Price',
      },
    }
    const editBillingdialog = this.dialog.open(EditPriceComponent, config);

    editBillingdialog.afterClosed().subscribe((result: any) => {
      console.log('result', result)
      this.getCurrentPrice();
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openSnackBar(msg: any) {
    this.snackBar.open(msg, 'x', {
      duration: 10 * 1000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  logout() {
    localStorage.clear();
    window.location.reload();
  }

}
