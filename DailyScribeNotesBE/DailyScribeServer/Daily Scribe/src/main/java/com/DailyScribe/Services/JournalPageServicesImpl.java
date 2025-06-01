package com.DailyScribe.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.DailyScribe.Entity.JournalEntity;
import com.DailyScribe.Repository.JournalRepository;
import com.DailyScribe.Request.JournalRequest;

@Service
public class JournalPageServicesImpl implements JournalPageServices{

	@Autowired
	JournalRepository journalRepo;
	
	@Override
	public Boolean saveJournal(JournalRequest journalRequest) {
		JournalEntity journalEntity = new JournalEntity();
		journalEntity.setUsername(journalRequest.getUserName());
		journalEntity.setDate(journalRequest.getDate());
		journalEntity.setTitle(journalRequest.getTitle());
		journalEntity.setJournal(journalRequest.getJournal());
		journalRepo.save(journalEntity);
		return true;
	}

}
