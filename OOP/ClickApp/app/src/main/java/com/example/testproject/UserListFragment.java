package com.example.testproject;

import android.app.ListFragment;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;

import com.example.testproject.model.db.AsyncQueryListener;
import com.example.testproject.model.db.AsyncUserContentProvider;
import com.example.testproject.model.db.UserContentProvider;

public class UserListFragment extends ListFragment implements AsyncQueryListener {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        AsyncUserContentProvider provider = new AsyncUserContentProvider(getActivity().getContentResolver());

        provider.addAsyncQueryListener(this);
        provider.startQuery(0, null, UserContentProvider.CONTENT_URI, null, null, null, null);

        setListAdapter(null);
    }

    @Override
    public void onInsertComplete(int token, Object cookie, Uri uri) {

    }

    @Override
    public void onUpdateComplete(int token, Object cookie, int result) {

    }

    @Override
    public void onDeleteComplete(int token, Object cookie, int result) {

    }

    @Override
    public void onQueryComplete(int token, Object cookie, Cursor cursor) {
        String[] from = new String[] {
                "firstname", 
        }
    }
}
