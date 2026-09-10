package com.ship_track_backend.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ship_track_backend.entity.UserEntity;
import com.ship_track_backend.pojo.UpdatePasswordRequest;
import com.ship_track_backend.repository.UserRepository;


@Service
public class PasswordService {

	@Autowired
    private UserRepository userRepository;;

    @Autowired
    private  PasswordEncoder passwordEncoder;


    public void updatePassword( UpdatePasswordRequest updatePasswordRequest)  {

        // Get currently logged-in user
        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email = authentication.getName();


        // Find user by email
        UserEntity user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );


        // Check current password
        if (!passwordEncoder.matches(
                updatePasswordRequest.getCurrentPassword(),
                user.getPassword()
        )) {

            throw new RuntimeException(
                    "Current password is incorrect"
            );
        }


        // Prevent using same password
        if (passwordEncoder.matches(
                updatePasswordRequest.getNewPassword(),
                user.getPassword()
        )) {

            throw new RuntimeException(
                    "New password cannot be the same as current password"
            );
        }


        // Encode and update password
        user.setPassword(
                passwordEncoder.encode(
                        updatePasswordRequest.getNewPassword()
                )
        );


        // Save updated user
        userRepository.save(user);


}
    }