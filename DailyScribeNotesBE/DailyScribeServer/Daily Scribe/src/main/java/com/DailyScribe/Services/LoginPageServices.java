package com.DailyScribe.Services;

import org.springframework.stereotype.Service;

@Service
public interface LoginPageServices {

	Boolean isCredentialsCorrect(String userName, String password);
	Boolean saveDetails(String userName, String password, String email);
	Boolean isUsernameTaken(String username);
	Boolean isEmailTaken(String email);
	Boolean deleteAccount(String userName);
	Boolean checkPassword(String userName, String password);
	Boolean changePassword(String userName, String password, String confirmPassword);
}
