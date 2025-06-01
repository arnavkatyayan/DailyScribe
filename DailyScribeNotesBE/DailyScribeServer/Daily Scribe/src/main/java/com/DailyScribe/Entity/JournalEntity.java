package com.DailyScribe.Entity;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "journals", schema = "dailyscribeschema")
public class JournalEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", nullable = false, length = 100)
    private String username;

    @Column(name = "journal", nullable = false, columnDefinition = "TEXT")
    private String journal;

    @Column(name = "created_at", nullable = false)
    private Timestamp date;

    @Column(name = "title")
    private String title;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getJournal() {
        return journal;
    }

    public void setJournal(String journal) {
        this.journal = journal;
    }

	public Timestamp getDate() {
		return date;
	}

	public void setDate(Timestamp date) {
		this.date = date;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
	

    
}
