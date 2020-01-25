import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../models/person';
import { Image } from '../models/image';


@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private httpClient : HttpClient) { }

  BASEURL = 'http://localhost:52834/api/';

  postPeople(people: Person) {
    return this.httpClient.post(this.BASEURL + "people", people)
  }

  getPeople(){
    return this.httpClient.get<Person[]>(this.BASEURL + "people");
  }

  uploadPicture(formData: FormData) {
    return this.httpClient.post(this.BASEURL + "UploadImage", formData, {reportProgress: true, observe: 'events'});
  }
  postImage(image: Image) {

    return this.httpClient.post(this.BASEURL + "images", image);
  }

}
