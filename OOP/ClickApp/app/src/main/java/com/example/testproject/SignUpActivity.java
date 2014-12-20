package com.example.testproject;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.testproject.model.Form;
import com.example.testproject.model.Model;
import com.example.testproject.model.User;

public class SignUpActivity extends ActionBarActivity {

    private static final String LOGIN_STATE = "login";
    private static final String SIGN_UP_STATE = "signUp";
    private String signInState;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up);
        this.findViewById(R.id.signUpButton).setOnClickListener(clickListener);
        this.findViewById(R.id.loginButton).setOnClickListener(clickListener);
        this.findViewById(R.id.signInButton).setOnClickListener(clickListener);
        signInState = SIGN_UP_STATE;
        loginSignUpSwitch(SIGN_UP_STATE);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.sign_up, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();
        return id == R.id.action_settings || super.onOptionsItemSelected(item);
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
                    boolean successLogin;
                    Intent intent;
                    Model model;
                    User user;
                    int score;

                    user = null;
                    successLogin = false;
                    username = (EditText)getField(R.id.userNameField);
                    password = (EditText)getField(R.id.passwordField);
                    model = Model.getInstance();
                    intent = getIntent();
                    score = intent.getExtras().getInt(MainActivity.SCORE_KEY);

                    if (signInState.equals(SIGN_UP_STATE)) {
                        EditText confirmPassword, firstName, lastName;


                        firstName = (EditText)getField(R.id.firstNameField);
                        lastName = (EditText)getField(R.id.lastNameField);
                        confirmPassword = (EditText)getField(R.id.confirmField);
                        Form form = new Form( firstName, lastName, username, password, confirmPassword);

                        if (form.isNotEmpty()) {
                            if (form.validPassword()) {
                                if (!form.userExists()) {
                                    user = new User(form.getFirstNameFieldValue(),
                                            form.getLastNameFieldValue(),
                                            form.getUsernameFieldValue(),
                                            form.getPasswordFieldValue());
                                    model.addUser(user);
                                    model.addScore(user, score);
                                    successLogin = true;
                                }
                                else {
                                    Toast.makeText(getApplicationContext(), R.string.userExistsError, Toast.LENGTH_LONG).show();
                                }
                            }
                            else {
                                Toast.makeText(getApplicationContext(), R.string.invalidPasswordError, Toast.LENGTH_LONG).show();
                            }
                        } else {
                            Toast.makeText(getApplicationContext(), R.string.emptyFieldError, Toast.LENGTH_LONG).show();
                        }
                    }
                    else if (signInState.equals(LOGIN_STATE)) {
                        Form form;
                        User currentUser;

                        form = new Form(username, password);
                        currentUser = form.getUser();
                        if (currentUser != null) {
                            model.addScore(currentUser, score);
                            user = currentUser;
                            successLogin = true;
                        } else {
                            Toast.makeText(getApplicationContext(), R.string.noUserError, Toast.LENGTH_LONG).show();
                        }
                    }

                    if (successLogin) {
                        MainActivity.setCurrentUser(user);
                        Intent leaderIntent = new Intent(SignUpActivity.this, LeaderBoardActivity.class);
                        startActivity(leaderIntent);
                        finish();
                    }
                }
                break;
            }
        }
    };

    private void loginSignUpSwitch (String decider) {
        int login = -1;
        int signUp = -1;

        if (decider.equals(LOGIN_STATE)) {
            setSignInButtonText(R.string.login);
            login = View.VISIBLE;
            signUp = View.GONE;
        }
        else if (decider.equals(SIGN_UP_STATE)) {
            setSignInButtonText(R.string.signUp);
            login = View.GONE;
            signUp = View.VISIBLE;
        }

        if (login == -1) {
            return;
        }
        SignUpActivity.this.findViewById(R.id.LoginTitle).setVisibility(login);
        SignUpActivity.this.findViewById(R.id.signUpButton).setVisibility(login);
        SignUpActivity.this.findViewById(R.id.signUpTitle).setVisibility(signUp);
        SignUpActivity.this.findViewById(R.id.loginButton).setVisibility(signUp);
        SignUpActivity.this.findViewById(R.id.firstNameField).setVisibility(signUp);
        SignUpActivity.this.findViewById(R.id.lastNameField).setVisibility(signUp);
        SignUpActivity.this.findViewById(R.id.confirmField).setVisibility(signUp);
    }

    private void setSignInButtonText (int stringRes) {
        ((Button)SignUpActivity.this.findViewById(R.id.signInButton)).setText(stringRes);
    }

    private View getField (int fieldID) {
        return this.findViewById(fieldID);
    }
}
