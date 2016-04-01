package com.example.testproject.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Model {
	private static Model instance = null;
	private Map<User, List<Integer>> scores;
    private ArrayList<User> users;

	public static synchronized Model getInstance () {
		if (instance == null) {
			instance = new Model();
		}
		return instance;
	}
	
	private Model () {
		this.scores = new HashMap<User, List<Integer>>();
        this.users = new ArrayList<User>();
	}
	
	public void addScore (User user, int score) {
        if (!this.scores.containsKey(user)) {
            this.scores.put(user, new ArrayList<Integer>());
        }
        this.scores.get(user).add(score);
	}
	
	public HashMap<User, List<Integer>> getScores () {
		return new HashMap<User,  List<Integer>>(scores);
	}
	
	public void removeAllScores (User user) {
		this.scores.remove(user);
	}

    public void removeAScore (User user, int score) {
        this.scores.get(user).remove(score);
    }

    public ArrayList<User> getUsers() {
        return new ArrayList<User>(this.users);
    }

    public void addUser(User user) {
        this.users.add(user);
    }

    public void removeUser (User user) {
        this.users.remove(user);
    }

    public User getUserByUsername(String username) {
        for (User user: this.getUsers()) {
            if (user.getUsername().equals(username)) {
                return user;
            }
        }
        return null;
    }
}
