import { NgModule } from '@angular/core';

import { UserManagementComponent } from './user-management.component';
import { SharedModule } from '../shared/shared.module';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersListComponent } from './users-list/users-list.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserFormComponent } from './user-form/user-form.component';
import { CreateNewUserComponent } from './create-new-user/create-new-user.component';
import { NbDialogModule } from '@nebular/theme';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ButtonRenderUserComponent } from './users-list/button-render-user.component';
import { CustomModule } from '../custom-component/custom.module';
// import { EqualValidator } from '../shared/validation/equal-validator';
@NgModule({
    declarations: [
        UserManagementComponent,
        UserProfileComponent,
        UsersListComponent,
        ChangePasswordComponent,
        UserFormComponent,
        CreateNewUserComponent,
        ButtonRenderUserComponent,
        UserDetailsComponent,
        // EqualValidator
    ],
    imports: [
        UserManagementRoutingModule,
        NbDialogModule.forChild(),
        SharedModule,
        CustomModule,
    ]
})
export class UserManagementModule {
}
