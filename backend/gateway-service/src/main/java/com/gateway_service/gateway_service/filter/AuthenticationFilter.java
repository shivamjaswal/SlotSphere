package com.gateway_service.gateway_service.filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {

    @Autowired
    private RouteValidator validator;

    @Autowired
    private RestTemplate restTemplate;

    public AuthenticationFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {

            if(validator.isSecured.test(exchange.getRequest())) {
                //header contains token or not
                if(!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                    throw new RuntimeException("missing authorization header");
                }

                String authHeader = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);

                if (authHeader != null && authHeader.startsWith("Bearer ")) {
                    authHeader = authHeader.substring(7);
                }

                String finalToken = authHeader;

                return Mono.fromCallable(() ->
                                restTemplate.getForObject("http://AUTH-SERVICE/auth/validate/" + finalToken, Boolean.class)
                        )
                        .subscribeOn(Schedulers.boundedElastic())  // move to separate thread
                        .flatMap(valid -> {
                            if (Boolean.TRUE.equals(valid)) {
                                return chain.filter(exchange);  // token valid -> continue chain
                            } else {
                                return Mono.error(new RuntimeException("Unauthorized access"));  // token invalid
                            }
                        });
            }

            return chain.filter(exchange);
        });
    }

    public static class Config {

    }

}
