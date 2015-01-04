package chatapp;

import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.Socket;
import java.util.Scanner;
import java.util.logging.Level;
import java.util.logging.Logger;

public class ChatClient {

  public static void main (String[] args) {

    try (Socket connection = new Socket("localhost", ChatApp.PORT)) {
      String username;
      try (Scanner input = new Scanner(System.in)) {
        System.out.println("Enter your username");
        username = input.nextLine();
      }

      new Thread(() -> {
        try (ObjectInputStream response =new ObjectInputStream(connection.getInputStream())) {
          Message message = (Message) response.readObject();
          System.out.println(message.toString());
        } catch (IOException | ClassNotFoundException ex) {
          Logger.getLogger(ChatClient.class.getName()).log(Level.SEVERE, null, ex);
        }
      }).start();
      new Thread(() -> {

        System.out.println("Enter message:");
        try (ObjectOutputStream output = 
          new ObjectOutputStream(connection.getOutputStream()))
        {
          while (true) {
            Scanner input = new Scanner(System.in);
            String chatMessage; 
                
              chatMessage = input.nextLine();
              System.out.println("Input taken: "+chatMessage);
              System.out.println("Enter message:");
              Message message = new Message(username, chatMessage);
              output.writeObject(message);
          }
        } catch (IOException ex) {
          Logger.getLogger(ChatClient.class.getName()).log(Level.SEVERE, null, ex);
        }
      }).start();
      while(true);
    } catch (IOException ex) {
      Logger.getLogger(ChatClient.class.getName()).log(Level.SEVERE, null, ex);
    }
  }
}
