package com.skydev.jokesmvc;

import com.skydev.jokesmvc.config.JokesMvcProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(JokesMvcProperties.class)
public class JokesMvcApplication {

	public static void main(String[] args) {
		SpringApplication.run(JokesMvcApplication.class, args);
	}

}
