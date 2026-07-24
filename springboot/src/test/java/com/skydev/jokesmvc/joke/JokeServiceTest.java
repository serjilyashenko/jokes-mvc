package com.skydev.jokesmvc.joke;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.skydev.jokesmvc.client.icanhazdadjoke.IcanhazdadjokeClient;
import com.skydev.jokesmvc.client.openai.OpenaiClient;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class JokeServiceTest {

  @Mock private IcanhazdadjokeClient icanhazdadjokeClient;
  @Mock private OpenaiClient openaiClient;

  @InjectMocks private JokeService jokeService;

  @Test
  void newJokeForm_usesOpenaiWhenAvailable() {
    when(openaiClient.ping()).thenReturn(true);
    when(openaiClient.getJoke()).thenReturn("openai joke");

    JokeForm form = jokeService.newJokeForm(JokeSource.OPENAI);

    assertThat(form).isEqualTo(new JokeForm(JokeSource.OPENAI, "openai joke", false));
    verify(icanhazdadjokeClient, never()).getJoke();
  }

  @Test
  void newJokeForm_fallsBackToIcanhazdadjokeWhenOpenaiUnavailable() {
    when(openaiClient.ping()).thenReturn(false);
    when(icanhazdadjokeClient.getJoke()).thenReturn("dad joke");

    JokeForm form = jokeService.newJokeForm(JokeSource.OPENAI);

    assertThat(form).isEqualTo(new JokeForm(JokeSource.ICANHAZDADJOKE, "dad joke", true));
    verify(openaiClient, never()).getJoke();
  }

  @Test
  void newJokeForm_usesIcanhazdadjokeWithoutPingingOpenai() {
    when(icanhazdadjokeClient.getJoke()).thenReturn("dad joke");

    JokeForm form = jokeService.newJokeForm(JokeSource.ICANHAZDADJOKE);

    assertThat(form).isEqualTo(new JokeForm(JokeSource.ICANHAZDADJOKE, "dad joke", false));
    verify(openaiClient, never()).ping();
    verify(openaiClient, never()).getJoke();
  }
}
