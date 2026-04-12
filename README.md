# FinTrack - Personal Finance Dashboard

A responsive, interactive personal finance dashboard built with React and Chakra UI. This project demonstrates dynamic state management, data visualization, and role-based access control.

## 🚀 Features & Assignment Criteria Met

- **Dynamic Visualizations (Requirement 1):** Integrates `recharts` for a historical Balance Trend (Line Chart) and a categorical Current Expenses breakdown (Donut Chart). Charts update instantly when data changes.
- **Interactivity (Requirement 2):** Includes a functional search bar to filter transactions by merchant name, and a dropdown to filter by category.
- **Role-Based UI (Requirement 3):** Features a toggleable "Viewer" and "Admin" state. The "+ Add Transaction" button and table delete actions are strictly protected and only render for Admins.
- **Responsive Layout (Requirement 4):** Built mobile-first using Chakra UI's Flexbox system. The layout gracefully stacks into a single column on smaller screens, preventing chart collapse and horizontal scrolling.
- **State Management (Requirement 5):** Uses a centralized React state approach (`useState`) at the top level to act as a single source of truth. Derived data (total balance, highest expense) is calculated on the fly, ensuring the summary cards, charts, and tables never fall out of sync.
- **Bonus Feature:** Full Dark/Light mode support implemented via Chakra UI's native color mode hook.

## 🛠️ Tech Stack

- **Core:** React.js
- **Styling & UI Components:** Chakra UI (v3)
- **Data Visualization:** Recharts
- **Icons/Emojis:** Native OS Emojis (for zero-dependency fast loading)


# FinTrack - Personal Finance Dashboard

A responsive, interactive personal finance dashboard built with React and Chakra UI. This project demonstrates dynamic state management, data visualization, and role-based access control.

## 🚀 Features & Assignment Criteria Met

- **Dynamic Visualizations (Requirement 1):** Integrates `recharts` for a historical Balance Trend (Line Chart) and a categorical Current Expenses breakdown (Donut Chart). Charts update instantly when data changes.
- **Interactivity (Requirement 2):** Includes a functional search bar to filter transactions by merchant name, and a dropdown to filter by category.
- **Role-Based UI (Requirement 3):** Features a toggleable "Viewer" and "Admin" state. The "+ Add Transaction" button and table delete actions are strictly protected and only render for Admins.
- **Responsive Layout (Requirement 4):** Built mobile-first using Chakra UI's Flexbox system. The layout gracefully stacks into a single column on smaller screens, preventing chart collapse and horizontal scrolling.
- **State Management (Requirement 5):** Uses a centralized React state approach (`useState`) at the top level to act as a single source of truth. Derived data (total balance, highest expense) is calculated on the fly, ensuring the summary cards, charts, and tables never fall out of sync.
- **Bonus Feature:** Full Dark/Light mode support implemented via Chakra UI's native color mode hook.

## 🛠️ Tech Stack

- **Core:** React.js
- **Styling & UI Components:** Chakra UI (v3)
- **Data Visualization:** Recharts
- **Icons/Emojis:** Native OS Emojis (for zero-dependency fast loading)

## 📦 Running the Project Locally

1. **Clone the repository:**

   ```bash
   git clone [your-repo-link-here]

   ```

2. Navigate to the directory:

   ```Bash
   cd [your-folder-name]

   ```

3. Install dependencies:

   ```Bash
   npm install

   ```

4. Start the development server:

   ```Bash
   npm run dev
   ```

🏗️ Architecture Notes
To fulfill the assignment's state management requirement efficiently without over-engineering, this application utilizes Prop-Drilling / Simple State.

The core mock data (transactions) and user session data (role) are initialized in App.jsx. Action handlers (addTransaction, deleteTransaction) and derived calculations (e.g., total income) are passed down directly to the modular components (ChartsSection, TransactionsTable, SummaryCards). This keeps the data flow unidirectional, predictable, and easy to trace.
