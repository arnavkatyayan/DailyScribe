package com.DailyScribe.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.DailyScribe.Request.LoginRequest;
import com.DailyScribe.Services.LoginPageServices;

@RestController
@RequestMapping("/dailyScribe-login")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginPage {

	 @Autowired
	 LoginPageServices loginPageServices;
	 
	 
	 @PostMapping("/login")
	 public ResponseEntity<Boolean> login(@RequestBody LoginRequest loginRequest) {
		 
		 try {
			 Boolean isPresent = loginPageServices.isCredentialsCorrect(loginRequest.getUserName(), loginRequest.getPassword());
			 if(isPresent) {
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
