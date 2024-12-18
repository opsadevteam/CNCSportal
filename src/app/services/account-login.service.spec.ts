import { TestBed } from "@angular/core/testing";

import { AccountLoginService } from "./account-login.service";

describe("AccountLoginService", () => {
  let service: AccountLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountLoginService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
