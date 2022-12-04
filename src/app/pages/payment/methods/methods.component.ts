import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PaymentService } from '../services/payment.service';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-payment-methods',
  templateUrl: './methods.component.html',
  styleUrls: ['./methods.component.scss'],
})
export class PaymentMethodsComponent implements OnInit {
  loadingList = false;
  paymentData: Array<any> = [];
  constructor(
    private paymentService: PaymentService,
    private router: Router,
    private translate: TranslateService,
    private sanitizer: DomSanitizer
  ) {
    this.getPaymentMethodsList();
  }

  ngOnInit() {}
  getPaymentMethodsList() {
    this.loadingList = true;
    this.paymentService.getPaymentModules().subscribe(
      (data) => {
        console.log(data);
        this.loadingList = false;
        this.paymentData = data;
      },
      (error) => {
        this.loadingList = false;
      }
    );
  }
  onClickConfigure(value) {
    this.router.navigate(['pages/payment/configure/' + value]);
  }

  transformImage(img) {
    const encoded = 'data:image/png;base64,' + img;
    return this.sanitizer.bypassSecurityTrustResourceUrl(encoded);
  }
}
