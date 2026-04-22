package com.appointment.config;

import com.appointment.entity.Appointment;
import com.appointment.entity.AppointmentType;
import com.appointment.entity.Branch;
import com.appointment.repository.AppointmentRepository;
import com.appointment.repository.AppointmentTypeRepository;
import com.appointment.repository.BranchRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Arrays;

@Component
public class DataInitializer implements CommandLineRunner {
    private final BranchRepository branchRepository;
    private final AppointmentTypeRepository appointmentTypeRepository;
    private final AppointmentRepository appointmentRepository;

    public DataInitializer(BranchRepository branchRepository,
                          AppointmentTypeRepository appointmentTypeRepository,
                          AppointmentRepository appointmentRepository) {
        this.branchRepository = branchRepository;
        this.appointmentTypeRepository = appointmentTypeRepository;
        this.appointmentRepository = appointmentRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        Branch branch1 = new Branch();
        branch1.setName("Downtown Branch");
        branch1.setAddress("123 Main St, City Center");
        branch1.setPhone("(555) 123-4567");

        Branch branch2 = new Branch();
        branch2.setName("Westside Branch");
        branch2.setAddress("456 West Ave, Westside");
        branch2.setPhone("(555) 234-5678");

        Branch branch3 = new Branch();
        branch3.setName("Northgate Branch");
        branch3.setAddress("789 North Blvd, Northgate");
        branch3.setPhone("(555) 345-6789");

        branchRepository.saveAll(Arrays.asList(branch1, branch2, branch3));

        AppointmentType type1 = new AppointmentType();
        type1.setName("Account Opening");
        type1.setDuration(30);
        type1.setDescription("Open a new checking or savings account");

        AppointmentType type2 = new AppointmentType();
        type2.setName("Loan Consultation");
        type2.setDuration(45);
        type2.setDescription("Discuss personal or business loan options");

        AppointmentType type3 = new AppointmentType();
        type3.setName("Financial Advice");
        type3.setDuration(60);
        type3.setDescription("Get expert advice on investments and planning");

        AppointmentType type4 = new AppointmentType();
        type4.setName("Mortgage Consultation");
        type4.setDuration(60);
        type4.setDescription("Discuss home loan and mortgage options");

        AppointmentType type5 = new AppointmentType();
        type5.setName("Credit Card Application");
        type5.setDuration(20);
        type5.setDescription("Apply for a new credit card");

        appointmentTypeRepository.saveAll(Arrays.asList(type1, type2, type3, type4, type5));

        Appointment apt1 = new Appointment();
        apt1.setType(type1);
        apt1.setBranch(branch1);
        apt1.setDate(LocalDate.of(2024, 3, 15));
        apt1.setTime("10:00 AM");
        apt1.setStatus(Appointment.AppointmentStatus.CONFIRMED);
        apt1.setCustomerName("John Doe");
        apt1.setNotes("Interested in premium checking account");

        Appointment apt2 = new Appointment();
        apt2.setType(type2);
        apt2.setBranch(branch2);
        apt2.setDate(LocalDate.of(2024, 3, 18));
        apt2.setTime("02:00 PM");
        apt2.setStatus(Appointment.AppointmentStatus.PENDING);
        apt2.setCustomerName("Jane Smith");
        apt2.setNotes("Small business loan inquiry");

        Appointment apt3 = new Appointment();
        apt3.setType(type3);
        apt3.setBranch(branch3);
        apt3.setDate(LocalDate.of(2024, 3, 20));
        apt3.setTime("11:00 AM");
        apt3.setStatus(Appointment.AppointmentStatus.CONFIRMED);
        apt3.setCustomerName("Bob Johnson");

        appointmentRepository.saveAll(Arrays.asList(apt1, apt2, apt3));
    }
}
