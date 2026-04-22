package com.appointment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentTypeDTO {
    private Long id;
    private String name;
    private Integer duration;
    private String description;
}
