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
import { ActivatedRoute } from "@angular/router";
//import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { InAppBrowser, InAppBrowserObject } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-paynowproceed',
  templateUrl: './paynowproceed.page.html',
  styleUrls: ['./paynowproceed.page.scss'],
})
export class PaynowproceedPage implements OnInit {
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
  PaymentGateWay: any;
  due_amount: any;
  fine_amount: any;
  total_amount: any;



  adm_session_id: any;
  bill_id_list: any;
  buyer_address: any;
  buyer_city: any;
  buyer_country: any;
  buyer_email: any;
  buyer_first_name: any;
  buyer_phone: any;
  buyer_pin_code: any;
  buyer_state: any;
  cls_acc_type: any;
  concession_json: any;
  enroll_no: any;
  fine_json: any;
  frm_pmt_confirm: any;
  payment_type: any;
  payopt: any;
  student_fee_concession_id: any;
  student_id: any;
  student_type: any;
  transid: any;
  buyer_last_name: any;
  pageContentUrl: any;
  Transactions: any;
  pg_res_uc: any;
  constructor(private feeservice: FeesService, private router: Router, private ionLoaderService: IonLoaderService,
    private storage: StorageService, public platform: Platform, private route: ActivatedRoute, private inAppBrowser: InAppBrowser) {
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

    this.BillMasterId = JSON.parse(this.route.snapshot.paramMap.get('id'));
    this.PaymentGateWay = this.route.snapshot.paramMap.get('id1');
    console.log("this.BillMasterId-->11", this.BillMasterId);
    console.log("this.PaymentGateWay-->11", this.PaymentGateWay);
  }

  openreceipt(receiptno) {
    this.receiptno = receiptno.split('#');
    console.log('this.receiptno===>', this.receiptno[0]);

    //this.FeeReceiptUrl='http://192.168.2.4/development/college/neotia/neotia291222/fees_receives/get_receipt/'+this.receiptno[0]+'/N/'+localStorage.getItem('division_master_id')+'/app_url';
    this.FeeReceiptUrl = this.receipt_url + this.receiptno[0] + '/N/' + localStorage.getItem('division_master_id') + '/app_url';
    //Browser.open({url:'http://192.168.2.4/development/college/neotia/neotia291222/fees_receives/get_receipt/17622/N/11'})
    Browser.open({ url: this.FeeReceiptUrl });
  }

  GetTransactions() {
    this.feeservice.transactions().subscribe((res12) => {
      this.Transactions = res12;
      console.log('this.Transactions 11==>', this.Transactions);

    });
  }

  paynow_old() {
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

  ngOnInit() {
    this.disableCollegeSegmentButton = false;
    this.paybleamount = 0;
    this.selectedtab = 'College';
    // this.ionLoaderService.simpleLoader();

    this.feeservice.fees(this.studentid).subscribe((res) => {
      this.dataLoaded = true;
      console.log('res fees ==>', res);
      this.feesdetail = res;
      if (this.feesdetail.length == 0) {
        this.NoBillScheme = 'Y';
      }
      console.log('this.feesdetail==>', this.feesdetail);
      this.ionLoaderService.dismissLoader();

      //this.receipt_url=res['receipt_url'];
      // console.log('this.receipt_url==>',this.receipt_url);

    });


    //this.ionLoaderService.simpleLoader();
console.log("this.BillMasterId here  ",this.BillMasterId);
    this.feeservice.GetAmountDetail(this.BillMasterId, this.PaymentGateWay).subscribe((res1) => {

       console.log('this.res1 ==>', res1);
      this.due_amount = res1['due_amount'];
      this.fine_amount = res1['fine_amount'];
      this.concession_amount = res1['concession_amount'];
      this.total_amount = res1['total_amount'];

    //this.ionLoaderService.dismissLoader();

      this.adm_session_id = res1['adm_session_id'];
      this.bill_id_list = res1['bill_id_list'];
      this.buyer_address = res1['buyer_address'];

      this.buyer_city = res1['buyer_city'];
      this.buyer_country = res1['buyer_country'];
      this.buyer_email = res1['buyer_email'];
      this.buyer_first_name = res1['buyer_first_name'];
      this.buyer_phone = res1['buyer_phone'];
      this.buyer_pin_code = res1['buyer_pin_code'];
      this.buyer_state = res1['buyer_state'];
      this.cls_acc_type = res1['cls_acc_type'];
      this.concession_json = res1['concession_json'];
      this.enroll_no = res1['enroll_no'];
      this.fine_json = res1['fine_json'];
      this.frm_pmt_confirm = res1['frm_pmt_confirm'];
      this.payment_type = res1['payment_type'];
      this.payopt = res1['payopt'];
      this.student_fee_concession_id = res1['student_fee_concession_id'];
      this.student_id = res1['student_id'];
      this.student_type = res1['student_type'];
      this.transid = res1['transid'];

      this.buyer_last_name = res1['buyer_last_name'];

      this.pg_res_uc = res1['pg_res_uc'];


      


      /*
      take all parameter from here and pass in PayNow
      */

    });

    //setTimeout(() => {}, 0);
    this.ionLoaderService.dismissLoader();
    this.dataLoaded = false;


    this.GetTransactions();
  }

  openresponse() {

    Browser.open({ url: 'https://literom.co.in/literom_app_api/bluebird/api/fee_payment_airpay_response.php' });
  }

  PayNow() {


    /*
    
    call api fee_payment_airpay_confirm.php
    and send on payment gateway using InAppBrowser
     */
    //let pageContentUrl=`${environment.baseUrl}fee_payment_airpay_confirm.php`;
    //buyer_last_name

    //https://thebluebird.in/student/home.php?pages=pay-fees-proceed
    

    if (this.PaymentGateWay == 'PNB') 
    {
      this.pageContentUrl = `https://thebluebird.in/student/Test_fee_payment_pg_confirm.php?due_amount=${this.due_amount}&pg_res_uc=${this.pg_res_uc}&fine_amount=${this.fine_amount}
      &concession_amount=${this.concession_amount}&total_amount=${this.total_amount}&adm_session_id=${this.adm_session_id}&bill_id_list=${this.bill_id_list}
      &buyer_address=${this.buyer_address}&buyer_city=${this.buyer_city}&buyer_country=${this.buyer_country}&buyer_email=${this.buyer_email}&buyer_first_name=${this.buyer_first_name}
      &buyer_phone=${this.buyer_phone}&buyer_pin_code=${this.buyer_pin_code}&buyer_state=${this.buyer_state}&cls_acc_type=${this.cls_acc_type}&concession_json=${this.concession_json}
      &enroll_no=${this.enroll_no}&fine_json=${this.fine_json}&frm_pmt_confirm=${this.frm_pmt_confirm}&payment_type=${this.payment_type}&payopt=${this.payopt}
      &student_fee_concession_id=${this.student_fee_concession_id}&student_id=${this.student_id}&buyer_last_name=${this.buyer_last_name}&student_type=${this.student_type}&transid=${this.transid}&StudentLoginId=${localStorage.getItem('student_reg_details_id')}`;
    
    }
    else 
    {
    
      
      this.pageContentUrl = `${environment.baseUrl}fee_payment_airpay_confirm.php?due_amount=${this.due_amount}&fine_amount=${this.fine_amount}
  &concession_amount=${this.concession_amount}&total_amount=${this.total_amount}&adm_session_id=${this.adm_session_id}&bill_id_list=${this.bill_id_list}
  &buyer_address=${this.buyer_address}&buyer_city=${this.buyer_city}&buyer_country=${this.buyer_country}&buyer_email=${this.buyer_email}&buyer_first_name=${this.buyer_first_name}
  &buyer_phone=${this.buyer_phone}&buyer_pin_code=${this.buyer_pin_code}&buyer_state=${this.buyer_state}&cls_acc_type=${this.cls_acc_type}&concession_json=${this.concession_json}
  &enroll_no=${this.enroll_no}&fine_json=${this.fine_json}&frm_pmt_confirm=${this.frm_pmt_confirm}&payment_type=${this.payment_type}&payopt=${this.payopt}
  &student_fee_concession_id=${this.student_fee_concession_id}&student_id=${this.student_id}&buyer_last_name=${this.buyer_last_name}&student_type=${this.student_type}&transid=${this.transid}&StudentLoginId=${localStorage.getItem('student_reg_details_id')}`;
  //console.log("here is resppp",this.pageContentUrl);
   // return false;
    }

    //window.open(pageContentUrl);
    // const browserRef =  this.inAppBrowser
    // .create(
    //   pageContentUrl ,
    //   '_self',
    //   'toolbar=yes,fullscreen=no,hidden=no,location=no,clearsessioncache=yes,clearcache=yes,zoom=no',
    // );


    //this.inAppBrowser.create(pageContentUrl, '_self', {location: 'yes'});

    // const browser: InAppBrowserObject = this.inAppBrowser.create(pageContentUrl, '_blank', { location: 'yes', hideurlbar: 'no' });
    // browser.show();

    console.log('this.pageContentUrl====>', this.pageContentUrl);
    //return false;
    //Browser.open(this.pageContentUrl);
    //return false;
     Browser.open({ url: this.pageContentUrl });


    //   this.router.navigate(["/home"]);
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 3000); // 3000 milliseconds = 3 seconds






  }



  /* onCheckboxChange1(index, event) {
    // this.paybleamount=0;
     console.log('this.feesdetail[index]==>',this.feesdetail[index]['FeeBillMaster'].id);
     
 
     if (event.detail.checked) {
         this.paybleamount += +this.feesdetail[index]['FeeBillMaster'].amount;
         this.bill_master_ids.push(this.feesdetail[index]['FeeBillMaster'].id);
     } else {
         this.paybleamount -= this.feesdetail[index]['FeeBillMaster'].amount;
         this.bill_master_ids.splice(this.feesdetail[index]['FeeBillMaster'].id,index);
     }
      console.log("this.paybleamount===>",this.paybleamount);
      console.log("this.bill_master_ids===>",this.bill_master_ids);
 }*/

  /*isChecked() {
    console.log("=====>",this.feesdetail.some(item => item.checked));
    return this.feesdetail.some(item => item.checked);
  }*/



  isChecked() {
    return this.bill_master_ids.length > 0;
  }
  /*  onCheckboxChange(index, event) {
      
       console.log('event==>',event);
    console.log('this.feesdetail[index]==>',this.feesdetail[index]['FeeBillMaster'].id);
    console.log('this.paybleamount 1==>',this.paybleamount);
     //this.paybleamount=0;
    if (event.detail.checked) {
        //this.paybleamount += +this.feesdetail[index]['FeeBillMaster'].amount;/commented
        this.paybleamount += +this.feesdetail[index]['FeeBillMaster'].due_amount;
        this.bill_master_ids.push(this.feesdetail[index]['FeeBillMaster'].id);
        this.checkboxcheck = true;
    } else {
        //this.paybleamount -= this.feesdetail[index]['FeeBillMaster'].amount;//commented
        this.paybleamount -= this.feesdetail[index]['FeeBillMaster'].due_amount;
        let id = this.feesdetail[index]['FeeBillMaster'].id;
        let idx = this.bill_master_ids.indexOf(id);
        this.bill_master_ids.splice(idx, 1);
        console.log('this.bill_master_ids====>',this.bill_master_ids);
        console.log('this.bill_master_ids.lenght====>',this.bill_master_ids.length);
        if(this.bill_master_ids.length == 0)
        {
          this.checkboxcheck = false;
        }
        //this.checkboxcheck =this.bill_master_ids.lenght > 0;
    }
    console.log("this.paybleamount===>",this.paybleamount);
    console.log("this.bill_master_ids===>",this.bill_master_ids);
  
  console.log('this.checkboxcheck',this.checkboxcheck);
    if(this.checkboxcheck == false)
    {
     this.disableCollegeSegmentButton = false;
   } else {
     this.disableCollegeSegmentButton = true;
   }
  }
  */

  /*
  onCheckboxChange(index, event) {
    console.log('this.feesdetail[index]==> ',this.feesdetail[index]['FeeBillMaster'].id);
  
    if (event.detail.checked) {
        this.paybleamount += +this.feesdetail[index]['FeeBillMaster'].amount;
        this.bill_master_ids.push(this.feesdetail[index]['FeeBillMaster'].id);
        this.isChecked = true;
    } else {
        this.paybleamount -= this.feesdetail[index]['FeeBillMaster'].amount;
        let id = this.feesdetail[index]['FeeBillMaster'].id;
        let idx = this.bill_master_ids.indexOf(id);
        this.bill_master_ids.splice(idx, 1);
        this.isChecked = this.bill_master_ids.length > 0;
    }
    console.log("this.paybleamount===>",this.paybleamount);
    console.log("this.bill_master_ids===>",this.bill_master_ids);
  }
  */




  segmentChanged(even) {
    console.log('valsssssss==>', this.checkboxcheck);
    //  if(this.checkboxcheck == false)
    //  {
    console.log('console.log ==>', even['detail'].value);
    this.selectedtab = even['detail'].value;
    // }





  }




}