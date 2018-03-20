import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  getAuthors(){
    return this._http.get('/authors');
  }
  addAuthor(newAuthors){
    return this._http.post('/authors', newAuthors)
  }
  deleteAuthor(id){
    console.log("An author was deleted")
    return this._http.delete('/authors/'+id)
  }
  getOneAuthor(id){
    console.log("got to service", id)
    return this._http.get('/authors/'+id)
  }
  editAuthor(author){
    return this._http.put('/authors/'+author._id, author)
  }
}
