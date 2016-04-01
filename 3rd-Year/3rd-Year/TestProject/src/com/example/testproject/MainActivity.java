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
import android.widget.EditText;
import android.widget.TextView;

import com.example.testproject.model.Model;


public class MainActivity extends FragmentActivity {
	
	@Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        this.findViewById(R.id.clickButton).setOnClickListener(onclickListener);
        this.findViewById(R.id.clearButton).setOnClickListener(onclickListener);
        this.findViewById(R.id.saveButton).setOnClickListener(onclickListener);
        this.findViewById(R.id.leaderButton).setOnClickListener(onclickListener);
    }
	public class ClearDialogFragment extends DialogFragment {
	    @Override
	    public Dialog onCreateDialog(Bundle savedInstanceState) {
	        // Use the Builder class for convenient dialog construction
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
	public class SaveDialogFragment extends DialogFragment {
	    @Override
	    public Dialog onCreateDialog(Bundle savedInstanceState) {
	        // Use the Builder class for convenient dialog construction
	        AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
	        final EditText input = new EditText(MainActivity.this);
	        builder.setMessage(R.string.saveMessage)
	        	   .setView(input)
	               .setPositiveButton(R.string.ok, new DialogInterface.OnClickListener() {
	                   public void onClick(DialogInterface dialog, int id) {
	                	   String name = input.getText().toString();
	                	   int score = getNumOfClicks();
	               		   Model model = Model.getInstance();
	               		   model.put(name, score);
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
        if (id == R.id.action_settings) {
            return true;
        }
        return super.onOptionsItemSelected(item);
    }
    
    public OnClickListener onclickListener = new OnClickListener() {
    	public void onClick(View v) {
    		switch (v.getId()) {
    			case R.id.clickButton:
    				int clicks;
    		    	try {
    		    		clicks = getNumOfClicks();
    		    		clicks++;
    		    		setNumOfClicks(clicks);
    		    	}
    		    	catch (NumberFormatException e) {
    		    		Log.d("Error",e.toString());
    		    	}
    			break;
    			
    			case R.id.clearButton:
    				ClearDialogFragment clearBox = new ClearDialogFragment();
    				clearBox.show(getFragmentManager(), "ConfirmDialogFragment");
    			break;
    			
    			case R.id.saveButton:
    				SaveDialogFragment saveBox = new SaveDialogFragment();
    				saveBox.show(getFragmentManager(), "SaveDialogFragment");
    			break;
    			
    			case R.id.leaderButton:
    				Intent intent = new Intent(MainActivity.this, LeaderBoardActivity.class);
    			break;
    		}
    	}
    };
    
    public int getNumOfClicks() {
    	TextView clicksView = (TextView)MainActivity.this.findViewById(R.id.numOfClicks);
    	String clicksString = clicksView.getText().toString();
		return Integer.parseInt(clicksString);
    }
    
    public void setNumOfClicks(int value) {
    	TextView clicksView = (TextView)MainActivity.this.findViewById(R.id.numOfClicks);
    	clicksView.setText(Integer.valueOf(value).toString());
    }
}
