package com.example.testproject.model;

import android.app.Activity;
import android.widget.EditText;
import android.widget.TextView;

/**
 * Created by Aaron on 26/10/2014.
 */
public class Form {

    private EditText firstNameField;
    private EditText lastNameField;
    private EditText usernameField;
    private EditText passwordField;
    private String firstNameFieldValue;
    private String lastNameFieldValue;
    private String usernameFieldValue;
    private String passwordFieldValue;

    public Form (EditText firstNameField, EditText lastNameField, EditText usernameField, EditText passwordField) {
        this.setFirstNameField(firstNameField);
        this.setLastNameField(lastNameField);
        this.setUsernameField(usernameField);
        this.setPasswordField(passwordField);
        this.setFirstNameFieldValue(getFirstNameField().getText().toString());
        this.setLastNameFieldValue(getLastNameField().getText().toString());
        this.setUsernameFieldValue(getUsernameField().getText().toString());
        this.setPasswordFieldValue(getPasswordField().getText().toString());
    }

    public Form (EditText usernameField, EditText passwordField) {
        this.setFirstNameField(null);
        this.setLastNameField(null);
        this.setUsernameField(usernameField);
        this.setPasswordField(passwordField);
        this.setFirstNameFieldValue(null);
        this.setLastNameFieldValue(null);
        this.setUsernameFieldValue(getUsernameField().getText().toString());
        this.setPasswordFieldValue(getPasswordField().getText().toString());
    }

    public EditText getFirstNameField() {
        return firstNameField;
    }

    public void setFirstNameField(EditText firstNameField) {
        this.firstNameField = firstNameField;
    }

    public EditText getLastNameField() {
        return lastNameField;
    }

    public void setLastNameField(EditText lastNameField) {
        this.lastNameField = lastNameField;
    }

    public EditText getUsernameField() {
        return usernameField;
    }

    public void setUsernameField(EditText usernameField) {
        this.usernameField = usernameField;
    }

    public EditText getPasswordField() {
        return passwordField;
    }

    public void setPasswordField(EditText passwordField) {
        this.passwordField = passwordField;
    }

    public String getFirstNameFieldValue() {
        return firstNameFieldValue;
    }

    public void setFirstNameFieldValue(String firstNameFieldValue) {
        this.firstNameFieldValue = firstNameFieldValue;
    }

    public String getLastNameFieldValue() {
        return lastNameFieldValue;
    }

    public void setLastNameFieldValue(String lastNameFieldValue) {
        this.lastNameFieldValue = lastNameFieldValue;
    }

    public String getUsernameFieldValue() {
        return usernameFieldValue;
    }

    public void setUsernameFieldValue(String usernameFieldValue) {
        this.usernameFieldValue = usernameFieldValue;
    }

    public String getPasswordFieldValue() {
        return passwordFieldValue;
    }

    public void setPasswordFieldValue(String passwordFieldValue) {
        this.passwordFieldValue = passwordFieldValue;
    }

    private String getFieldValue (Activity activity, int fieldID) {
        return ((TextView)activity.findViewById(fieldID)).getText().toString();
    }

    public boolean isEmpty() {
        String[] fieldValues;
        if (getFirstNameFieldValue() != null) {
            fieldValues = new String[]{
                    getFirstNameFieldValue(),
                    getLastNameFieldValue(),
                    getUsernameFieldValue(),
                    getPasswordFieldValue()
        };
        } else {
            fieldValues = new String[] {
                    getUsernameFieldValue(),
                    getPasswordFieldValue()
            };
        }

        for (String field: fieldValues) {
            if (field != null && field.isEmpty()) {
                return true;
            }
        }
        return false;
    }

    public boolean validPassword(Activity activity, int confirm) {
        return passwordFieldValue.equals(getFieldValue(activity, confirm));
    }
}
