package com.example.testproject;

import android.app.AlertDialog;
import android.app.Dialog;
import android.app.DialogFragment;
import android.content.ContentValues;
import android.content.DialogInterface;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.FragmentActivity;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.TextView;

import com.example.testproject.model.User;
import com.example.testproject.model.db.AsyncQueryListener;
import com.example.testproject.model.db.AsyncUserContentProvider;
import com.example.testproject.model.db.UserContentProvider;
import com.example.testproject.model.db.UsersGateway;

/**
 * Activity containing main user interaction and serves as the hub to the other activities.
 */
public class MainActivity extends FragmentActivity implements AsyncQueryListener {

    public static final String SCORE_KEY = "score";
    private static User currentUser = null;
    private int score;
    private AsyncUserContentProvider provider;

    /**
     * Once created attaches OnClickListener listener to the buttons contained within the activity.
     *
     * @param savedInstanceState previous instance of activity if any are present.
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        int[] buttons = new int[]{
                R.id.clickButton,
                R.id.clearButton,
                R.id.saveButton,
                R.id.leaderButton,
                R.id.signOutButton,
                R.id.deleteButton
        };
        for (int button : buttons) {
            this.findViewById(button).setOnClickListener(listener);
        }
        provider = new AsyncUserContentProvider(getContentResolver());
        provider.addAsyncQueryListener(this);
    }

    @Override
    protected void onResume() {
        super.onResume();
        changeButtons();
    }

    private void changeButtons() {
        Button signOutButton = (Button) this.findViewById(R.id.signOutButton);
        Button deleteButton = (Button) this.findViewById(R.id.deleteButton);

        if (currentUser != null) {
            signOutButton.setVisibility(View.VISIBLE);
            deleteButton.setVisibility(View.VISIBLE);
        } else {
            signOutButton.setVisibility(View.GONE);
            deleteButton.setVisibility(View.GONE);
        }
    }

    private final OnClickListener listener = new OnClickListener() {
        public void onClick(View v) {
            switch (v.getId()) {
                case R.id.clickButton: {
                    int clicks;
                    try {
                        clicks = getNumOfClicks();
                        clicks++;
                        setNumOfClicks(clicks);
                    } catch (NumberFormatException e) {
                        Log.d("Error", e.toString());
                    }
                }
                break;

                case R.id.clearButton: {
                    ClearDialogFragment clearBox = new ClearDialogFragment();
                    clearBox.show(getFragmentManager(), "ConfirmDialogFragment");
                }
                break;

                case R.id.saveButton: {
                    SaveDialogFragment saveBox = new SaveDialogFragment();
                    saveBox.show(getFragmentManager(), "SaveDialogFragment");
                }
                break;

                case R.id.leaderButton: {
                    Intent intent = new Intent(MainActivity.this, LeaderBoardActivity.class);
                    startActivity(intent);
                }
                break;

                case R.id.signOutButton: {
                    SignOutDialogFragment signOutBox = new SignOutDialogFragment();
                    signOutBox.show(getFragmentManager(), "SignOutDialogFragment");
                }
                break;
                case R.id.deleteButton: {
                    DeleteDialogFragment deleteBox = new DeleteDialogFragment();
                    deleteBox.show(getFragmentManager(), "DeleteDialogFragment");

                }
                break;
            }
        }
    };

    private int getNumOfClicks() {
        TextView clicksView = (TextView) this.findViewById(R.id.numOfClicks);
        String clicksString = clicksView.getText().toString();
        return Integer.parseInt(clicksString);
    }

    private void setNumOfClicks(int value) {
        TextView clicksView = (TextView) this.findViewById(R.id.numOfClicks);
        clicksView.setText(Integer.valueOf(value).toString());
    }

    public static void setCurrentUser(User user) {
        MainActivity.currentUser = user;
    }



    /**
     * Provides confirmation on whether or not the user wishes to clear their score.
     */
    public class ClearDialogFragment extends DialogFragment {

        @Override
        public Dialog onCreateDialog(Bundle savedInstanceState) {

            AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
            builder.setMessage(R.string.clearMessage)
                    .setPositiveButton(R.string.ok, new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int id) {
                            setNumOfClicks(0);
                        }
                    })
                    .setNegativeButton(R.string.cancel, new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int id) {
                            dialog.dismiss();
                        }
                    });
            // Create the AlertDialog object and return it
            return builder.create();
        }
    }

    /**
     * Signs user out on confirmation
     */
    public class SignOutDialogFragment extends DialogFragment {

        @Override
        public Dialog onCreateDialog(Bundle savedInstanceState) {

            AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
            builder.setMessage(R.string.signOutMessage)
                    .setPositiveButton(R.string.ok, new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int id) {
                            currentUser = null;
                            changeButtons();
                        }
                    })
                    .setNegativeButton(R.string.cancel, new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int id) {
                            dialog.dismiss();
                        }
                    });
            // Create the AlertDialog object and return it
            return builder.create();
        }
    }

    /**
     * Will remove user from the database on confirmation.
     */
    public class DeleteDialogFragment extends DialogFragment {

        @Override
        public Dialog onCreateDialog(Bundle savedInstanceState) {

            AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
            builder.setMessage(R.string.deleteMessage)
                    .setPositiveButton(R.string.ok, new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int id) {
                            String[] args = new String[]{
                                    currentUser.getUsername(), currentUser.getPassword()
                            };
                            provider.startDelete(0, null, UserContentProvider.CONTENT_URI, SignUpActivity.getUserWhere, args);
                        }
                    })
                    .setNegativeButton(R.string.cancel, new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int id) {
                            dialog.dismiss();
                        }
                    });
            // Create the AlertDialog object and return it
            return builder.create();
        }
    }

    /**
     * Provides confirmation and then brings to user to either the Sign Up/ Login Activity,
     * or the leaderboards Activity depending on whether or not they have already signed in.
     */
    public class SaveDialogFragment extends DialogFragment {
        @Override
        public Dialog onCreateDialog(Bundle savedInstanceState) {
            int message;
            final Intent intent;

            if (currentUser == null) {
                intent = new Intent(getActivity(), SignUpActivity.class);
                message = R.string.newUserSaveMessage;
            } else {
                intent = null;
                message = R.string.saveMessage;
            }

            AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
            builder.setMessage(message)
                    .setPositiveButton(R.string.ok, new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int id) {
                            score = getNumOfClicks();
                            setNumOfClicks(0);
                            if (currentUser == null) {
                                if (intent != null) {
                                    intent.putExtra(SCORE_KEY, score);
                                    startActivity(intent);
                                }
                            } else {
                                ContentValues values = new ContentValues();
                                values.put(UsersGateway.score, score);
                                String[] args = new String[]{
                                        currentUser.getUsername(), currentUser.getPassword()
                                };
                                provider.startUpdate(0,
                                        null,
                                        UserContentProvider.CONTENT_URI,
                                        values,
                                        SignUpActivity.getUserWhere,
                                        args);
                            }
                        }
                    })
                    .setNegativeButton(R.string.cancel, new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int id) {
                            dialog.dismiss();
                        }
                    });
            // Create the AlertDialog object and return it
            return builder.create();
        }
    }

    @Override
    public void onInsertComplete(int token, Object cookie, Uri uri) {

    }

    @Override
    public void onUpdateComplete(int token, Object cookie, int result) {

        Intent intent = new Intent(this, LeaderBoardActivity.class);
        startActivity(intent);
    }

    @Override
    public void onDeleteComplete(int token, Object cookie, int result) {
        currentUser = null;
        changeButtons();
    }

    @Override
    public void onQueryComplete(int token, Object cookie, Cursor cursor) {

    }
}
