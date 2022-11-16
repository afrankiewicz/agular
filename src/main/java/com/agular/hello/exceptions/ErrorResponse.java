package com.agular.hello.exceptions;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class ErrorResponse {

    @NonNull
    private List<String> message;


}
