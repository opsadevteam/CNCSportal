import { Routes } from "@angular/router";
import { PhoneEntryFormComponent } from "./components/EntryForms/phone-entry-form/phone-entry-form.component";
import { LoginComponent } from "./components/login/login.component";
import { EmailEntryFormComponent } from "./components/EntryForms/email-entry-form/email-entry-form.component";
import { PhoneRecordsComponent } from "./components/Records/phone-records/phone-records.component";
import { EmailRecordsComponent } from "./components/Records/email-records/email-records.component";
import { ActivityLogsComponent } from "./components/Records/activity-logs/activity-logs.component";
import { WorkloadStatisticsComponent } from "./components/Reports/workload-statistics/workload-statistics.component";
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { authGuard } from "./services/auth.guard";
import { UserManagementComponent } from "./components/Records/user-management/user-management.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent,
  },

  {
    path: "",
    component: SidenavComponent,
    canActivate: [authGuard],
    children: [
      {
        path: "phoneform",
        component: PhoneEntryFormComponent,
      },
      {
        path: "emailform",
        component: EmailEntryFormComponent,
      },
      {
        path: "phonerecords",
        component: PhoneRecordsComponent,
      },
      {
        path: "emailrecords",
        component: EmailRecordsComponent,
      },
      {
        path: "usermanagement",
        component: UserManagementComponent,
      },
      {
        path: "activitylogs",
        component: ActivityLogsComponent,
      },
      {
        path: "workloadstatistics",
        component: WorkloadStatisticsComponent,
      },
    ],
  },
];
