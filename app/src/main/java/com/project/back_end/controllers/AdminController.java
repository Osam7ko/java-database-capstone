package com.project.back_end.controllers;

import com.project.back_end.models.Admin;
import com.project.back_end.services.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("${api.path}" + "admin")
public class AdminController {

    private final Service service;

    @Autowired
    public AdminController(Service service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> adminLogin(@RequestBody Admin admin) {
        return service.validateAdmin(admin);
    }


    @GetMapping("/dashboard/{token}")
    public String adminDashboard(@PathVariable String token) {
        Map<String, String> map = service.validateToken(token, "admin").getBody();
        if (map == null) {
            return "admin/adminDashboard";
        }
        return "redirect:http://localhost:8080/";

    }
}