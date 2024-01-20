package com.notepad.entity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Entity
@Table(name = "note")
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private String title;
    private String content;

    @Setter
    @Getter
    @Column(name = "archived")
    private boolean archived;


}
