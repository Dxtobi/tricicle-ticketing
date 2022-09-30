import React,{useEffect, useState} from 'react';
//import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import transfer from '../../api/api';
import jwt_decode from 'jwt-decode';
import './profile.css'
import { Link } from 'react-router-dom';

const Profile = () => {
const [_data, set_data] = useState([])
    useEffect(() => {

        try {
            const token = sessionStorage.getItem("token");
            const decoded = jwt_decode(token);
            console.log(token)
            async function callDb() {
                const res = await transfer.get('/api/allpayment/' + decoded.email)
                let alld = res.data
                alld.reverse()
                set_data(alld)
                console.log(alld)
            }
        callDb()
        } catch (error) {
            console.log(error)
        }



    
    },[])
   
    return (
        <div className='ticket_page'>
            
            <div className='back-btn'><Link  className='linkticket' to='/landing'>Home</Link></div>
            <div className='tic-dic'>My Tickets</div>
            <div className='ticket'>
                
                {
                    _data.map((e, i) => {
                        return (<div key={i} className='ticket__'>
                            <div className='ticket_header'>TICKET {i+1}</div>
                            <div className='ticket_NAME'><div>TICKET ID ------</div> <div>{e.tid}</div></div>
                            <div className='ticket_NAME'><div>FROM ------ </div><div>{e.from}</div></div>
                            <div className='ticket_NAME'><div>TO ------ </div><div>{e.to}</div></div>
                            <div className='ticket_NAME'><div>NO. OF SEAT ------ </div><div>{e.amount}</div></div>
                            <div className='ticket_NAME'><div>PAID</div><div>NGN{e.paid}</div></div>
                            <div className='ticket_NAME'><div>DATE: ----- </div><div>{e.date}</div></div>
                        </div>)
                    })
                }
            </div>
        </div>
    );
};

export default Profile;