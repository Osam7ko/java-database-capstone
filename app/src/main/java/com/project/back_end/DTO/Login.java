package com.project.back_end.DTO;

/**
 * DTO for login requests.
 * Used to receive email and password from the client during authentication.
 * Not connected to database entities.
 */
public class Login {

    private String email;
    private String password;

    //getters and setters

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}