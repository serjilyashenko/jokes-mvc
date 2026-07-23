package com.skydev.jokesmvc.client.openai;

import com.skydev.jokesmvc.client.openai.dto.OpenaiRequest;
import com.skydev.jokesmvc.client.openai.dto.OpenaiResponse;
import com.skydev.jokesmvc.configuration.ApplicationProperties;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;

@Component
@Slf4j
public class OpenaiClient {

  private static final String PING_PROMPT = "Answer with pong in lower case without anything else.";
  private static final String PONG = "pong";

  private final RestClient restClient;
  private final ApplicationProperties applicationProperties;

  public OpenaiClient(
      RestClient.Builder restClientBuilder, ApplicationProperties applicationProperties) {
    ApplicationProperties.Openai openaiProperties = applicationProperties.openai();
    this.applicationProperties = applicationProperties;
    String url = openaiProperties.url();
    String apiKey = openaiProperties.apiKey();

    this.restClient =
        restClientBuilder
            .baseUrl(url)
            .defaultHeader("Authorization", "Bearer " + apiKey)
            .defaultHeader("Accept", MediaType.APPLICATION_JSON_VALUE)
            .build();
  }

  public String getJoke() {
    try {
      String prompt = applicationProperties.openai().prompt();
      String joke = getResponse(prompt);
      if (joke == null || joke.isBlank()) {
        throw new IllegalStateException("OpenAI API returned an empty joke");
      }
      log.info("Fetched joke from OpenAI API: {}", joke);
      return joke;
    } catch (RestClientResponseException exception) {
      log.error(
          "Failed to fetch joke from OpenAI API: status={} responseBody={}",
          exception.getStatusCode(),
          exception.getResponseBodyAsString(),
          exception);
      throw exception;
    } catch (Exception exception) {
      log.error("Failed to fetch joke from OpenAI API", exception);
      throw exception;
    }
  }

  public boolean ping() {
    try {
      String response = getResponse(PING_PROMPT);
      boolean ok = PONG.equals(response == null ? null : response.trim());
      if (ok) {
        log.info("OpenAI API ping succeeded");
      } else {
        log.warn("OpenAI API ping failed: expected '{}' but got '{}'", PONG, response);
      }
      return ok;
    } catch (RestClientResponseException exception) {
      log.error(
          "Failed to ping OpenAI API: status={} responseBody={}",
          exception.getStatusCode(),
          exception.getResponseBodyAsString(),
          exception);
      throw exception;
    } catch (Exception exception) {
      log.error("Failed to ping OpenAI API", exception);
      throw exception;
    }
  }

  private String getResponse(String prompt) {
    String model = applicationProperties.openai().model();
    OpenaiRequest openaiRequest = new OpenaiRequest(model, prompt);
    OpenaiResponse response =
        restClient
            .post()
            .uri("/responses")
            .body(openaiRequest)
            .retrieve()
            .body(OpenaiResponse.class);
    return extractText(response);
  }

  private static String extractText(OpenaiResponse response) {
    if (response == null || response.output() == null || response.output().isEmpty()) {
      return null;
    }
    OpenaiResponse.Output output = response.output().getLast();
    if (output == null || output.content() == null || output.content().isEmpty()) {
      return null;
    }
    OpenaiResponse.Content content = output.content().getFirst();
    if (content == null) {
      return null;
    }
    return content.text();
  }
}
