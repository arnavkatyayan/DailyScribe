package com.DailyScribe.Services;

import org.springframework.stereotype.Service;

import com.DailyScribe.Request.JournalRequest;

@Service
public interface JournalPageServices {

	Boolean saveJournal(JournalRequest journalRequest);
}
