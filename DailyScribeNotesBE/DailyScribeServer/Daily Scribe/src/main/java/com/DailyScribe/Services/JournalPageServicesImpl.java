package com.DailyScribe.Services;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

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
			dto.setId(journal.getId());
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

	@Override
	@Transactional
	public Boolean deleteJournal(String userName, Long id) {

		try {
			if (journalRepo.existsByIdAndUsername(id,userName)) {
				journalRepo.deleteById(id);
				return true;
			} else {
				return false;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}


	@Override
	public Boolean editJournal(String userName, Long id, String journal, String title) {
	    try {
	        Optional<JournalEntity> optionalJournal = journalRepo.findByIdAndUsername(id, userName);
	        if (optionalJournal.isPresent()) {
	            JournalEntity journalEntity = optionalJournal.get();
	            journalEntity.setJournal(journal);
	            journalEntity.setTitle(title);
	            journalRepo.save(journalEntity); 
	            return true;
	        } else {
	            return false; 
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	        return false;
	    }
	}

	@Override
	public byte[] generateJournalsPdf(List<JournalEntity> journals) throws Exception {
		 ByteArrayOutputStream out = new ByteArrayOutputStream();

	        Document document = new Document();
	        PdfWriter.getInstance(document, out);
	        document.open();

	        Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16);
	        Font normalFont = FontFactory.getFont(FontFactory.HELVETICA, 12);

	        for (JournalEntity journal : journals) {
	            document.add(new Paragraph("Title: " + journal.getTitle(), titleFont));
	            document.add(new Paragraph("Date: " + journal.getDate().toString(), normalFont));
	            document.add(new Paragraph("Journal: " + journal.getJournal(), normalFont));
	            document.add(new Paragraph("------------------------------------------------------------"));
	        }

	        document.close();
	        return out.toByteArray();
	    }
	}



