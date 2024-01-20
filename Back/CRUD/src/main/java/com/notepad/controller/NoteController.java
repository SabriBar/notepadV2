package com.notepad.controller;
import com.notepad.entity.Note;
import com.notepad.service.NoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin("*")
public class NoteController {

    private final NoteService noteService;

    @GetMapping("/notes")
    public List<Note> getAllNotes() {
        return noteService.getAllNotes();
    }

    @GetMapping("/active")
    public List<Note> getActiveNotes() {
        return noteService.getActiveNotes();
    }

    @GetMapping("/archived")
    public List<Note> getArchivedNotes() {
        return noteService.getArchivedNotes();
    }

    @GetMapping("/note/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable Long id){
        Note note = noteService.getNoteById(id);
        if(note == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(note);
    }

    @PostMapping("/note")
    public Note createNote(@RequestBody Note note) {
        return noteService.createNote(note);
    }

    @PutMapping("/note/{id}")
    public ResponseEntity<Note> editNote(@PathVariable Long id, @RequestBody Note note) {
        Note existingNote = noteService.getNoteById(id);
        if (existingNote == null)
            return ResponseEntity.notFound().build();
        existingNote.setTitle(note.getTitle());
        existingNote.setContent(note.getContent());
    Note editNotee = noteService.editNote(existingNote);
    return ResponseEntity.ok(editNotee);
    }

    @DeleteMapping("/note/{id}")
    public ResponseEntity<?> deleteNote(@PathVariable Long id) {
       Note existingNote =  noteService.getNoteById(id);
       if (existingNote == null)
           return ResponseEntity.notFound().build();
       noteService.deleteNote(id);
       return ResponseEntity.ok().build();
    }

    @PutMapping("/archive/{id}")
    public void archiveNoteById(@PathVariable Long id, @RequestBody ArchiveRequest request) {
        noteService.archiveNoteById(id, request.isArchived());
    }
}

