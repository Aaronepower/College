package com.example.clickingapp;


import android.os.Bundle;
import android.support.v4.app.FragmentActivity;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.TextView;




public class MainActivity extends FragmentActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }
    
    public void onClear (View v) {
    	TextView clicksView = (TextView)this.findViewById(R.string.numOfClicks);    	
    	clicksView.setText(Integer.valueOf(0).toString());
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
    		    	
    		    	TextView clicksView = (TextView)MainActivity.this.findViewById(R.id.numOfClicks);
    		    	try {
    		    		String clicksString = clicksView.getText().toString();
    		    		clicks = Integer.parseInt(clicksString);
    		    		clicks++;
    		        	clicksView.setText(Integer.valueOf(clicks).toString());
    		    	}
    		    	catch (NumberFormatException e) {
    		    		Log.d("Error",e.toString());
    		    	}
    			break;
    			
    			/*case R.id.clearButton:
    			
    			break;*/
    		}
    	}
    };
}
