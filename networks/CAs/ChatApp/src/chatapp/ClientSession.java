package chatapp;

import java.io.EOFException;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.Socket;
import java.util.Iterator;
import java.util.concurrent.ConcurrentLinkedDeque;
import java.util.logging.Level;
import java.util.logging.Logger;

public class ClientSession implements Runnable {

    Socket client;
    ConcurrentLinkedDeque messageDeque;

    public ClientSession(Socket client, ConcurrentLinkedDeque messageDeque) {

        this.client = client;
        this.messageDeque = messageDeque;
    }

    @Override
    public void run() {
        try (ObjectOutputStream output
                = new ObjectOutputStream(client.getOutputStream());
                ObjectInputStream input
                = new ObjectInputStream(client.getInputStream())) {
            Message lastMessage = null;

            while (true) {
                if (lastMessage != null && !lastMessage.equals(messageDeque.peekLast())) {
                    Iterator it = messageDeque.iterator();

                    while (it.hasNext()) {
                        Message message = (Message) it.next();
                        output.writeObject(message);

                        if (!it.hasNext()) {
                            lastMessage = message;
                        }
                    }
                }
                Message message;
                try {
                    message = (Message) input.readObject();
                    System.out.println(message.toString());
                } catch (EOFException ex) {
                    message = null;
                }
                if (message != null) {
                    messageDeque.addLast(message);
                    System.out.println("Message added");
                }
            }
        } catch (IOException | ClassNotFoundException ex) {
            Logger.getLogger(ChatApp.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
