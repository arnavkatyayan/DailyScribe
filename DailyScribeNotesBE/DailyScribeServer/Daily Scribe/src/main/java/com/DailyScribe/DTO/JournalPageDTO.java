package com.DailyScribe.DTO;

import java.sql.Timestamp;

public class JournalPageDTO {

    private String title;
    private String journal;
    private Timestamp date;

    public JournalPageDTO() {
    }

    public JournalPageDTO(String title, String journal, Timestamp date) {
        this.title = title;
        this.journal = journal;
        this.date = date;
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

 
}
