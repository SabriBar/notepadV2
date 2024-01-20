import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NoteService } from '../../services/note.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Note } from 'src/app/shared/models/note';
import { MatDialog } from '@angular/material/dialog';
import { UpdateNoteComponent } from '../update-note/update-note.component';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  showArchived = false;
  allNotes: Note[] = []; // Conjunto de todas las notas
  archivedNotes: Note[] = []; // Conjunto de notas archivadas
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

  updateNote() {
    this._dialog.open(UpdateNoteComponent);
  }

  toggleView(view: 'archived' | 'nonArchived'): void {
    switch (view) {

      case 'archived':
        this.showArchived = true;
        break;
      case 'nonArchived':
        this.showArchived = false;
        break;
      default:
        this.showArchived = false;
    }

    // Actualizar la fuente de datos de la tabla
    if (this.showArchived) {
      this.dataSource = new MatTableDataSource<Note>(this.archivedNotes);
    } else {
      this.dataSource = new MatTableDataSource<Note>(
        this.allNotes.filter((note) => !note.archived)
      );
    }

    this.dataSource.paginator = this.paginator;
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  noteList() {
    this.noteService.noteList().subscribe({
      next: (res) => {
        console.log(res);
        this.allNotes = res;
        this.archivedNotes = res.filter((note: Note) => note.archived);

        // Actualizar la fuente de datos de la tabla
        if (this.showArchived) {
          this.dataSource = new MatTableDataSource<Note>(this.archivedNotes);
        } else {
          this.dataSource = new MatTableDataSource<Note>(
            this.allNotes.filter((note) => !note.archived)
          );
        }

        this.dataSource.paginator = this.paginator;
        this.paginator._changePageSize(this.paginator.pageSize);
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
        console.log(`La nota con ID ${noteId} ha sido ${archived ? 'archivada' : 'desarchivada'}.`);
  
        // Actualizar los conjuntos de datos después de archivar o desarchivar
        const updatedNote = this.allNotes.find((note) => note.id === noteId);
  
        if (updatedNote) {
          updatedNote.archived = archived;
  
          if (archived) {
            // Si se archiva, agregar la nota a archivedNotes
            this.archivedNotes.push(updatedNote);
          } else {
            // Si se desarchiva, quitar la nota de archivedNotes
            const index = this.archivedNotes.findIndex((note) => note.id === noteId);
            if (index !== -1) {
              this.archivedNotes.splice(index, 1);
            }
          }
  
          // Actualizar la fuente de datos de la tabla
          const nonArchivedNotes = this.allNotes.filter((note) => !note.archived);
          this.dataSource = new MatTableDataSource<Note>(
            this.showArchived ? this.archivedNotes : nonArchivedNotes
          );
  
          this.dataSource.paginator = this.paginator;
          this.paginator._changePageSize(this.paginator.pageSize);
        }
      },
      error: (error) => {
        console.error(`Error al ${archived ? 'archivar' : 'desarchivar'} la nota:`, error);
      }
    });
  }
  
  
  
  

  deleteNote(id: number) {
    this.noteService.deleteNote(id).subscribe((res) => {
      console.log(res);
      this.noteList();
    });
  }
}
