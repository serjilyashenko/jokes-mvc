package com.skydev.jokesmvc.joke;

import com.skydev.jokesmvc.client.icanhazdadjoke.IcanhazdadjokeClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JokeService {

  private static final String OPENAI_PLACEHOLDER = "lorem ipsum dolor sit amet";

  private final IcanhazdadjokeClient icanhazdadjokeClient;

  public JokeForm newJokeForm(JokeSource source) {
    String content =
        switch (source) {
          case ICANHAZDADJOKE -> icanhazdadjokeClient.getJoke();
          case OPENAI -> OPENAI_PLACEHOLDER;
        };
    return new JokeForm(source, content);
  }
}
