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
  fullName: string;
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
         response.forEach(element => {
          let firstName = element.firstName.toString();
          let lastName = element.lastName.toString();
          let fullName =  firstName + " " + lastName
          element.firstName = fullName;
          element.lastName = fullName;
          this.listOfData.push(element)
         });   
             
         this.listOfData = response;
       },
       (error) => console.log(error)
     )    
  }

  handleOk(): void {
    const fd = new FormData();

    if(this.addPerson.firstName != null || undefined && this.addPerson.lastName != null || undefined) 
    {
      fd.append("firstName", this.addPerson.firstName);
      fd.append("lastName", this.addPerson.lastName);
      fd.append("address", this.addPerson.address);
      fd.append("reasonsForBeingOnTheList", this.addPerson.reasonsForBeingOnTheList);

       if(this.addPerson.selectedFile != null || undefined) 
        {
          fd.append("files", this.addPerson.selectedFile, this.addPerson.selectedFile.name);
          this.addPerson.selectedFile = null;
        }

        this.peopleService.postPeopleWithImage(fd).subscribe(res => {console.log(res)});

        this.isVisible = false;
        this.addPerson.validateForm.reset();
        this.addPerson.address = '';
        this.addPerson.reasonsForBeingOnTheList = '';
        this.addPerson.reset();
        
    } 

    else 
    {
      for(const i in this.addPerson.validateForm.controls) 
      {
        this.addPerson.validateForm.controls[i].markAsDirty();
        this.addPerson.validateForm.controls[i].updateValueAndValidity();
      }
      console.log("You need at least a firstname and lastname to post something.");
    }
    

  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

}
