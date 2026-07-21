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
      String model = applicationProperties.openai().model();
      String prompt = applicationProperties.openai().prompt();
      OpenaiRequest openaiRequest = new OpenaiRequest(model, prompt);

      OpenaiResponse response =
          restClient
              .post()
              .uri("/responses")
              .body(openaiRequest)
              .retrieve()
              .body(OpenaiResponse.class);

      String joke = extractJoke(response);
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

  private static String extractJoke(OpenaiResponse response) {
    if (response == null || response.output() == null || response.output().isEmpty()) {
      return null;
    }
    OpenaiResponse.Output output = response.output().getFirst();
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
