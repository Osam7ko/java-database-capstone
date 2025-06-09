package com.project.back_end.controllers;

import com.project.back_end.models.Admin;
import com.project.back_end.services.AuthenticationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("${api.path}admin") // مثلاً: /api/v1/admin
public class AdminController {

    private final AuthenticationService mainService;

    @Autowired
    public AdminController(AuthenticationService mainService) {
        this.mainService = mainService;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> adminLogin(@RequestBody Admin admin) {
        return mainService.validateAdmin(admin);
    }
}
