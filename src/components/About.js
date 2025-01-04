import { Link } from "react-router-dom";


function About(){
    return(
        <div>
            <h1>About:</h1>
            <p>This is a menu, you can navigate based on your purpose:</p>
            <Link to="/addorder">addorder</Link><br/>
            <Link to='/getorder'>Get Order Details</Link><br/>
            <Link to='/getall'>Get ALL Orders</Link><br/>
            <Link to='/updateorder'>Update order</Link><br/>
            <Link to='/deleteorder'>delete Order </Link>
        </div>
    );
}

export default About;