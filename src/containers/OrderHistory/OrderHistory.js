import React, { Component } from 'react';
import axios from '../../axiosOrders';

class OrderHistory extends Component{
    state = {
        history: null
    }
    componentDidMount(){
        axios.get('/orders.json').then(response=>{
            const historyData = response.data;
            this.setState({history: historyData});
            console.log('Pobieram');
        });
    }
    render(){
        let historyList = "ABC";
        if(this.state.history !== null){
            historyList = Object.entries(this.state.history);
            historyList.map(elem=>{
                console.log(Object.values(elem));
            })
        }
        return(
            <div className='orderHistory'>
                <h2>Hello History!</h2>
                {/* {historyList} */}
            </div>
        )
    }
}

export default OrderHistory;