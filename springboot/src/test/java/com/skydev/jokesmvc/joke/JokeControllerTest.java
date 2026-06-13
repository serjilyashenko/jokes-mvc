package com.skydev.jokesmvc.joke;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.model;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;

@WebMvcTest(JokeController.class)
class JokeControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@MockitoBean
	private JokeService jokeService;

	@Test
	void createForm_returnsCreatePageWithJokeForm() throws Exception {
		JokeForm jokeForm = new JokeForm(JokeSource.OPENAI, "Why did the chicken cross the road?");

		when(jokeService.newJokeForm()).thenReturn(jokeForm);

		mockMvc.perform(get("/jokes/new"))
				.andExpect(status().isOk())
				.andExpect(view().name("jokes/create"))
				.andExpect(model().attribute("jokeForm", jokeForm))
				.andExpect(content().string(containsString("Why did the chicken cross the road?")))
				.andExpect(content().string(containsString("openai")))
				.andExpect(content().string(containsString("readonly")));
	}
}
