import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteListComponent } from './components/note-list/note-list.component';
import { CreateNoteComponent } from './components/create-note/create-note.component';
import { UpdateNoteComponent } from './components/update-note/update-note.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'



@NgModule({
  declarations: [
    NoteListComponent,
    CreateNoteComponent,
    UpdateNoteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports:[
    CreateNoteComponent
  ]
})
export class NoteModule { }
