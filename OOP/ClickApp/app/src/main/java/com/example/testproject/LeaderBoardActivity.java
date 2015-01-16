package com.example.testproject;

import android.support.v4.app.Fragment;
import android.os.Bundle;
import android.support.v4.app.FragmentActivity;
import android.support.v4.app.FragmentManager;
import android.view.View;

public class LeaderBoardActivity extends FragmentActivity {


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_leaderboard);
        this.findViewById(R.id.homeButton).setOnClickListener(onclickListener);

        FragmentManager fragmentManager = getSupportFragmentManager();
        Fragment fragment = fragmentManager.findFragmentById(R.id.user_score_container);

        if (fragment == null) {
            fragment = new UserListFragment();
            fragmentManager.beginTransaction()
                    .add(R.id.user_score_container, fragment)
                    .commit();
        }
    }

    private final View.OnClickListener onclickListener = new View.OnClickListener() {
        public void onClick(View v) {
            switch (v.getId()) {
                case R.id.homeButton:
                    finish();
                    break;
            }
        }
    };
}
