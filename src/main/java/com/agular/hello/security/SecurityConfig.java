package com.agular.hello.security;


import com.agular.hello.security.filter.AuthenticationFilter;
import com.agular.hello.security.filter.JWTAuthorizationFilter;
import com.agular.hello.security.manager.CustomAuthenticationManager;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@AllArgsConstructor
@EnableWebSecurity
public class SecurityConfig {
    private CustomAuthenticationManager authenticationManager;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        AuthenticationFilter authenticationFilter = new AuthenticationFilter(authenticationManager);
        authenticationFilter.setFilterProcessesUrl("/login");

        http
                .headers().frameOptions().disable() //only for H2
                .and()
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/h2/**").permitAll()
                .antMatchers(HttpMethod.POST,SecurityConstants.REGISTER_PATH).permitAll()
                .anyRequest().authenticated()
                .and()
                .addFilter(authenticationFilter)
                .addFilterAfter(new JWTAuthorizationFilter(), AuthenticationFilter.class)
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        return http.build();

    }
}
