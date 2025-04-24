### Improvements of some features:


#### 1. **Improved UI/UX Design**
> *Why*: The original version had a basic interface. Improving the layout, colors, icons, and responsiveness makes it more user-friendly and professional.

- **What to improve**:  
  - Modern card layout for each habit  
  - Smooth button animations, hover effects  
  - Responsive design for mobile view  
  - Improved color contrast for accessibility

#### 2. **Persistent Habit Completion (Daily Log)**
> *Why*: Originally, habits were just static items. Now we can improve by **logging each day’s completion history** (e.g., track if a habit was completed on April 10, 11, 12…).

- **What to improve**:  
  - Create a `habit_logs` table in the database  
  - Store each day's completed status  
  - Show a calendar-like UI or history below each habit

#### 3. **Better Error Handling & Validation**
>*Why*: Original version may allow blank submissions or crash silently. Improving error messages and validation improves stability and user experience.

- **What to improve**:  
  - Frontend: Show "Please enter a habit" message  
  - Backend: Return clear error responses (400 Bad Request)  
  - Prevent duplicate habits or blank fields

#### 5. **Improved CRUD Feedback and State Handling**
> *Why*: The original app might not reflect changes instantly or reload everything inefficiently.

- **What to improve**:  
  - Optimistic UI updates  
  - Show loading indicators  
  - Use `useReducer()` or better state management instead of multiple `useState()` calls

### ✅ Example Improvement You Can Submit:

**Chosen Improvement**: *Improved UI/UX Design*

**Reason**: The first version of the app had a minimal interface that wasn’t visually engaging. I improved the design to provide a cleaner layout, responsive behavior, and modern styling.

**Technical Changes**:
- Added Tailwind CSS (or custom CSS)
- Created reusable styled components (`HabitCard`, `AddHabitForm`)
- Used icons and badges for a visually appealing experience

**Challenges**:
- Making the layout responsive while keeping it clean
- Managing dynamic CSS classes with React states
