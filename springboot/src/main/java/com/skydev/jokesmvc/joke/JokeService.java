package com.skydev.jokesmvc.joke;

import org.springframework.stereotype.Service;

@Service
public class JokeService {

	public JokeForm newJokeForm() {
		return new JokeForm("lorem ipsum dolor sit amet");
	}
}
