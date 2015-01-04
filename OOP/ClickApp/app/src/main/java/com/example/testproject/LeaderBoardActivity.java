package com.example.testproject;

import android.app.Activity;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.TableLayout;
import android.widget.TableRow;
import android.widget.TextView;

import com.example.testproject.model.Model;
import com.example.testproject.model.Model.ScoreWrapper;
import com.example.testproject.model.User;

import java.util.ArrayList;

public class LeaderBoardActivity extends Activity {


	@Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_leaderboard);
        ArrayList<ScoreWrapper> scoresList;
        TableLayout table;
        TableRow tableRow;
        TextView textView;

        this.findViewById(R.id.homeButton).setOnClickListener(onclickListener);
        table = (TableLayout)this.findViewById(R.id.scoreTable);
        scoresList = Model.getInstance().sortedLeaderboards();

        for (ScoreWrapper scoreWrapper : scoresList) {
            User user;
            int score;

            user = scoreWrapper.getUser();
            score = scoreWrapper.getScore();
            tableRow = new TableRow(getApplicationContext());

            for (int i = 0; i < 2; i++) {
                String output = null;

                switch (i) {
                    case 0: {
                        output = user.getFirstName() + " " + user.getLastName();
                    }
                    break;

                    case 1: {
                        output = Integer.valueOf(score).toString();
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
	
	@Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();
        return id == R.id.action_settings || super.onOptionsItemSelected(item);
    }

    private final View.OnClickListener onclickListener = new View.OnClickListener() {
        public void onClick(View v) {
            switch (v.getId()) {
                case R.id.homeButton: {
                    finish();
                }
            }
        }
    };
}
