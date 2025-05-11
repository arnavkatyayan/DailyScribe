package com.DailyScribe.Services;

import org.springframework.stereotype.Service;

@Service
public interface LoginPageServices {

	Boolean isCredentialsCorrect(String userName, String password);
	
}
