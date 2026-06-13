package com.skydev.jokesmvc.joke;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/jokes")
@RequiredArgsConstructor
public class JokeController {

	private final JokeService jokeService;

	@GetMapping("/new")
	public String createForm(Model model) {
		JokeForm jokeForm = jokeService.newJokeForm();
		model.addAttribute("jokeForm", jokeForm);
		return "jokes/create";
	}
}
