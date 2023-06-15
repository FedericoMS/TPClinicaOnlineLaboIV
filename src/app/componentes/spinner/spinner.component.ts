import { Component, OnDestroy } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {

  showSpinner: boolean = false;
  private subscription: Subscription;

  constructor(private spinnerService : SpinnerService) {
    this.subscription = spinnerService.spinnerState.subscribe(state => {
      this.showSpinner = state;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
