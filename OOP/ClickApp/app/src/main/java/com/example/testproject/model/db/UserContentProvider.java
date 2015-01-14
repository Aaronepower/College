package com.example.testproject.model.db;

import android.content.ContentProvider;
import android.content.ContentResolver;
import android.content.ContentUris;
import android.content.ContentValues;
import android.content.Context;
import android.content.UriMatcher;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.net.Uri;
import android.text.TextUtils;

import java.sql.SQLException;

public class UserContentProvider extends ContentProvider{
    public static final String AUTHORITY = "com.example.testproject.model.db.UserContentProvider";
    private static final UriMatcher uriMatcher;
    private static final int USER_COLLECTION_URI_CODE = 1;
    private static final int SINGLE_USER_URI_CODE = 2;

    public static final Uri CONTENT_URI = Uri.parse("content://" + AUTHORITY + "/users");
    public static final String CONTENT_TYPE = "vnd.android.cursor.dir/vnd.com.leaderboard.user";
    public static final String CONTENT_ITEM_TYPE = "vnd.android.cursor.item/vnd.com.leaderboard.user";

    UsersGateway usersGateway;
    ContentResolver contentResolver;

    static {
        uriMatcher = new UriMatcher(UriMatcher.NO_MATCH);
        uriMatcher.addURI(AUTHORITY, UsersGateway.USERS, USER_COLLECTION_URI_CODE);
        uriMatcher.addURI(AUTHORITY, UsersGateway.USERS +"/#", SINGLE_USER_URI_CODE);
    }

    @Override
    public boolean onCreate() {
        Context context = getContext();
        contentResolver = context.getContentResolver();

        ClickAppOpenHelper helper = ClickAppOpenHelper.getInstance(context);
        SQLiteDatabase db = helper.getWritableDatabase();
        usersGateway = UsersGateway.getInstance(db);
        return true;
    }

    @Override
    public Cursor query(Uri uri, String[] projection, String selection, String[] selectionArgs, String sortOrder) {
        Cursor cursor;

        switch(uriMatcher.match(uri)) {
            case USER_COLLECTION_URI_CODE:
                cursor = usersGateway.query(projection, selection, selectionArgs, null, null, sortOrder, null);
                break;
            case SINGLE_USER_URI_CODE:
                String id = uri.getPathSegments().get(1);
                String where = UsersGateway.ID + " = " + id;

                if (TextUtils.isEmpty(selection)) {
                    selection = where;
                }
                else {
                    selection = selection + " AND " + where;
                }
                cursor = usersGateway.query(projection, selection, selectionArgs, null, null, sortOrder, null);
                break;
            default:
                throw new IllegalArgumentException("Unknown URI "+ uri);
        }
        cursor.setNotificationUri(contentResolver, uri);

        return cursor;
    }

    @Override
    public String getType(Uri uri) {
        switch (uriMatcher.match(uri)) {
            case USER_COLLECTION_URI_CODE:
                return CONTENT_TYPE;

            case SINGLE_USER_URI_CODE:
                return CONTENT_ITEM_TYPE;

            default:
                throw new IllegalArgumentException("Unknown URI: "+uri);
        }
    }

    @Override
    public Uri insert(Uri uri, ContentValues values) {
        Uri insertedUri;

        if (uriMatcher.match(uri) != USER_COLLECTION_URI_CODE) {
            throw new IllegalArgumentException("Unknown URI " + uri);
        }

        long id = usersGateway.insert(values);
        if (id > 0) {
            insertedUri = ContentUris.withAppendedId(CONTENT_URI, id);
        }
        else {
            throw new SQLException("Failed to insert book into " + uri);
        }
        contentResolver.notifyChange(insertedUri, null);


        return insertedUri;
    }

    @Override
    public int delete(Uri uri, String selection, String[] selectionArgs) {
        return 0;
    }

    @Override
    public int update(Uri uri, ContentValues values, String selection, String[] selectionArgs) {
        return 0;
    }
}
