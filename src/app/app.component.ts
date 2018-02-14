import { Component, AfterViewInit, NgZone, Renderer, ElementRef, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationStart, NavigationCancel, Router, NavigationError, Event as RouterEvent } from '@angular/router'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('spinnerElement')
  spinnerElement:ElementRef;

  constructor(private router: Router,
             private ngZone: NgZone,
             private renderer: Renderer) {
   router.events.subscribe((event: RouterEvent) => {
     this._navigationInterceptor(event)
   })
 }

 // Shows and hides the loading spinner during RouterEvent changes
 private _navigationInterceptor(event: RouterEvent): void {
   if (event instanceof NavigationStart) {
     // We wanna run this function outside of Angular's zone to
     // bypass change detection
     this.ngZone.runOutsideAngular(() => {
       // For simplicity we are going to turn opacity on / off
       // you could add/remove a class for more advanced styling
       // and enter/leave animation of the spinner
       this.renderer.setElementStyle(
         this.spinnerElement.nativeElement,
         'opacity',
         '1'
       )
     })
   }
   if (event instanceof NavigationEnd) {
     this._hideSpinner()
   }
   // Set loading state to false in both of the below events to
   // hide the spinner in case a request fails
   if (event instanceof NavigationCancel) {
     this._hideSpinner()
   }
   if (event instanceof NavigationError) {
     this._hideSpinner()
   }
 }

 private _hideSpinner(): void {
   // We wanna run this function outside of Angular's zone to
   // bypass change detection,
   this.ngZone.runOutsideAngular(() => {
     // For simplicity we are going to turn opacity on / off
     // you could add/remove a class for more advanced styling
     // and enter/leave animation of the spinner
     this.renderer.setElementStyle(
       this.spinnerElement.nativeElement,
       'opacity',
       '0'
     )
   })
 }
  /*loading;
  constructor(private router:Router){
    this.loading = true;
  }
  ngAfterViewInit() {
        this.router.events
            .subscribe((event) => {
                if(event instanceof NavigationStart) {
                    this.loading = true;
                }
                else if (
                    event instanceof NavigationEnd ||
                    event instanceof NavigationCancel
                    ) {
                    this.loading = false;
                }
            });
    }*/

}
