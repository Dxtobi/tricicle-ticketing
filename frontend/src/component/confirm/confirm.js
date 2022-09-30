import React,{ useState} from 'react';
import 'react-responsive-modal/styles.css';
import transfer from '../../api/api';
//import jwt_decode from 'jwt-decode';
//import { Link } from 'react-router-dom';

const SearchConfirm = () => {
const [_data, set_data] = useState(null)
    const [search, changeSearch] = useState('')
    const [datec, setDate] = useState(false)
    const searchValue = () => {
        try {
            console.log(search)
            async function callDb() {
                const res = await transfer.get('/api/get-value/' + search)
                let alld = res.data
                set_data(alld)
                const d = new Date(), od = new Date(alld.date)
                let dm = d.getMonth(), dd = d.getDate()
                let odm = od.getMonth(), odd = od.getDate()
                if (dm !== odm || dd !== odd) {
                    setDate(true)
                }
               // console.log( dm, dd, odm, odd)
            }
        callDb()
        } catch (error) {
            console.log(error)
        }
    }

    const confirmTicket = (id) => {
        try {
            async function callDb() {
                const res = await transfer.post('/api/confirm-ticket/' + id)
                set_data(res.data)
                console.log(res)
            }
        callDb()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='ticket_page'>
            <div className='testdiv'>
                <h3 style={{textAlign:'center'}}>SEARCH TICKET</h3>
                <input type='search' className='search-input' value={search} onChange={(e) => changeSearch(e.target.value)} />

                <button onClick={searchValue} className='search-input-btn'>SEARCH</button>
            </div>
            {
                _data !== null && <div className='ticket'>
                        <div  className='ticket__'>
                            <div className='ticket_header'>TICKET </div>
                            <div className='ticket_NAME'><div>TICKET ID ------</div> <div>{_data.tid}</div></div>
                            <div className='ticket_NAME'><div>FROM ------ </div><div>{_data.from}</div></div>
                            <div className='ticket_NAME'><div>TO ------ </div><div>{_data.to}</div></div>
                            <div className='ticket_NAME'><div>NO. OF SEAT ------ </div><div>{_data.amount}</div></div>
                            <div className='ticket_NAME'><div>PAID ------ </div><div>NGN{_data.paid}</div></div>
                            <div className='ticket_NAME'><div>DATE: ----- </div><div>{_data.date}</div></div>
                        {
                            !_data.used && !datec ?
                                <button className='confirm_ticket' onClick={() => confirmTicket(_data.tid)}>CONFIRM</button>
                                : <div className='confirm_used' >USED OR EXPIRED</div>
                        }
                        </div>
                </div>
            }
        </div>
    );
};

export default SearchConfirm;