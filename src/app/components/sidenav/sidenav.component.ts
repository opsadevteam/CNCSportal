import { Component, computed, inject, signal } from '@angular/core';
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
  EntryFormsMenuItemData,
  IAccountsMenuItem,
  IEntryFormsMenuItem,
  IRecordsMenuItem,
  IReportsMenuItem,
  RecordsMenuItemData,
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
export class SidenavComponent {
  version = Constant.CNCS_VERSION.NUMBER;
  router = inject(Router);

  entryFormsMenuItems = signal<IEntryFormsMenuItem[]>(EntryFormsMenuItemData);
  recordsMenuItems = signal<IRecordsMenuItem[]>(RecordsMenuItemData);
  reportsMenuItems = signal<IReportsMenuItem[]>(ReportsMenuItemData);
  accountsMenuItems = signal<IAccountsMenuItem[]>(AccountsMenuItemData);

  collapsed = signal(false);

  sideNavWith = computed(() => (this.collapsed() ? '4rem' : '16rem'));

  profilePicSize = computed(() => (this.collapsed() ? '24' : '48'));

  onLogOut() {
    this.router.navigateByUrl('/login');
    localStorage.removeItem('fullName');
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('username');
  }
}
