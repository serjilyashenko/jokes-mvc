package com.skydev.jokesmvc.joke;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.model;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;

import java.util.stream.Stream;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

@WebMvcTest(
    controllers = JokeController.class,
    properties = {
      "jokes-mvc.openai.api-key=test",
      "jokes-mvc.openai.url=https://example.com",
      "jokes-mvc.openai.model=gpt-3.5-turbo",
      "jokes-mvc.openai.prompt=Tell me a short joke.",
      "jokes-mvc.icanhazdadjoke.url=https://example.com"
    })
class JokeControllerTest {

  @Autowired private MockMvc mockMvc;

  @MockitoBean private JokeService jokeService;

  @ParameterizedTest(name = "GET /jokes/new?source={0}")
  @MethodSource("createFormScenarios")
  void createForm_returnsCreatePageWithJokeForm(String sourceParam, JokeForm jokeForm)
      throws Exception {
    when(jokeService.newJokeForm(jokeForm.source())).thenReturn(jokeForm);

    MockHttpServletRequestBuilder request = get("/jokes/new");
    if (sourceParam != null) {
      request = request.param("source", sourceParam);
    }

    mockMvc
        .perform(request)
        .andExpect(status().isOk())
        .andExpect(view().name("jokes/create"))
        .andExpect(model().attribute("jokeForm", jokeForm))
        .andExpect(content().string(containsString(jokeForm.content())))
        .andExpect(content().string(containsString(jokeForm.source().getValue())))
        .andExpect(content().string(containsString("readonly")));

    verify(jokeService).newJokeForm(jokeForm.source());
  }

  private static Stream<Arguments> createFormScenarios() {
    return Stream.of(
        Arguments.of(null, new JokeForm(JokeSource.OPENAI, "Why did the chicken cross the road?")),
        Arguments.of(
            "OPENAI", new JokeForm(JokeSource.OPENAI, "Why did the chicken cross the road?")),
        Arguments.of(
            "ICANHAZDADJOKE",
            new JokeForm(
                JokeSource.ICANHAZDADJOKE, "What do you call a fake noodle? An impasta.")));
  }
}
