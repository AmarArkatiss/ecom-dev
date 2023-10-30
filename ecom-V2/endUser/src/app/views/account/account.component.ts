import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from 'src/app/helper/common.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  lastName: string;
  frstName: string;
  username;
  img;
  constructor(private snack: MatSnackBar, private common: CommonService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.username = sessionStorage.getItem('userdata');
    this.lastName = sessionStorage.getItem('lastname');
    this.frstName = sessionStorage.getItem('firstname');
    this.img = sessionStorage.getItem('profileimagess');
    if (this.username == null) {
      this.img = sessionStorage.getItem('profileimagess');
    }
  }

  noActionFound(): any {
    this.snack.open(this.common.comingSoonText, 'Ok', { duration: 1000 });
  }
  VocherDetails() {
    this.router.navigate(['/VocherDetails']);
  }
  myvocherDetails() {
    this.router.navigate(['/MyVocherDetails']);
  }
}
