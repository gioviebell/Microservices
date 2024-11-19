# Send the Contents of a Database via Email
## Introduction:
In relation to Avneet's main program, this microservice takes the id from an event in the calendar database, gathers the information corresponding to the id, and sends it as an email body to a designated recipient. 

## Goals:
  * Receive an entity id, and retrieve the attributes correlating to that id from /songs.
  * Receive a recipient email.
  * Pass the recipient email and entity attriutes to /send-songs, which compiles the data into an email to be sent.
Microservice Details
* URL: localhost:3008 (enter one that is not occupied or risk error)
* Ethereal testing email: https://ethereal.email/create
    * Use these credentials in email-sender.mjs in the transporter
* Install express, mongodb, and nodemailer in Node.js before running
*  Method: POST
*  Description: Sends an email with the details of an entity with a given id to a tester email.
    * When testing: Use the tester email as the recipient email as real emails do not work with ethereal.
## How to request data from the microservice:
* Here the microservice requests the data associated with the entity id. In this test case, the entity id is invalid as it does not exist in the database.
* 

  ![image](https://github.com/user-attachments/assets/3f4aa2db-0cab-47aa-88a9-3c65cf6c15c6)
  
Even though the request is POST, it uses GET to fetch the songs in the database with the matching id  through the /songs endpoint

(main program).


 ![image](https://github.com/user-attachments/assets/783edb37-d0cc-4998-8f0c-eea6a4bd4b7f)

 This path is used in the microservice so that the email body contains the data from the database.


 ## How to retrieve data from the microservice:
 
The data from the main program can be retrieved from the /send-song endpoint. Here the microservice retrieves the data from the main program, and creates an email body to be sent to the recipient email.

 ![image](https://github.com/user-attachments/assets/3f4aa2db-0cab-47aa-88a9-3c65cf6c15c6)

 To see the output and success of the email sending microservice, go to https://ethereal.email/, and enter your generated test email and password to view the message sent. This is the received body and header for the email. 

![image](https://github.com/user-attachments/assets/2120e5ee-9ebf-47f4-9d54-2b0bac422352)



 ## Test Program 
 Sends a GET request to the main program through /songs endpoint(your program would have the /events endpoint). This sends back all entities with their designated id values. 
 Sends a POST request to the microservice through the /api/send-songs endpoint with the entity id values and the recipient email. 
 ## Microservice
 * Receives the request for an email to be sent and uses find to search the database for matching id values
 * Formats the attributes and sends it to the recipient email using a transporter and nodemailer
 * Returns a 200 ok response status, followed by a confirmation string, or an error with a corresponding error string
  ## Main Program
  * Receives the queries from the micrservice, and returns the data associated with the entity id. 

 # UML Diagram
 
 ![image](https://github.com/user-attachments/assets/f5e63ef7-5a39-4d06-9a82-82140c6235ba)
