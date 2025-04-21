Project Phase 2 Report: Basic Structure and Main Functionalities

1. Environment
- The project uses a modern development environment with Node.js as the runtime for both backend and frontend. I use TypeScrip, Javascript and TailwindCss for smooth and modern styling.
- Frontend: Built using React.js, a popular JavaScript library for building user interfaces.
- Backend: Developed using Express.js, a lightweight framework for handling API requests.
- Database: Utilizes MongoDB (via Mongoose) for storing user data, habits, categories, and achievements.
- Development Tools:
  - npm/yarn: For dependency management.
  - ESLint: For enforcing coding standards and catching potential errors during development.
  - Babel: For transpiling modern JavaScript (ES6+) into compatible versions.
2. Backend
- The backend provides RESTful APIs to handle CRUD operations for habits, categories, and user data.
 Key functionalities include:
  - Adding, updating, and deleting habits.
  - Managing habit categories.
  - Fetching user-specific data such as progress, achievements, and calendar entries.
- Routes are modularized and organized in separate files (e.g., `habitRoutes.js`, `categoryRoutes.js`).
- Example of a route implementation:
  ```javascript
  // Toggle habit completion
  router.post('/:id/complete', async (req, res) => {
    try {
      const habit = await Habit.findById(req.params.id);
      if (!habit) return res.status(404).json({ message: 'Habit not found' });

      habit.isCompletedToday = !habit.isCompletedToday;
      await habit.save();

      res.json({
        message: 'Habit toggled successfully',
        habit,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
 Example of working backend 
![Screenshot 2025-04-21 233051](https://github.com/user-attachments/assets/f97ca8a7-f0c1-4929-8865-3ea56d5aff23)



 
 
- Error Handling: Errors are caught and returned with meaningful messages to guide debugging.

---

3. Frontend
- The frontend is structured into reusable components using React's modular architecture. 
- Key components include:
  - HabitItem: Displays individual habits with details like name, category, and progress.
  - CategoryTag: Renders colored tags to visually represent habit categories.
  - ProgressBar: Visualizes progress for each habit or category.
  - SettingsPage: Allows users to manage habit categories by adding, editing, or deleting them.
- State management is implemented using **React Context** to share data (e.g., categories) across pages without prop drilling.
- Routing is handled by **React Router**, enabling seamless navigation between pages like Home, Calendar, Achievements, and Settings.
- Example of a reusable component:
  ```javascript
  const CategoryTag = ({ category }) => {
    return (
      <span
        style={{
          backgroundColor: category.color || '#ccc',
          color: '#fff',
          padding: '4px 8px',
          borderRadius: '4px',
        }}
      >
        {category.name}
      </span>
    );
  };

Example of frontend:
![Screenshot 2025-04-21 233542](https://github.com/user-attachments/assets/20958184-0590-4d24-a436-fba9aa060ffa)

 
---

4. Database
- A MongoDB database is used to store user data, habits, and categories.
- The database schema includes models for:
  - Habits: Tracks habit names, categories, completion status, and timestamps.
  - Categories: Manages habit categories with associated colors.
- Example schema for habits:
  ```javascript
  const habitSchema = new mongoose.Schema({
    name: String,
    category: String,
    isCompletedToday: { type: Boolean, default: false },
    date: Date,
  });
Example of database of my project
 ![Screenshot 2025-04-21 233433](https://github.com/user-attachments/assets/34acb1ee-1af8-4136-b53b-b9883fa99bdb)

---

5. Basic Structure and Architecture
- The project follows a client-server architecture, with clear separation between frontend and backend.
- Frontend: Communicates with the backend via HTTP requests (e.g., GET, POST, PUT, DELETE) using **Axios** or **Fetch API**.
- Backend: Provides RESTful APIs and interacts with the MongoDB database.
- Folder structure:
  ```
  habit-tracker/
  ├── src/
  │   ├── components/       # Reusable UI components
  │   ├── context/          # Global state management
  │   ├── pages/            # Page-level components
  │   ├── services/         # API calls and backend interactions
  │   └── App.js            # Main application file
  ├── backend/
  │   ├── controllers/      # Business logic for routes
  │   ├── models/           # Database schemas
  │   ├── routes/           # API routes
  │   └── server.js         # Entry point for the backend
  ```

---

6. Functionalities
- Habit Management:
  - Users can add, update, and delete habits.
  - Each habit is associated with a category and progress tracking.
- Category Management:
  - Users can create, edit, and delete habit categories with custom colors.
  - Categories dynamically appear on the Home page and other relevant sections.
- Calendar View:
  - Displays habits and their completion status over time.
  - Provides filters to view habits by category or date range.
- Achievements:
  - Tracks user milestones and rewards based on habit completion.
- Settings:
  - Allows users to customize their experience by managing categories and preferences.

---

7. Code Quality and Documentation
- Code quality is maintained through consistent formatting, meaningful variable names, and adherence to best practices.
- ESLint is configured to enforce coding standards and catch potential errors during development.
- Inline comments and documentation are added to explain complex logic and component functionality.
- Example of well-documented code:
  ```javascript
  // Toggle habit completion status
  const handleToggleComplete = async () => {
    if (isCompleting) return; // Prevent multiple clicks

    try {
      setIsCompleting(true); // Show loading state
      const response = await api.toggleHabit(habit._id);
      if (onToggleComplete) {
        onToggleComplete(habit._id); // Update parent state
      }
    } catch (error) {
      console.error('Error toggling habit completion:', error);
    } finally {
      setIsCompleting(false); // Reset loading state
    }
  };
  ```
- A README file is provided, detailing setup instructions, project structure, and key features.

---

8. Testing and Error Handling
- Unit tests are written for critical components and functions using frameworks like **Jest** or **React Testing Library**.
- Error handling is implemented to gracefully manage API failures, invalid inputs, and unexpected states.
- Example of error handling in API calls:
  ```javascript
  try {
    const response = await api.toggleHabit(habit._id);
    if (response.status === 200) {
      console.log('Habit toggled successfully');
    }
  } catch (error) {
    console.error('Failed to toggle habit:', error.message);
  }
  ```
- User-friendly error messages are displayed to guide users in case of issues (e.g., "Failed to fetch data. Please try again later.").

---

9. User Interface and Interaction
- The UI is designed to be intuitive and visually appealing, with a focus on usability.
- Key design principles include:
  - Consistency: Uniform styling for buttons, cards, and other elements.
  - Responsiveness: The layout adapts seamlessly to different screen sizes (desktop, tablet, mobile).
  - Accessibility: Proper use of semantic HTML and ARIA attributes ensures accessibility for all users.
- Interactive elements like buttons, modals, and dropdowns provide immediate feedback to enhance user engagement.
- Example of UI styling:
   javascript
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    marginBottom: '8px',
    backgroundColor: habit.isCompletedToday ? '#f0fff0' : '#fff',
  };
  ```

Conclusion
The project has successfully implemented a basic structure and main functionalities for a habit-tracking application. The modular architecture, reusable components, and global state management ensure scalability and maintainability. Future work will focus on enhancing features (e.g., analytics, notifications), improving performance, and refining the user experience.

