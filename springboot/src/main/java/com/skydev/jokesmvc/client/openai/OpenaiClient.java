package com.skydev.jokesmvc.client.openai;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class OpenaiClient {

  public String getJoke() {
    return "lorem openai joke";
  }
}
