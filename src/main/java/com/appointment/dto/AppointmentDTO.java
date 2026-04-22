package com.appointment.dto;

import com.appointment.entity.Appointment;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentDTO {
    private Long id;
    private Long typeId;
    private Long branchId;
    private String type;
    private String branch;
    private LocalDate date;
    private String time;
    private String status;

    @NotBlank(message = "Customer name is required")
    private String customerName;

    private String notes;
}
