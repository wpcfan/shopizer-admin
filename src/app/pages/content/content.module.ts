import { NgModule } from '@angular/core';
import { NbDialogModule } from '@nebular/theme';
import { QueryBuilderModule } from 'angular2-query-builder';
import { FileManagerModule } from 'ng6-file-man';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { LightboxModule } from 'ngx-lightbox';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { NgxSummernoteModule } from 'ngx-summernote';
import { CustomModule } from '../custom-component/custom.module';
import { SharedModule } from '../shared/shared.module';
import {
  ContentRoutingModule,
  routedComponents,
} from './content-routing.module';
@NgModule({
  declarations: [...routedComponents],
  imports: [
    ContentRoutingModule,
    SharedModule,
    FileManagerModule,
    QueryBuilderModule,
    NbDialogModule.forChild(),
    NgxSummernoteModule,
    NgxDropzoneModule,
    LightboxModule,
    MalihuScrollbarModule.forRoot(),
    CustomModule,
  ],
})
export class ContentModule {}
