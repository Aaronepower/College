package com.example.testproject;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.TableLayout;
import android.widget.TableRow;
import android.widget.TextView;

import com.example.testproject.model.Model;
import com.example.testproject.model.User;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class LeaderBoardActivity extends Activity {


	@Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_leaderboard);
        HashMap<User, List<Integer>> scoresMap;
        TableLayout table;
        TableRow tableRow;
        TextView textView;

        this.findViewById(R.id.homeButton).setOnClickListener(onclickListener);
        table = (TableLayout)this.findViewById(R.id.scoreTable);
        scoresMap = Model.getInstance().getScores();

        for (Map.Entry<User, List<Integer>> entry: scoresMap.entrySet()) {
            User user;
            List<Integer> scores;

            user = entry.getKey();
            scores = entry.getValue();
            for (Integer score: scores) {
                tableRow = new TableRow(getApplicationContext());

                for (int i = 0; i < 2; i++) {
                    String output = null;

                    switch (i) {
                        case 0: {
                            output = user.getFirstName() + " " + user.getLastName();
                        }
                        break;

                        case 1: {
                            output = score.toString();
                        }
                        break;
                    }
                    textView = new TextView(getApplicationContext());
                    textView.setText(output);
                    textView.setPadding(20, 20, 20, 20);
                    textView.setTextAppearance(this, android.R.style.TextAppearance_Large);
                    tableRow.addView(textView);
                }
                table.addView(tableRow);
            }
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

    private View.OnClickListener onclickListener = new View.OnClickListener() {
        public void onClick(View v) {
            switch (v.getId()) {
                case R.id.homeButton: {
                    finish();
                }
            }
        }
    };
}
