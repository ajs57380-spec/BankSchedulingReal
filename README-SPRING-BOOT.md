# Appointment System - Spring Boot Backend

This is a complete Spring Boot backend application for the appointment booking system.

## Project Structure

```
src/main/java/com/appointment/
├── AppointmentSystemApplication.java    # Main Spring Boot application
├── config/
│   └── DataInitializer.java             # Initializes sample data
├── controller/
│   ├── AppointmentController.java       # REST endpoints for appointments
│   ├── BranchController.java            # REST endpoints for branches
│   └── AppointmentTypeController.java   # REST endpoints for appointment types
├── dto/
│   ├── AppointmentDTO.java              # Data Transfer Object
│   ├── BranchDTO.java                   # Data Transfer Object
│   └── AppointmentTypeDTO.java          # Data Transfer Object
├── entity/
│   ├── Appointment.java                 # JPA Entity
│   ├── Branch.java                      # JPA Entity
│   └── AppointmentType.java             # JPA Entity
├── repository/
│   ├── AppointmentRepository.java       # Database access layer
│   ├── BranchRepository.java            # Database access layer
│   └── AppointmentTypeRepository.java   # Database access layer
└── service/
    ├── AppointmentService.java          # Business logic
    ├── BranchService.java               # Business logic
    └── AppointmentTypeService.java      # Business logic
```

## Build and Run

### Prerequisites
- Java 17 or higher
- Maven 3.6+

### Build the project
```bash
mvn clean package
```

### Run the application
```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

### H2 Database Console
Access the embedded database console at: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:appointmentdb`
- Username: `sa`
- Password: (leave empty)

## API Endpoints

### Branches
- `GET /api/branches` - Get all branches
- `GET /api/branches/{id}` - Get branch by ID
- `POST /api/branches` - Create new branch

### Appointment Types
- `GET /api/appointment-types` - Get all appointment types
- `GET /api/appointment-types/{id}` - Get appointment type by ID
- `POST /api/appointment-types` - Create new appointment type

### Appointments
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/{id}` - Get appointment by ID
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments/{id}` - Update appointment
- `DELETE /api/appointments/{id}` - Delete appointment

## Sample Data

The application automatically initializes with sample data:

### Branches
- Downtown Branch
- Westside Branch
- Northgate Branch

### Appointment Types
- Account Opening (30 min)
- Loan Consultation (45 min)
- Financial Advice (60 min)
- Mortgage Consultation (60 min)
- Credit Card Application (20 min)

### Sample Appointments
- John Doe - Account Opening at Downtown Branch (Confirmed)
- Jane Smith - Loan Consultation at Westside Branch (Pending)
- Bob Johnson - Financial Advice at Northgate Branch (Confirmed)

## Example Requests

### Create an Appointment
```bash
curl -X POST http://localhost:8080/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "typeId": 1,
    "branchId": 1,
    "date": "2024-03-25",
    "time": "10:00 AM",
    "status": "PENDING",
    "customerName": "Alice Brown"
  }'
```

### Get All Appointments
```bash
curl http://localhost:8080/api/appointments
```

### Update an Appointment
```bash
curl -X PUT http://localhost:8080/api/appointments/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "CONFIRMED"
  }'
```

## Database
- Uses H2 in-memory database for development
- Automatically creates tables on startup
- Data persists during runtime, but is reset on application restart

## Technology Stack
- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- H2 Database
- Lombok
- Maven

## CORS Configuration
All endpoints have CORS enabled to allow requests from any origin.
