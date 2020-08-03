import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { Subject } from "rxjs"
import { MatSnackBar } from "@angular/material/snack-bar"

@Injectable({
  providedIn: "root",
})
export class GlobalService {
  public showBackdrop = new Subject<boolean>()

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  isUserLoggedIn({ redirected = false }) {
    const userdata = JSON.parse(localStorage.getItem("userdata"))
    if (userdata && userdata.authToken) {
      return true
    } else {
      if (redirected) {
        this.router.navigate(["/auth/login"])
      }
      return false
    }
  }
  logout() {
    localStorage.removeItem("userdata")
    this.router.navigate(["/auth/login"])
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    })
  }
}
