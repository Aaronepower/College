package com.example.testproject.model.db;


import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class ClickAppOpenHelper extends SQLiteOpenHelper {
    private static final String DATABASE_NAME = "LeaderboardDB";
    private static final int DATABASE_VERSION = 1;

    private static ClickAppOpenHelper instance = null;

    public static ClickAppOpenHelper getInstance(Context context) {
        if (instance == null) {
            instance = new ClickAppOpenHelper(context);
        }
        return instance;
    }

    private ClickAppOpenHelper(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        UsersGateway leaderboard = UsersGateway.getInstance(db);
        leaderboard.create();
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        UsersGateway leaderboard = UsersGateway.getInstance(db);
        leaderboard.upgrade(oldVersion, newVersion);
    }
}
