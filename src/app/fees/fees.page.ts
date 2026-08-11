import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OverlayEventDetail } from '@ionic/core/components';
import { FeesService } from 'src/app/services/fees.service';
import { Router } from "@angular/router";
import { IonLoaderService } from 'src/app/services/ion-loader.service';
import { IonModal } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { Device } from '@capacitor/device';
import { Platform } from '@ionic/angular';
import { Browser } from '@capacitor/browser';
import { ToastService } from 'src/app/services/toast.service';
@Component({
  selector: 'app-fees',
  templateUrl: './fees.page.html',
  styleUrls: ['./fees.page.scss'],
})
export class FeesPage implements OnInit {
  disableCollegeSegmentButton: boolean = true;

  selectedtab: any;
  feesdetail: any = [];
  showhide: any;
  receiptno: any;
  FeeReceiptUrl: any;
  receipt_url: any;
  paybleamount: any;
  bill_master_ids: any = [];
  checkboxcheck: any;
  concession_id: any;
  concession_amount: any;
  iFineAmount: any;
  adjustable_amount: any;
  dataLoaded: any;
  studentid: any;
  NoBillScheme: any;
  image: any;
  studentname: any;
  fathername: any;
  classname: any;
  dob: any;
  EnrollNo: any;
  Due_Bills: any = [];
  NoPendingBills: any;
  category: any;
  BillMasterId: any = [];
  due_type: any;
  pmt_gtway: any;
  PaymentMessage: any;
  Transactions: any;
  due_biLLLength: any;
  sessionCaption: any;
  DueBillAmountLength: any;
  TransactionsLength: any;
  PaymentDisplayMessage: any;
  checked: any;
  Selected_Bills: any = [];
  Due_Bills_Object: any = [];
  bill_array_Object: any = [];
  bill_array: any = [];
  hostel_bill_amt: any = [];
  other_bill_amt: any = [];
  bill_fine_amt: any = [];
  hostel_bill_cons_amt: any = [];
  other_bill_cons_amt: any = [];
  BillCalculation: any = [];
  bill_list: any = [];

  
  constructor(private feeservice: FeesService, private router: Router, private ionLoaderService: IonLoaderService,
    private storage: StorageService, public platform: Platform, private toastservice: ToastService) {
    this.Selected_Bills = '';
    this.due_biLLLength = 0;
    this.due_type = 'CD';
    this.pmt_gtway = 'AIRPAY';
    this.showhide = false;
    this.paybleamount = 0;
    this.studentid = localStorage.getItem('studentid');

    this.image = localStorage.getItem('photo');
    console.log('this.image-->', this.image);



    this.studentname = localStorage.getItem('studentname');
    this.fathername = localStorage.getItem('fathername');
    this.classname = localStorage.getItem('classname');
    this.dob = localStorage.getItem('dob');
    this.EnrollNo = localStorage.getItem('registration_number');
    this.category = 'paynow';
    //this.category = 'feedetail';
  }

  openreceipt_old(receiptno) {
    this.receiptno = receiptno.split('#');
    console.log('this.receiptno===>', this.receiptno[0]);

    //this.FeeReceiptUrl='http://192.168.2.4/development/college/neotia/neotia291222/fees_receives/get_receipt/'+this.receiptno[0]+'/N/'+localStorage.getItem('division_master_id')+'/app_url';
    this.FeeReceiptUrl = this.receipt_url + this.receiptno[0] + '/N/' + localStorage.getItem('division_master_id') + '/app_url';
    //Browser.open({url:'http://192.168.2.4/development/college/neotia/neotia291222/fees_receives/get_receipt/17622/N/11'})
    Browser.open({ url: this.FeeReceiptUrl });
  }
  OpenReceipt() {
    //assets/receipt_m.png
    Browser.open({ url: 'http://192.168.2.4/development/school/blue_bird_new/fees/ReceiptFrame.php?RecptNo=57868&StudentId=4543&ScriptName=ShowReceipt.php&ReportTypeClassCode=Y&ExcludeMasterSecure=Y&SessIdFees=14' });
  }
  paynow() {
    // this.router.navigate(["/healthmonthwise"]);

    this.feeservice.fees(this.bill_master_ids).subscribe((res) => {

      //  this.ionLoaderService.dismissLoader();
      console.log("res====x>", res);
      this.concession_id = res['concession_id'];
      this.concession_amount = res['concession_amount'];
      this.iFineAmount = res['iFineAmount'];
      this.adjustable_amount = res['adjustable_amount'];
      console.log('this.concession_id==>', this.concession_id);
      if (this.concession_id) {
        this.router.navigate(["/paymentconfirm", {
          id1: this.paybleamount,
          id2: this.bill_master_ids,
          id3: this.concession_id,
          id4: this.concession_amount,
          id5: this.iFineAmount,
          id6: this.adjustable_amount

        }]);
      }
      else {
        this.router.navigate(["/paymentconfirm", {
          id1: this.paybleamount,
          id2: this.bill_master_ids,
          id5: this.iFineAmount,
          id6: this.adjustable_amount
        }]);
      }


    });



  }
  /*allChecked() {
   return this.checkboxList.every(item => item.checked);
  }*/
  showhieclg(type) {
    console.log('type ==>', type);
    //this.showhide = true;
    if (this.showhide == true) {
      this.showhide = false
    }
    else {
      this.showhide = true;
    }

  }

  ionViewWillEnter() {

  }
  ionViewDidEnter() {
    this.ngOnInit();
    this.Selected_Bills = '';
  }
  ngOnInit() {
    this.disableCollegeSegmentButton = false;
    this.paybleamount = 0;
    this.selectedtab = 'College';
    // this.ionLoaderService.simpleLoader();

    this.feeservice.fees(this.studentid).subscribe((res) => {
      this.dataLoaded = true;
      console.log('res fees ==>', res);

      this.feesdetail = res;

      this.DueBillAmountLength = this.feesdetail.length;

      console.log('this.DueBillAmountLength 111==>', this.DueBillAmountLength);


      if (this.feesdetail.length == 0) {
        this.NoBillScheme = 'Y';
      }
      console.log('this.feesdetail==>', this.feesdetail);
      console.log('this.feesdetail.length==>', this.feesdetail.length);
      console.log('this.NoBillScheme.length==>', this.NoBillScheme);

      this.sessionCaption = this.feesdetail[0][0].SessionCaption;
      this.ionLoaderService.dismissLoader();

      //this.receipt_url=res['receipt_url'];
      // console.log('this.receipt_url==>',this.receipt_url);

    });




    this.GetDueBills();

    this.GetTransactions();




    //setTimeout(() => {}, 0);
    this.ionLoaderService.dismissLoader();
    this.dataLoaded = false;





  }

  toggleCheckbox(due_fee, id, bill_array, Due_Bills_Object) {
    //   toggleCheckbox(due_fee) {
    if (!this.Due_Bills[due_fee]) {
      this.Due_Bills[due_fee] = { bill_checked: false }; // Initialize if not existing
    }
    this.Due_Bills[due_fee].bill_checked = !this.Due_Bills[due_fee].bill_checked;
    //this.checkboxChanged(event,id,bill_array,Due_Bills_Object);

    this.GetcheckboxCheckUncheck(this.Due_Bills[due_fee].bill_checked, due_fee, id, bill_array, Due_Bills_Object);
  }

  GetcheckboxCheckUncheck(ischecked, due_fee, id, bill_array, Due_Bills_Object) {
    console.log("ischecked====>", ischecked);
    this.checkboxChanged_on_Item(ischecked, id, bill_array, Due_Bills_Object);
  }





  checkboxChanged_on_Item(event, id, bill_array, Due_Bills_Object) {

    console.log("id---->", id);//114293
    console.log("bill_array---->", bill_array.length);
    console.log("id bill_array---->", bill_array);
    console.log("id Due_Bills_Object---->", Due_Bills_Object);
    console.log("id event---->", event);

    //   [
    //     "114292",
    //     "114293",
    //     "114294",
    //     "114295",
    //     "114296"
    // ]


    this.BillMasterId = [];
    //if (event.target.checked) {
    if (event == true) {
      this.Selected_Bills = [];
      //Due_Bills_Object.forEach((bill, k) => {
      Due_Bills_Object.forEach((bill, k) => {
        console.log('bill 1==>', bill);
        if (id >= bill) {
          console.log("Herererererssss");
          this.Due_Bills[bill].bill_checked = true;
          this.Selected_Bills.push(this.Due_Bills[bill]);
          console.log("Hererererer==this.Selected_Bills", this.Selected_Bills);
        }

      })


    }
    else {

      Due_Bills_Object.forEach((bill, k) => {
        console.log('bill ==>', bill);
        if (id <= bill) {
          this.Due_Bills[bill].bill_checked = false;
          const index = this.Selected_Bills.indexOf(this.Due_Bills[bill]);
          if (index > -1) {
            this.Selected_Bills.splice(index, 1); // use index found, not k
          }
        }

      })


    }
    console.log("this.Due_Bills--->", this.Due_Bills);
    console.log("this.Selected_Bills[i].checked", this.Selected_Bills);
    //code to pass bill id
    for (let v = 0; v <= this.Selected_Bills.length - 1; v++) {
      this.BillMasterId.push(this.Selected_Bills[v].id);
    }

    this.bill_array = bill_array;
    this.bill_array_Object = Object.keys(bill_array);
    console.log("this.bill_array==", this.bill_array);
    console.log("this.bill_array length==", this.bill_array.length);
    for (let l = 0; l <= this.bill_array_Object.length; l++) {

    }



    console.log("this.BillMasterIdchecked==>:", this.BillMasterId);
    //  console.log("this.Selected_Bills[i].checked==>:", this.Selected_Bills.length);
    console.log("this.due_bills[i].checked==>:", this.Due_Bills.length);
  }













  //checkbox bils select
  //set key to 0
  //event,BillID,this.Due_Bills,Due_Bills_Object
  //1) Bill Id from array
  //2) Create New Array with bill_array
  //3) Due_Bills_Object Not Required
  //4) push bill id in from array detail this.BillMasterId 
  checkboxChanged_working(event, id, bill_array, Due_Bills_Object) {

    console.log("id---->xx", id);
    console.log("bill_array---->xx", bill_array.length);
    console.log("id bill_array---->xx", bill_array);
    console.log("id event----xxxxx>", event);
    this.BillMasterId = [];
    console.log('event.target.alt', event.target.alt);
    if (event.target.checked) {
      this.Selected_Bills = [];
      //Due_Bills_Object.forEach((bill, k) => {

      // for(i = 0; i < (objCheckBox.alt-1); i++)
      // 	{
      // 		//alert(objBills[i].alt);
      // 		objBills[i].checked = true;
      // 	}


      Due_Bills_Object.forEach((bill, k) => {
        console.log('bill ==>', bill);
        if (id >= bill) {
          this.Due_Bills[bill].bill_checked = true;
          this.Selected_Bills.push(this.Due_Bills[bill]);
        }

      })
      // for (let k = 0; k <= bill_array.length; k++) {
      //   if (k <= id) {
      //     console.log("this.Due_Bills[k]==>", this.Due_Bills[k]);
      //     this.Due_Bills[k].bill_checked = true;
      //     this.Selected_Bills.push(this.Due_Bills[k]);
      //   }
      // }


    }
    else {
      // for (let k = this.Due_Bills.length - 1; k >= 0; k--) { // iterate backwards to avoid indexing issues
      //   if (k >= id) {
      //     console.log("this.Due_Bills[k]==>", this.Due_Bills[k]);
      //     this.Due_Bills[k].bill_checked = false;
      //    // Find the index of the current Due_Bill in Selected_Bills
      //     const index = this.Selected_Bills.indexOf(this.Due_Bills[k]);
      //     if (index > -1) {
      //       this.Selected_Bills.splice(index, 1); // use index found, not k
      //     }
      //   }
      // }
      Due_Bills_Object.forEach((bill, k) => {
        console.log('bill ==>', bill);
        if (id <= bill) {
          this.Due_Bills[bill].bill_checked = false;
          const index = this.Selected_Bills.indexOf(this.Due_Bills[bill]);
          if (index > -1) {
            this.Selected_Bills.splice(index, 1); // use index found, not k
          }
        }

      })


    }
    console.log("this.Due_Bills--->", this.Due_Bills);
    console.log("this.Selected_Bills[i].checked", this.Selected_Bills);
    //code to pass bill id
    for (let v = 0; v <= this.Selected_Bills.length - 1; v++) {
      this.BillMasterId.push(this.Selected_Bills[v].id);
    }

    this.bill_array = bill_array;
    this.bill_array_Object = Object.keys(bill_array);
    console.log("this.bill_array==", this.bill_array);
    console.log("this.bill_array length==", this.bill_array.length);
    for (let l = 0; l <= this.bill_array_Object.length; l++) {
      //this.BillMasterId.push(this.Selected_Bills[v].id);
      //this.hostel_bill_amt['hostel_bill_amt'][]
      //console.log("--<>",bill_array[l]);

      // console.log('bill_array====>',this.bill_array[this.bill_array_Object[l]]);
      // console.log('ID bill_array====>',this.bill_array_Object[l]);

      // console.log('11111 ID bill_array====>',this.bill_array[this.bill_array_Object[l]].hostel_bill_amt);


      //  this.hostel_bill_amt['hostel_bill_amt'][this.bill_array_Object[l]]=this.bill_array[this.bill_array_Object[l]].hostel_bill_amt;
      // this.other_bill_amt['other_bill_amt'][this.bill_array_Object[l]]=this.bill_array[this.bill_array_Object[l]].other_bill_amt;
      // this.bill_fine_amt['bill_fine_amt'][this.bill_array_Object[l]]=this.bill_array[this.bill_array_Object[l]].bill_fine_amt;
      // this.hostel_bill_cons_amt['hostel_bill_cons_amt'][this.bill_array_Object[l]]=this.bill_array[this.bill_array_Object[l]].hostel_bill_cons_amt;
      // this.other_bill_cons_amt['other_bill_cons_amt'][this.bill_array_Object[l]]=this.bill_array[this.bill_array_Object[l]].other_bill_cons_amt;
    }


    //console.log("this.hostel_bill_amt--<>",this.hostel_bill_amt);
    // console.log("this.other_bill_amt--<>",this.other_bill_amt);
    // console.log("this.bill_fine_amt--<>",this.bill_fine_amt);
    // console.log("this.hostel_bill_cons_amt--<>",this.hostel_bill_cons_amt);
    // console.log("this.other_bill_cons_amt--<>",this.other_bill_cons_amt);

    //   this.bill_array_Val=bill_array;

    //   this.bill_array_Val.forEach((bills, L) => {
    //   //this.BillMasterId.push(this.Selected_Bills[bill].id);
    //   console.log('Billssss =>>',L);
    // })

    console.log("this.BillMasterIdchecked==>:", this.BillMasterId);
    //  console.log("this.Selected_Bills[i].checked==>:", this.Selected_Bills.length);
    console.log("this.due_bills[i].checked==>:", this.Due_Bills.length);
  }

  checkboxChanged(event, BillID, bill_array, index) {
    console.log("BillID---->xx", BillID);
    console.log("bill_array---->YY", bill_array);
    console.log("this.bill_list---->YY", this.bill_list);
     console.log('event alt==>', event.target.alt);
this.BillMasterId = [];
    if (event.target.checked) {
      this.Selected_Bills = [];

      for (let k = 0; k <= bill_array.length; k++) {
        if (k <= event.target.alt) {
          this.Due_Bills[k].bill_checked = true;
          console.log("[k] value ==>",k);
          console.log("this.bill_array[k]==>",bill_array[k]);
          this.Selected_Bills.push(bill_array[k]);
          //this.BillMasterId.push(bill_array[k]);
          
        }

      }
    }
    
    else {
      for (let k = 0; k <= this.Selected_Bills.length; k++) {
        if (event.target.alt <= k) {
          console.log("Unchecked [k]---->",k);
          console.log("event.target.alt---->",event.target.alt);

          this.Due_Bills[k].bill_checked = false;
          console.log("this.Due_Bills[k]---->",this.Due_Bills[k]);
          console.log("event.target.alt---->",event.target.alt);
          const index = this.Selected_Bills.indexOf(bill_array[k]);
          
          console.log("index[k]---->",index);
          
          if (index > -1) {
            this.Selected_Bills.splice(index, 1); // use index found, not k
           // this.BillMasterId.splice(index, 1);BillMasterId
            
          }
        }
      }
    }
      for (let v = 0; v <= this.Selected_Bills.length - 1; v++) {
      this.BillMasterId.push(this.Selected_Bills[v].id);
    }
    console.log("this.Selected_Bills ==>", this.Selected_Bills);
    //this.BillMasterId = this.Selected_Bills;
  }//this.BillMasterId

  checkboxChanged_dummy(event, id, bill_array, Due_Bills_Object) {

       console.log("id---->xx", id);
    console.log("bill_array---->xx", bill_array.length);
    console.log("id bill_array---->xx", bill_array);
    console.log("id event----xxxxx>", event);
    this.BillMasterId = [];
     console.log('event.target.alt', event.target.alt);
    if (event.target.checked) {
      this.Selected_Bills = [];
      Due_Bills_Object.forEach((bill, k) => {
        console.log('bill ==>', bill);
        if (id >= bill) {
          this.Due_Bills[bill].bill_checked = true;
          this.Selected_Bills.push(this.Due_Bills[bill]);
        }

      })

    }
    else {
      Due_Bills_Object.forEach((bill, k) => {
        console.log('bill ==>', bill);
        if (id <= bill) {
          this.Due_Bills[bill].bill_checked = false;
          const index = this.Selected_Bills.indexOf(this.Due_Bills[bill]);
          if (index > -1) {
            this.Selected_Bills.splice(index, 1); // use index found, not k
          }
        }

      })


    }
    console.log("this.Due_Bills--->", this.Due_Bills);
    console.log("this.Selected_Bills[i].checked", this.Selected_Bills);
    //code to pass bill id
    for (let v = 0; v <= this.Selected_Bills.length - 1; v++) {
      this.BillMasterId.push(this.Selected_Bills[v].id);
    }

    this.bill_array = bill_array;
    this.bill_array_Object = Object.keys(bill_array);
    console.log("this.bill_array==", this.bill_array);
    console.log("this.bill_array length==", this.bill_array.length);
    console.log("this.BillMasterIdchecked==>:", this.BillMasterId);
    //  console.log("this.Selected_Bills[i].checked==>:", this.Selected_Bills.length);
    console.log("this.due_bills[i].checked==>:", this.Due_Bills.length);
  }






  removeCheckedFromArray(checkbox: String) {
    return this.checked.findIndex((category) => {
      return category === checkbox;
    })
  }




  //First time due bills

  GetDueBills_Working() {
    //  this.BillMasterId = [];
    console.log('this.due_type in getBills==>', this.due_type);
    this.feeservice.due_billd(this.studentid, this.due_type).subscribe((res1) => {
      //const billsArray = Object.keys(res1['bill_list']).sort((a, b) => parseInt(a) - parseInt(b)).map(key => res1['bill_list'][key]);
      console.log('res1====>', res1);
      this.Due_Bills = res1['bill_list'];//['due_bill'];


      let billsArray = Object.values(this.Due_Bills);
      console.log('billsArray==>', billsArray);
      // Sort the array based on the `effective_date`
      // billsArray.sort((a, b) => {
      //     // Parse the date strings into Date objects for comparison
      //     let dateA = new Date(a.effective_date);
      //     let dateB = new Date(b.effective_date);
      //     return dateA - dateB;
      // });

      // // If you need the sorted array back in object form, convert it back to an object
      // let sortedBills = {};
      // billsArray.forEach(bill => {
      //     sortedBills[bill.id] = bill;
      // });

      // Output the sorted object
      //console.log(sortedBills);











      //this.Due_Bills_Object = res1['bill_ids_New'];

      // console.log('res11111 billsArray==>',billsArray);

      console.log('res11111==>', res1);
      //if (this.Due_Bills[0].NoPaymnet != 'N') {
      if (res1[0].NoPaymnet != 'N') {
        this.PaymentMessage = res1[0].NoPaymnet;
        console.log('Pending Amounts Here this.PaymentMessage-->', this.PaymentMessage);
        console.log('this.Due_Bills inside ==>', this.Due_Bills);
        this.PaymentDisplayMessage = res1[0].NoPaymnet;
      }
      else {
        this.PaymentDisplayMessage = 'No Dues Found..!!';
      }




      this.Due_Bills = res1['bill_list'];//['due_bill'];
      this.Due_Bills_Object = Object.keys(res1['bill_list']);//['due_bill'];

      //  this.Due_Bills_Object = res1['bill_ids_New'];


      this.BillCalculation = res1['bill_Calculations'];
      console.log('this.Due_Bills==>', this.Due_Bills);

      console.log('this.Due_Bills_Object==>', this.Due_Bills_Object);


      this.due_biLLLength = this.Due_Bills_Object.length;
      console.log('this.due_biLLLength length==>', this.due_biLLLength);




      console.log('this.Due_Bills.lenght==>', this.Due_Bills.length);

      for (let i = 0; i < this.Due_Bills.length; i++) {
        //console.log("billss -->",this.Due_Bills[i].billno);
        // this.BillMasterId.push(this.Due_Bills[i].billno);
      }

      //console.log("this.BillMasterId-- -->",this.BillMasterId);

      if (this.Due_Bills.length == 0) {
        this.NoPendingBills = 'Y';
      }

    });
  }



  //New With 0 Index
  GetDueBills() {
    console.log('this.due_type in getBills==>', this.due_type);
    this.feeservice.due_billd(this.studentid, this.due_type).subscribe((res1) => {
      console.log('res1====>', res1);
      // this.Due_Bills = res1['bill_list'];//['due_bill'];
      this.Due_Bills = res1['bill_counter'];//['due_bill'];
      console.log('this.Due_Bills==>', this.Due_Bills);
      this.bill_list = res1['bill_list'];//['due_bill'];


      let billsArray = Object.values(this.Due_Bills);
      console.log('billsArray==>', billsArray);

      console.log('res11111==>', res1);
      if (res1[0].NoPaymnet != 'N') {
        this.PaymentMessage = res1[0].NoPaymnet;
        console.log('Pending Amounts Here this.PaymentMessage-->', this.PaymentMessage);
        console.log('this.Due_Bills inside ==>', this.Due_Bills);
        this.PaymentDisplayMessage = res1[0].NoPaymnet;
      }
      else {
        this.PaymentDisplayMessage = 'No Dues Found..!!';
      }




      this.Due_Bills = res1['bill_counter'];//['due_bill'];
      this.Due_Bills_Object = Object.keys(res1['bill_counter']);//['due_bill'];

      this.BillCalculation = res1['bill_Calculations'];
      console.log('this.Due_Bills==>', this.Due_Bills);
      console.log('this.Due_Bills_Object==>', this.Due_Bills_Object);
      this.due_biLLLength = this.Due_Bills_Object.length;
      console.log('this.due_biLLLength length==>', this.due_biLLLength);
      console.log('this.Due_Bills.lenght==>', this.Due_Bills.length);

      for (let i = 0; i < this.Due_Bills.length; i++) {
        //console.log("billss -->",this.Due_Bills[i].billno);
        // this.BillMasterId.push(this.Due_Bills[i].billno);
      }

      if (this.Due_Bills.length == 0) {
        this.NoPendingBills = 'Y';
      }

    });
  }



  onlinereceiptopen(id) {
    console.log('id----->', id);
    this.router.navigate(["/onlinereceipt", id]);

  }


  GetTransactions() {
    this.feeservice.transactions().subscribe((res12) => {
      this.Transactions = res12;
      this.TransactionsLength = this.Transactions.length;

      console.log('this.TransactionsLength 11==>', this.TransactionsLength);
      console.log('this.Transactions 11==>', this.Transactions);

    });
  }



  isChecked() {
    return this.bill_master_ids.length > 0;
  }

  preceedtoconfirm() {
//this.Selected_Bills
console.log("hererereer ->",this.BillMasterId);
console.log("checkboxxxxxxx ->",this.Selected_Bills);
    if (this.Selected_Bills.length > 0) {
      let BillMasters = JSON.stringify(this.BillMasterId);
      console.log("etl BillMasters.BillMasterId---->", BillMasters);
      console.log("this.BillCalculation.BillMasterId---->", this.BillCalculation);
      console.log("this.this.pmt_gtway---->", this.pmt_gtway);

      

      this.router.navigate(["/paynowproceed", BillMasters, this.pmt_gtway]);
    }
    else {
      this.toastservice.presentToast('Please Select Bill to Proceed..!!');
    }
  }
  payment_type(due_type) {
    this.due_type = due_type;
    console.log("this.due_type-->", this.due_type);


    this.GetDueBills();

    const card = document.querySelector('.custom-card2');


  }

  getpmt_gtway(pmt_gtway) {
    this.pmt_gtway = pmt_gtway;
    console.log("this.pmt_gtway --->", this.pmt_gtway);
  }

  segmentChanged(even) {
    console.log('valsssssss==>', this.checkboxcheck);
    //  if(this.checkboxcheck == false)
    //  {
    console.log('console.log ==>', even['detail'].value);
    this.selectedtab = even['detail'].value;
    // }
  }




}
