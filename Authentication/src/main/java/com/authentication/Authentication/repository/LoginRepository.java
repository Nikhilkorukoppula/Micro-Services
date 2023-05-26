package com.authentication.Authentication.repository;

import com.authentication.Authentication.entities.LoginDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LoginRepository extends JpaRepository<LoginDetails, Integer> {
    Optional<LoginDetails> findByUserName(String username);
}
