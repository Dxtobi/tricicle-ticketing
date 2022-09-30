import React,{useState} from 'react';
import './SignUp.css';
import signUp from '../../api/api';

const SignUp = ({signup,setSignup}) => {
    const[details,setDetails]=useState({
        name:'',
        email:'',
        phNumber:'',
        password:'',
        dateOfBirth:'',
        gender:'',
    })
    const [name,setName]=useState('')
    const [data,setData] =useState('')
    const [phNumber,setPhNumber] =useState('')
    const [pswd,setPswd] =useState('')
    const [dob,setDob]=useState('')
    const [response,setResponse] =useState('')
    
    //Name Validation

    const handleName=(e)=>{
        e.preventDefault()
        let value=e.target.value
        if(!value){
            return(setName("Name is Required"))
        }else{
            setDetails(prevState=>({
                ...prevState,
                name:value
            }))
            return(setName(""))
        }
        
    }

    //Email Validation

    const handleEmail=(e)=>{
        e.preventDefault()
        let value=e.target.value
        if(!value){
            return (setData('Email is required'))
        }
        if(value){
            let lastAtPos = value.lastIndexOf('@');
            let lastDotPos = value.lastIndexOf('.');
 
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && value.indexOf('@@') === -1)) {
               return setData("Invalid Email");
             }
             else{
                setDetails(prevState=>({
                    ...prevState,
                    email:value
                }))
                return(setData(""))
                
            }
        }
    }
    
    //Mobile number validation
    
    const handlePh=(e)=>{
        const value=e.target.value
        if(!value){
            return(setPhNumber("Mobile No is Required"))
        }
        if(value){
                const value=e.target.value
                setDetails(prevState=>({
                    ...prevState,
                    phNumber:value
                }))
                console.log(details.phNumber)
                return(setPhNumber(""))
        }
    }

    //Password validation

    const handlePswd=(e)=>{
        e.preventDefault()
        const value=e.target.value
        if(!value){
            return (setPswd('Password is required'))
        }
        if(value){
            let minNumberofChars = 5;
            let maxNumberofChars = 15;
            let regularExpression  = /^[a-zA-Z0-9!@#$%^&*]{5,15}$/;
                if(value.length < minNumberofChars || value.length > maxNumberofChars){
                    return (setPswd("Provide Password between 5 to 15 characters"))
                }
                else if(!regularExpression.test(value)) {
                return(setPswd(`Include a number and a special character`));
                }
                else{
                    setDetails(prevState=>({
                        ...prevState,
                        password:value
                    }))
                    return(setPswd(""))
                    
                }
        }
    }

    //DateOfBirth validation

    

    //Handle Submit
    
    const handleSubmit= async(e)=>{
        e.preventDefault()
        try{
            let response=await signUp.post("/api/register",{
                name:details.name,
                email:details.email,
                phNumber:details.phNumber,
                password:details.password,
               // dateOfBirth:details.dateOfBirth,
               // gender: details.gender,
            })
            if (response.status === 200) {
                window.location.reload()
                setDetails({
                    name:'',
                    email:'',
                    phNumber:'',
                    password:'',
                    dateOfBirth:'',
                    gender:'',
                })
                setResponse(response.data.message)
                setSignup(!signup)
                console.log(response)
            }
        }
        catch(err){
            console.log('-----', err)
        }
    }

    return (
        <div className='format'>
              <div className="signin">
             <form onSubmit={e=>handleSubmit(e)}>
                <div className="top">
                <br/>
                    <h4>Dont have an Account, Register!!</h4>
                    <br/>
                    <input type="text" className='my-input' placeholder="Name" onBlur={e => handleName(e)} />
                    <div style={{color: "red"}}>{name}</div>
                    <br/>
                    <input type="email" className='my-input' placeholder="Email" onBlur={e => handleEmail(e)} />
                    <div style={{color: "red"}}>{data}</div>
                    <br/>
                    <input type="tel" className='my-input' placeholder="Mobile No" onBlur={e => handlePh(e)} />
                    <div style={{color: "red"}}>{phNumber}</div>
                    <br/>
                    <input type="password" className='my-input' placeholder="Password" onBlur={e => handlePswd(e)} />
                    <div style={{ color: "red" }}>{pswd}</div>
                    <br/>
                        <button type="submit" className='my-input' onClick={(e) => {
                            setSignup(!signup)
                            handleSubmit(e)
                        }}>REGISTER</button>
                </div>
               
                <div>OR</div>
               
                 <button    className='my-input'>Login</button>
             <div style={{color:"cyan"}}><h4>{response}</h4></div>
             </form>
        </div>
      </div>
    );
};

export default SignUp;