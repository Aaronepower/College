package com.example.testproject.model.db;


import android.content.ContentValues;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

import com.example.testproject.model.User;

import java.util.ArrayList;
import java.util.List;

public class UsersGateway {
    private final SQLiteDatabase db;
    private static UsersGateway instance = null;

    private UsersGateway(SQLiteDatabase db) {
        this.db = db;
    }

    public static UsersGateway getInstance(SQLiteDatabase db) {
        if (instance == null)
            instance = new UsersGateway(db);
        return instance;
    }

    public static final String USERS = "users";
    public static final String ID = "_id";
    public static final String firstName = "firstName";
    public static final String lastName = "lastName";
    public static final String username = "userName";
    public static final String password = "password";

    private static final String CREATE = "CREATE TABLE ";
    private static final String idProps = " INTEGER PRIMARY KEY AUTOINCREMENT, ";
    private static final String openBrace = " ( ";
    private static final String stringProps = " TEXT NOT NULL, ";
    private static final String closeBrace = " )";
    public static final String score = "score";
    private static final String numProps = " INTEGER NOT NULL ";
    private static final String DROP = "DROP TABLE IF EXISTS ";

    private static final String CREATE_USERS =
            CREATE + USERS + openBrace +
                    ID + idProps +
                    firstName + stringProps +
                    lastName + stringProps +
                    username + stringProps +
                    password + stringProps +
                    score + numProps +
                    closeBrace;

    public void create() {
        db.execSQL(CREATE_USERS);

        List<User> testUsers = new ArrayList<User>();

        testUsers.add(new User("Aaron", "Power", "aaronpower", "password", 10));
        testUsers.add(new User("John", "Doe", "johndoe", "12345", 20));
        testUsers.add(new User("test", "me", "a", "b", 5));

        for (User testUser : testUsers) {
            ContentValues row = new ContentValues();
            row.put(firstName, testUser.getFirstName());
            row.put(lastName, testUser.getLastName());
            row.put(username, testUser.getUsername());
            row.put(password, testUser.getPassword());
            row.put(score, testUser.getScore());

            insert(row);
        }
    }

    public void upgrade(int oldDB, int newDB) {
        db.execSQL(DROP + USERS);
        create();
    }

    public long insert(ContentValues values) {
        return db.insert(USERS, null, values);
    }

    public int update(ContentValues values, String clause, String[] args) {
        return db.update(USERS, values, clause, args);
    }

    public int delete(String where, String[] args) {
        return db.delete(USERS, where, args);
    }

    public Cursor query(String[] columns, String selection, String[] selectionArgs, String groupBy, String having, String orderBy, String limit) {
        return db.query(USERS, columns, selection, selectionArgs, groupBy, having, orderBy, limit);
    }
}
