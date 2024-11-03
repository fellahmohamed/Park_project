# Technical Control Management System

A web application for managing vehicle technical control scheduling and tracking for NAFTAL GPL. This system helps streamline the management of vehicle inspections, insurance renewals, and technical controls across multiple company locations.

## 🚀 Features

- **User Authentication & Authorization**
  - Role-based access control
  - Secure login system
  - User account management

- **Vehicle Management**
  - Add and track company vehicles
  - Store comprehensive vehicle information
  - Real-time vehicle status monitoring

- **Technical Control Management**
  - Schedule and track technical inspections
  - Insurance renewal tracking
  - Vehicle registration management ("Carte Rouge")
  - Internal and external periodic controls

- **Dashboard & Reporting**
  - Comprehensive overview of vehicle fleet
  - Status indicators for pending actions
  - Detailed vehicle history tracking

## 💻 Technologies Used

- **Frontend**
  - React.js
  - CSS for styling
  - JavaScript ES6+

- **Backend**
  - Node.js
  - Express.js
  - MySQL Database

## 🛠 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/technical-control-management.git
```

2. Install frontend dependencies:
```bash
cd client
npm install
```

3. Install backend dependencies:
```bash
cd ../server
npm install
```

4. Set up the MySQL database:
   - Create a new MySQL database
   - Update database configuration in server/config/db.config.js

5. Start the development server:
```bash
# Start backend server
cd server
npm start

# Start frontend in a new terminal
cd client
npm start
```

## 📱 Screenshots

- Login Interface
- Dashboard Overview
- Vehicle Management
- Technical Control Details
- User Management

## 🔒 Environment Variables

Create a `.env` file in the server directory with the following variables:

```env
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret
```

## 👥 Project Context

This project was developed during an internship at NAFTAL GPL (District Saida) to solve the challenge of managing technical controls for their vehicle fleet. The system helps ensure timely completion of various vehicle-related tasks including:
- Insurance renewals
- Technical inspections
- Registration renewals
- Internal and external controls

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to check issues page if you want to contribute.

## 📝 License

This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.

## 👨‍💻 Author

- **FELLAH Mohamed Amine**
  - GitHub: [@fellahmohamed](https://github.com/fellahmohamed)

## 🙏 Acknowledgments

Special thanks to:
- NAFTAL GPL District Saida for the internship opportunity
- Mr. HICHOUR Djelloul (Internship Supervisor)
- Mrs. HAMMAR Halima for guidance and support
