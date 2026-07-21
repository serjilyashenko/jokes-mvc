package com.skydev.jokesmvc.client.openai.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record OpenaiResponse(String id, String status, List<Output> output) {

  @JsonIgnoreProperties(ignoreUnknown = true)
  public record Output(String id, String type, String status, String role, List<Content> content) {}

  @JsonIgnoreProperties(ignoreUnknown = true)
  public record Content(String type, String text) {}
}
