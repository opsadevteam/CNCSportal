import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Activitylog } from "../Models/interface/activitylog.model";
import { Constant } from "../constant/Constants";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ActivityLogService {
  private http = inject(HttpClient);
  baseUrl = environment.API_LOCAL_CNCS_URL;

  constructor() {}

  getActivityLogs(): Observable<Activitylog[]> {
    return this.http.get<Activitylog[]>(
      this.baseUrl + Constant.API_ACTIVITY_LOG_METHOD.GET_ALL_LOG_ACCOUNT
    );
  }
}
