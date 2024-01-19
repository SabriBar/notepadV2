import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit{
  
  notes: any = [];

  constructor(
    private router: Router,
    private noteService: NoteService
    ){}

    ngOnInit(){
    this.noteList();
  }

  noteList(){
    this.noteService.noteList().subscribe((res) =>{
      console.log(res);
      this.notes=res;
    })
  }


  redirectToNote(){
    this.router.navigate(['/note'])
  }

}
