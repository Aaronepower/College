package com.example.testproject.model.db;

import android.database.Cursor;
import android.net.Uri;

public interface AsyncQueryListener {

    void onInsertComplete(int token, Object cookie, Uri uri);
    void onUpdateComplete(int token, Object cookie, int result);
    void onDeleteComplete(int token, Object cookie, int result);
    void onQueryComplete(int token, Object cookie, Cursor cursor);

}
