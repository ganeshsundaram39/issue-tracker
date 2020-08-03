import { Component, OnInit } from "@angular/core"
import { Router, ActivatedRoute } from "@angular/router"
import { AuthenticationService } from "../authentication.service"
import { FormGroup, Validators, FormControl } from "@angular/forms"
import { GlobalService } from "src/app/global.service"

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  hide = true
  selectedTab = 0
  signupForm: FormGroup
  loginForm: FormGroup

  constructor(
    private router: Router,
    private globalService: GlobalService,
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    if (this.router.url === "/auth/register") {
      this.selectedTab = 1
    } else if (this.router.url === "/auth/login") {
      this.selectedTab = 0
    }
    this.signupForm = new FormGroup({
      fullName: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
        ),
      ]),
    })
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
    })
    if (this.globalService.isUserLoggedIn({})) {
      this.router.navigate(["/issues"])
    }
  }

  tabClick(tab) {
    if (tab.index === 0) {
      this.router.navigate(["../login"], { relativeTo: this.route })
      return
    }
    this.router.navigate(["../register"], { relativeTo: this.route })
  }

  onRegister() {
    this.authService.signup(this.signupForm.value).subscribe(
      (response: any) => {
        console.log({ response })
        if (response.error) {
          this.globalService.openSnackBar(response.message, "Error")
        } else {
          this.globalService.openSnackBar("Registered..!!", "Success")
          this.router.navigate(["/auth/login"])
        }
      },
      (error) => {
        console.log({ error })
        if (error && error.error && error.error.message) {
          this.globalService.openSnackBar(error.error.message, "Error")
        } else {
          this.globalService.openSnackBar("Something went wrong..!!", "Error")
        }
      }
    )
  }

  onLogin() {
    this.authService.login(this.loginForm.value).subscribe(
      (response: any) => {
        console.log({ response })
        if (response.error) {
          this.globalService.openSnackBar(response.message, "Error")
        } else {
          if (response.message === "Login Successful" && response.data) {
            localStorage.setItem(
              "userdata",
              JSON.stringify({ ...response.data })
            )
            this.router.navigate(["/issues"])
          }
        }
      },
      (error) => {
        console.log({ error })
        if (error && error.error && error.error.message) {
          this.globalService.openSnackBar(error.error.message, "Error")
        } else {
          this.globalService.openSnackBar("Something went wrong..!!", "Error")
        }
      }
    )
  }
}
