import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNoteComponent } from './note/components/create-note/create-note.component';
import { NoteListComponent } from './note/components/note-list/note-list.component';
import { UpdateNoteComponent } from './note/components/update-note/update-note.component';

const routes: Routes = [
  {path:'note', component: CreateNoteComponent},
  {path:'', component: NoteListComponent},
  {path:'note/:id', component: UpdateNoteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
