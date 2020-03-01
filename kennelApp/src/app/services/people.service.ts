import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../models/person';
import { Image } from '../models/image';


@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private httpClient : HttpClient) { }

  BASEURL = 'http://localhost:5000/api/';


  postPeopleWithImage(formData: FormData){
    return this.httpClient.post(this.BASEURL + "people", formData)
  }

  getPeople(){
    return this.httpClient.get<Person[]>(this.BASEURL + "people");
  }
}
