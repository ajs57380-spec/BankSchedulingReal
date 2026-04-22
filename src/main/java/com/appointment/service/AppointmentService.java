package com.appointment.service;

import com.appointment.dto.AppointmentDTO;
import com.appointment.entity.Appointment;
import com.appointment.entity.AppointmentType;
import com.appointment.entity.Branch;
import com.appointment.repository.AppointmentRepository;
import com.appointment.repository.AppointmentTypeRepository;
import com.appointment.repository.BranchRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final AppointmentTypeRepository appointmentTypeRepository;
    private final BranchRepository branchRepository;

    public AppointmentService(AppointmentRepository appointmentRepository,
                              AppointmentTypeRepository appointmentTypeRepository,
                              BranchRepository branchRepository) {
        this.appointmentRepository = appointmentRepository;
        this.appointmentTypeRepository = appointmentTypeRepository;
        this.branchRepository = branchRepository;
    }

    public List<AppointmentDTO> getAllAppointments() {
        return appointmentRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public AppointmentDTO getAppointmentById(Long id) {
        return appointmentRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
    }

    public AppointmentDTO createAppointment(AppointmentDTO appointmentDTO) {
        Appointment appointment = new Appointment();

        AppointmentType type = appointmentTypeRepository.findById(appointmentDTO.getTypeId())
                .orElseThrow(() -> new RuntimeException("Appointment type not found"));

        Branch branch = branchRepository.findById(appointmentDTO.getBranchId())
                .orElseThrow(() -> new RuntimeException("Branch not found"));

        appointment.setType(type);
        appointment.setBranch(branch);
        appointment.setDate(appointmentDTO.getDate());
        appointment.setTime(appointmentDTO.getTime());
        appointment.setStatus(Appointment.AppointmentStatus.valueOf(appointmentDTO.getStatus().toUpperCase()));
        appointment.setCustomerName(appointmentDTO.getCustomerName());
        appointment.setNotes(appointmentDTO.getNotes());

        Appointment savedAppointment = appointmentRepository.save(appointment);
        return convertToDTO(savedAppointment);
    }

    public AppointmentDTO updateAppointment(Long id, AppointmentDTO appointmentDTO) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        if (appointmentDTO.getTypeId() != null) {
            AppointmentType type = appointmentTypeRepository.findById(appointmentDTO.getTypeId())
                    .orElseThrow(() -> new RuntimeException("Appointment type not found"));
            appointment.setType(type);
        }

        if (appointmentDTO.getBranchId() != null) {
            Branch branch = branchRepository.findById(appointmentDTO.getBranchId())
                    .orElseThrow(() -> new RuntimeException("Branch not found"));
            appointment.setBranch(branch);
        }

        if (appointmentDTO.getDate() != null) {
            appointment.setDate(appointmentDTO.getDate());
        }

        if (appointmentDTO.getTime() != null) {
            appointment.setTime(appointmentDTO.getTime());
        }

        if (appointmentDTO.getStatus() != null) {
            appointment.setStatus(Appointment.AppointmentStatus.valueOf(appointmentDTO.getStatus().toUpperCase()));
        }

        if (appointmentDTO.getCustomerName() != null) {
            appointment.setCustomerName(appointmentDTO.getCustomerName());
        }

        appointment.setNotes(appointmentDTO.getNotes());

        Appointment updatedAppointment = appointmentRepository.save(appointment);
        return convertToDTO(updatedAppointment);
    }

    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }

    private AppointmentDTO convertToDTO(Appointment appointment) {
        AppointmentDTO dto = new AppointmentDTO();
        dto.setId(appointment.getId());
        dto.setTypeId(appointment.getType().getId());
        dto.setBranchId(appointment.getBranch().getId());
        dto.setType(appointment.getType().getName());
        dto.setBranch(appointment.getBranch().getName());
        dto.setDate(appointment.getDate());
        dto.setTime(appointment.getTime());
        dto.setStatus(appointment.getStatus().toString());
        dto.setCustomerName(appointment.getCustomerName());
        dto.setNotes(appointment.getNotes());
        return dto;
    }
}
