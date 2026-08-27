
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;



@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	@Autowired
	private JwtRequestFilter jwtRequestFilter;	
	
	@Bean
	SecurityFilterChain securityFilterChain( HttpSecurity http) throws Exception  {
		
		http
	    .cors(Customizer.withDefaults()) // This line tells spring security to USE your existing CorsConfig.java file 
		.csrf(csrf -> csrf.disable()) 
		.authorizeHttpRequests( auth -> auth
				                            .requestMatchers("/auth/login").permitAll()
				                            .requestMatchers("/auth/create-account").permitAll()
				                            .requestMatchers("/api/get/foods").permitAll()
				                            .requestMatchers("/auth/admin/login").permitAll()
				                            .anyRequest().authenticated() )
		.sessionManagement( Session -> Session.sessionCreationPolicy(SessionCreationPolicy.STATELESS) );
		
	http.addFilterBefore( jwtRequestFilter, UsernamePasswordAuthenticationFilter.class );
		return http.build();
	}

	
}
