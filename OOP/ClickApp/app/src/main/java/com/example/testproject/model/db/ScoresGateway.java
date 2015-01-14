package com.example.testproject.model.db;

import android.content.ContentValues;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

public class ScoresGateway {
    private SQLiteDatabase db;
    private static ScoresGateway instance = null;

    private ScoresGateway(SQLiteDatabase db) {
        this.db = db;
    }

    public static ScoresGateway getInstance(SQLiteDatabase db) {
        if (instance == null)
            instance = new ScoresGateway(db);
        return instance;
    }

    public static String SCORES = "scores";
    public static String score = "score";
    public static String user = "user_id";
    public static String numProps = " INTEGER NOT NULL, ";
    public static String FOREIGN_KEY = " FOREIGN KEY (";
    public static String REFERENCES = " ) REFERENCES (";

    private static String CREATE_SCORES =
            UsersGateway.CREATE + SCORES + UsersGateway.openBrace +
                    UsersGateway.ID + UsersGateway.idProps +
                    score           + numProps +
                    user            + UsersGateway.stringProps +
                    FOREIGN_KEY     + user +
                    REFERENCES      + UsersGateway.ID + UsersGateway.closeBrace +
                    UsersGateway.closeBrace;

    public void create() {
        db.execSQL(CREATE_SCORES);
    }

    public void upgrade (int oldDB, int newDB) {
        db.execSQL(UsersGateway.DROP+SCORES);
        create();
    }

    public long insert(ContentValues values) {
        return db.insert(SCORES, null, values);
    }

    public int update (ContentValues values, String clause, String[] args) {
        return db.update(SCORES, values, clause, args);
    }

    public int delete (String where, String[] args) {
        return db.delete(SCORES, where, args);
    }

    public Cursor query (String[] columns, String selection, String[] selectionArgs, String groupBy, String having, String orderBy, String limit) {
        return db.query(SCORES, columns, selection, selectionArgs, groupBy, having, orderBy, limit);
    }
}
