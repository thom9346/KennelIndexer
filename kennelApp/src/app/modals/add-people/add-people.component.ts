import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { PeopleService } from 'src/app/services/people.service';
import { Person } from 'src/app/models/person';
import { HttpEventType } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UploadChangeParam } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-add-people',
  templateUrl: './add-people.component.html',
  styleUrls: ['./add-people.component.scss']
})
export class AddPeopleComponent implements OnInit {

  firstName: string;
  lastName: string;
  address: string; 
  reasonsForBeingOnTheList: string;
  fullFileName: string;
  person: Person;
  selectedFile:File[] = [];
  yotest: string;

  public progress: number;
  public message: string;

  public isImageUploading: boolean = false;

  public formData = new FormData();



  validateForm: FormGroup;

  @Output() public onUploadFinished = new EventEmitter();

  @ViewChild('fileInput', {static: false}) fileInput:any;
  @ViewChild('fileUpload', {static: false}) elementRef: ElementRef;

  constructor(private peopleService: PeopleService, private fb: FormBuilder, private msg: NzMessageService) { }
  

  ngOnInit() {
    this.validateForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
    });
  }

  reset(){
    this.elementRef.nativeElement.value = '';
  }

  onFileSelected(event){
    console.log(event.target.files[0]);
    this.selectedFile = event.target.files[0];
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    this.selectedFile.push(files);

    console.log("from uploadfile..")
    console.log(files);
    console.log(this.selectedFile);

    // const formData = new FormData();
      
    // Array.from(filesToUpload).map((file, index) => {
    //   return formData.append('file'+index, file, file.name);
    // });
  
    // this.http.post('https://localhost:5001/api/upload', formData, {reportProgress: true, observe: 'events'})
    //   .subscribe(event => {
    //     if (event.type === HttpEventType.UploadProgress)
    //       this.progress = Math.round(100 * event.loaded / event.total);
    //     else if (event.type === HttpEventType.Response) {
    //       this.message = 'Upload success.';
    //       this.onUploadFinished.emit(event.body);
    //     }
    //   });
  }
  }
  

/*   public uploadFile = (files) => {

    if(files.length === 0) 
    {
      return
    }
    else
    {

      let fileToUpload = <File>files[0];
      let dateTime = new Date().getMilliseconds();
      let dateString = dateTime.toString();
      this.fullFileName = dateString + fileToUpload.name;
   
      
   
    //  let fullFileName = fileToUpload.name + dateString;
      console.log(this.fullFileName);
     
      this.formData.append('file',fileToUpload, this.fullFileName);
    
      console.log(this.formData);
      this.peopleService.uploadPicture(this.formData).subscribe((event => {
        if(event.type === HttpEventType.UploadProgress) 
        {
          this.isImageUploading = true;
          this.progress = Math.round(100 * event.loaded / event.total);
        }
        else if(event.type === HttpEventType.Response) 
        {
          this.message = 'Upload success.'
          this.isImageUploading = false;
          this.onUploadFinished.emit(event.body);
        }
      }));

    } */
 // }


