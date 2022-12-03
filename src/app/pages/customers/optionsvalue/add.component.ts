import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../shared/services/crud.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-value-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class ValueAddComponent implements OnInit {
  loadingList = false;
  displayText: Array<any> = [{ name: 'text' }, { name: 'select' }, { name: 'radio' }, { name: 'Checkbox' }];
  public scrollbarOptions = { axis: 'y', theme: 'minimal-dark' };
  constructor(
    private crudService: CrudService,
    private toastr: ToastrService,
    public router: Router,
  ) {

  }
  ngOnInit() {

  }
  goToBack() {
    this.router.navigate(['pages/customer/value/list']);
  }
}
