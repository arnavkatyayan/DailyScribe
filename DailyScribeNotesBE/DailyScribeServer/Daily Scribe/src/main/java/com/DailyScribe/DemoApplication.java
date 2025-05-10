package com.DailyScribe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		System.out.print("Lets Build A journaling app");
		SpringApplication.run(DemoApplication.class, args);
	}

}
