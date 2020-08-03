import { Injectable } from "@angular/core"
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router"
import { Observable } from "rxjs"
import { GlobalService } from "./global.service"

@Injectable({
  providedIn: "root",
})
export class ValidUserGuard implements CanActivate {
  constructor(private globalService: GlobalService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.globalService.isUserLoggedIn({ redirected: true })
  }
}
