package com.appointment.service;

import com.appointment.dto.AppointmentTypeDTO;
import com.appointment.entity.AppointmentType;
import com.appointment.repository.AppointmentTypeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class AppointmentTypeService {
    private final AppointmentTypeRepository appointmentTypeRepository;

    public AppointmentTypeService(AppointmentTypeRepository appointmentTypeRepository) {
        this.appointmentTypeRepository = appointmentTypeRepository;
    }

    public List<AppointmentTypeDTO> getAllAppointmentTypes() {
        return appointmentTypeRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public AppointmentTypeDTO getAppointmentTypeById(Long id) {
        return appointmentTypeRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Appointment type not found"));
    }

    public AppointmentTypeDTO createAppointmentType(AppointmentTypeDTO typeDTO) {
        AppointmentType type = new AppointmentType();
        type.setName(typeDTO.getName());
        type.setDuration(typeDTO.getDuration());
        type.setDescription(typeDTO.getDescription());
        AppointmentType savedType = appointmentTypeRepository.save(type);
        return convertToDTO(savedType);
    }

    private AppointmentTypeDTO convertToDTO(AppointmentType type) {
        return new AppointmentTypeDTO(type.getId(), type.getName(), type.getDuration(), type.getDescription());
    }
}
