package com.example.personalfinancetracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.example.personalfinancetracker")
public class PersonalFinanceTrackerApplication {
    public static void main(String[] args) {
        SpringApplication.run(PersonalFinanceTrackerApplication.class, args);
    }
}
