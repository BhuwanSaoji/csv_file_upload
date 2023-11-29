# csv_file_upload
This Node.js application is designed to take a CSV file, save it in a temporary location, and then use a cron job to add the file's contents to MongoDB. The application also performs user details validation, setting the status to "inactive" and adding error logs if either the name, email, or mobile number is missing. If all details are present, the status is set to "active".

Getting Started
Prerequisites
Node.js installed on your machine
MongoDB installed and running
Git installed
Installation
Clone the repository:

git clone https://github.com/your-username/your-repo.git


cd your-repo
Install dependencies:

npm install
Configure the application by updating the config.js file with your MongoDB connection details and other relevant settings.

Usage
Run the Application:

npm start
This will start the application, and it will listen for CSV files in the specified directory.

CSV File Format:

Ensure your CSV file has the following columns: name, email, and mobile.

Cron Job:

The application uses a cron job to periodically check for new CSV files in the temp directory and import them into MongoDB. You can configure the cron schedule in the cron.js file.

Configuration
Update the config.js file to set your MongoDB connection details, CSV file directory, and other relevant configurations.
User Validation
The application validates user details (name, email, and mobile number) and sets the user status accordingly.
Logging
Logs are generated in the logs directory. Check the logs for information on imported files, errors, and other relevant details.
Contributing
Feel free to contribute to this project. Fork the repository, make your changes, and submit a pull request.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
Thanks to Node.js and MongoDB for their awesome platforms.
