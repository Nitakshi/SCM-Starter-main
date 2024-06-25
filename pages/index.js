import { useState, useEffect } from "react";
import { ethers } from "ethers";
import assessmentAbi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [assessment, setAssessment] = useState(undefined);
  const [totalCourses, setTotalCourses] = useState(undefined);
  const [gpa, setGpa] = useState(undefined);

  const [courseName, setCourseName] = useState("");
  const [courseCredits, setCourseCredits] = useState(0);
  const [courseGrade, setCourseGrade] = useState("A");

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Update this to your contract address
  const assessmentABI = assessmentAbi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts.length > 0) {
      console.log("Account connected: ", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // once wallet is set we can get a reference to our deployed contract
    getAssessmentContract();
  };

  const getAssessmentContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const assessmentContract = new ethers.Contract(contractAddress, assessmentABI, signer);

    setAssessment(assessmentContract);
  };

  const getTotalCourses = async () => {
    if (assessment) {
      setTotalCourses((await assessment.getNumberOfCourses()).toNumber());
    }
  };

  const addCourse = async () => {
    if (assessment) {
      const gradeEnum = { A: 0, B: 1, C: 2, D: 3, F: 4 };
      let tx = await assessment.addCourse(courseName, courseCredits, gradeEnum[courseGrade]);
      await tx.wait();
      getTotalCourses();
    }
  };

  const getGpa = async () => {
    if (assessment) {
      const gpaResult = await assessment.calculateGPA();
      setGpa(gpaResult.toNumber() / 100); // GPA is returned with two decimal precision
    }
  };

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install MetaMask to use this DApp.</p>;
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}  style={{
        margin:'20px',
        backgroundColor: 'white', 
        color: 'black', 
        padding: '10px 10px', 
        border: 'none', 
        borderRadius: '4px', 
        cursor: 'pointer', 
        fontSize: '16px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' 
      }}>Connect MetaMask Wallet</button>;
    }

    if (totalCourses == undefined) {
      getTotalCourses();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p style={{color:'white'}}>Total Courses: {totalCourses}</p>
        <p>Your GPA: {gpa !== undefined ? gpa.toFixed(2) : "N/A"}</p>

        <div>
          <h3 style={{backgroundColor:'#023020', fontWeight:'500', width:'10vw',marginLeft:'190px',textAlign:'center'}}>Add a Course</h3>
          <input style={{margin:'10px'}}
            type="text"
            placeholder="Course Name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Credits"
            value={courseCredits}
            onChange={(e) => setCourseCredits(Number(e.target.value))}
          />
          <select style={{margin:'10px'}}
            value={courseGrade}
            onChange={(e) => setCourseGrade(e.target.value)}
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="F">F</option>
          </select>
          <button onClick={addCourse} style={{ backgroundColor: 'grey', color: 'white', padding: '5px', borderRadius: '5px', cursor: 'pointer' }}>Add Course</button>
        </div>
        <button onClick={getGpa} style={{background: 'grey',color: 'white', padding: '8px', margin:'20px',borderRadius:'5px'}}>Get GPA</button>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Welcome to the Assessment DApp!</h1>
      </header>
      {initUser()}
      <style jsx>{`
        h1{
               font-family: Arial, Helvetica, sans-serif;
        }
        .container {
          width:550px;
          margin:40px;
          box-shadow:
          inset 0 -3em 3em rgb(0 200 0 / 30%),
          0 0 0 2px white,
          0.3em 0.3em 1em rgb(200 0 0 / 60%);
          text-align: center;
          padding: 25px;
        }
          :global(body){
            color:white;
            background: black;
            display:flex;
            justify-content:center;
          }
      `}</style>
    </main>
  );
}
