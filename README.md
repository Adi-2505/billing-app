
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

# Billing Application

## Project Overview
This project utilizes Zapier to automate the billing and invoicing process. Users sign up and, based on their usage of the application's APIs, can generate invoices seamlessly.

## Application Flow

### 1. Google Sign-In
- **Landing Page**: Users arrive at the landing page.
- **Sign-In Requirement**: Users must sign in with their Google account to access the application.

### 2. Dashboard Access
- **Post Sign-In**: After signing in, users are redirected to the dashboard.
- **API Calls**: Users can make API calls from the dashboard. Increased API usage updates the billing table in Zapier via webhook triggers.

### 3. Billing Section
- **Usage Details**: Users can view their usage details, current billing cycle, and cumulative usage in the billing section.

### 4. Invoice Generation
- **Automated Invoices**: Users can generate invoices from the dashboard. Zapier workflows handle sending automated invoices via email.

### 5. Profile Page
- **Account Information**: Users can view their account information.
- **Logout**: Users can log out, redirecting them back to the landing page.

### 6. Protected Routes
- **Access Control**: Routes are protected to ensure only signed-in users can access the application.

### 7. Session Management
- **React Context API**: Utilized for managing user sessions across the entire application, simplifying user management.






