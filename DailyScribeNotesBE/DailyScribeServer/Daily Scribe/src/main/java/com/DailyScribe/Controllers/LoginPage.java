package com.DailyScribe.Controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.DailyScribe.Request.ChangePasswordRequest;
import com.DailyScribe.Request.LoginRequest;
import com.DailyScribe.Request.RestoreAccountRequest;
import com.DailyScribe.Request.SignupRequest;
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
	 
	 @PostMapping("/signup")
	 public ResponseEntity<Boolean> signup(@RequestBody SignupRequest signupRequest) {
		 try {
			 Boolean saveDetails = loginPageServices.saveDetails(signupRequest.getUserName(), signupRequest.getPassword(), signupRequest.getEmail());
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
	 
	 @GetMapping("/isUserOrMailPresent")
	 public ResponseEntity<Map<String,Boolean>> isMailAndUserPresent(@RequestParam String username, @RequestParam String email) {
		 Map<String,Boolean> map = new HashMap<>();
		 map.put("isUserNamePresent", loginPageServices.isUsernameTaken(username));
		 map.put("isEmailPresent", loginPageServices.isEmailTaken(email));
		 return ResponseEntity.ok(map);
	 }
	 
	@DeleteMapping("/deleteAccount")
	public ResponseEntity<String> deleteAccount(@RequestParam String userName) {
			try {
				Boolean deleteAccount = loginPageServices.deleteAccount(userName);
				if (deleteAccount) {
					return ResponseEntity.ok("Account Deleted");
				} else {
					return ResponseEntity.ok("Error deleting the account");
				}
			} catch (Exception e) {
				e.printStackTrace();
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting the account");
			}
		}
	@GetMapping("/isPasswordCorrect")
	public ResponseEntity<Boolean> isPasswordCorrect(@RequestParam String userName, @RequestParam String password) {
		try {
			Boolean isPass = loginPageServices.checkPassword(userName, password);
			return ResponseEntity.ok(isPass);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
		}
	}
	@PostMapping("/changePassword")
	public ResponseEntity<Boolean> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest) {
		try {
			Boolean changePassword = loginPageServices.changePassword(changePasswordRequest.getUserName(),changePasswordRequest.getPassword(),changePasswordRequest.getConfirmPassword());
			return ResponseEntity.ok(changePassword);
		}catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
		}
	}
	@PostMapping("/restoreAccount")
	public ResponseEntity<String> restoreAccount(@RequestBody RestoreAccountRequest restoreAccountRequest) {
		try {
			String restoreAcc = loginPageServices.restoreAccount(restoreAccountRequest.getUserName(),restoreAccountRequest.getPassword());
			return ResponseEntity.ok(restoreAcc);
		}catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Invalid response");
		}
	}
	@GetMapping("/forgetPassword")
	public ResponseEntity<Boolean> forgetPassword(@RequestParam String userName) {
		try {
			Boolean isPassChanged = loginPageServices.forgetPassword(userName);
			return ResponseEntity.ok(isPassChanged);
		} catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);

		}
		
	}
}
