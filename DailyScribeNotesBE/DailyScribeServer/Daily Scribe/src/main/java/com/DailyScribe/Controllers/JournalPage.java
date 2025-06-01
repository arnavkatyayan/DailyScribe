package com.DailyScribe.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.DailyScribe.Request.JournalRequest;
import com.DailyScribe.Services.JournalPageServices;

@RestController
@RequestMapping("/dailyScribe-journal")
@CrossOrigin(origins = "http://localhost:3000")
public class JournalPage {
	
	@Autowired
	JournalPageServices journalPageService;

	@PostMapping("/addJournal")
	public ResponseEntity<Boolean> saveJournalDetails(@RequestBody JournalRequest journalRequest) {
		
		try {
			Boolean saveDetails = journalPageService.saveJournal(journalRequest);
			if(saveDetails) {
				return ResponseEntity.ok(true);
			}
			else {
				return ResponseEntity.ok(false);
			}
		}
		catch(Exception e) {
			e.printStackTrace();		
			 return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
		}
	}
}
