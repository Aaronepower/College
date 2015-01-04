package chatapp;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Message implements Serializable {
  private String sender;
  private String message;
  private Date date;

  public Message (String sender, String message) {
    this.sender = sender;
    this.message = message;
    this.date = new Date();

  }

  public void setSender(String sender) {
    this.sender = sender;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public void setDate(Date date) {
    this.date = date;
  }

  @Override
  public String toString() {
    SimpleDateFormat format = new SimpleDateFormat("hh:mm:ss");
    return format.format(date)+": "+ sender + ": "+message;

  }

  public boolean equals(Message message) {
    return this.sender.equals(message.sender) 
      && this.message.equals(message.message) 
      && this.date.compareTo(message.date) == 0;
  }
}
