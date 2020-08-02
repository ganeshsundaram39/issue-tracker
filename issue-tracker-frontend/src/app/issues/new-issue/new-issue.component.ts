import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {IssueService} from '../issue.service'
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/global.service';
import { mimeType } from "./mime-type.validator";


@Component({
  selector: "app-new-issue",
  templateUrl: "./new-issue.component.html",
  styleUrls: ["./new-issue.component.scss"],
})
export class NewIssueComponent implements OnInit {
  newIssueForm: FormGroup;
  imagePreview=[];
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "200px",
    minHeight: "200px",
    maxHeight: "auto",
    width: "100%",
    minWidth: "0",
    translate: "yes",
    enableToolbar: true,
    showToolbar: true,
    placeholder: "Enter Description...",
    defaultParagraphSeparator: "",
    defaultFontName: "",
    defaultFontSize: "",
    fonts: [
      { class: "arial", name: "Arial" },
      { class: "times-new-roman", name: "Times New Roman" },
      { class: "calibri", name: "Calibri" },
      { class: "comic-sans-ms", name: "Comic Sans MS" },
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: "redText",
        class: "redText",
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ],
    sanitize: true,
    toolbarPosition: "bottom",
    toolbarHiddenButtons: [["bold", "italic"], ["fontSize", 'insertImage',
      'insertVideo',]],
  };

  constructor(
    private issueServer: IssueService,
    private router: Router,
    private globalService: GlobalService
  ) {}

  ngOnInit() {
    this.newIssueForm = new FormGroup({
      title: new FormControl("", [
        Validators.required,
        Validators.maxLength(50),
      ]),
      description: new FormControl("", [
        Validators.required,
        Validators.maxLength(255),
      ]),
      images: new FormControl(null, {
        validators: [Validators.required],
      })
    });
  }
  onNewIssue = () => {

    if (this.newIssueForm.untouched) {
      this.globalService.openSnackBar('Please fill the form..!!', "Error");
      return;
    }
    console.log(this.newIssueForm)
    this.issueServer.createIssue(this.newIssueForm.value).subscribe(
      (response: any) => {
        console.log({response});
        if (response.error) {
          this.globalService.openSnackBar(response.message, "Error");
        } else {
          if (response.status === 200) {
            this.router.navigate(["/issues/list"]);
          }
        }
      },
      (error) => {
        console.log({error});
        if (error && error.error && error.error.message) {
          this.globalService.openSnackBar(error.error.message, "Error");
        } else {
          this.globalService.openSnackBar("Something went wrong..!!", "Error");
        }
      }
    );
  };
  files=[]
  onImagePicked(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    this.files.push(files)
    this.newIssueForm.patchValue({ images: this.files  });
    this.newIssueForm.get("images").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview.push(reader.result as string);
    };
    for (let i = 0; i < files.length; i++) {
      reader.readAsDataURL(files[i]);
    }
  }
}
