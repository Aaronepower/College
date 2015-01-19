package chatapp;

import java.io.EOFException;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.Socket;
import java.net.SocketException;
import java.util.concurrent.ConcurrentLinkedDeque;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Handles users interactions on two separate threads to allow multiple users to
 * connection the server. 
 *
 * @author Aaron Power / N00121603
 */
public class ClientSession implements Runnable {
    
    Socket client;
    /**
     * Reading objects is placed on it's own thread because input.readObject()
     * is blocking.
     */
    Thread read;

    /**
     * inits client, and read.
     * @param client Socket
     */
    public ClientSession(Socket client) {
        this.client = client;
        this.read = new Thread(() -> {
            ObjectInputStream input = null;
            try {
                try {
                    input = new ObjectInputStream(this.client.getInputStream());
                    Message message;
                    while (client.isConnected()) {
                        try {
                            message = (Message) input.readObject();
                        } catch (EOFException ex) {
                            message = null;
                        }
                        if (message != null 
                                && !message.getMessage().equals("") 
                                && !message.getSender().equals("")) {
                            ChatServer.messageDeque.add(message);
                            System.out.println(message + " added");
                        }
                    }
                } finally {
                    if (input != null) {
                        input.close();
                    }
                }
            } catch (IOException | ClassNotFoundException ex) {
                errorHandler(ex);
            }
        });
    }
    
    /**
     * Write Thread.
     */
    @Override
    public void run() {
        ObjectOutputStream output = null;
        try {
            try {
                output = new ObjectOutputStream(client.getOutputStream());
                read.start();
                boolean started = false;
                ConcurrentLinkedDeque oldDeque = new ConcurrentLinkedDeque(ChatServer.messageDeque);
                while (client.isConnected()) {
                    if (!started
                            || oldDeque.peekLast() == null
                            || !oldDeque.peekLast().equals(ChatServer.messageDeque.peekLast())) {
                        output.reset();
                        output.writeObject(ChatServer.messageDeque);
                        output.flush();
                        oldDeque = new ConcurrentLinkedDeque(ChatServer.messageDeque);
                        started = true;
                    }
                }
            } finally {
                if (output != null) {
                    output.close();
                }
                
            }
        } catch (IOException ex) {
            errorHandler(ex);
        }
    }

    /**
     * SocketExceptions are ignored, to prevent the server from crashing when
     * the client disconnects.
     *
     * @param ex Exception
     */
    private void errorHandler(Exception ex) {
        if (!(ex instanceof SocketException)) {
            Logger.getLogger(ClientSession.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
