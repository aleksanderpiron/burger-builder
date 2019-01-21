import React, { Component } from 'react';
import Spinner from '../../components/Tools/Spinner/Spinner';
import Button from '../../components/Tools/Button/Button';
import axios from '../../axiosOrders';
import {Link} from 'react-router-dom';
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
            this.setState({loading:false, historyData: response.data});
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
            historyContent = Object.values(historyData).map(obj=>{
                return(
                    <div className="historyItem">
                        <div className="flex-box">
                            <div className="userData">
                                <p>User data: </p>
                                <ul>
                                    <li>Name: {obj.userData.name}</li>
                                    <li>Address: {obj.userData.address}</li>
                                    <li>City: {obj.userData.city}</li>
                                    <li>Phone: {obj.userData.phone}</li>
                                    <li>Message: {obj.userData.message}</li>
                                </ul>
                            </div>
                            <div className="ingredients">
                                <p>Ingredients:</p>
                                <ul>
                                    <li><span>Bacon:</span> x{obj.ingredients.bacon}</li>
                                    <li><span>Cheese:</span> x{obj.ingredients.cheese}</li>
                                    <li><span>Meat:</span> x{obj.ingredients.meat}</li>
                                    <li><span>Salad:</span> x{obj.ingredients.salad}</li>
                                    <li><span>Tomato:</span> x{obj.ingredients.tomato}</li>
                                </ul>
                            </div>
                        </div>
                        <div className="totalPrice">
                            <p>Total price: {obj.totalPrice} $</p>
                        </div>
                    </div>
                )
            })
            }
            if(localStorage.getItem('token') === null){
                historyContent = <div><p>You have to be logged to see orders history!</p>
                    <Link className="btn info" to='/'>Login</Link>
                </div>
            }

        }
        return(
            <div className='orderHistory'>
                <h2>Orders history</h2>
                {historyContent}
                {this.state.historyData===null?null:<Button clicked={this.clearHistoryHandler}>Clear history</Button>}
            </div>
        )
    }
}

export default OrderHistory;