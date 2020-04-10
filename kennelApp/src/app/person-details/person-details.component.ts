import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeopleService } from '../services/people.service';
import { Person } from '../models/person';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit, OnDestroy {

  private sub: any;
  personId: string;
  person: Person;

  images = [];
  effect = 'scrollx';
  test = '102e8b4e-ce49-4aba-80ff-65fc2944ee09.JPG';
  constructor(private route: ActivatedRoute, private peopleService: PeopleService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.personId = params['id'];
   })

   console.log(this.personId)
   if(this.personId != undefined) 
   {
     console.log("hello")
    this.peopleService.getPerson(this.personId).subscribe(res => {
      console.log(res);
      this.person = {
        firstName: res.firstName, 
        lastName: res.lastName,
        address: res.address,
        reasonsForBeingOnTheList: res.reasonsForBeingOnTheList,
      }
    });
    this.peopleService.getPictures(this.personId).subscribe(pics => {

      pics.forEach(element => {
        this.images.push(element.pictureUri);
      });
      console.log("from this.image xD")
      console.log(this.images);
    })
   }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


}
