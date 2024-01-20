import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.css']
})
export class UpdateNoteComponent {

  editNoteForm!: FormGroup
  id: number = this.activatedRoute.snapshot.params["id"]

  constructor(
    private noteService: NoteService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(){
    
    this.editNoteForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', Validators.required],
      archived: [false]
    });


    this.getNoteById();
  }

  getNoteById(){
    this.noteService.getNoteById(this.id).subscribe((res)=>{
      console.log(res)
      this.editNoteForm.patchValue(res)
    })
  }

  editNote(){
    this.noteService.editNote(this.id,this.editNoteForm.value).subscribe((res) => {
      console.log(res);
      if(res.id != null){
        this.router.navigateByUrl("")
      }
    })
  }
  
}
 
