import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createNoteForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', Validators.required],
      archived: [false],
      tags: this.fb.array([]),
    });

    // Inicializar una etiqueta en blanco
    this.addTag();
  }

  // Obtener el control de etiquetas como FormArray
  get tagsFormArray(): FormArray {
    return this.createNoteForm.get('tags') as FormArray;
  }

  // Agregar una nueva etiqueta al FormArray
  addTag() {
    this.tagsFormArray.push(this.fb.control(''));
  }

  createNote(): void {
    // Verificar si al menos una etiqueta tiene contenido
    const tags = this.tagsFormArray.value.filter((tag: string) => tag.trim() !== '');
    if (tags.length === 0) {
      // Puedes mostrar un mensaje al usuario indicando que al menos una etiqueta es necesaria
      return;
    }
  
    // Actualizar el valor de las etiquetas en el formulario
    this.createNoteForm.patchValue({ tags });
  
    // Continuar con el proceso de creación
    this.noteService.createNote(this.createNoteForm.value).subscribe((res) => {
      console.log(res);
      // Redirigir a la lista después de la creación
      this.router.navigate(['/']);
    });
  }
}
