package com.skydev.jokesmvc.client.openai;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.content;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.header;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.method;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

import com.skydev.jokesmvc.configuration.ApplicationProperties;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.web.client.RestClient;

class OpenaiClientTest {

  private MockRestServiceServer server;

  private OpenaiClient client;

  @BeforeEach
  void setUp() {
    RestClient.Builder builder = RestClient.builder();
    server = MockRestServiceServer.bindTo(builder).build();
    ApplicationProperties properties =
        new ApplicationProperties(
            new ApplicationProperties.Openai(
                "test-key",
                "https://api.openai.com/v1",
                "gpt-3.5-turbo",
                "Tell me one short, random joke."),
            new ApplicationProperties.Icanhazdadjoke("https://icanhazdadjoke.com"));
    client = new OpenaiClient(builder, properties);
  }

  @Test
  void getJoke_returnsJokeFromApi() {
    server
        .expect(requestTo("https://api.openai.com/v1/responses"))
        .andExpect(method(HttpMethod.POST))
        .andExpect(header("Authorization", "Bearer test-key"))
        .andExpect(header("Accept", MediaType.APPLICATION_JSON_VALUE))
        .andExpect(
            content()
                .json(
                    """
                    {
                      "model": "gpt-3.5-turbo",
                      "input": "Tell me one short, random joke."
                    }
                    """))
        .andRespond(
            withSuccess(
                """
                {
                  "id": "resp_123",
                  "status": "completed",
                  "output": [
                    {
                      "id": "msg_123",
                      "type": "message",
                      "status": "completed",
                      "role": "assistant",
                      "content": [
                        {
                          "type": "output_text",
                          "text": "Why couldn't the bicycle stand up by itself? Because it was two-tired!"
                        }
                      ]
                    }
                  ]
                }
                """,
                MediaType.APPLICATION_JSON));

    String joke = client.getJoke();

    assertThat(joke)
        .isEqualTo("Why couldn't the bicycle stand up by itself? Because it was two-tired!");
    server.verify();
  }

  @Test
  void getJoke_throwsWhenJokeIsBlank() {
    server
        .expect(requestTo("https://api.openai.com/v1/responses"))
        .andExpect(method(HttpMethod.POST))
        .andRespond(
            withSuccess(
                """
                {
                  "id": "resp_123",
                  "status": "completed",
                  "output": [
                    {
                      "id": "msg_123",
                      "type": "message",
                      "status": "completed",
                      "role": "assistant",
                      "content": [
                        {
                          "type": "output_text",
                          "text": "   "
                        }
                      ]
                    }
                  ]
                }
                """,
                MediaType.APPLICATION_JSON));

    assertThatThrownBy(client::getJoke)
        .isInstanceOf(IllegalStateException.class)
        .hasMessage("OpenAI API returned an empty joke");

    server.verify();
  }
}
