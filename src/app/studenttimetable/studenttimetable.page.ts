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
  selector: 'app-studenttimetable',
  templateUrl: './studenttimetable.page.html',
  styleUrls: ['./studenttimetable.page.scss'],
})
export class StudenttimetablePage implements OnInit {

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
  classname: any;
  selectedTimetableId: any;
  selectedDay: string = 'Monday';
  objectKeys = Object.keys;
  Student_Timetable: any = [];
  TimeTableId: any;
  LegndArray: any = ['APPROVED', 'PENDING', 'REJECT'];
  TimeTableList: any = [];
  ClasssTeacherName: any;
  TT_Master_ID_In_Response: any;
  constructor(
    private toast: ToastService,
    private Leaveapplicationservice: LeaveapplicationService,
    private timetableService: TimetableService,
    private router: Router,
    private ionLoaderService: IonLoaderService,
    public formBuilder: FormBuilder
  ) { }

  ionViewDidEnter() {
    this.classname = localStorage.getItem('classname');
  }

  ngOnInit() {
    this.category = 'applicationlist';
    this.isLoading = true;

    this.Leaveapplicationservice.memberleaves().subscribe((res) => {
      this.applied_leaves = res;
    });

    this.timetableService.student_timetable().subscribe((res1) => {
      console.log('Student Timetable Data Received --> ', res1);
      this.Student_Timetable = res1;

      this.TT_Master_ID_In_Response = res1.timetable_master_id;
      this.selectedTimetableId = this.TT_Master_ID_In_Response;
      this.ClasssTeacherName = res1.ClasssTeacherName;
      if (this.Student_Timetable && this.Student_Timetable.data) {
        const days = Object.keys(this.Student_Timetable.data);
        if (days.length > 0) {
          this.selectedDay = days[0];
        }
      } else {
        this.Student_Timetable = [];
      }
      //
      this.isLoading = false;
    }, (error) => {
      this.isLoading = false;
    });




    this.timetableService.get_all_timetable().subscribe((res) => {
      this.TimeTableList = res;
      console.log("this.TimeTableList-->", this.TimeTableList);
    });

    this.ionicForm = this.formBuilder.group({
      fromdate: ['', [Validators.required]],
      todate: ['', [Validators.required]],
      title: ['', [Validators.required]],
      reason: ['', [Validators.required]]
    });
  }


  onTimetableChange(event: any) {
    const selectedId = event.detail.value;
    console.log('Selected Timetable ID:', selectedId);
    this.TimeTableId = event.detail.value;
    this.timetableService.student_timetable(this.TimeTableId).subscribe((res1) => {
      console.log('Student Timetable Data Received --> ', res1);
      this.Student_Timetable = res1;
      this.TT_Master_ID_In_Response = res1.timetable_master_id;
      this.selectedTimetableId = this.TT_Master_ID_In_Response;
      this.ClasssTeacherName = res1.ClasssTeacherName;
      if (this.Student_Timetable && this.Student_Timetable.data) {
        const days = Object.keys(this.Student_Timetable.data);
        if (days.length > 0) {
          this.selectedDay = days[0];
        }
      } else {
        this.Student_Timetable = [];
      }
      //
      this.isLoading = false;
    }, (error) => {
      this.isLoading = false;
    });

    // Here you should trigger a new API call to fetch data for the selected ID
    // Example:
    // this.timetableService.get_timetable_by_id(selectedId).subscribe((res) => {
    //    this.Student_Timetable = res;
    //    // Update selectedDay to the first key of the new data
    // });
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

    const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);
    const minSwipeDistance = 50;

    if (!isHorizontalSwipe || Math.abs(deltaX) < minSwipeDistance) return;

    if (!this.Student_Timetable?.data) return;

    const days = this.objectKeys(this.Student_Timetable.data);
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

  from_date(fromdate) {
    this.changeDateFormat_from(fromdate);
  }

  changeDateFormat_to(date: string) {
    this.dateParts_to = date.substring(0, 10).split("-");
    this.dateParts_to = this.dateParts_to[2] + '-' + this.dateParts_to[1] + '-' + this.dateParts_to[0];
    if (this.dateParts_to == 'undefined-undefined-') { this.dateParts_to = ' '; }
  }

  to_date(todate) {
    this.changeDateFormat_to(todate);
  }
}
