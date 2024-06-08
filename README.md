
# Billing Application

## Project Overview
This project utilizes Zapier to automate the billing and invoicing process. Users can sign up, and based on the usage of the application's APIs, they can generate invoices seamlessly.

## Backend Setup

### Prerequisites
- Node.js installed on your system
- A Google Cloud account
- A MongoDB account and cluster setup
- A Zapier account

### Steps

1. **Clone the Repository**
   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```

2. **Setup Environment Variables**
   - Create a `.env` file in the root directory of the project.
   - Add the following environment variables:

     ```plaintext
     GOOGLE_CLIENT_ID=<your_google_client_id>
     GOOGLE_CLIENT_SECRET=<your_google_client_secret>
     MONGO_URL=<your_mongo_connection_url>
     ```

   - To get `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`, create a new project on the Google Cloud Console, navigate to the OAuth Credentials section, and generate the credentials.

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Setup MongoDB**
   - Create a MongoDB cluster on MongoDB Atlas.
   - Copy the connection URL and add it to your `.env` file as `MONGO_URL`.

5. **Zapier Integration**
   - Go to [Zapier.com](https://zapier.com) and create a new account if you don't have one.
   - Follow the instructions on Zapier to integrate it with your application.

### Running the Backend
To start the backend server, use the following command:
```bash
npm start
```

## Frontend Setup

### Prerequisites
- Node.js installed on your system

### Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Running the Frontend**
   ```bash
   npm start
   ```

## Conclusion
By following these steps, you will have a professional and functional billing application. Ensure all environment variables are correctly set up and that both your backend and frontend servers are running smoothly. Enjoy automating your billing and invoicing process with Zapier integration!

## Zapier setup fpr the backend
For Zapier there are two workflows (Zaps)
1. Sending automated emails to the Users

    Create a trigger using Zapier webhook select catch hook option
    Then copy the webhook URL and paste it in the .env file
    Then add action Code with Zapier
This workflow will be triggered when user will generate invoice and the invoice will be sent to the user's email

![image](./1.png)


![image](./2.png)

2. Adding rows in the billing table in Zapier 

    Create a trigger using Zapier webhook select catch hook option
    Then copy the webhook URL and paste it in the .env file
    We will use Zapier table action

![image](./3.png)

![image](./4.png)


Now that the project setup has completed let's move on to the Application flow

# Application Flow

1. Google sign in

    User come to the landing page of the application. User have to sign in to the application using google account without that then cannot access the application

2. After the sign in process users are redirected to the dashboard page from where you can make api calls. The more API calls you make your usage increases
As your usage increases the billing table in Zapier get updated using the webhook trigger 

3. In the billing section of the app you can see the usage detail with current billing cycle and cumulative usage

4. On the dashboard page you can also generate invoice. This uses zapier workflow to send automated invoices through email to the user

5. In the profile page you see your account information and you can also logout of the application. As soon as the user logout of the application the user is redirected to the landing page

6. Routes and protected so that if the user is not signed in then user cannot access the routes in the application

7. React context api is used to manage user session across entire application. This makes user management easy.

Thank you


