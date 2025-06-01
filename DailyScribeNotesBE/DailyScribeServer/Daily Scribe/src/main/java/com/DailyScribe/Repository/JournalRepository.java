package com.DailyScribe.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.DailyScribe.Entity.JournalEntity;

public interface JournalRepository extends JpaRepository<JournalEntity, Long> {

}
