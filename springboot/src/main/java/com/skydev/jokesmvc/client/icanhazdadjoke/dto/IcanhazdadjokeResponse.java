package com.skydev.jokesmvc.client.icanhazdadjoke.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record IcanhazdadjokeResponse(String id, String joke, int status) {}
