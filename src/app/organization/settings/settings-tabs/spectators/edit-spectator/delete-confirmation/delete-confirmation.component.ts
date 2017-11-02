import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { EditSpectatorComponent } from '../edit-spectator.component';
import { MemberService } from '../../../../../../core/services/member.service';

@Component({
  templateUrl: 'delete-confirmation.component.html'
})
export class DeleteConfirmationComponent implements OnInit {
  onDeleted = new EventEmitter();

  constructor(@Inject(MD_DIALOG_DATA) public data: any,
              public dialog: MdDialogRef<EditSpectatorComponent>,
              private snackBar: MdSnackBar,
              private memberService: MemberService) {}

  ngOnInit() {}

  remove() {
    this.memberService.delete(this.data.membership.id, false).then(() => {
      this.snackBar.open('Spectator removed', null, <MdSnackBarConfig>{ duration: 2000 });

      this.onDeleted.emit();
      this.dialog.close();
    });
  }
}
