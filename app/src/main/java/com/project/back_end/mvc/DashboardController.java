package com.project.back_end.mvc;

import com.project.back_end.service.TokenValidationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
public class DashboardController {

    // 2. Autowire the token validation service
    @Autowired
    private TokenValidationService tokenValidationService;

    // 3. Admin Dashboard endpoint
    @GetMapping("/adminDashboard/{token}")
    public String adminDashboard(@PathVariable String token) {
        Map<String, String> errors = tokenValidationService.validateToken(token, "admin");

        if (errors.isEmpty()) {
            return "admin/adminDashboard"; // Thymeleaf template location
        } else {
            return "redirect:/"; // Invalid token, redirect to login
        }
    }

    // 4. Doctor Dashboard endpoint
    @GetMapping("/doctorDashboard/{token}")
    public String doctorDashboard(@PathVariable String token) {
        Map<String, String> errors = tokenValidationService.validateToken(token, "doctor");

        if (errors.isEmpty()) {
            return "doctor/doctorDashboard";
        } else {
            return "redirect:/";
        }
    }
}
