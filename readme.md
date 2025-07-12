## Slick Retirement Calculator
A modern, responsive, and interactive web application for calculating retirement savings. This tool allows users to project their future nest egg based on their current financial situation and see if they are on track to meet their retirement income goals.

### ✨ Features
Interactive Inputs: Easy-to-use form with sliders and number inputs for all key variables.

Dynamic Calculations: Results update in real-time as you adjust the 'Annual Rate of Return' slider.

Multi-Currency Support: Select between ZAR (default), USD, EUR, and GBP, with all results formatted correctly.

Visual Feedback: A dynamic bar chart from Chart.js provides a clear visual comparison of your projected savings versus your target.

Contextual Information: An info-tooltip explains the 4% Rule used to calculate the target nest egg.

Responsive Design: A clean, modern dark theme that looks great on both desktop and mobile devices.

### 🛠️ Technologies Used
HTML5: For the structure and content of the application.

CSS3: For all styling, including the dark theme, responsive layout (Flexbox/Grid), and animations.

JavaScript (ES6+): For all logic, including financial calculations, DOM manipulation, and event handling.

Chart.js: A third-party library used to render the visual results chart.

## 🚀 How to Use
To run this project locally, follow these simple steps:

Clone the repository:

Bash

git clone https://github.com/your-username/retirement-calculator.git
Navigate to the project directory:

Bash

cd retirement-calculator
Open the index.html file in your web browser. No local server or dependencies are needed.

## 🧠 Core Logic Explained
The calculator's projections are based on two standard financial formulas:

Future Value (FV) of a Series: This calculates the projected nest egg at retirement. The formula accounts for your current savings (principal), regular monthly contributions, and compound interest over time.

Future Value (FV) = P * (1 + r)^n + PMT * [((1 + r)^n - 1) / r]
​
 
The 4% Rule: This is a common guideline used to estimate the total savings needed for retirement. It suggests you need a nest egg large enough to allow you to withdraw 4% of it annually to cover your living expenses.

Target Nest Egg = Desired Annual Income / 0.04​
 
📁 File Structure
The project is organized into a clean and straightforward structure:

/retirement-calculator
|-- index.html          # Main HTML file
|-- css/
|   |-- style.css       # All styles for the application
|-- js/
    |-- app.js          # All JavaScript logic
|-- README.md           # Project information