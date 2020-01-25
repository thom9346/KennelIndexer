import { Component, OnInit, ViewChild } from '@angular/core';
import { PeopleService } from 'src/app/services/people.service';
import { Person } from 'src/app/models/person';
import { AddPeopleComponent } from 'src/app/modals/add-people/add-people.component';
import { HttpEventType } from '@angular/common/http';
import { Image } from '../../models/image';

@Component({
  selector: 'app-welcome',
  templateUrl: './name-index.component.html',
  styleUrls: ['./name-index.component.scss']
})
export class NameIndexComponent implements OnInit {


  @ViewChild(AddPeopleComponent, {static: false}) addPerson;
  public searchString: string;
  public isVisible = false;

  listOfData:Person[] = [];
  newlyAddedPerson: Person;
  imageToPerson: Image;
  
  constructor(private peopleService: PeopleService) { }


  showModal(): void {
    this.isVisible = true;
  }

  ngOnInit() : void {
    this.peopleService.getPeople().subscribe
     (
       (response)=>
       {
         this.listOfData = response;
       },
       (error) => console.log(error)
     )    
  }

  handleOk(): void {
    
 
    this.newlyAddedPerson =
    {
      firstName: this.addPerson.firstName,
      lastName: this.addPerson.lastName,
      address: this.addPerson.address,
      reasonsForBeingOnTheList: this.addPerson.reasonsForBeingOnTheList,
      imageURL: this.addPerson.fullFileName
    }
    this.peopleService.postPeople(this.newlyAddedPerson).subscribe();

    this.imageToPerson = 
    {
      imageURL: this.addPerson.fullFileName,
      person: this.newlyAddedPerson,
    }
    this.peopleService.postImage(this.imageToPerson).subscribe();

   /* this.peopleService.postPictures(this.imageToPerson).subscribe(/*event => {
      if(event.type === HttpEventType.UploadProgress) 
      {
      //  this.progress = Math.round(100 * event.loaded / event.total);
      }
      else if(event.type === HttpEventType.Response) 
      {
      ///  this.message = 'Upload success.'
        //this.onUploadFinished.emit(event.body);
      }
    }); 
     */

    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

}
