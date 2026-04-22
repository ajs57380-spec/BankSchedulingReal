package com.appointment.controller;

import com.appointment.dto.AppointmentTypeDTO;
import com.appointment.service.AppointmentTypeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointment-types")
@CrossOrigin(origins = "*")
public class AppointmentTypeController {
    private final AppointmentTypeService appointmentTypeService;

    public AppointmentTypeController(AppointmentTypeService appointmentTypeService) {
        this.appointmentTypeService = appointmentTypeService;
    }

    @GetMapping
    public ResponseEntity<List<AppointmentTypeDTO>> getAllAppointmentTypes() {
        return ResponseEntity.ok(appointmentTypeService.getAllAppointmentTypes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppointmentTypeDTO> getAppointmentTypeById(@PathVariable Long id) {
        return ResponseEntity.ok(appointmentTypeService.getAppointmentTypeById(id));
    }

    @PostMapping
    public ResponseEntity<AppointmentTypeDTO> createAppointmentType(@RequestBody AppointmentTypeDTO typeDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(appointmentTypeService.createAppointmentType(typeDTO));
    }
}
