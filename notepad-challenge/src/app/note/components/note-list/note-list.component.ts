import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NoteService } from '../../services/note.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Note } from 'src/app/shared/models/note';
import { MatDialog } from '@angular/material/dialog';
import { UpdateNoteComponent } from '../update-note/update-note.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  

  dataSource!: MatTableDataSource<Note>;
  columnas: string[] = ['title', 'content', 'acciones'];

  constructor(
    private router: Router,
    private noteService: NoteService,
    private _dialog: MatDialog
  ) {}


  ngOnInit() {
    this.noteList();
  }

  updateNote(){
    this._dialog.open(UpdateNoteComponent)
  }

  noteList() {
    this.noteService.noteList().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource<Note>(res);
        this.dataSource.paginator = this.paginator;
        this.paginator._changePageSize(this.paginator.pageSize); // Renderiza las nuevas filas
      },
      error: (error) => {
        console.error('Error al obtener las notas:', error);
      }
    });
  }
  
  redirectToNote() {
    this.router.navigate(['/note']);
  }

  archiveNoteById(noteId: number, archived: boolean): void {
    this.noteService.archiveNoteById(noteId, archived).subscribe({
        next: (res) => {
            console.log(`La nota con ID ${noteId} ha sido archivada.`);

            // Verificar si la respuesta es un objeto JSON válido
            try {
                const jsonResponse = JSON.parse(res);
                // Respuesta es un objeto JSON válido
                // Realizar cualquier manejo adicional necesario para objetos JSON
            } catch (e) {
                // Respuesta no es un objeto JSON válido
                console.log('Respuesta del servidor (Texto):', res);
            }

            this.noteList(); // Actualizar la lista de notas después de archivar
        },
        error: (error) => {
            console.error('Error al archivar la nota:', error);
        }
    });
}





  deleteNote(id: number){
    this.noteService.deleteNote(id).subscribe((res) => {
      console.log(res);
      this.noteList();
    })
  }
}
