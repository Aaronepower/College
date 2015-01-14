package com.example.testproject.model.db;


import android.content.ContentValues;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

public class UsersGateway {
    private SQLiteDatabase db;
    private static UsersGateway instance = null;

    private UsersGateway(SQLiteDatabase db) {
        this.db = db;
    }

    public static UsersGateway getInstance(SQLiteDatabase db) {
        if (instance == null)
            instance = new UsersGateway(db);
        return instance;
    }

    public static String USERS = "users";
    public static String ID = "_id";
    public static String firstName = "firstName";
    public static String lastName = "lastName";
    public static String username = "userName";
    public static String password = "password";

    public static String CREATE = "CREATE TABLE ";
    public static String idProps = " INTEGER PRIMARY KEY AUTOINCREMENT, ";
    public static String openBrace = " ( ";
    public static String stringProps = " TEXT NOT NULL, ";
    public static String closeBrace = " )";
    public static String DROP = "DROP TABLE IF EXISTS ";

    private static String CREATE_USERS =
             CREATE + USERS + openBrace +
                    ID        + idProps +
                    firstName + stringProps +
                    lastName  + stringProps +
                    username  + stringProps +
                    password  + stringProps +
                    closeBrace;

    public void create() {
        db.execSQL(CREATE_USERS);
    }

    public void upgrade (int oldDB, int newDB) {
        db.execSQL(DROP+USERS);
        create();
    }

    public long insert(ContentValues values) {
        return db.insert(USERS, null, values);
    }

    public int update (ContentValues values, String clause, String[] args) {
        return db.update(USERS, values, clause, args);
    }

    public int delete (String where, String[] args) {
        return db.delete(USERS, where, args);
    }

    public Cursor query (String[] columns, String selection, String[] selectionArgs, String groupBy, String having, String orderBy, String limit) {
        return db.query(USERS, columns, selection, selectionArgs, groupBy, having, orderBy, limit);
    }
}
