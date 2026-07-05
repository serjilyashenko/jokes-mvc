package com.skydev.jokesmvc.joke;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/jokes")
@RequiredArgsConstructor
public class JokeController {

	private final JokeService jokeService;

	@GetMapping("/new")
	public String createForm(@RequestParam(defaultValue = "OPENAI") JokeSource source, Model model) {
		JokeForm jokeForm = jokeService.newJokeForm(source);
		model.addAttribute("jokeForm", jokeForm);
		return "jokes/create";
	}
}
