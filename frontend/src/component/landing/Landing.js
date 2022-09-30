import React,{useState, useRef, useEffect} from 'react';
//import Payment from '../payment/Payment';
import jwt_decode from 'jwt-decode';
import './landing.css';
import { PaystackButton } from 'react-paystack'
import transfer from '../../api/api';
//import { Link } from 'react-router-dom';


const Landing = ({history}) => {
    //const [tab, setTab] = useState(1)
    const [date, handleDate] = useState('')
    const [from, handleFrom] = useState('');
    const [to, handleTo] = useState('');
    const [amount, handlAmount] = useState('');
    const [error, handlError] = useState('');
    const [decoded, setDecode] = useState({});
    const [next, handleNext] = useState(false);
    const [paid, handlePaid] = useState(false);
    const this_ref = useRef();
    const first_ref = useRef();
    const email = 'akanbijosephtobi@gmail.com', name='FPB';
    const phone = '090444444444'
    const publicKey = "pk_test_c3b98ef69cbcea70a72c5c36c158cd6f11f1ae1f"

    useEffect(() => {
       try {
        const token=sessionStorage.getItem("token")
           const decoded = jwt_decode(token)
           setDecode(decoded)
        console.log(decoded)
       } catch (error) {
        console.log(error)
       }

    }, []);
    useEffect(() => {
        if (paid) {
            setTimeout(() => {
                handlePaid(false)
                window.location.reload()
            }, 3000);
        }
//RESET ALL INPUT
        handleDate('');
        handleFrom('');
        handleTo('');
        handlAmount('');
        handlError('');
        handleNext(false);
        first_ref.current.scrollIntoView();
        
    }, [paid]);

//SCROLE BACK TO THE TOP  AFTER PAYMENT

   // console.log(sessionStorage.getItem('token'))
   
//HANDLE SUBMIT
    const handleSub = (e) => {
        handlError('');
        const alldata = { date, from, to, amount }
        if (date===''||from===''||to===''||amount==='') {
            return handlError('All fields are necessary');
        }
        if (from===to) {
            return handlError('Invalid Entry');
        }
       // console.log(alldata)
        handleNext(true)
        //
        //SCROLE TO THE NEXT STEP (DIV)
        this_ref.current.scrollIntoView()
    }

    const ticketSold = (e) => {

        console.log(e)
        
        handlePaid(true);
        const data = {
            name: decoded.name,
            email:decoded.email,
            tid: e.trans,
            from: from,
            to: to,
            amount: amount,
            paid: parseInt(amount) * 40,
            date:date
           // user:decoded._id
        }

        try {
            transfer.post('/api/newPaymentInfo', data);
        } catch (error) {
            console.log(error)
        }
    }

    const ticketSoldFake = (e) => {

       // console.log(e)
        
        handlePaid(true);
        const data = {
            name: decoded.name,
            email:decoded.email,
            tid: 'fake-AUXI100',
            from: from,
            to: to,
            date:date,
            amount: amount,
            paid: parseInt(amount) * 40,
           // user:decoded._id
        }

        try {
            transfer.post('/api/newPaymentInfo', data);
        } catch (error) {
            console.log(error)
        }
    }

    const componentProps = {
        email:email,//decoded.email,
        amount:parseInt(amount)*(40*100),
        metadata: {
          name:decoded.name,
          phone,
        },
        publicKey,
        text: "MAKE PAYMENT",
        onSuccess: (e) =>{
            alert("Thanks for doing business with us! Come back soon!!");
            ticketSold(e)
        },
        onClose: () => alert("Wait! Don't leave :("),
    }

    
    return (
        <div className='landing'>
            {paid&&<div className='alart'>You Have Successfully Purchased This Ticket</div>}
            
            <br />
            <br/>
            <div ref={first_ref} className='form-holder'>
                <h3>Book Ticket</h3>
                <div className='form__'>
                    <br/>
                    <label>FROM</label>
                    <br/>
                    <select className="form-control_"  id="exampleFormControlSelect1" onClick={e=>{handleFrom(e.target.value); handlError('');}}>
                        <option>-----</option>
                        <option>SMALL GATE</option>
                        <option>BIG GATE</option>
                        <option>SAAS</option>
                        <option>NCC</option>
                        <option>COMPUTER SCIENCE</option>
                        <option>ADMIN BLOCK</option>
                    </select>
                    <div className='divider'></div>


                    <label>To</label>
                    <br/>
                    <select className="form-control_" id="exampleFormControlSelect1" onClick={e => { handleTo(e.target.value); handlError('');}}>
                        <option>-----</option>
                        <option>SMALL GATE</option>
                        <option>BIG GATE</option>
                        <option>SAAS</option>
                        <option>NCC</option>
                        <option>COMPUTER SCIENCE</option>
                        <option>ADMIN BLOCK</option>
                    </select>

                    <div className='divider'></div>
                    <div>
                    <label htmlFor="doj">NUMBER OF SEAT</label>
                        <div>
                            <input className="form-control_" type="number" id="doj" name="amount" onChange={e => { handlAmount(e.target.value); handlError('');}} />
                        </div>
                        </div>

                    <div className='divider'></div>
                    <div>
                    <label htmlFor="doj">DATE</label>
                        <div>
                            <input className="form-control_" type="date" id="doj" name="doj" onChange={e => { handleDate(e.target.value); handlError('');}} /></div>
                        </div>
                </div>
                {error !== '' && <div className='error-div'>{error }</div>}

                <button className="form-control_btn " onClick={handleSub}>NEXT</button>
            </div>
            <div className='make-payment' ref={this_ref}>
            { next && <div>
                    <h3 style={{ textAlign: 'center' }}>PROCEED PAYMENT</h3>

                    {
                        //<button onClick={ticketSoldFake} className="form-control_btn "> TEST PAYMENT</button>
                    }
                    {
                        <PaystackButton className="form-control_btn " {...componentProps} />
                    }
            </div>}
            </div>
        </div>
    );
};

export default Landing;