package chatapp;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.concurrent.ConcurrentLinkedDeque;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Main Server Class for the Application.
 *
 * @author Aaron Power / N00121603
 */
public class ChatServer {

    static final int PORT = 9001;
    static ConcurrentLinkedDeque<Message> messageDeque;

    /**
     * Creates a server socket and continually checks for a new connection. When
     * connection is accepted, a new anonymous Thread is started using the
     * ClientSession Class.
     *
     * @param args Command Line Arguments
     */
    public static void main(String[] args) {
        messageDeque = new ConcurrentLinkedDeque();

        while (true) {
            try (ServerSocket server = new ServerSocket(PORT)) {
                while (true) {
                    Socket client;
                    client = server.accept();
                    new Thread(new ClientSession(client)).start();
                }
            } catch (IOException ex) {
                Logger.getLogger(ChatServer.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }
}
