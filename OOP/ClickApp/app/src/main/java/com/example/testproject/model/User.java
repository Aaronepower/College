package com.example.testproject.model;

import android.database.Cursor;
import android.os.Parcel;
import android.os.Parcelable;

import com.example.testproject.model.db.UsersGateway;

public class User implements Parcelable {
    private String firstName;
    private String lastName;
    private String username;
    private String password;
    private int score;

    public User(String firstName, String lastName, String username, String password, int score) {
        this.setFirstName(firstName);
        this.setLastName(lastName);
        this.setUsername(username);
        this.setPassword(password);
        this.score = score;
    }

    public User(Cursor cursor) {

        this.firstName = cursor.getString(cursor.getColumnIndex(UsersGateway.firstName));
        this.lastName = cursor.getString(cursor.getColumnIndex(UsersGateway.lastName));
        this.username = cursor.getString(cursor.getColumnIndex(UsersGateway.username));
        this.password = cursor.getString(cursor.getColumnIndex(UsersGateway.password));
        this.score = cursor.getInt(cursor.getColumnIndex(UsersGateway.score));
    }

    public String getFirstName() {
        return firstName;
    }

    void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPassword() {
        return password;
    }

    void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    void setUsername(String username) {
        this.username = username;
    }

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(firstName);
        dest.writeString(lastName);
        dest.writeString(username);
        dest.writeString(password);
    }

    public static final Parcelable.Creator<User> CREATOR = new Parcelable.Creator<User>() {
        public User createFromParcel(Parcel in) {
            return new User(in);
        }

        public User[] newArray(int size) {
            return new User[size];
        }
    };

    private User(Parcel in) {
        this.setFirstName(in.readString());
        this.setLastName(in.readString());
        this.setUsername(in.readString());
        this.setPassword(in.readString());
    }

    public int getScore() {
        return score;
    }
}
