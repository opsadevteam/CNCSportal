import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { PhoneEntryFormComponent } from '../EntryForms/phone-entry-form/phone-entry-form.component';
import { CommonModule } from '@angular/common';
import {
  AccountsMenuItemData,
  AccountsMenuItemDataAdmin,
  EntryFormsMenuItemData,
  IAccountsMenuItem,
  IEntryFormsMenuItem,
  IRecordsMenuItem,
  IReportsMenuItem,
  RecordsMenuItemData,
  RecordsMenuItemDataAdmin,
  ReportsMenuItemData,
} from '../../Models/interface/sidenav.model';
import { Constant } from '../../constant/Constants';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent implements OnInit {
  version = Constant.CNCS_VERSION.NUMBER;
  router = inject(Router);
  userRole = localStorage.getItem('userGroup');
  isAdmin: boolean = true;
  recordsMenuItems: any;
  reportsMenuItems: any;
  accountsMenuItems: any;

  // Initalize
  ngOnInit(): void {
    this.checkRole();
    this.loadMenuItems();
  }

  checkRole() {
    if (this.userRole === 'Officer') {
      this.isAdmin = false;
    } else {
      this.isAdmin = true;
    }
  }

  loadMenuItems() {
    if (this.isAdmin) {
      this.recordsMenuItems = signal<IRecordsMenuItem[]>(
        RecordsMenuItemDataAdmin
      );
      this.reportsMenuItems = signal<IReportsMenuItem[]>(ReportsMenuItemData);
      this.accountsMenuItems = signal<IAccountsMenuItem[]>(
        AccountsMenuItemDataAdmin
      );
    } else {
      this.recordsMenuItems = signal<IRecordsMenuItem[]>(RecordsMenuItemData);
      this.reportsMenuItems = signal<IReportsMenuItem[]>(ReportsMenuItemData);
      this.accountsMenuItems =
        signal<IAccountsMenuItem[]>(AccountsMenuItemData);
    }
  }
  // entryFormsMenuItems = signal<IEntryFormsMenuItem[]>(EntryFormsMenuItemData);

  collapsed = signal(false);

  sideNavWith = computed(() => (this.collapsed() ? '4rem' : '16rem'));

  profilePicSize = computed(() => (this.collapsed() ? '24' : '48'));

  onLogOut() {
    this.router.navigateByUrl('/login');
    localStorage.removeItem('fullName');
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('username');
    localStorage.removeItem('userGroup');
  }
}
