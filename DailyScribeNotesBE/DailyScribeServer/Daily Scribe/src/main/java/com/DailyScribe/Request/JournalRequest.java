package com.DailyScribe.Request;

import java.sql.Timestamp;

public class JournalRequest {
	private String title;
	private String userName;
	private Timestamp date;
	private String journal;
	private Boolean star;
	
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public Timestamp getDate() {
		return date;
	}
	public void setDate(Timestamp date) {
		this.date = date;
	}
	public String getJournal() {
		return journal;
	}
	public void setJournal(String journal) {
		this.journal = journal;
	}
	public Boolean getStar() {
		return star;
	}
	public void setStar(Boolean star) {
		this.star = star;
	}
	
	
	
}
