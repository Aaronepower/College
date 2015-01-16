package com.example.testproject.model.db;

import android.content.AsyncQueryHandler;
import android.content.ContentResolver;
import android.database.Cursor;
import android.net.Uri;

import java.util.ArrayList;
import java.util.List;

public class AsyncUserContentProvider extends AsyncQueryHandler {

    private final List<AsyncQueryListener> listeners;

    public AsyncUserContentProvider(ContentResolver cr) {
        super(cr);

        listeners = new ArrayList<AsyncQueryListener>();
    }

    @Override
    protected void onQueryComplete(int token, Object cookie, Cursor cursor) {
        for (AsyncQueryListener listener : listeners) {
            listener.onQueryComplete(token, cookie, cursor);
        }
    }

    @Override
    protected void onInsertComplete(int token, Object cookie, Uri uri) {
        for (AsyncQueryListener listener : listeners) {
            listener.onInsertComplete(token, cookie, uri);
        }
    }


    @Override
    protected void onUpdateComplete(int token, Object cookie, int result) {
        for (AsyncQueryListener listener : listeners) {
            listener.onUpdateComplete(token, cookie, result);
        }
    }

    @Override
    protected void onDeleteComplete(int token, Object cookie, int result) {
        for (AsyncQueryListener listener : listeners) {
            listener.onDeleteComplete(token, cookie, result);
        }
    }

    public void addAsyncQueryListener(AsyncQueryListener listener) {
        listeners.add(listener);
    }

}
