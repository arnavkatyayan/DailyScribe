package com.DailyScribe.Controllers;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;

import com.DailyScribe.DTO.JournalPageDTO;
import com.DailyScribe.Entity.JournalEntity;
import com.DailyScribe.Repository.JournalRepository;
import com.DailyScribe.Request.JournalEditRequest;
import com.DailyScribe.Request.JournalRequest;
import com.DailyScribe.Request.StarRatingRequest;
import com.DailyScribe.Services.JournalPageServices;

@RestController
@RequestMapping("/dailyScribe-journal")
@CrossOrigin(origins = "http://localhost:3000")
public class JournalPage {
	
	@Autowired
	JournalPageServices journalPageService;
	
	@Autowired
	JournalRepository journalrepo;

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
	
	@GetMapping("/getJournals")
	public ResponseEntity<List<JournalPageDTO>> getJournals(@RequestParam String userName) {
		List<JournalPageDTO> journalList = new ArrayList<>();
		try {
			journalList = journalPageService.getJournals(userName);
			return ResponseEntity.ok(journalList);
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ArrayList<>());

		}
	}
	@DeleteMapping("/deleteJournals")
	public ResponseEntity<Boolean> deleteJournals(@RequestParam String userName) {
		
		try {
			Boolean delete = journalPageService.deleteJournals(userName);
			return ResponseEntity.ok(delete);
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
		}
		
	}
	
	@DeleteMapping("/deleteJournal")
	public ResponseEntity<Boolean> deleteJournal(@RequestParam String userName, @RequestParam Long id) {
		try {
			Boolean deleteJournal = journalPageService.deleteJournal(userName,id);
			return ResponseEntity.ok(deleteJournal);
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);

		}
	}
	@PostMapping("/editJournal")
	public ResponseEntity<Boolean> editJournal(@RequestBody JournalEditRequest request) {
	    try {
	        Boolean success = journalPageService.editJournal(request.getUserName(), request.getId(), request.getJournal(), request.getTitle());
	        return ResponseEntity.ok(success);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
	    }
	}
	@GetMapping("/exportJournals")
	public ResponseEntity<byte[]> exportJournals(@RequestParam String userName, @RequestParam String journalName, @RequestParam String journalPassword) {
	    try {
	        List<JournalEntity> journals = journalrepo.findAllByUsername(userName);
	        if (journals.isEmpty()) {
	            return ResponseEntity.notFound().build();
	        }

	        byte[] pdfData = journalPageService.generateJournalsPdf(journals,journalPassword);
			String name;
			if (journalName == null || journalName.trim().isEmpty()) {
				name = "journals";
			} else {
				name = journalName;
			}
	        HttpHeaders headers = new HttpHeaders();
	        headers.setContentType(MediaType.APPLICATION_PDF);
	        headers.setContentDisposition(ContentDisposition.builder("attachment")
	        		  .filename(URLEncoder.encode(name + ".pdf", StandardCharsets.UTF_8).replaceAll("\\+", "%20"))
	                .build());

	        return new ResponseEntity<>(pdfData, headers, HttpStatus.OK);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	    }
	}

	@PostMapping("/starRating")
	public ResponseEntity<?> updateStarRating(@RequestBody StarRatingRequest starRatingRequest) {
		try {
			journalPageService.updateStarSystem(starRatingRequest.getUserName(),starRatingRequest.getStarIndex(),starRatingRequest.getIsSelected());
			return ResponseEntity.ok().build();
		} catch(Exception e) {
			e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update star rating");

		}
	}

	

	
}
