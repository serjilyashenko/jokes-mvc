package com.skydev.jokesmvc.client.icanhazdadjoke;

import com.skydev.jokesmvc.client.icanhazdadjoke.dto.IcanhazdadjokeResponse;
import com.skydev.jokesmvc.configuration.ApplicationProperties;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;

@Component
@Slf4j
public class IcanhazdadjokeClient {

  private final RestClient restClient;

  public IcanhazdadjokeClient(
      RestClient.Builder restClientBuilder, ApplicationProperties applicationProperties) {
    this.restClient =
        restClientBuilder
            .baseUrl(applicationProperties.icanhazdadjoke().url())
            .defaultHeader("Accept", MediaType.APPLICATION_JSON_VALUE)
            .build();
  }

  public String getJoke() {
    try {
      IcanhazdadjokeResponse response =
          restClient.get().uri("/").retrieve().body(IcanhazdadjokeResponse.class);

      if (response == null || response.joke() == null || response.joke().isBlank()) {
        throw new IllegalStateException("icanhazdadjoke API returned an empty joke");
      }
      log.info("Fetched joke from icanhazdadjoke API: {}", response.joke());
      return response.joke();
    } catch (RestClientResponseException exception) {
      log.error(
          "Failed to fetch joke from icanhazdadjoke API: status={} responseBody={}",
          exception.getStatusCode(),
          exception.getResponseBodyAsString(),
          exception);
      throw exception;
    } catch (Exception exception) {
      log.error("Failed to fetch joke from icanhazdadjoke API", exception);
      throw exception;
    }
  }
}
