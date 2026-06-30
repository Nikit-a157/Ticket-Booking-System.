package com.ticketbooking.notificationservice.service;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class NotificationListener {

    @KafkaListener(topics = "notification-topic", groupId = "notification-group")
    public void handleNotification(String message) {
        
        System.out.println("========================================");
        System.out.println("NEW EVENT RECEIVED FROM KAFKA");
        System.out.println("Processing Email for: " + message);
        System.out.println("Email Sent Successfully!");
        System.out.println("========================================");
    }
}