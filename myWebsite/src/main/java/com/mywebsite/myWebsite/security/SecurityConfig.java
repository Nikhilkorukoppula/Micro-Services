package com.mywebsite.myWebsite.security;


import com.mywebsite.myWebsite.entities.MyProfile;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;


public class SecurityConfig implements UserDetails {

    private static final long serialVersionUID = 1L;
    private String userName;
    private String password;
    List<GrantedAuthority> authority;

    public SecurityConfig(MyProfile details) {
        this.userName=details.getEmail();
        this.password=details.getPassword();
       // this.authority=Arrays.stream((details.getRoles().split(","))).map(SimpleGrantedAuthority::new).collect(Collectors.toList());
         }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
