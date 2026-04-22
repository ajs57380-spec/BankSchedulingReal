package com.appointment.service;

import com.appointment.dto.BranchDTO;
import com.appointment.entity.Branch;
import com.appointment.repository.BranchRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class BranchService {
    private final BranchRepository branchRepository;

    public BranchService(BranchRepository branchRepository) {
        this.branchRepository = branchRepository;
    }

    public List<BranchDTO> getAllBranches() {
        return branchRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public BranchDTO getBranchById(Long id) {
        return branchRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Branch not found"));
    }

    public BranchDTO createBranch(BranchDTO branchDTO) {
        Branch branch = new Branch();
        branch.setName(branchDTO.getName());
        branch.setAddress(branchDTO.getAddress());
        branch.setPhone(branchDTO.getPhone());
        Branch savedBranch = branchRepository.save(branch);
        return convertToDTO(savedBranch);
    }

    private BranchDTO convertToDTO(Branch branch) {
        return new BranchDTO(branch.getId(), branch.getName(), branch.getAddress(), branch.getPhone());
    }
}
