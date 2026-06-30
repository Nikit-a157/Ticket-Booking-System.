**Concert Ticket Booking System (Microservices)**

    A distributed microservices-based application for handling high-concurrency ticket booking events. Built with Spring Boot, React, and Apache Kafka.

**Architecture Overview**

    This project uses a microservices architecture to ensure scalability and separation of concerns.
    
    Frontend: React.js (Vite) - Single Page Application for user registration and booking.
    
    API Gateway: Spring Cloud Gateway - Centralized routing and CORS management (Port 8090).
    
    User Service: Spring Boot - Handles user registration and authentication (Port 8080).
    
    Booking Service: Spring Boot - Processes ticket orders (Port 8081).
    
    Notification Service: Spring Boot - Listens for successful bookings and triggers alerts (Port 8083).
  
    Message Broker: Apache Kafka - Asynchronous event-driven communication between Booking and Notification services.
    
    Databases: PostgreSQL (Service-isolated databases for User and Booking).

**Tech Stack**

    Backend: Java 17, Spring Boot 3, Spring Data JPA, Spring Cloud Gateway
    
    Frontend: React, Tailwind CSS / Plain CSS, Vite
    
    Infrastructure: Docker, Docker Compose, Apache Kafka, PostgreSQL

**How to Run Locally**

  1. _Prerequisites_
  
    Java 17+
    
    Node.js & npm
    
    Docker Desktop (running)

  2. Start Infrastructure

    Run the following command in the root directory to start PostgreSQL and Kafka:
    
    docker compose up -d



  3. Start Backend Services

    Run these Spring Boot applications (via your IDE or Maven):
    
    UserserviceApplication (Runs on 8080)
    
    BookingserviceApplication (Runs on 8081)
    
    NotificationserviceApplication (Runs on 8083)

    ApigatewayApplication (Runs on 8090)

  4. Start Frontend
  
    Open a terminal in the frontend directory:
    
    cd frontend
    npm install
    npm run dev

**Screechots**
