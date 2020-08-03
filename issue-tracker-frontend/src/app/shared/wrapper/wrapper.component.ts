import { Component, OnInit } from "@angular/core"
import { GlobalService } from "src/app/global.service"

@Component({
  selector: "app-wrapper",
  templateUrl: "./wrapper.component.html",
  styleUrls: ["./wrapper.component.scss"],
})
export class WrapperComponent implements OnInit {
  showBackdrop = false
  constructor(private globalService: GlobalService) {}

  ngOnInit() {
    this.globalService.showBackdrop.subscribe((status) => {
      this.showBackdrop = status
    })
  }
}
