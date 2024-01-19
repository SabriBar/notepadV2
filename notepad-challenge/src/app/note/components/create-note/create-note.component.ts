import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {

  createNoteForm!: FormGroup;

  constructor(
    private noteService: NoteService,
    private fb: FormBuilder,
    private router: Router){}

    ngOnInit(): void {
      this.createNoteForm = this.fb.group({
        title:['', [Validators.required]],
        content:['', Validators.required],
        archived:[false],
        tags:this.fb.array([])

      })
    }


  createNote(){
    console.log(this.createNoteForm.value);
    this.noteService.createNote(this.createNoteForm.value).subscribe((res)=>{
      console.log(res);
    })
  }
}
