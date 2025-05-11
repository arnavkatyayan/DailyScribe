package com.DailyScribe.Services;

import org.springframework.stereotype.Service;

@Service
public class LoginPageServicesImpl implements LoginPageServices {

	@Override
	public Boolean isCredentialsCorrect(String userName, String password) {
		
		if(userName.equals("user") && password.equals("password")) {
			return true;
		}
		else {
			return false;
		}
		
	}

}
