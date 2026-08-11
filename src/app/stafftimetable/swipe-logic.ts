// ─────────────────────────────────────────────────────────────
// SWIPE GESTURE — Days ke beech left/right swipe se navigate
// Yeh sab methods apni component class mein add karein
// ─────────────────────────────────────────────────────────────

// Class ke andar yeh do properties add karein:
private touchStartX: number = 0;
private touchStartY: number = 0;

// ─── Touch Start ───────────────────────────────────────────
onTouchStart(event: TouchEvent) {
  this.touchStartX = event.touches[0].clientX;
  this.touchStartY = event.touches[0].clientY;
}

// ─── Touch End ─────────────────────────────────────────────
onTouchEnd(event: TouchEvent) {
  const deltaX = event.changedTouches[0].clientX - this.touchStartX;
  const deltaY = event.changedTouches[0].clientY - this.touchStartY;

  // Sirf horizontal swipe ko consider karein (vertical scroll ignore)
  const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);
  const minSwipeDistance = 50; // pixels — swipe ki minimum distance

  if (!isHorizontalSwipe || Math.abs(deltaX) < minSwipeDistance) return;

  const days = this.objectKeys(this.Teacher_Timetable.data);
  const currentIndex = days.indexOf(this.selectedDay);

  if (deltaX < 0) {
    // Left swipe → Next day
    if (currentIndex < days.length - 1) {
      this.selectDay(days[currentIndex + 1]);
    }
  } else {
    // Right swipe → Previous day
    if (currentIndex > 0) {
      this.selectDay(days[currentIndex - 1]);
    }
  }
}

// ─── selectDay method (agar pehle se nahi hai to add karein) ──
selectDay(day: string) {
  this.selectedDay = day;
  // Content ko top par scroll karein jab din badle
  this.content.scrollToTop(300); // 'content' = @ViewChild(IonContent)
}

// ─── ViewChild (agar pehle se nahi hai) ───────────────────
// Component class ke upar import karein:
// import { IonContent } from '@ionic/angular';

// Class ke andar add karein:
// @ViewChild(IonContent) content!: IonContent;
