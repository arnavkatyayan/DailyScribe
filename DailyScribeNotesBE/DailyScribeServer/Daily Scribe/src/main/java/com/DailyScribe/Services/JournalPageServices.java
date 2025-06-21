package com.DailyScribe.Services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.DailyScribe.DTO.JournalPageDTO;
import com.DailyScribe.Request.JournalRequest;

@Service
public interface JournalPageServices {

	Boolean saveJournal(JournalRequest journalRequest);
	List<JournalPageDTO> getJournals(String userName);
	Boolean deleteJournals(String userName);
	Boolean deleteJournal(String userName, Long id);
	Boolean editJournal(String userName,Long id, String journal, String title);
}
