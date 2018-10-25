import React, { Component } from 'react';
import axios from '../../axiosOrders';
import './OrderHistory.css';

class OrderHistory extends Component{
    state = {
        history: null,
    }
    componentDidMount(){
        axios.get('/orders.json').then(response=>{
            const historyData = response.data;
            this.setState({history: historyData});
        });
    }
    render(){
        let historyList = "No orders to list";
        // if(this.state.history !== null){
            const data = {...this.state.history};
            historyList = Object.values(data).map((obj, index)=>{
                return <div key={index} className="historyItem">{Object.entries(obj).map((line, index)=>{
                    return <p key={index}>{line.map((word, index)=>{
                        if(Object.prototype.toString.call(word) === '[object Array]'){
                                let tabItemFin
                            word.map(tabItem=>{
                                tabItemFin = tabItem.join(" ");
                            })
                            return <span className="aa">{tabItemFin}</span>;
                        }else{
                            return <span key={index}>{word}</span>
                        }
                    })}</p>
                })}</div>
            });
        //     historyList.map(elem=>{
        //         return <p> Object.values(elem) </p>;
        //     })
        // }
        return(
            <div className='orderHistory'>
                <h2>Orders history</h2>
                {historyList}
            </div>
        )
    }
}

export default OrderHistory;