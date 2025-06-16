package com.DailyScribe.Services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.DailyScribe.DTO.JournalPageDTO;
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

	@Override
	public List<JournalPageDTO> getJournals(String userName) {

		List<JournalEntity> journals = new ArrayList<>();
		List<JournalPageDTO> journalDTOList = new ArrayList<>();
		journals = journalRepo.findAllByUsername(userName);
		for (JournalEntity journal : journals) {
			JournalPageDTO dto = new JournalPageDTO();
			dto.setTitle(journal.getTitle());
			dto.setJournal(journal.getJournal());
			dto.setDate(journal.getDate());
			journalDTOList.add(dto);
		}
		return journalDTOList;
	}

	@Override
	@Transactional
	public Boolean deleteJournals(String userName) {

		try {
			if (journalRepo.existsByUsername(userName)) {
				journalRepo.deleteByUsername(userName);
				return true;
			} else {
				return false;
			}

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

}
