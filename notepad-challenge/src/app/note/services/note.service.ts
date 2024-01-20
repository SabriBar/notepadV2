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

  getNoteById(id: number): Observable<any>{
    return this.http.get(BASIC_URL+"/api/note/" + id);
  }

  archiveNoteById(noteId: number): Observable<any> {
    return this.http.put(`${BASIC_URL}/api/note/${noteId}/archive`, null);  
  }

  deleteNote(id: number): Observable<any>{
    return this.http.delete(BASIC_URL+"/api/note/" + id);
  }

  editNote(id: number, note: any): Observable<any>{
    return this.http.put(BASIC_URL+"/api/note/" + id, note);
  }

}
