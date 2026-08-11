import { Component, OnInit,Optional } from '@angular/core';
import { IonModal,ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { HomeworkService } from 'src/app/services/homework.service';
import { Router } from "@angular/router";
import { IonLoaderService } from 'src/app/services/ion-loader.service';
import { App } from '@capacitor/app';
import { Location } from '@angular/common';
import { empty } from 'rxjs';
import { Browser } from '@capacitor/browser';
import { StudycontentmodalPage } from '../modals/studycontentmodal/studycontentmodal.page';
@Component({
  selector: 'app-homework',
  templateUrl: './homework.page.html',
  styleUrls: ['./homework.page.scss'],
})
export class HomeworkPage implements OnInit {
  fromdate:any;
  todate:any;
  selectedtab:any;
  homeworks:any=[];
  homeworks_object:any=[];
  SubmitedHomeWorks:any;
  PendingHomeWorks:any;
  Submited_PendingHomeWorks:any;
  messagge:any;
  status:any;
  constructor(private homeworkservice: HomeworkService,private router: Router,private ionLoaderService: IonLoaderService,public modalController: ModalController) {
     this.selectedtab='pending';
    console.log("sdsdsdd outer=>",);
   
  }
  opefile(filename)
  {
    console.log('filename ==>',filename);
    console.log('path here =>','192.168.2.4/development/college/neotia/app/webroot/upload/student_assignment/'+filename);
   // Browser.open({url: 'http://192.168.2.4/development/college/neotia/app/webroot/upload/student_assignment/'+filename})
      Browser.open({url: filename})
  }

  submithomework(id,id1,id2)
  {
    //this.router.navigate(["/contentdetail",id]);
    console.log('title ==>',id);
    console.log('id1 ==>',id1);
    console.log('id2 ==>',id2);
    this.router.navigate(["/submithomework",id,id1,id2]);
  }
  
  ngOnInit() {
 //   this.ionLoaderService.simpleLoader();
     
    this.homeworkservice.homework().subscribe((res) =>{
      console.log('homework 11--> ',res);
      this.homeworks=res['HomeworkInfo'];
      this.homeworks_object=Object.keys(res['HomeworkInfo']);
      console.log('this.homeworks_object 11--> ',this.homeworks_object);
      console.log('this.homeworks 11--> ',this.homeworks);
     // this.homeworks = res['data'];
      //this.SubmitedHomeWorks = res['submit_homework'];
    //  this.PendingHomeWorks = res['unsubmit_homework'];
      
     // console.log('this.SubmitedHomeWorks ==> ',this.SubmitedHomeWorks);
      

      
         /* if(res['status'] == true)
      {
        console.log('this.homeworks 11==>',this.homeworks.length);
        this.homeworks_object=Object.keys(res['data']);
        console.log('objects ==>',this.homeworks_object.length)
        console.log('this.homeworks.length==>',this.homeworks.length);
      }*/
      this.ionLoaderService.dismissLoader();
    })
    
  }
  segmentChanged(event) {
    console.log('====>',event['detail'].value);
    this.selectedtab=event['detail'].value;
  }
  dateChange(value)
  {
console.log('value==>',value);
  }
  
  from_date(fromdate)
  {
    console.log('fromdate==>',fromdate);
    this.fromdate=fromdate;
  }


  to_date(todate)
  {
    console.log('to_date==>',todate);
     this.todate=todate;
  }

  trimString(string, length) {
    return string.length > length ?
           string.substring(0, length) + '.....<span>Read More</span>' :
           string;
  }

  async msgprint(content)
  {
  console.log('content ==>',content);
  

  const modal = await this.modalController.create({
    component: StudycontentmodalPage,
    cssClass: 'my-custom-class',
    componentProps: { value: content }
  });
  return await modal.present();
  }

}
