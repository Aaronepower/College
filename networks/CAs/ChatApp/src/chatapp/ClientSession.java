package chatapp;

import java.io.EOFException;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.Socket;
import java.net.SocketException;
import java.util.Iterator;
import java.util.concurrent.ConcurrentLinkedDeque;
import java.util.logging.Level;
import java.util.logging.Logger;

public class ClientSession implements Runnable {

    Socket client;
    ConcurrentLinkedDeque messageDeque;
    Thread readThread;

    public ClientSession(Socket client, ConcurrentLinkedDeque messageDeque) {
        this.client = client;
        this.messageDeque = messageDeque;
        this.readThread = new Thread(() -> {
            ObjectInputStream input = null;
            try {
                try {
                    input = new ObjectInputStream(this.client.getInputStream());
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
                } finally {
                    if (input != null) {
                        input.close();
                    }
                }
            } catch (IOException | ClassNotFoundException ex) {
                errorHandler(ex);
            }
            new Thread(readThread).start();
        });
    }

    @Override
    public void run() {
        ObjectOutputStream output = null;
        try {
            try {
                output = new ObjectOutputStream(client.getOutputStream());
                Message lastMessage = null;
                readThread.start();
                while (true) {
                    if (lastMessage != null && !lastMessage.equals(messageDeque.peekLast())) {
                        Iterator it = messageDeque.iterator();
                        System.out.println("Deque contains messages");
                        while (it.hasNext()) {
                            Message message = (Message) it.next();
                            System.out.println("Sending message: " + message);
                            output.writeObject(message);

                            if (!it.hasNext()) {
                                lastMessage = message;
                            }
                        }
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

    private void errorHandler(Exception ex) {
        if (!(ex instanceof SocketException)) {
            Logger.getLogger(ClientSession.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
