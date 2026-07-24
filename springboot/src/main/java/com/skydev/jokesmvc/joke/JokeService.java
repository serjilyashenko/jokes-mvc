package com.skydev.jokesmvc.joke;

import com.skydev.jokesmvc.client.icanhazdadjoke.IcanhazdadjokeClient;
import com.skydev.jokesmvc.client.openai.OpenaiClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class JokeService {

  private final IcanhazdadjokeClient icanhazdadjokeClient;
  private final OpenaiClient openaiClient;

  public JokeForm newJokeForm(JokeSource source) {
    if (source == JokeSource.OPENAI && !openaiClient.ping()) {
      log.warn("OpenAI unavailable; falling back to icanhazdadjoke");
      return new JokeForm(JokeSource.ICANHAZDADJOKE, icanhazdadjokeClient.getJoke(), true);
    }

    String content =
        switch (source) {
          case ICANHAZDADJOKE -> icanhazdadjokeClient.getJoke();
          case OPENAI -> openaiClient.getJoke();
        };
    return new JokeForm(source, content, false);
  }
}
