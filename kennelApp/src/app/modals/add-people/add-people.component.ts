import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { PeopleService } from 'src/app/services/people.service';
import { Image } from 'src/app/models/image';
import { Person } from 'src/app/models/person';
import { HttpEventType } from '@angular/common/http';

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
  image: Image;
  person: Person;

  public progress: number;
  public message: string;

  public formData = new FormData();
  @Output() public onUploadFinished = new EventEmitter();

  @ViewChild('fileInput', {static: false}) fileInput:any;

  constructor(private peopleService: PeopleService) { }

  ngOnInit() {
  }


  public uploadFile = (files) => {

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
          this.progress = Math.round(100 * event.loaded / event.total);
        }
        else if(event.type === HttpEventType.Response) 
        {
          this.message = 'Upload success.'
          this.onUploadFinished.emit(event.body);
        }
      }));

    }
  }

}
