import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  newAuthors: any;
  error = '';

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.newAuthors = { name: ""}
  }
  addAuthor(){
    let observable = this._httpService.addAuthor(this.newAuthors);
    observable.subscribe(data => {
      if(data['error']){
        this.error = data['error']['errors']['name']['message']
      }
      else{
        console.log("An Author was added", data)
        this.newAuthors = {name: ""}
        this.getHome()
      }
      
  })
  
  }
  getHome(){
    this._router.navigate(['/home'])
  }
}

