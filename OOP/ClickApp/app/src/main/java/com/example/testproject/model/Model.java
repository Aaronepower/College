package com.example.testproject.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

public class Model {
	private static Model instance = null;
    private final ArrayList<User> users;

	public static synchronized Model getInstance () {
		if (instance == null) {
			instance = new Model();
		}
		return instance;
	}
	
	private Model () {
        this.users = new ArrayList<User>();
	}

    /**
     * A simple wrapper for storing single scores and their users.
     * Used for sorting for the LeaderboardsActivity.
     */
    public class ScoreWrapper {
        final User user;
        final int score;

        public ScoreWrapper( User user, int score) {
            this.user = user;
            this.score = score;
        }

        public User getUser() {
            return this.user;
        }

        public int getScore() {
            return this.score;
        }
    }

    public ArrayList<User> getUsers() {
        return new ArrayList<User>(this.users);
    }

    public void addScore (User user, int score) {
        user.addScore(score);
        this.users.set(this.users.indexOf(user), user);
    }

    public void addUser(User user) {
        this.users.add(user);
    }

    public ArrayList<ScoreWrapper> sortedLeaderboards () {
        ArrayList<User> users;
        ArrayList<ScoreWrapper> sortedScores;


        users = new ArrayList<User>(this.users);
        sortedScores = new ArrayList<ScoreWrapper>();
        for (User user : users) {
            for (int score : user.getScores()) {
                sortedScores.add(new ScoreWrapper(user, score));
            }
        }

        /**
         * Sorts the scores in Descending order.
         */
        Collections.sort(sortedScores, new Comparator<ScoreWrapper>() {
            @Override
            public int compare(ScoreWrapper lhs, ScoreWrapper rhs) {
                if (lhs.getScore() > rhs.getScore())
                    return -1;
                if (lhs.getScore() < rhs.getScore())
                    return 1;
                return 0;
            }
        });
        return sortedScores;
    }
}
