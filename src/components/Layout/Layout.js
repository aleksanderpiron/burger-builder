import React from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import './Layout.css';
import { Route} from 'react-router-dom';
import BurgerBuilder from '../../containers/BurgerBuilder/BurgerBuilder';
import OrderHistory from '../../containers/OrderHistory/OrderHistory';


const Layout = ( props ) =>(
	<React.Fragment>
		<Toolbar />
		<main>
			{props.children}
			<Route path="/burger-builder" exact component={BurgerBuilder}/>
			<Route path="/order-history" exact component={OrderHistory}/>
		</main>
	</React.Fragment>
);

export default Layout;