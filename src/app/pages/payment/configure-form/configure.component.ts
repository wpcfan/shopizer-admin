import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { ConfigService } from '../../shared/services/config.service';
import { ToastrService } from 'ngx-toastr';
// import { TaxService } from '../services/tax.service';
let moneyorder = require('../services/moneyorder.json');
let paypalData = require('../services/paypal.json');
let beanStreamData = require('../services/beanstream.json');
let stripeData = require('../services/stripe.json');
let braintreeData = require('../services/braintree.json');
import { PaymentService } from '../services/payment.service';
@Component({
  selector: 'ngx-payment-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.scss'],
})
export class ConfigureComponent implements OnInit {

  active = '';
  formData: Array<any> = [];
  loadingList: boolean = false;
  paymentType: any;
  paymentData: any;
  editorConfig = {
    placeholder: '',
    tabsize: 2,
    height: 300,
    toolbar: [
      ['misc', ['codeview', 'undo', 'redo']],
      ['style', ['bold', 'italic', 'underline', 'clear']],
      ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'picture', 'link', 'video']],
      ['customButtons', ['testBtn']]
    ],
    // buttons: {
    //   'testBtn': this.customButton.bind(this)
    // },
    fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times']
  };
  constructor(
    private paymentService: PaymentService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ) {
    // this.getCountry();
    // this.getLanguages();
  }
  ngOnInit() {
    let paymenttype = this.activatedRoute.snapshot.paramMap.get('id');
    if (paymenttype == 'moneyorder') {
      this.formData = moneyorder;
      this.paymentType = "Money Order";
    } else if (paymenttype == 'paypal-express-checkout') {
      this.formData = paypalData;
      this.paymentType = "PayPal Express Checkout";
    } else if (paymenttype == 'beanstream') {
      this.formData = beanStreamData;
      this.paymentType = "Beanstream";
    } else if (paymenttype == 'stripe') {
      this.formData = stripeData;
      this.paymentType = "Stripe";
    } else if (paymenttype == 'braintree') {
      this.formData = braintreeData;
      this.paymentType = "Braintree";
    }
    this.getPaymentConfigureDetails(paymenttype)
  }
  getPaymentConfigureDetails(type) {
    this.loadingList = true;
    this.paymentService.getPaymentModulesDetails(type)
      .subscribe(data => {
        console.log(data);
        this.loadingList = false;
        this.paymentData = data;
        this.setConfigureData();
      }, error => {
        this.loadingList = false;
      });
  }
  setConfigureData() {
    this.formData.map(async (value, i) => {

      if (value.type == 'radio') {
        let varType = Array.isArray(this.paymentData[value.objectKey][value.name])
        this.formData[i].value = varType ? this.paymentData[value.objectKey][value.name][0] : this.paymentData[value.objectKey][value.name]
      } else if (value.type == 'groupcheckbox') {
        if (value.objectKey == '') {

        } else {
          this.paymentData[value.objectKey][value.name].map((option) => {
            let a = value.optionData.findIndex((a) => a.value === option);
            value.optionData[a].checked = true;
          })

        }
      } else {
        this.formData[i].value = value.objectKey == '' ? this.paymentData[value.name] : this.paymentData[value.objectKey][value.name]
      }
    });
  }
  save() {
    console.log(this.formData)
    let param = {};
    this.formData.map((value) => {
      param[value.name] = value.value
    });
    console.log(param)
  }

  goBack() {
    this.router.navigate(['pages/payment/methods']);
  }
}