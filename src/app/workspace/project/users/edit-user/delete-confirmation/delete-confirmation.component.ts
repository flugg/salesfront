import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef, MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { EditUserComponent } from '../edit-user.component';
import { MemberService } from '../../../../../core/services/member.service';
import { SaleService } from '../../../../../core/services/sale.service';
import { Member } from '../../../../../core/models/member.model';

@Component({
  templateUrl: 'delete-confirmation.component.html'
})
export class DeleteConfirmationComponent implements OnInit {
  loading = true;
  deleteSales = false;

  constructor(@Inject(MD_DIALOG_DATA) public data: any,
              public dialog: MdDialogRef<EditUserComponent>,
              private snackBar: MdSnackBar,
              private memberService: MemberService,
              private saleService: SaleService) {}

  ngOnInit() {}

  removeUser() {
    this.memberService.delete(this.data.member.id, this.deleteSales).then(member => {
      if (this.deleteSales) {
        this.saleService.deleteForMember(member.id).then(() => {
          this.notifyAboutRemoval(member);
        });
      } else {
        this.notifyAboutRemoval(member);
      }
    });
  }

  private notifyAboutRemoval(member: Member) {
    this.snackBar.open('Member deactivate', 'Activate', <MdSnackBarConfig>{ duration: 4000 }).onAction().subscribe(() => {
      this.memberService.recover(member.id).then(() => {
        this.snackBar.open('Member reactivated', null, <MdSnackBarConfig>{ duration: 2000 });
      });
    });

    this.dialog.close();
  }
}
