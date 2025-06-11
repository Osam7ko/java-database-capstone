package com.project.back_end.mvc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.project.back_end.services.TokenService;

import java.util.Map;

@Controller
public class DashboardController {

    // 2. Autowire the token validation service
    @Autowired
    private TokenService tokenValidationService;

    // 3. Admin Dashboard endpoint
    @GetMapping("/adminDashboard/{token}")
    public String adminDashboard(@PathVariable String token) {
        boolean isValid = tokenValidationService.validateToken(token, "admin");

        if (isValid) {
            return "admin/adminDashboard";
        } else {
            return "redirect:/";
        }
    }

    @GetMapping("/doctorDashboard/{token}")
    public String doctorDashboard(@PathVariable String token) {
        boolean isValid = tokenValidationService.validateToken(token, "doctor");

        if (isValid) {
            return "doctor/doctorDashboard";
        } else {
            return "redirect:/";
        }
    }
}
