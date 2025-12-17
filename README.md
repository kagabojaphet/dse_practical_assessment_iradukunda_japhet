Nyabugogo Smart City Parking Management System (NSCPMS)
A robust Node.js backend solution designed to automate parking entry, exit, and revenue management in a smart city environment.

🚀 Features
Role-Based Access Control (RBAC): Distinct functionalities and access levels for Managers and Drivers.

Smart Entry System: Managers record entry using only the plate number; the system automatically links it to registered vehicles.

Automated Fee Calculation: * First Hour: 1,500 RWF

Additional Hours: 1,000 RWF per hour

Rule: Partial hours are rounded up to the nearest full hour.

Comprehensive Reporting: Real-time Daily and Monthly revenue summaries specifically for Managers.

Driver Transparency: Drivers can view their specific parking history and current bills.

Security: Industry-standard password hashing using bcryptjs and secure route protection via JWT.

🛠️ Technical Stack
Runtime: Node.js & Express

Database: MySQL

ORM: Sequelize

Authentication: JSON Web Tokens (JWT)

Security: Bcrypt.js

📋 Prerequisites
Node.js installed on your machine.

MySQL Server running locally or remotely.

A .env file in the root directory with the following variables:
PORT=5000
DB_NAME=parking_db
DB_USER=root
DB_PASS=
DB_HOST=localhost
JWT_SECRET=your_super_secret_key

⚙️ Installation & Setup
Clone the project and navigate to the folder.

Install dependencies:

Bash

npm install
Start the server:

Bash

npm start
