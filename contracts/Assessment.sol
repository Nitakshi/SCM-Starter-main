// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Assessment {
    // Define state variables
    address public owner;
    uint256 public totalCredits;
    uint256 public totalGradePoints;

    // Grading system
    enum Grade { A, B, C, D, F }
    
    struct Course {
        string courseName;
        uint256 credits;
        Grade grade;
    }
    
    Course[] public courses;

    // Events
    event CourseAdded(string courseName, uint256 credits, Grade grade);
    event GPACalculated(uint256 gpa);

    // Mapping for grade points
    mapping(Grade => uint256) public gradePoints;

    constructor() {
        owner = msg.sender;
        // Initialize grade points mapping
        gradePoints[Grade.A] = 400; // A = 4.00 points
        gradePoints[Grade.B] = 300; // B = 3.00 points
        gradePoints[Grade.C] = 200; // C = 2.00 points
        gradePoints[Grade.D] = 100; // D = 1.00 point
        gradePoints[Grade.F] = 0;   // F = 0 points
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    // Function to add a course with credits and grade
    function addCourse(string memory _courseName, uint256 _credits, Grade _grade) public onlyOwner {
        courses.push(Course({
            courseName: _courseName,
            credits: _credits,
            grade: _grade
        }));
        
        // Update totals
        totalCredits += _credits;
        totalGradePoints += _credits * gradePoints[_grade];
        
        emit CourseAdded(_courseName, _credits, _grade);
    }

    // Function to calculate GPA
    function calculateGPA() public view returns (uint256 gpa) {
        require(totalCredits > 0, "No credits added");
        gpa = totalGradePoints / totalCredits;
        return gpa;
    }

    // Function to get GPA with event
    function getGPA() public {
        uint256 gpa = calculateGPA();
        emit GPACalculated(gpa);
    }

    // Function to get the number of courses added
    function getNumberOfCourses() public view returns (uint256) {
        return courses.length;
    }
}
