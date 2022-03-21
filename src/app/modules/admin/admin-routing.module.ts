import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from 'src/app/components/admin/admin.component';
import { UploadComponent } from 'src/app/components/upload/upload.component';

const routes: Routes = [
    
    {
        path: '', component: AdminComponent, children: [
            {path: "", redirectTo: "upload", pathMatch: "full"},
            {path: "upload", component: UploadComponent},
            {path: '**', redirectTo: ""}
    ]
}

 // {path: "", redirectTo: "upload", pathMatch: "full"},
  //{path: "upload", component: UploadComponent},
 // {path: "**", redirectTo: "upload"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }