package com.skydev.jokesmvc;

import com.skydev.jokesmvc.configuration.ApplicationProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(ApplicationProperties.class)
public class JokesMvcApplication {

  public static void main(String[] args) {
    SpringApplication.run(JokesMvcApplication.class, args);
  }
}
