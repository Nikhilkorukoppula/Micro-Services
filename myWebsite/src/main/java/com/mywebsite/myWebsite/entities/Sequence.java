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
        
		public String getId() {
			return id;
		}
		public void setId(String id) {
			this.id = id;
		}
		public int getSequenceValue() {
			return sequenceValue;
		}
		public void setSequenceValue(int sequenceValue) {
			this.sequenceValue = sequenceValue;
		}
        
        
    }


