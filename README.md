# 💬 Chatter - Real-Time Chat Application

A full-stack real-time chat application built with the MERN stack (MongoDB, Express.js, React, Node.js) and Socket.IO. Chatter enables users to engage in one-on-one conversations and group chats with real-time message delivery, typing indicators, and notifications.

![Chat Application](https://img.shields.io/badge/Status-Active-success)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![React](https://img.shields.io/badge/React-v19-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen)
![Socket.IO](https://img.shields.io/badge/Socket.IO-Real--time-orange)

## ✨ Features

### 🔐 Authentication & Security
- **User Registration & Login** with JWT-based authentication
- **Password Hashing** using bcryptjs for secure storage
- **Protected Routes** with middleware authorization
- **Persistent Sessions** via localStorage

### 💬 Real-Time Messaging
- **Instant Message Delivery** powered by Socket.IO
- **One-on-One Chats** with any registered user
- **Group Chats** supporting 3+ members
- **Typing Indicators** to see when others are typing
- **Real-Time Notifications** for new messages
- **Message History** with persistent storage

### 👥 Group Chat Management
- **Create Group Chats** with multiple users
- **Add/Remove Members** (admin privileges required)
- **Rename Groups** (admin only)
- **Leave Groups** at any time
- **Group Admin Controls** for better management

### 🎨 User Interface
- **Responsive Design** that works on mobile and desktop
- **Chakra UI v3** for modern, accessible components
- **Profile Pictures** with Cloudinary integration
- **User Search** to find and connect with others
- **Notification Badges** showing unread message counts
- **Typing Animations** using Lottie
- **Auto-Scroll** to latest messages
- **Color-Coded Messages** for easy identification

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Socket.IO** - Real-time bidirectional communication
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **dotenv** - Environment variable management
- **Morgan** - HTTP request logger

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Chakra UI v3** - Component library
- **Socket.IO Client** - Real-time communication
- **Axios** - HTTP client
- **React Router DOM** - Client-side routing
- **React Lottie** - Animation library
- **MUI Material** - Additional UI components

## 📁 Project Structure

```
Chat-App/
├── backend/
│   ├── config/
│   │   ├── db.js                 # MongoDB connection
│   │   └── generateToken.js      # JWT token generation
│   ├── controllers/
│   │   ├── chatControllers.js    # Chat logic
│   │   ├── messageControllers.js # Message handling
│   │   └── userControllers.js    # User authentication
│   ├── middlewares/
│   │   └── authMiddleware.js     # JWT verification
│   ├── models/
│   │   ├── chatModel.js          # Chat schema
│   │   ├── messageModel.js       # Message schema
│   │   └── userModel.js          # User schema
│   ├── routes/
│   │   ├── chatRoutes.js         # Chat endpoints
│   │   ├── messageRoutes.js      # Message endpoints
│   │   └── userRoutes.js         # User endpoints
│   ├── data/                     # (Empty - for future data files)
│   └── server.js                 # Express & Socket.IO server
├── frontend/
│   ├── public/
│   │   └── background.png        # App background
│   ├── src/
│   │   ├── animations/
│   │   │   └── typing.json       # Typing indicator animation
│   │   ├── components/
│   │   │   ├── ChatBox.jsx       # Chat container
│   │   │   ├── ChatLoading.jsx   # Loading skeleton
│   │   │   ├── GroupChatModal.jsx
│   │   │   ├── MyChats.jsx       # Chat list sidebar
│   │   │   ├── ProfileModal.jsx
│   │   │   ├── ScrollableChat.jsx
│   │   │   ├── SideDrawer.jsx    # Navigation bar
│   │   │   ├── SignIn.jsx
│   │   │   ├── SignUp.jsx
│   │   │   ├── SingleChat.jsx    # Main chat interface
│   │   │   ├── SingleChat.css    # Chat styles
│   │   │   ├── UpdateGroupChatModal.jsx
│   │   │   ├── UserBadgeItem.jsx
│   │   │   ├── UserListItem.jsx
│   │   │   └── ui/               # Chakra UI custom components
│   │   ├── config/
│   │   │   └── chatLogic.js      # Message display logic
│   │   ├── context/
│   │   │   ├── ChatProvider.jsx  # Global chat state
│   │   │   └── FetchProvider.jsx # Fetch trigger state
│   │   ├── pages/
│   │   │   ├── ChatPage.jsx      # Main chat page
│   │   │   └── HomePage.jsx      # Login/Register page
│   │   ├── App.jsx               # Root component
│   │   ├── App.css               # Global styles
│   │   ├── index.css             # Base styles
│   │   └── main.jsx              # Entry point
│   ├── eslint.config.js          # ESLint configuration
│   ├── index.html                # HTML template
│   ├── package.json
│   ├── README.md
│   └── vite.config.js
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** or **yarn** package manager
- **Cloudinary Account** (for image uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/PremBhugraIITD/Chat-App.git
   cd Chat-App
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

5. **Configure Cloudinary** (for profile pictures)
   
   Update the Cloudinary configuration in `frontend/src/components/SignUp.jsx`:
   ```javascript
   data.append("upload_preset", "your_upload_preset");
   data.append("cloud_name", "your_cloud_name");
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   npm start
   ```
   The backend will run on `http://localhost:3000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

3. **Open your browser** and navigate to `http://localhost:5173`

## 📡 API Endpoints

### User Routes (`/api/user`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/signup` | Register new user | No |
| POST | `/signin` | User login | No |
| GET | `/search?key=query` | Search users | Yes |

### Chat Routes (`/api/chat`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/` | Access/create one-on-one chat | Yes |
| GET | `/` | Fetch all user chats | Yes |
| POST | `/group` | Create group chat | Yes |
| PUT | `/rename` | Rename group chat | Yes |
| PATCH | `/add` | Add user to group | Yes |
| DELETE | `/remove` | Remove user from group | Yes |

### Message Routes (`/api/message`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/` | Send message | Yes |
| GET | `/:chatId` | Get all messages in chat | Yes |

## 🔌 Socket.IO Events

### Client → Server

| Event | Payload | Description |
|-------|---------|-------------|
| `setup` | `userData` | Join user's personal room |
| `join chat` | `chatId` | Join specific chat room |
| `typing` | `chatData` | Notify users of typing |
| `stop typing` | `chatData` | Stop typing notification |
| `new message` | `messageData` | Send new message |

### Server → Client

| Event | Payload | Description |
|-------|---------|-------------|
| `connected` | - | Confirm socket connection |
| `typing` | - | Someone is typing |
| `stop typing` | - | Typing stopped |
| `message received` | `messageData` | New message received |

## 🎯 Usage

### Creating an Account
1. Click on the **Sign Up** tab
2. Enter your name, email, and password
3. Optionally upload a profile picture
4. Click **Sign Up**

### Starting a One-on-One Chat
1. Click the **Search User** button in the navbar
2. Search for a user by name or email
3. Click on the user to start chatting

### Creating a Group Chat
1. Click **New Group Chat** in the My Chats section
2. Enter a group name
3. Search and add users to the group (minimum 2 users)
4. Click **Create Chat**

### Managing Group Chats
- **View Members**: Click the eye icon next to the group name
- **Rename Group**: Enter new name and click Rename (admin only)
- **Add Members**: Search and click on users to add (admin only)
- **Remove Members**: Click X on user badge (admin only)
- **Leave Group**: Click the **Leave Group** button

## 🎨 Screenshots

### Home Page (Login/Register)
Landing page with authentication tabs for signing in or creating a new account.

### Chat Interface
Main chat page with three sections:
- **Top Navigation**: Search users, notifications, and user menu
- **My Chats Sidebar**: List of all active conversations
- **Chat Box**: Selected chat with message history and input field

### Group Chat Modal
Interface for creating new group chats with user search and selection.

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcrypt before storage
- **JWT Authentication**: Secure token-based authentication system
- **Protected Routes**: Middleware ensures only authenticated users can access protected endpoints
- **Input Validation**: Server-side validation for all user inputs
- **CORS Configuration**: Controlled cross-origin resource sharing

## 🐛 Known Issues & Future Enhancements

### Potential Improvements
- [ ] File sharing (images, documents, etc.)
- [ ] Message reactions and emoji support
- [ ] Message deletion and editing
- [ ] Read receipts
- [ ] Voice and video calling
- [ ] Dark mode toggle
- [ ] Message search functionality
- [ ] User status (online/offline)
- [ ] Email notifications
- [ ] Message encryption

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Prem Bhugra**

- GitHub: [@PremBhugraIITD](https://github.com/PremBhugraIITD)

## 🙏 Acknowledgments

- **Chakra UI** for the beautiful component library
- **Socket.IO** for real-time communication
- **MongoDB** for the flexible NoSQL database
- **Cloudinary** for image storage and management
- **React Community** for excellent documentation and resources

---

**Note**: This is a learning project. For production use, additional security measures, error handling, and optimizations should be implemented.

---

Made with ❤️ by Prem Bhugra
