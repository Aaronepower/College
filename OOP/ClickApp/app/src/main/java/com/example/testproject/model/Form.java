package com.example.testproject.model;

import android.widget.EditText;

public class Form {

    private EditText firstNameField;
    private EditText lastNameField;
    private EditText usernameField;
    private EditText passwordField;
    private EditText confirmField;
    private String firstNameFieldValue;
    private String lastNameFieldValue;
    private String usernameFieldValue;
    private String passwordFieldValue;
    private String confirmFieldValue;

    public Form (EditText firstNameField, EditText lastNameField, EditText usernameField, EditText passwordField, EditText confirmField) {
        this.setFirstNameField(firstNameField);
        this.setLastNameField(lastNameField);
        this.setUsernameField(usernameField);
        this.setPasswordField(passwordField);
        this.setConfirmField(confirmField);
        this.setFirstNameFieldValue(getFirstNameField().getText().toString());
        this.setLastNameFieldValue(getLastNameField().getText().toString());
        this.setUsernameFieldValue(getUsernameField().getText().toString());
        this.setPasswordFieldValue(getPasswordField().getText().toString());
        this.setConfirmFieldValue(getConfirmField().getText().toString());
    }

    public Form (EditText usernameField, EditText passwordField) {
        this.setUsernameField(usernameField);
        this.setPasswordField(passwordField);
        this.setUsernameFieldValue(getUsernameField().getText().toString());
        this.setPasswordFieldValue(getPasswordField().getText().toString());
    }

    EditText getFirstNameField() {
        return firstNameField;
    }

    void setFirstNameField(EditText firstNameField) {
        this.firstNameField = firstNameField;
    }

    EditText getLastNameField() {
        return lastNameField;
    }

    void setLastNameField(EditText lastNameField) {
        this.lastNameField = lastNameField;
    }

    EditText getUsernameField() {
        return usernameField;
    }

    void setUsernameField(EditText usernameField) {
        this.usernameField = usernameField;
    }

    EditText getPasswordField() {
        return passwordField;
    }

    void setPasswordField(EditText passwordField) {
        this.passwordField = passwordField;
    }

    public String getFirstNameFieldValue() {
        return firstNameFieldValue;
    }

    void setFirstNameFieldValue(String firstNameFieldValue) {
        this.firstNameFieldValue = firstNameFieldValue;
    }

    public String getLastNameFieldValue() {
        return lastNameFieldValue;
    }

    void setLastNameFieldValue(String lastNameFieldValue) {
        this.lastNameFieldValue = lastNameFieldValue;
    }

    public String getUsernameFieldValue() {
        return usernameFieldValue;
    }

    void setUsernameFieldValue(String usernameFieldValue) {
        this.usernameFieldValue = usernameFieldValue;
    }

    public String getPasswordFieldValue() {
        return passwordFieldValue;
    }

    void setPasswordFieldValue(String passwordFieldValue) {
        this.passwordFieldValue = passwordFieldValue;
    }

    public boolean isNotEmpty() {
        String[] fieldValues;
        fieldValues = new String[]{
                getFirstNameFieldValue(),
                getLastNameFieldValue(),
                getUsernameFieldValue(),
                getPasswordFieldValue(),
                getConfirmFieldValue()
        };

        for (String field: fieldValues) {
            if (field != null && field.isEmpty()) {
                return false;
            }
        }
        return true;
    }

    public boolean validPassword() {
        return this.passwordFieldValue.equals(this.confirmFieldValue);
    }

    EditText getConfirmField() {
        return confirmField;
    }

    void setConfirmField(EditText confirmField) {
        this.confirmField = confirmField;
    }

    String getConfirmFieldValue() {
        return confirmFieldValue;
    }

    void setConfirmFieldValue(String confirmFieldValue) {
        this.confirmFieldValue = confirmFieldValue;
    }


    public boolean userExists () {
        String username;
        username = getUsernameFieldValue();

        for (User user : Model.getInstance().getUsers()) {
            if (user.getUsername().equals(username)) {
                return true;
            }
        }
        return false;
    }
    public User getUser() {
        String username, password;
        username = getUsernameFieldValue();
        password = getPasswordFieldValue();
        User desiredUser;

        desiredUser = null;
        for (User user : Model.getInstance().getUsers()) {
            if (user.getUsername().equals(username) && user.getPassword().equals(password)) {
                desiredUser = user;
            }
        }
        return desiredUser;
    }

}
