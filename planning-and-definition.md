## Project Phase 1 - Definition and Planning

Project Name: Habit Tracker Web App, the application allow users to tracker their daily habits. 
              the application offers to the user a streack mode to keep them motivated and productive.
              
Technologies: JavaScript, Node.js, Express.js, React, SQLite  
## 1. User Personas

Primary User: The Busy Professional
- Name: Alex  
- Age:28  
- Occupation: Software Developer  
- Goals:
  - Track daily habits (work, fitness, learning)  
  - Monitor progress over time  
  - Stay motivated with achievements  
- Pain Points:  
  - Forgets to track habits manually  
  - Needs a simple, visual way to see progress  

 Secondary User: The student
- Name: Jamie  
- Age: 21  
- Occupation: College Student  
- Goals:
  - Build study routines  
  - Track personal habits (reading, exercise)  
- Pain Points:
  - Needs reminders and streaks for motivation  

## 2. Use Cases and User Flows
Core Use Cases
1.Add a New Habit 
   - User → Opens app → Clicks "Add Habit" → Enters name & category → Saves  
2. Mark Habit as Complete  
   - User → Opens dashboard → Checks habit checkbox → System logs completion  
3. View Monthly Progress
   - User → Navigates to Calendar → Sees color-coded habit completion  
4.Unlock Achievements
   - User → Completes 3-day streak → System awards "On a Roll" badge  

## User Flow Diagram (Simplified)
Login → Dashboard → [Add Habit / Mark Complete]  
                → Calendar View  
                → Achievements  
                → Settings  

## 3. UI Prototypes (Wireframes)
link of the prototype: https://www.figma.com/proto/tAbEsnK1vuQZC8WqFBmaum/Untitled?page-id=0%3A1&node-id=1-2&p=f&viewport=237%2C-38%2C0.65&t=PZsk98uBiTZ79NiK-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A2

Dashboard (Main Screen)
- Header: "Today’s Progress: 100%" (progress bar)  
- Habit List:Checkboxes for each habit (e.g., "Workout: ☑")  
- Quick Actions: "Add Habit" button, "View Calendar" link  


Calendar View
- Monthly grid (like screenshot)  
- Color-coded days (green = completed, red = missed)  

Achievements Page 
- Badges with lock/unlock status  
- Progress toward next achievement  

## 4. Information Architecture & Technical Design
Frontend Structure (React)  
- Components:
  - `Dashboard.jsx` (Main view)  
  - `CalendarView.jsx` (Grid layout)  
  - `HabitList.jsx` (Checkbox list)  
  - `Achievements.jsx` (Badges display)  

## Backend Structure (Node.js + Express)
- API Endpoints:
  - `GET /habits` → Fetch user habits  
  - `POST /habits` → Add new habit  
  - `PUT /habits/:id/log` → Update completion status  

## Database (SQLite)
- Tables: `users`, `habits`, `habit_logs`, `achievements`  

Data Flow
1. User marks habit complete → Frontend sends `PUT` request  
2. Backend updates SQLite → Returns success/failure  
3. Frontend refreshes UI  

## 5. User Testing  
 Testing Plan
1. Manual Testing:
   - Add/mark habits → Verify DB updates  
   - Test streak calculations  
2. User Feedback:  
   - Give prototype to 2 users → Observe usability  
   - Adjust UI based on feedback (eg, button placement)  
3- unit test: later on

## Tools  
- word/ Trello → Task tracking  
- Figma → UI prototype  
link of the prototype: https://www.figma.com/proto/tAbEsnK1vuQZC8WqFBmaum/Untitled?page-id=0%3A1&node-id=1-2&p=f&viewport=237%2C-38%2C0.65&t=PZsk98uBiTZ79NiK-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A2

## Next Steps After Planning Phase
1. Set up Git repo.  
2. Build MVP (Minimum Viable Product) with core features first.
3. start working on code.  
