package com.skydev.jokesmvc.joke;

import com.skydev.jokesmvc.client.icanhazdadjoke.IcanhazdadjokeClient;
import com.skydev.jokesmvc.client.openai.OpenaiClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JokeService {

  private final IcanhazdadjokeClient icanhazdadjokeClient;
  private final OpenaiClient openaiClient;

  public JokeForm newJokeForm(JokeSource source) {
    String content =
        switch (source) {
          case ICANHAZDADJOKE -> icanhazdadjokeClient.getJoke();
          case OPENAI -> openaiClient.getJoke();
        };
    return new JokeForm(source, content);
  }
}
