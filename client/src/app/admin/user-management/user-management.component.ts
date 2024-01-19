import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin.service';
import { RolesModalComponent } from 'src/app/modals/roles-modal/roles-modal.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit{
  users:User[]=[];
  bsModelRef:BsModalRef<RolesModalComponent> = new BsModalRef<RolesModalComponent>();
  availablRoles=[
    'Admin',
    'Moderator',
    'Member'
  ]
  constructor(private adminService: AdminService,private modalService:BsModalService){

  }
  getUsersWithRoles(){
    this.adminService.getUserWithRoles().subscribe({
      next:users=>this.users=users
    })
  }

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  openRolesModal(user:User){
    const config={
      class:'modal-dialog-centered',
      initialState:{
        username:user.userName,
        availableRoles:this.availablRoles,
        selectedRoles:[...user.roles]
      }
    }
    this.bsModelRef=this.modalService.show(RolesModalComponent,config);
    this.bsModelRef.onHide?.subscribe({
      next:() =>{
        const selectedRoles=this.bsModelRef.content?.selectedRoles;
        if(!this.arrayEqual(selectedRoles,user.roles)){
          this.adminService.updateUserRoles(user.userName,selectedRoles!.join(',')).subscribe({
            next:roles=>user.roles=roles
          })
        }
      }
    })
  }

  private arrayEqual(arr1:any,arr2:any){
    return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
  }
}
