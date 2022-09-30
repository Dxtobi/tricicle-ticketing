import React,{useState, useEffect} from 'react';
import signIn from '../../api/api'
import './SignIn.css';
import SignUp from '../SignUp/SignUp';

const SignIn = ({ history }) => {
    const token=sessionStorage.getItem("token")
    useEffect(() => {
      if (token) {
        window.location.replace('/landing')
      }
    }, [token])
    
    const [details,setDetails]=useState({
        email:"",
        passowrd:'',
    })
    const [data, setData] = useState('')
    const [signup,setSignup]=useState(false)
    const [pswd,setPswd]=useState('')
    const [error,setError]=useState('')
    
    //Validating email

    const handleEmail=(e)=>{
        e.preventDefault(e)
        const value=e.target.value
        if(!value){
            return (setData('Email is required'))
        }
        if(value){
            let lastAtPos = value.lastIndexOf('@');
            let lastDotPos = value.lastIndexOf('.');
 
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && value.indexOf('@@') === -1)) {
               return setData("Email is not valid");
             }
             else{
                setDetails(prevState=>({
                    ...prevState,
                    email:value
                }))
                setError('')
                return(setData(""))
            }
        }
        
    }
    
    //Validating Password

    const handlePswd=(e)=>{
        e.preventDefault();
        const value=e.target.value
        if(!value){
            return (setPswd('Password is required'))
        }
        if(value){
            let minNumberofChars = 5;
            let maxNumberofChars = 15;
            let regularExpression  = /^[a-zA-Z0-9!@#$%^&*]{5,15}$/;
                if(value.length < minNumberofChars || value.length > maxNumberofChars){
                    return (setPswd("Provide password between 5 to 15 characters"))
                }
                else if(!regularExpression.test(value)) {
                return(setPswd(`Use atleast a number and a special character`));
                }
                else{
                    setDetails(prevState=>({
                        ...prevState,
                        password:value
                    }))
                    setError('')
                    return(setPswd(""))
                }
        }
    }

    //Handle Sumbit Details
    
    const handleSubmit=async (e)=>{
       e.preventDefault()
            try{
                let response=await signIn.post('/api/login',{
                    email:details.email,
                    password:details.password
                })
                if (response.data.status === false) {
                    console.log(response.data)
                    setError("Incorrect Email or Password")
                }else{
                    console.log(response)
                    sessionStorage.setItem("token",response.data)
                    history.push('/landing')
                    setError('')
                    
            }
    }
    catch(err){
        console.log(err)
    }
    }

    if (signup) {
        return <SignUp setSignup={setSignup} signup={ signup} />
    }
    return (
        <div className="format">
            <div className="signin">
                <br/>
             <h4>Sign-In</h4>
            <form onSubmit={e=>handleSubmit(e)}>
                <div>
                    <input className='my-input' type="email" placeholder="E-mail"  name="email" onBlur={e=>handleEmail(e)} /><br/>
                    <div style={{color: "red"}}>{data}</div>
                </div>
                <div>
                    <input className='my-input' type="password" placeholder="Password" name="password" onBlur={e=>handlePswd(e)} />
                    <div style={{color: "red"}}>{pswd}</div>
                    </div>

                    <br/>
                    <button type="submit" className="my-input">Sign-In</button>
                    <br />
                    <div>OR</div>
                    <br/>
                    <button className='my-input' onClick={()=>setSignup(!signup)}> GO TO REGISTER</button>
                    <br/>
                <span>{error}</span>
            </form>
        </div>
       
        </div>

    );
};

export default SignIn;