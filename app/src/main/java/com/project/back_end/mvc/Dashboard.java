package com.project.back_end.mvc;

import com.project.back_end.services.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Map;

@Controller
@RequiredArgsConstructor
public class Dashboard {

    private final Service service;

    @GetMapping("/adminDashboard/{token}")
    public String adminDashboard(@PathVariable String token) {
        Map<String, String> map = service.validateToken(token, "admin").getBody();
        System.out.println("map" + map);
        if (map.isEmpty()) {
            return "admin/adminDashboard";
        }
        return "redirect:http://localhost:8080";

    }

    @GetMapping("/doctorDashboard/{token}")
    public String doctorDashboard(@PathVariable String token) {
        Map<String, String> map = service.validateToken(token, "doctor").getBody();
        System.out.println("map" + map);
        if (map.isEmpty()) {
            return "doctor/doctorDashboard";
        }

        return "redirect:http://localhost:8080";

    }
}