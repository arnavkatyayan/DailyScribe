package com.DailyScribe.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.DailyScribe.Entity.SignupEntity;
import com.DailyScribe.Repository.SignupRepository;

@Service
public class LoginPageServicesImpl implements LoginPageServices {

	@Autowired
	SignupRepository signupRepo;
	
	@Override
	public Boolean isCredentialsCorrect(String userName, String password) {
		
		SignupEntity signupVals = signupRepo.findByUsername(userName);
		String user = signupVals.getUsername();
		String pass = signupVals.getPassword();
		if(userName.equals(user) && password.equals(pass)) {
			return true;
		}
		else {
			return false;
		}
		
		
	}

	@Override
	public Boolean saveDetails(String userName, String password, String email) {
		SignupEntity signupEntity = new SignupEntity();
		signupEntity.setUsername(userName);
		signupEntity.setEmail(email);
		signupEntity.setPassword(password);
		signupRepo.save(signupEntity);
		return true;
	}

	@Override
	public Boolean isUsernameTaken(String username) {
		return signupRepo.existsByUsername(username);
	}

	@Override
	public Boolean isEmailTaken(String email) {
		return signupRepo.existsByEmail(email);
	}

}
