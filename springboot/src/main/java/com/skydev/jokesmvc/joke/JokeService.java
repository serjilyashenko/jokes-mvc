package com.skydev.jokesmvc.joke;

import org.springframework.stereotype.Service;

@Service
public class JokeService {

	public JokeForm newJokeForm(JokeSource source) {
		return new JokeForm(source, "lorem ipsum dolor sit amet");
	}
}
