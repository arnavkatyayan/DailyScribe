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
		Boolean isAvailable = signupVals.getStatus();
		if(userName.equals(user) && password.equals(pass) && isAvailable) {
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
	
	@Override
	public Boolean deleteAccount(String userName) {
		try {
			if(signupRepo.existsByUsername(userName)) {
				SignupEntity signup = signupRepo.findByUsername(userName);
				signup.setStatus(false);
				signupRepo.save(signup);
				return true;
			}
			else {
				return false;
			}
		} catch(Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public Boolean checkPassword(String userName, String password) {
		try {
			if (signupRepo.existsByUsername(userName)) {
				SignupEntity signup = signupRepo.findByUsername(userName);
				if (signup.getPassword().equals(password)) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}

	}

	@Override
	public Boolean changePassword(String userName, String password, String confirmPassword) {
		try {
			if(signupRepo.existsByUsername(userName)) {
				SignupEntity signup = signupRepo.findByUsername(userName);
				signup.setPassword(confirmPassword);
				signupRepo.save(signup);
				return true;
			}
			else {
				return false;
			}
		} catch(Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public String restoreAccount(String userName, String password) {
		try {
			if (signupRepo.existsByUsernameAndPassword(userName, password)) {
				SignupEntity signup = signupRepo.findByUsername(userName);
				Boolean isStatusTrue = signup.getStatus();
				if (isStatusTrue) {
					return "Account is available";
				} else {
					signup.setStatus(true);
					signupRepo.save(signup);
					return "Account is restored";
				}
			} else {
				return "Account not found!";
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "Account not found!";
		}

	}

}
