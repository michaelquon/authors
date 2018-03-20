import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  authorName: any
  error = ""
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.authorName = {name: ""}
  }

  ngOnInit() {
    this._route.params.subscribe((params: Params)=>{
      this.getOneAuthor(params['id'])
    })
  }
  getOneAuthor(id){
    console.log("got too get one author function", id)
    let observable = this._httpService.getOneAuthor(id)
    observable.subscribe(data=>{
    this.authorName = data['data']
    })
  }
  getHome(){
    this._router.navigate(['/'])
  }
  addAuthor(){
    if(this.authorName.name.length <=3){
      this.error = "Name must be 3 characters long"
    }
    else{
      let observable = this._httpService.editAuthor(this.authorName)
      observable.subscribe(data=>{
      this.authorName = {name: ""}
      this.getHome()
      })
     
    }
  }

}
