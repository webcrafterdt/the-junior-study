import { Component, OnInit, ViewChild } from '@angular/core';   // ← ViewChild add kiya
import { IonContent } from '@ionic/angular';                     // ← IonContent add kiya
import { DatePipe } from '@angular/common';
import { LeaveapplicationService } from 'src/app/services/leaveapplication.service';
import { Router } from "@angular/router";
import { IonLoaderService } from 'src/app/services/ion-loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { TimetableService } from 'src/app/services/timetable.service';

@Component({
  selector: 'app-stafftimetable',
  templateUrl: './stafftimetable.page.html',
  styleUrls: ['./stafftimetable.page.scss'],
})
export class StafftimetablePage implements OnInit {

  // ── ViewChild: scroll top ke liye ──────────────────────────
  @ViewChild(IonContent) content!: IonContent;  // ← ADD KIYA

  // ── Swipe tracking properties ───────────────────────────────
  private touchStartX: number = 0;             // ← ADD KIYA
  private touchStartY: number = 0;             // ← ADD KIYA

  category: any;
  fromdate: any;
  todate: any;
  dateParts: any;
  dateParts_to: any;
  status: any;
  message: any;
  applied_leaves: any = [];
  public title = '';
  public reason = '';
  ionicForm: FormGroup;
  isLoading: boolean = true;
  fname: any;
  Teacher_Timetable: any = [];
  timetable_Selection: any = [];
  selectedDay: string = 'Monday';
  selectedTimetableId: any = null;
  objectKeys = Object.keys;
  LegndArray: any = ['APPROVED', 'PENDING', 'REJECT'];

  constructor(
    private toast: ToastService,
    private Leaveapplicationservice: LeaveapplicationService,
    private timetableService: TimetableService,
    private router: Router,
    private ionLoaderService: IonLoaderService,
    public formBuilder: FormBuilder
  ) { }

  ionViewDidEnter() {
    this.fname = localStorage.getItem('name');
  }

  ngOnInit() {
    this.category = 'applicationlist';

    this.Leaveapplicationservice.memberleaves().subscribe((res) => {
      this.status = res['status'];
      this.message = res['message'];
      this.applied_leaves = res;
    });

    //     this.timetableService.timetable_selection().subscribe((res2) => {
    //       console.log('timetable selection list --> ', res2);
    //       this.timetable_Selection = res2;
    // //
    //       if (this.timetable_Selection && this.timetable_Selection.data && this.timetable_Selection.data.length > 0) {
    //         this.selectedTimetableId = this.timetable_Selection.data[0].id;
    //         this.fetchTimetableData(this.selectedTimetableId);
    //       }
    //     });
    this.timetableService.timetable_selection().subscribe((res2) => {
      console.log('timetable selection list --> ', res2);
      this.timetable_Selection = res2;


      if (this.timetable_Selection?.data && this.timetable_Selection.data.length > 0) {
        //this.selectedTimetableId = this.timetable_Selection.data[0].id;

        //this.fetchTimetableData(this.selectedTimetableId);
        this.isLoading = true;
        this.timetableService.staff_timetable().subscribe((res1) => {
          this.isLoading = false;
          this.Teacher_Timetable = res1;  // ✅ always full response store karo
          this.selectedTimetableId = res1.timetable_master_id;
          console.log("here is tt data", res1);
          if (this.Teacher_Timetable?.data && Object.keys(this.Teacher_Timetable.data).length > 0) {
            const days = Object.keys(this.Teacher_Timetable.data);
            this.selectedDay = days[0];
          }
          // ❌ else block hatao — Teacher_Timetable = [] wala
        });
      } else {
        // ✅ Yeh add karo
        this.isLoading = false;
        this.Teacher_Timetable = this.timetable_Selection; // status/message same object mein hai
      }
    });

    this.ionicForm = this.formBuilder.group({
      fromdate: ['', [Validators.required]],
      todate: ['', [Validators.required]],
      title: ['', [Validators.required]],
      reason: ['', [Validators.required]]
    });
  }

  // fetchTimetableData(timetableId: any) {
  //   this.isLoading = true;
  //   this.timetableService.staff_timetable(timetableId).subscribe((res1) => {
  //     this.isLoading = false;
  //     console.log('fetched timetable data for ID ' + timetableId + ' --> ', res1);
  //     this.Teacher_Timetable = res1;

  //     if (this.Teacher_Timetable && this.Teacher_Timetable.data) {
  //       const days = Object.keys(this.Teacher_Timetable.data);
  //       if (days.length > 0) {
  //         this.selectedDay = days[0];
  //       }
  //     } else {
  //       this.Teacher_Timetable = [];
  //     }


  //     console.log('fetched timetable this.Teacher_Timetable =>', this.Teacher_Timetable);

  //   });
  // }
  fetchTimetableData(timetableId: any) {
    this.isLoading = true;
    this.timetableService.staff_timetable(timetableId).subscribe((res1) => {
      this.isLoading = false;
      this.Teacher_Timetable = res1;  // ✅ always full response store karo
      this.selectedTimetableId = res1.timetable_master_id;
      console.log("here is tt data", res1);
      if (this.Teacher_Timetable?.data && Object.keys(this.Teacher_Timetable.data).length > 0) {
        const days = Object.keys(this.Teacher_Timetable.data);
        this.selectedDay = days[0];
      }
      // ❌ else block hatao — Teacher_Timetable = [] wala
    });
  }

  onTimetableChange(event: any) {
    const newTimetableId = event.detail.value;
    if (newTimetableId) {
      this.selectedTimetableId = newTimetableId;
      this.fetchTimetableData(this.selectedTimetableId);
    }
  }

  // ── Updated selectDay: scroll to top bhi karta hai ──────────
  selectDay(day: string) {
    this.selectedDay = day;
    if (this.content) {
      this.content.scrollToTop(300);            // ← scroll to top on day change
    }
  }

  // ── Swipe: Touch Start ───────────────────────────────────────
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
    this.touchStartY = event.touches[0].clientY;
  }

  // ── Swipe: Touch End ─────────────────────────────────────────
  onTouchEnd(event: TouchEvent) {
    const deltaX = event.changedTouches[0].clientX - this.touchStartX;
    const deltaY = event.changedTouches[0].clientY - this.touchStartY;

    // Vertical scroll ignore karein, sirf horizontal swipe
    const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);
    const minSwipeDistance = 50;

    if (!isHorizontalSwipe || Math.abs(deltaX) < minSwipeDistance) return;

    if (!this.Teacher_Timetable?.data) return;

    const days = this.objectKeys(this.Teacher_Timetable.data);
    const currentIndex = days.indexOf(this.selectedDay);

    if (deltaX < 0) {
      // ← Left swipe: Next day
      if (currentIndex < days.length - 1) {
        this.selectDay(days[currentIndex + 1]);
      }
    } else {
      // → Right swipe: Previous day
      if (currentIndex > 0) {
        this.selectDay(days[currentIndex - 1]);
      }
    }
  }

  // ── Baaki purane methods ─────────────────────────────────────
  updaterecord(event, id) {
    const leavestatus = event.detail.value;
    this.Leaveapplicationservice.updaterecord(leavestatus, id).subscribe((res) => { });
  }

  apply_leave() {
    this.Leaveapplicationservice.apply_leave(this.title, this.reason, this.dateParts, this.dateParts_to).subscribe((res) => {
      this.toast.presentToast(this.message);
      this.ngOnInit();
      this.title = ' '; this.reason = ' '; this.dateParts = ' '; this.dateParts_to = ' ';
    });
  }

  changeDateFormat_from(date: string) {
    this.dateParts = date.substring(0, 10).split("-");
    this.dateParts = this.dateParts[2] + '-' + this.dateParts[1] + '-' + this.dateParts[0];
    if (this.dateParts == 'undefined-undefined-') { this.dateParts = ' '; }
  }

  from_date(fromdate) { this.changeDateFormat_from(fromdate); }

  changeDateFormat_to(date: string) {
    this.dateParts_to = date.substring(0, 10).split("-");
    this.dateParts_to = this.dateParts_to[2] + '-' + this.dateParts_to[1] + '-' + this.dateParts_to[0];
    if (this.dateParts_to == 'undefined-undefined-') { this.dateParts_to = ' '; }
  }

  to_date(todate) { this.changeDateFormat_to(todate); }
}
