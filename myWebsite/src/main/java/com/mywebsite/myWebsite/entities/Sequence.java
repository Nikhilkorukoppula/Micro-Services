package com.mywebsite.myWebsite.entities;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "sequence")
    public class Sequence {
        @Id
        private String id;
        private int sequenceValue;
    }


