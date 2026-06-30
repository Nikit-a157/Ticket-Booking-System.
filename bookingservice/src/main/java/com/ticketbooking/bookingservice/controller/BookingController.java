package com.ticketbooking.bookingservice.controller;

import com.ticketbooking.bookingservice.entity.Booking;
import com.ticketbooking.bookingservice.service.BookingService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("/book")
    public Booking bookTicket(@RequestBody Booking booking) {
        return bookingService.createBooking(booking);
    }
}
