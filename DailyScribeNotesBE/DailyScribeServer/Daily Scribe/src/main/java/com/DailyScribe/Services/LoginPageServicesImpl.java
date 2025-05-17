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

}
