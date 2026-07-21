package com.skydev.jokesmvc.client.icanhazdadjoke;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.header;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

import com.skydev.jokesmvc.configuration.ApplicationProperties;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.web.client.RestClient;

class IcanhazdadjokeClientTest {

  private MockRestServiceServer server;

  private IcanhazdadjokeClient client;

  @BeforeEach
  void setUp() {
    RestClient.Builder builder = RestClient.builder();
    server = MockRestServiceServer.bindTo(builder).build();
    ApplicationProperties properties =
        new ApplicationProperties(
            new ApplicationProperties.Openai(
                "test-key",
                "https://api.openai.com/v1",
                "gpt-4o-mini",
                "Tell me a short joke."),
            new ApplicationProperties.Icanhazdadjoke("https://icanhazdadjoke.com"));
    client = new IcanhazdadjokeClient(builder, properties);
  }

  @Test
  void getJoke_returnsJokeFromApi() {
    server
        .expect(requestTo("https://icanhazdadjoke.com/"))
        .andExpect(header("Accept", MediaType.APPLICATION_JSON_VALUE))
        .andRespond(
            withSuccess(
                """
                {"id":"abc123","joke":"Why did the scarecrow win an award?","status":200}
                """,
                MediaType.APPLICATION_JSON));

    String joke = client.getJoke();

    assertThat(joke).isEqualTo("Why did the scarecrow win an award?");
    server.verify();
  }

  @Test
  void getJoke_throwsWhenJokeIsBlank() {
    server
        .expect(requestTo("https://icanhazdadjoke.com/"))
        .andExpect(header("Accept", MediaType.APPLICATION_JSON_VALUE))
        .andRespond(
            withSuccess(
                """
                {"id":"abc123","joke":"   ","status":200}
                """,
                MediaType.APPLICATION_JSON));

    assertThatThrownBy(client::getJoke)
        .isInstanceOf(IllegalStateException.class)
        .hasMessage("icanhazdadjoke API returned an empty joke");

    server.verify();
  }
}
