package com.project.back_end.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for login requests.
 * Used to receive email and password from the client during authentication.
 * Not connected to database entities.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Login {

    private String email;
    private String password;

}
