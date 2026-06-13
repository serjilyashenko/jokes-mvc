package com.skydev.jokesmvc.joke;

import org.springframework.stereotype.Service;

@Service
public class JokeService {

	public JokeForm newJokeForm() {
		return new JokeForm(JokeSource.OPENAI, "lorem ipsum dolor sit amet");
	}
}
