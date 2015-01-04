package chatapp;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.concurrent.ConcurrentLinkedDeque;
import java.util.logging.Level;
import java.util.logging.Logger;

public class ChatApp {

    static final int PORT = 9001;

    public static void main(String[] args) {

        ConcurrentLinkedDeque<Message> messageDeque;
        messageDeque = new ConcurrentLinkedDeque();
        while (true) {
            try (ServerSocket server = new ServerSocket(PORT)) {
                while (true) {
                    Socket client = null;
                    try {
                        client = server.accept();
                        new Thread(new ClientSession(client, messageDeque)).start();
                    } catch (IOException ex) {
                        Logger.getLogger(ChatApp.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
            } catch (IOException ex) {
                Logger.getLogger(ChatApp.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }

}
