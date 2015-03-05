package chatapp;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Message object designed to contain all information needed for a message to be
 * clear.
 *
 * Implements Serializable in order to be streamed across the server and
 * clients.
 *
 * @author Aaron Power / N00121603
 */
public class Message implements Serializable {

    private String sender;
    private String message;
    private Date date;

    /**
     * Takes sender, and the message. Date is added when a new Message is
     * created.
     *
     * @param sender String
     * @param message String
     */
    public Message(String sender, String message) {
        this.sender = sender;
        this.message = message;
        this.date = new Date();
    }

    /**
     *
     * @return String sender
     */
    public String getSender() {
        return sender;
    }

    /**
     *
     * @return String Message
     */
    public String getMessage() {
        return message;
    }

    /**
     *
     * @return Date date
     */
    public Date getDate() {
        return date;
    }

    /**
     *
     * @param sender String
     */
    public void setSender(String sender) {
        this.sender = sender;
    }

    /**
     *
     * @param message String
     */
    public void setMessage(String message) {
        this.message = message;
    }

    /**
     *
     * @param date Date
     */
    public void setDate(Date date) {
        this.date = date;
    }

    /**
     *
     * @return String in format "HH:MM:SS: Sender: Message"
     */
    @Override
    public String toString() {
        SimpleDateFormat format = new SimpleDateFormat("hh:mm:ss");
        return format.format(date) + ": " + sender + ": " + message;

    }
}
