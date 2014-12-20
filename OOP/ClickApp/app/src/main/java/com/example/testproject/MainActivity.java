package com.example.testproject;

import android.app.AlertDialog;
import android.app.Dialog;
import android.app.DialogFragment;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.FragmentActivity;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.TextView;

import com.example.testproject.model.Model;
import com.example.testproject.model.User;

/**
 *
 * Activity containing main user interaction and serves as the hub to the other activities.
 */
public class MainActivity extends FragmentActivity {

    public static final String SCORE_KEY = "score";
    private static User currentUser = null;
    private int score;

    /**
     * Once created attaches OnClickListener listener to the buttons contained within the activity.
     * @param savedInstanceState previous instance of activity if any are present.
     */
	@Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        this.findViewById(R.id.clickButton).setOnClickListener(listener);
        this.findViewById(R.id.clearButton).setOnClickListener(listener);
        this.findViewById(R.id.saveButton).setOnClickListener(listener);
        this.findViewById(R.id.leaderButton).setOnClickListener(listener);
        this.findViewById(R.id.signOutButton).setOnClickListener(listener);
    }

    @Override
    protected void onResume () {
        super.onResume();

        Button signOutButton = (Button)this.findViewById(R.id.signOutButton);

        if (currentUser != null) {
            signOutButton.setVisibility(View.VISIBLE);
        } else {
            signOutButton.setVisibility(View.GONE);
        }
    }



    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
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
    		}
    	}
    };
    
    private int getNumOfClicks() {
    	TextView clicksView = (TextView)this.findViewById(R.id.numOfClicks);
    	String clicksString = clicksView.getText().toString();
		return Integer.parseInt(clicksString);
    }
    
    private void setNumOfClicks(int value) {
    	TextView clicksView = (TextView)this.findViewById(R.id.numOfClicks);
    	clicksView.setText(Integer.valueOf(value).toString());
    }

    public static void setCurrentUser (User user) {
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

    public static class SignOutDialogFragment extends DialogFragment {

        @Override
        public Dialog onCreateDialog(Bundle savedInstanceState) {

            AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
            builder.setMessage(R.string.signOutMessage)
                    .setPositiveButton(R.string.ok, new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int id) {
                            currentUser = null;
                            getActivity().findViewById(R.id.signOutButton).setVisibility(View.GONE);
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
            }
            else {
                intent = new Intent(getActivity(), LeaderBoardActivity.class);
                message = R.string.saveMessage;
            }

            AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
            builder.setMessage(message)
                    .setPositiveButton(R.string.ok, new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int id) {
                            score = getNumOfClicks();
                            setNumOfClicks(0);
                            if (currentUser == null) {
                                intent.putExtra(SCORE_KEY, score);
                            } else {
                                Model model = Model.getInstance();
                                model.addScore(currentUser, score);
                            }
                            startActivity(intent);
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
}
