import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  limit: string = "20";

  constructor(private http: HttpClient) { }

  public get() {
    return this.http.get('https://pokeapi.co/api/v2/pokemon');
  }

  public getOne(idOrName: any): Observable<any> {
    return this.http.get('https://pokeapi.co/api/v2/pokemon/'+idOrName);
  }

  public getNextOrPrev(offset: string) {    
    return this.http.get("https://pokeapi.co/api/v2/pokemon?offset="+offset+"&limit="+this.limit+"");
  }

}
