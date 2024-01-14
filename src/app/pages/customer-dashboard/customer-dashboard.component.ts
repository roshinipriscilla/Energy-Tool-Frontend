import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from 'src/app/core/services/http.service';
import { AddBillingComponent } from 'src/app/shared/components/add-billing/add-billing.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss']
})
export class CustomerDashboardComponent implements OnInit {
  displayedColumns: string[] = ['S.No', 'Date', 'E-bill-day', 'E-bill-night', 'G-bill', 'Total Amount', 'Status', 'Action'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public isAddVoucher = false;
  public voucherAmount=0;
  public applyVoucherControl = new FormControl('', [Validators.required, Validators.minLength(8)]);


  constructor(private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private httpService: HttpService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    // Assign the data to the data source for the table to render
    // this.dataSource.data = [
    //   {
    //     date: 'today', eBillDay: '089', eBillNight: '132', gBill: '678', total: '234', status: 'Paid'
    //   },
    //   {
    //     date: 'today', eBillDay: '347', eBillNight: '445', gBill: '123', total: '200', status: 'Not Paid'
    //   },
    //   {
    //     date: 'yesterday', eBillDay: '989', eBillNight: '56', gBill: '32', total: '234', status: 'Paid'
    //   },
    //   {
    //     date: 'today', eBillDay: '54', eBillNight: '67', gBill: '7654', total: '190', status: 'Not Paid'
    //   },
    //   {
    //     date: 'today', eBillDay: '9786', eBillNight: '234', gBill: '987', total: '234', status: 'Not Paid'
    //   },
    //   {
    //     date: 'tomrrow', eBillDay: '089', eBillNight: '132', gBill: '678', total: '234', status: 'Paid'
    //   },
    //   {
    //     date: 'today', eBillDay: '347', eBillNight: '445', gBill: '123', total: '234', status: 'Not Paid'
    //   },
    //   {
    //     date: 'today', eBillDay: '989', eBillNight: '56', gBill: '32', total: '234', status: 'Paid'
    //   },
    //   {
    //     date: 'today', eBillDay: '54', eBillNight: '67', gBill: '7654', total: '234', status: 'Not Paid'
    //   },
    //   {
    //     date: 'today', eBillDay: '9786', eBillNight: '234', gBill: '987', total: '234', status: 'Not Paid'
    //   },
    // ]
    this.getUserProfile();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  formatDate(date: Date) {
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }
  getUserProfile(){
    let reqBody={
      userId: localStorage.getItem('userId')
    }
    this.httpService.post("/user/getUserProfile",reqBody).subscribe(response=>{
      console.log(response);
      this.voucherAmount = response.data.energy;
      this.dataSource.data = response.data.readings;
      
    });
  }

  addReadings() {

    const config: MatDialogConfig = {
      panelClass: 'dialog-responsive',
      width: '80%',
      minWidth: '80%',
      minHeight: 'auto',
      maxHeight: '20rem',
      disableClose: true,
      data: {
        title: 'Add Billing',
      },
    }
    const addBillingdialog = this.dialog.open(AddBillingComponent, config);

    addBillingdialog.afterClosed().subscribe((result: any) => {
      console.log('result', result)
      this.getUserProfile();
    })

  }
  openSnackBar(msg: any) {
    this.snackBar.open(msg, 'x', {
      duration: 10 * 1000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }


  applyVoucher() {
    console.log(this.applyVoucherControl.value);
    
    if (this.applyVoucherControl.invalid) {
      this.applyVoucherControl.touched;
      return
    }else{
      let reqBody={
        userId:localStorage.getItem('userId'),
        voucherCode: this.applyVoucherControl.value
      }
      this.httpService.post("/user/energyTopUp",reqBody).subscribe(response=>{
        if(response){
          const msg='Credit added to your account'
          this.openSnackBar(msg);
          this.isAddVoucher=false
          this.getUserProfile();

        }else{
          const msg='Failed to credit'
          this.openSnackBar(msg);
        }
      },err=>{
        console.log(err);        
        const msg= err.error.error ?err.error.error:"Failed to Credit"
        this.openSnackBar(msg);
      })
    }

  }

  resetVoucher() {
    this.applyVoucherControl.reset();
    this.isAddVoucher = false;

  }
  public resetClass() {

  }

  logout() {
    localStorage.clear();
    window.location.reload();
  }


  processedPayment(data: any) {
    console.log(data);
    if (this.voucherAmount < data.amountToBePaid) {
      const msg = `Insufficient Balance`
      this.openSnackBar(msg)
      return
    }else{
      let reqBody={
        readingId: data._id,
        totalAmount: data.amountToBePaid
      }
      this.httpService.post("/user/payment",reqBody).subscribe(response=>{
        if(response){
          const msg = 'Payment processed'
          this.openSnackBar(msg);
          this.getUserProfile();
        }
      },err=>{
        const msg = err.error.error ? err.error.error :"Payment Failed";
        this.openSnackBar(msg);
      })
    }

  }

}
