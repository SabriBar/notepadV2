import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NoteService } from '../../services/note.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Note } from 'src/app/shared/models/note';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource!: MatTableDataSource<Note>;
  columnas: string[] = ['title', 'content', 'tags', 'archive', 'acciones'];

  constructor(
    private router: Router,
    private noteService: NoteService
  ) {}

  ngOnInit() {
    this.noteList();
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

  archiveNoteById(noteId: number): void {
    this.noteService.archiveNoteById(noteId).subscribe({
      next: (res) => {
        console.log(`La nota con ID ${noteId} ha sido archivada.`);
        this.noteList(); // Actualizar la lista de notas después de archivar
      },
      error: (error) => {
        console.error('Error al archivar la nota:', error);
      }
    });
  }
}
