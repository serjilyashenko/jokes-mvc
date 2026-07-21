package com.skydev.jokesmvc.configuration;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@ConfigurationProperties(prefix = "jokes-mvc")
@Validated
public record ApplicationProperties(
    @Valid @NotNull Openai openai, @Valid @NotNull Icanhazdadjoke icanhazdadjoke) {

  @Validated
  public record Openai(
      @NotBlank String apiKey,
      @NotBlank String url,
      @NotBlank String model,
      @NotBlank String prompt) {}

  @Validated
  public record Icanhazdadjoke(@NotBlank String url) {}
}
