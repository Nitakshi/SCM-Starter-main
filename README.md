# Project Title

Integrating Smart Contract

## Description

This project contains a Solidity smart contract for managing an academic assessment system. The contract allows the owner to add courses with associated credits and grades, and calculate the GPA (Grade Point Average) based on the added courses.

### Features

#### Assessment.sol

- `address public owner`: The owner of the contract.
  
- `uint256 public totalCredits`: Total number of credits added.
  
- `uint256 public totalGradePoints`: Total grade points accumulated.
  
- `function addCourse(string memory _courseName, uint256 _credits, Grade _grade)`: Adds a course with specified credits and grade.
  
- `function calculateGPA()`: Calculates the GPA.
  
- `function getGPA()`: Emits the GPA calculation event.
  
- `function getNumberOfCourses()`: Returns the number of courses added.
  
## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
  
- [Hardhat](https://hardhat.org/)

### Executing program

To run this project locally, follow these steps:

- Clone the repository

  `https://github.com/Nitakshi/SCM-Starter-main.git`
  
- Install the necessary dependencies:
  
  `npm i`
  
- In the second terminal, run the local Hardhat node:
  
  `npx hardhat node`
  
- In the third terminal, deploy the contract on a local Hardhat network:
  
  `npx hardhat run --network localhost scripts/deploy.js`
  
- Start the front-end application:

  `npm run dev`

- After completing the steps above, the project should be running on your local machine. You can typically access it at http://localhost:3000/.

-  Connect your MetaMask wallet. Add course name, credit and obtained grade. Click on 'Add course' button and then click on 'Get GPA' button to get calculated GPA.

## Author

Metacrafter Student Nitakshi Azad

## License

This project is licensed under the MIT License.





