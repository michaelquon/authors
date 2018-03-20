import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  authors = [];
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ){}

    ngOnInit() {
    this.getAuthors()
  }

  getAuthors(){
    let observable = this._httpService.getAuthors();
    observable.subscribe(data => {console.log("Got our authors", data)
    this.authors = data['data'];
  })
  }
  deleteAuthor(id){
    let observable = this._httpService.deleteAuthor(id);
    observable.subscribe(data =>{
    })
    this.getAuthors()
    console.log("Author deleted successfully!")
  }
  updateAuthor(id){
    this._router.navigate(['/edit/'+id])
  }
  getHome(){
    this._router.navigate(['/home'])
  }
  getCreate(){
    this._router.navigate(['/create'])
  }
}
