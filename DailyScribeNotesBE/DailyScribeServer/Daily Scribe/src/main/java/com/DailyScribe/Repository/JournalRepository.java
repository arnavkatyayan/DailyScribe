package com.DailyScribe.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.DailyScribe.Entity.JournalEntity;

public interface JournalRepository extends JpaRepository<JournalEntity, Long> {
	 List<JournalEntity> findAllByUsername(String username);
	 void deleteByUsername(String username);
	 Boolean existsByUsername(String username);
}
