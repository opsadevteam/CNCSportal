import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { ActivitylogGet } from "../Models/interface/activitylog.model";
import { Constant } from "../constant/Constants";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ActivityLogService {
  private http = inject(HttpClient);
  baseUrl =
    environment.ENVI_POINT == "DEV" ? environment.DEV : environment.LOCAL;

  constructor() {}

  getActivityLogs(): Observable<ActivitylogGet[]> {
    return this.http.get<ActivitylogGet[]>(
      this.baseUrl + Constant.API_ACTIVITY_LOG_METHOD.GET_ALL_LOG_ACCOUNT
    );
  }
}
