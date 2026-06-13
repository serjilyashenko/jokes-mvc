package com.skydev.jokesmvc.joke;

import lombok.Getter;

@Getter
public enum JokeSource {

	OPENAI("openai"),
	ICANHAZDADJOKE("icanhazdadjoke");

	private final String value;

	JokeSource(String id) {
		this.value = id;
	}

}
