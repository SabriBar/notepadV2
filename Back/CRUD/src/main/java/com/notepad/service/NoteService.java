package com.notepad.service;

import com.notepad.entity.Note;
import com.notepad.repository.NoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NoteService {

    private final NoteRepository noteRepository;

    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }

    public List<Note> getActiveNotes() {
        return noteRepository.findByArchivedFalse();
    }

    public List<Note> getArchivedNotes() {
        return noteRepository.findByArchivedTrue();
    }

    public Note getNoteById(Long id) {return noteRepository.findById(id).orElse(null);
    }

    public Note createNote(Note note) {
        return noteRepository.save(note);
    }

    public Note editNote(Long id, Note updatedNote) {
        Optional<Note> existingNote = noteRepository.findById(id);
        if (existingNote.isPresent()) {
            Note note = existingNote.get();
            note.setTitle(updatedNote.getTitle());
            note.setContent(updatedNote.getContent());
            note.setTags(updatedNote.getTags());
            return noteRepository.save(note);
        } else {
            throw new RuntimeException("Note not found with id: " + id);
        }
    }

    public void deleteNoteById(Long id) {
        noteRepository.deleteById(id);
    }

    public void archiveNoteById(Long id, boolean archived) {
        Optional<Note> optionalNote = noteRepository.findById(id);
        if (optionalNote.isPresent()) {
            Note note = optionalNote.get();
            note.setArchived(archived);
            noteRepository.save(note);
        } else {
            throw new RuntimeException("Note not found with id: " + id);
        }
    }
}
