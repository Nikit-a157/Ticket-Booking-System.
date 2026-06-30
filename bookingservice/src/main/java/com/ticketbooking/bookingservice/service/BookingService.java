package com.ticketbooking.bookingservice.service;

import com.ticketbooking.bookingservice.client.UserClient;
import com.ticketbooking.bookingservice.entity.Booking;
import com.ticketbooking.bookingservice.repository.BookingRepository;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final KafkaTemplate<String, String> kafkaTemplate;
    private final UserClient userClient;

    public BookingService(BookingRepository bookingRepository, UserClient userClient,KafkaTemplate<String, String> kafkaTemplate) {
        this.bookingRepository = bookingRepository;
        this.kafkaTemplate = kafkaTemplate;
        this.userClient = userClient;
    }

    public Booking createBooking(Booking booking) {
        userClient.getUserById(booking.getUserId()); 
        Booking savedBooking = bookingRepository.save(booking);

        String message = "Ticket successfully booked for User ID: " + savedBooking.getUserId() + 
                         " for Event: " + savedBooking.getEventName();
                         
        kafkaTemplate.send("notification-topic", message);

        System.out.println("Message sent to Kafka: " + message);

        return savedBooking;
    }
}