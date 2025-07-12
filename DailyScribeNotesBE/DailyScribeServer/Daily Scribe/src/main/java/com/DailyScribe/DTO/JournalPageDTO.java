package com.DailyScribe.DTO;

import java.sql.Timestamp;

public class JournalPageDTO {

    private String title;
    private String journal;
    private Timestamp date;
    private Long Id;
    private Boolean star;
    public JournalPageDTO() {
    }

    public JournalPageDTO(String title, String journal, Timestamp date, Long Id, Boolean star) {
        this.title = title;
        this.journal = journal;
        this.date = date;
        this.Id = Id;
    }

    public String getTitle() {
        return title;
    }

    public String getJournal() {
        return journal;
    }

    public Timestamp getDate() {
        return date;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setJournal(String journal) {
        this.journal = journal;
    }

    public void setDate(Timestamp date) {
        this.date = date;
    }

	public Long getId() {
		return Id;
	}

	public void setId(Long id) {
		Id = id;
	}

	public Boolean getStar() {
		return star;
	}

	public void setStar(Boolean star) {
		this.star = star;
	}
    
    

 
}
