import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = ["http://localhost:9000"]

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http:HttpClient) { }

  createNote(note:any): Observable<any> {
    return this.http.post(BASIC_URL+"/api/note", note);
  }

  noteList(): Observable<any>{
    return this.http.get(BASIC_URL+"/api/notes");
  }
}
