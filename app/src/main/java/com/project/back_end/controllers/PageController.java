package com.project.back_end.controllers;


//
//@Controller
//public class PageController {
//
//    private final AuthenticationService authenticationService;
//
//    @Autowired
//    public PageController(AuthenticationService authenticationService) {
//        this.authenticationService = authenticationService;
//    }
//
//    @GetMapping("/adminDashboard/{token}")
//    public String showAdminDashboard(@PathVariable String token) {
//
//        Map<String, String> validationResult = authenticationService.validateToken(token, "admin").getBody();
//
//
//        if (validationResult != null && validationResult.isEmpty()) {
//            return "admin/adminDashboard";
//        } else {
//
//            return "redirect:/";
//        }
//    }
//
//    @GetMapping("/doctorDashboard/{token}")
//    public String showDoctorDashboard(@PathVariable String token) {
//
//        Map<String, String> validationResult = authenticationService.validateToken(token, "doctor").getBody();
//
//        if (validationResult != null && validationResult.isEmpty()) {
//            return "doctor/doctorDashboard";
//        } else {
//            return "redirect:/";
//        }
//    }
//}