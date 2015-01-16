package com.example.testproject;

import android.app.Activity;
import android.content.ContentValues;
import android.content.Intent;
import android.database.Cursor;
import android.database.CursorIndexOutOfBoundsException;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.testproject.model.Form;
import com.example.testproject.model.User;
import com.example.testproject.model.db.AsyncQueryListener;
import com.example.testproject.model.db.AsyncUserContentProvider;
import com.example.testproject.model.db.UserContentProvider;
import com.example.testproject.model.db.UsersGateway;

public class SignUpActivity extends Activity implements AsyncQueryListener {

    private static final String LOGIN_STATE = "login";
    private static final String SIGN_UP_STATE = "signUp";
    private User user = null;
    private String signInState;
    private int score;
    public static final String getUserWhere = UsersGateway.username +
            " = ? AND " + UsersGateway.password + " = ?";

    private AsyncUserContentProvider provider;
    Form form;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up);
        int[] buttons = new int[] {
                R.id.signUpButton,
                R.id.loginButton,
                R.id.signInButton
        };
        for (int button : buttons) {
            this.findViewById(button).setOnClickListener(clickListener);
        }
        loginSignUpSwitch(signInState = SIGN_UP_STATE);
        provider = new AsyncUserContentProvider(SignUpActivity.this.getContentResolver());
        provider.addAsyncQueryListener(SignUpActivity.this);
        score = getIntent().getExtras().getInt(MainActivity.SCORE_KEY);
    }

    private final OnClickListener clickListener = new View.OnClickListener() {
        public void onClick(View v) {

            switch (v.getId()) {
                case R.id.signUpButton: {
                    signInState = SIGN_UP_STATE;
                    setSignInButtonText(R.string.signUp);
                    loginSignUpSwitch(signInState);
                }
                break;

                case R.id.loginButton: {
                    signInState = LOGIN_STATE;
                    setSignInButtonText(R.string.login);
                    loginSignUpSwitch(signInState);
                }
                break;

                case R.id.signInButton: {
                    EditText username, password;

                    username = (EditText) getField(R.id.userNameField);
                    password = (EditText) getField(R.id.passwordField);
//                  If the user wants to sign up or login.
                    if (signInState.equals(SIGN_UP_STATE)) {
                        EditText confirmPassword, firstName, lastName;

                        firstName = (EditText) getField(R.id.firstNameField);
                        lastName = (EditText) getField(R.id.lastNameField);
                        confirmPassword = (EditText) getField(R.id.confirmField);
                        form = new Form(firstName, lastName, username, password, confirmPassword);

                        if (form.isNotEmpty()) {
                            if (form.validPassword()) {
                                findUsers(form.getUsernameFieldValue(), form.getPasswordFieldValue());
                            } else {
                                Toast.makeText(getApplicationContext(), R.string.invalidPasswordError, Toast.LENGTH_LONG).show();
                            }
                        } else {
                            Toast.makeText(getApplicationContext(), R.string.emptyFieldError, Toast.LENGTH_LONG).show();
                        }
                    } else if (signInState.equals(LOGIN_STATE)) {
                        form = new Form(username, password);
                        findUsers(form.getUsernameFieldValue(), form.getPasswordFieldValue());
                    }
                }
                break;
            }
        }


    };

    private void loginSignUpSwitch(String decider) {
        int login = -1;
        int signUp = -1;

        if (decider.equals(LOGIN_STATE)) {
            setSignInButtonText(R.string.login);
            login = View.VISIBLE;
            signUp = View.GONE;
        } else if (decider.equals(SIGN_UP_STATE)) {
            setSignInButtonText(R.string.signUp);
            login = View.GONE;
            signUp = View.VISIBLE;
        }

        if (login == -1) {
            return;
        }

        for (int view : new int[] {
                R.id.LoginTitle,
                R.id.signUpButton
        }) {
            SignUpActivity.this.findViewById(view).setVisibility(login);
        }

        for (int view : new int[] {
                R.id.signUpTitle,
                R.id.loginButton,
                R.id.firstNameField,
                R.id.lastNameField,
                R.id.confirmField
        }) {
            SignUpActivity.this.findViewById(view).setVisibility(signUp);
        }
    }

    private void setSignInButtonText(int stringRes) {
        ((Button) SignUpActivity.this.findViewById(R.id.signInButton)).setText(stringRes);
    }

    private View getField(int fieldID) {
        return this.findViewById(fieldID);
    }

    @Override
    public void onInsertComplete(int token, Object cookie, Uri uri) {
        loginSuccess();
    }

    @Override
    public void onUpdateComplete(int token, Object cookie, int result) {
        loginSuccess();
    }

    @Override
    public void onDeleteComplete(int token, Object cookie, int result) {

    }

    @Override
    public void onQueryComplete(int token, Object cookie, Cursor cursor) {
        switch (token) {
//              If the user exists update their score with a new value.
            case 0:
                try {
                    cursor.moveToFirst();
                    user = new User(cursor);
                    cursor.close();
                } catch (CursorIndexOutOfBoundsException ex) {
                    user = null;
                }
                if (user != null) {
                    String[] args = new String[]{
                            user.getUsername(), user.getPassword()
                    };
                    ContentValues values = new ContentValues();
                    values.put(UsersGateway.score, score);
                    provider.startUpdate(0, null, UserContentProvider.CONTENT_URI, values, getUserWhere, args);
                } else {
                    Toast.makeText(getApplicationContext(), R.string.noUserError, Toast.LENGTH_LONG).show();
                }
            break;

//          If the user doesn't exist add them to the database.
            case 1:
                if (!cursor.moveToFirst()) {
                    user = new User(form.getFirstNameFieldValue(),
                            form.getLastNameFieldValue(),
                            form.getUsernameFieldValue(),
                            form.getPasswordFieldValue(),
                            score);

                    ContentValues row = new ContentValues();
                    row.put(UsersGateway.firstName, user.getFirstName());
                    row.put(UsersGateway.lastName, user.getLastName());
                    row.put(UsersGateway.username, user.getUsername());
                    row.put(UsersGateway.password, user.getPassword());
                    row.put(UsersGateway.score, user.getScore());

                    provider.startInsert(0, null, UserContentProvider.CONTENT_URI, row);
                }
                else {
                    Toast.makeText(getApplicationContext(), R.string.userExistsError, Toast.LENGTH_LONG).show();
                }
            break;
        }
    }

    private void loginSuccess() {
        MainActivity.setCurrentUser(user);
        Intent leaderIntent = new Intent(SignUpActivity.this, LeaderBoardActivity.class);
        startActivity(leaderIntent);
        finish();
    }

    private void findUsers (String username, String password) {
        String[] args = new String[]{
                username, password
        };
        provider.startQuery(1, null, UserContentProvider.CONTENT_URI, null, getUserWhere, args, null);
    }
}
