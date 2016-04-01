package com.example.testproject.model;

import java.util.HashMap;

public class Model {
	private static Model instance = null;
	private HashMap<String, Integer> scores;
	
	
	public static Model getInstance () {
		if (instance == null) {
			instance = new Model();
		}
		return instance;
	}
	
	private Model () {
		this.scores = new HashMap<String, Integer>();
	}
	
	public void put(String name, int score) {
		this.scores.put(name, Integer.valueOf(score));
	}
	
	public HashMap<String, Integer> getScores () {
		return new HashMap<String, Integer>(scores);
	}
	
	public void removeScores (String name) {
		this.scores.remove(name);
	}
}
