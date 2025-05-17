package com.DailyScribe.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.DailyScribe.Entity.SignupEntity;

public interface SignupRepository extends JpaRepository<SignupEntity, Long> {
	SignupEntity findByUsername(String username);
	Boolean existsByUsername(String username);
	Boolean existsByEmail(String email);
}
