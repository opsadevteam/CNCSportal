import { Component, computed, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { PhoneEntryFormComponent } from '../EntryForms/phone-entry-form/phone-entry-form.component';
import { CommonModule } from '@angular/common';
import {
  IAccountsMenuItem,
  IEntryFormsMenuItem,
  IRecordsMenuItem,
  IReportsMenuItem,
} from '../../Models/interface/sidenav.model';

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
    PhoneEntryFormComponent,
    CommonModule,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  entryFormsMenuItems = signal<IEntryFormsMenuItem[]>([
    {
      icon: 'phone',
      label: 'Phone',
      route: 'phoneform',
    },
    {
      icon: 'email',
      label: 'Email',
      route: 'emailform',
    },
  ]);

  recordsMenuItems = signal<IRecordsMenuItem[]>([
    {
      icon: 'view_list',
      label: 'Phone Records',
      route: 'phonerecords',
    },
    {
      icon: 'view_list',
      label: 'Email Records',
      route: 'emailrecords',
    },
    {
      icon: 'face',
      label: 'User Mangement',
      route: 'usermanagement',
    },
    {
      icon: 'tune',
      label: 'Activity Logs',
      route: 'activitylogs',
    },
  ]);

  reportsMenuItems = signal<IReportsMenuItem[]>([
    {
      icon: 'poll',
      label: 'Workload Statistics',
      route: 'workloadstatistics',
    },
  ]);

  accountsMenuItems = signal<IAccountsMenuItem[]>([
    {
      icon: 'brightness_high',
      label: 'Light Mode',
      route: 'workloadstatistics',
    },
  ]);

  collapsed = signal(false);

  sideNavWith = computed(() => (this.collapsed() ? '4rem' : '16rem'));

  profilePicSize = computed(() => (this.collapsed() ? '24' : '48'));
}
