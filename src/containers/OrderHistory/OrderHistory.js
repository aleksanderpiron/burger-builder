import React, { Component } from 'react';
import Spinner from '../../components/Tools/Spinner/Spinner';
import Button from '../../components/Tools/Button/Button';
import Burger from '../../components/Burger/Burger';
import Login from '../../containers/Login/Login';
import axios from '../../axiosOrders';
import './OrderHistory.css';

class OrderHistory extends Component{
    state = {
        loading: true,
        historyData:null,
    }

    clearHistoryHandler=()=>{
        this.setState({loading:true});
        let address = localStorage.getItem('userId');
        address = 'orders/'+address+'.json';
        axios.delete(address).then(response=>{
            this.setState({loading:false});
        });
    }

    removeOneHandler=(event)=>{
        this.setState({loading:true});
        const user = localStorage.getItem('userId');
        let address = event.target.parentElement.parentElement.id;
        address = 'orders/'+user+'/'+address+'.json';
        axios.delete(address).then(response=>{
            if(localStorage.getItem('token') !== null){
                let address = localStorage.getItem('userId');
                address = 'orders/'+address+'.json';
                axios.get(address).then(response=>{
                    this.setState({loading:false, historyData: response.data});
                });
            }
            else{
                this.setState({loading:false});
            }
        });
    }

    componentDidMount(){
        if(localStorage.getItem('token') !== null){
            let address = localStorage.getItem('userId');
            address = 'orders/'+address+'.json';
            axios.get(address).then(response=>{
                this.setState({loading:false, historyData: response.data});
            });
        }
        else{
            this.setState({loading:false});
        }
    }

    render(){
        let historyContent;
        if(this.state.loading){
            historyContent = <Spinner />
        }else{
            const historyData = this.state.historyData;
            if(historyData == null){
                historyContent = <p>Your history is empty! Go order some burgers</p>
            }else{
            historyContent = Object.entries(historyData).map(obj=>{
                return(
                    <div id={obj[0]} className="historyItem">
                            <div className="userData">
                                <p>User data: </p>
                                <ul>
                                    <li>Name: {obj[1].userData.name}</li>
                                    <li>Address: {obj[1].userData.address}</li>
                                    <li>City: {obj[1].userData.city}</li>
                                    <li>Phone: {obj[1].userData.phone}</li>
                                    <li>Message: {obj[1].userData.message}</li>
                                </ul>
                            </div>
                            <div className="ingredients">
                                    <p>Ingredients:</p>
                                <div className="flex-box">
                                    {Object.entries(obj[1].ingredients).map(item =>{
                                        return(
                                        <ul className="burgerIngList">
                                            <span className="burgerName">{item[0].split('_').join(' #')}</span>
                                            <li><span>Bacon:</span> x{item[1].bacon}</li>
                                            <li><span>Cheese:</span> x{item[1].cheese}</li>
                                            <li><span>Meat:</span> x{item[1].meat}</li>
                                            <li><span>Salad:</span> x{item[1].salad}</li>
                                            <li><span>Tomato:</span> x{item[1].tomato}</li>
                                        </ul>
                                        )
                                    })}
                                </div>
                            </div>
                        <div className="totalPrice">
                            <p>Total price: {obj[1].totalPrice} $</p>
                        </div>
                        <div className="button">
                            <Button clicked={this.removeOneHandler} btnType="danger">Remove</Button>
                        </div>
                    </div>
                )
            })
            }
            if(localStorage.getItem('token') === null){
                historyContent = <div><p class="text-center">You have to be logged to see orders history!</p>
                    <Login />
                </div>
            }

        }
        return(
            <div className='orderHistory'>
                <h2>Orders history</h2>
                    <div className="orderHistoryBody">
                        {historyContent}
                    </div>
                {this.state.historyData===null?null:<Button clicked={this.clearHistoryHandler}>Clear all history</Button>}
            </div>
        )
    }
}

export default OrderHistory;