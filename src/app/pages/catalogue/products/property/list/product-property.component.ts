import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { LocalDataSource } from 'angular2-smart-table';
import { forkJoin } from 'rxjs';
import { StorageService } from '../../../../shared/services/storage.service';
import { ProductAttributesService } from '../../services/product-attributes.service';
import { PropertiesService } from '../../services/product-properties';
import { ProductService } from '../../services/product.service';
import { ProductPropertyForm } from '../form/product-property-form.component';

import { ToastrService } from 'ngx-toastr';

import { ShowcaseDialogComponent } from '../../../../shared/components/showcase-dialog/showcase-dialog.component';
@Component({
  selector: 'ngx-product-property',
  templateUrl: './product-property.component.html',
  styleUrls: ['./product-property.component.scss'],
})
export class ProductProperties implements OnInit {
  product: any = {};
  productId: any;
  attributeId: any;
  attribute: any = {};

  id: any;
  loaded = false;
  loading = false;
  loadingList = false;

  source: LocalDataSource = new LocalDataSource();
  settings = {};
  perPage = 50;
  currentPage = 1;
  totalCount;

  params = this.loadParams();

  constructor(
    private propertiesService: PropertiesService,
    private productAttributesService: ProductAttributesService,
    private translate: TranslateService,
    private toastr: ToastrService,
    private location: Location,
    private storageService: StorageService,
    private productService: ProductService,
    private dialogService: NbDialogService,
    private router: Router
  ) {}
  loadParams() {
    return {
      // store: this.storageService.getMerchant(),
      lang: this.storageService.getLanguage(),
      count: this.perPage,
      page: 0,
    };
  }
  ngOnInit() {
    this.id = this.productService.getProductIdRoute(this.router, this.location);

    //specify add image url to image component
    const el = document.getElementById('tabs');
    el.scrollIntoView();
    this.getList();

    this.translate.onLangChange.subscribe((lang) => {
      this.params.lang = this.storageService.getLanguage();
      this.getList();
    });

    //angular2-smart-table server side filter
    this.source.onChanged().subscribe((change) => {
      //if (!this.loadingList) {//listing service
      //    this.listingService.filterDetect(this.params, change, this.loadList.bind(this), this.resetList.bind(this));
      //}
    });
  }

  getList() {
    this.loading = true;

    forkJoin([
      this.productService.getProductById(this.id),
      this.productAttributesService.getListOfProductsAttributes(
        this.id,
        this.params
      ),
    ]).subscribe(([productRes, attrRes]) => {
      const tempArray = attrRes.attributes.filter(
        (value) => value.attributeDisplayOnly === true
      );
      if (tempArray.length !== 0) {
        this.source.load(tempArray);
      } else {
        this.source.load([]);
      }
      this.totalCount = attrRes.recordsTotal;
      this.product = productRes;
    });

    this.setSettings();
  }
  setSettings() {
    this.settings = {
      hideSubHeader: true,
      actions: {
        columnTitle: this.translate.instant('ORDER.ACTIONS'),
        add: false,
        edit: false,
        delete: false,
        position: 'right',
        sort: true,
        custom: [
          { name: 'edit', title: '<i class="nb-edit"></i>' },
          { name: 'remove', title: '<i class="nb-trash"></i>' },
        ],
      },
      pager: {
        display: false,
      },
      columns: {
        id: {
          title: this.translate.instant('COMMON.ID'),
          type: 'number',
          editable: false,
          filter: false,
        },
        option: {
          title: this.translate.instant('PRODUCT_ATTRIBUTES.OPTION_NAME'),
          type: 'string',
          editable: false,
          filter: false,
          valuePrepareFunction: (name) => name.code,
        },
        optionValue: {
          title: this.translate.instant('PRODUCT_ATTRIBUTES.PRODUCT_OPTION'),
          type: 'string',
          editable: false,
          filter: false,
          valuePrepareFunction: (name) => name.description.name,
        },
        // productAttributePrice: {
        //   title: this.translate.instant('PRODUCT_ATTRIBUTES.PRICE'),
        //   type: 'string',
        //   editable: false,
        //   filter: false
        // }
      },
    };
  }
  // paginator
  changePage(event) {
    console.log(JSON.stringify(event));
    switch (event.action) {
      case 'onPage': {
        this.currentPage = event.data;
        break;
      }
      case 'onPrev': {
        this.currentPage--;
        break;
      }
      case 'onNext': {
        this.currentPage++;
        break;
      }
      case 'onFirst': {
        this.currentPage = 1;
        break;
      }
      case 'onLast': {
        this.currentPage = event.data;
        break;
      }
    }
    this.getList();
  }

  onClickAdd() {
    this.dialogService
      .open(ProductPropertyForm, {
        context: {
          productId: this.id,
          productType: this.product.type.code,
        },
      })
      .onClose.subscribe((res) => {
        this.getList();
      });
  }

  route(event) {
    switch (event.action) {
      case 'edit':
        this.dialogService
          .open(ProductPropertyForm, {
            context: {
              productId: this.id,
              attributeId: event.data.id,
              productType: this.product.type.code,
            },
          })
          .onClose.subscribe((res) => {
            this.getList();
          });
        break;
      case 'remove':
        this.removeAttribute(event.data.id);
        break;
    }
  }
  removeAttribute(id) {
    this.dialogService
      .open(ShowcaseDialogComponent, {})
      .onClose.subscribe((res) => {
        if (res) {
          this.loading = true;
          //product id, attribute id
          this.productAttributesService
            .deleteAttribute(this.id, id)
            .subscribe((res) => {
              this.getList();
              this.toastr.success(
                this.translate.instant('PROPERTY.PRODUCT_PROPERTY_REMOVED')
              );
            });
          this.loading = false;
        } else {
          this.loading = false;
        }
      });
  }
}
