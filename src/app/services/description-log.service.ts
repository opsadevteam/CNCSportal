import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Constant } from "../constant/Constants";
import { environment } from "../../environments/environment.development";
import { DescriptionLog } from "../Models/interface/description-log.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DescriptionLogService {
  private http = inject(HttpClient);
  private descriptionlogs =
    Constant.API_DESCRIPTION_LOGS_METHOD.GET_DESCRIPTION_LOGS;

  baseUrl =
    environment.ENVI_POINT == "DEV" ? environment.DEV : environment.LOCAL;

  constructor() {}

  addDescriptionLogs(
    descriptionLog: DescriptionLog
  ): Observable<DescriptionLog> {
    return this.http.post<DescriptionLog>(
      `${this.baseUrl}${this.descriptionlogs}`,
      descriptionLog
    );
  }
}
