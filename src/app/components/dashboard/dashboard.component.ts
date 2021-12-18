import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/ApiService/api.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/services/AuthService/authentication.service';
import { Constants } from 'src/constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public isUploadJson: boolean = false;
  public uploadForm: FormGroup;
  public fileData: any;
  private _userinfo: (object | null | string) = '';

  constructor(private _formBuilder: FormBuilder,
    private _apiService: ApiService,
    private _redirect: Router,
    private _authService: AuthenticationService,
    private _toastr: ToastrService) {
    this.uploadForm = this._formBuilder.group({
      jsonFile: [''],
    });
  }


  ngOnInit(): void {
    this.getUserDetails()
  }

  getUserDetails() {
    this._apiService.getFileData().subscribe((response) => {
      this.fileData = response;
    });
  }

  toggleUpload() {
    this.isUploadJson ? this.isUploadJson = false : this.isUploadJson = true;
  }

  onUpload() {
    this.isUploadJson = false;
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('jsonFile')?.value);
    // tslint:disable-next-line: deprecation
    this._apiService.uploadFile(formData).subscribe(
      (res) => {
        this._toastr.success(Constants.messages.fileUploaded);
        this.getUserDetails();
      },
      (err) => {
        this._toastr.error(Constants.messages.failureUpload);
      }
    );
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.size < 10 * 1024 * 1024) {
        this.uploadForm.get('jsonFile')?.setValue(file);
      } else {
        this._toastr.error('File size is greater than 10MB!');
      }
    }
  }

  logout() {
    this._redirect.navigate(['']);
    this._toastr.info("Logged Out Successfully");
    this._authService.logoutUser(this._userinfo).subscribe((response: any) => {

    });
  }
}
