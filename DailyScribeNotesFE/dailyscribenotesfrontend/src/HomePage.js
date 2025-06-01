import React from "react";
import {Form, Button} from "react-bootstrap";
import { quotes } from "./ReusableModalsAndMethods";
import {useState, useEffect} from "react";

function HomePage(props) {
    const [quote, setQuote] = useState("");
    const [journal, setJournal] = useState("");
    const [date, setDate] = useState("");
    
    useEffect(()=> {
        const num = Math.floor(Math.random()*quotes.length);
        setQuote(quotes[num]);
    },[]);

    useEffect(() => {
        const d1 = new Date();
        const formattedDate = d1.toISOString().split('T')[0];
        setDate(formattedDate);
    }, []);

    const handleSave = async () => {

    }

    const handleReset = () => {
        
    }

    const handleDate = (evt) => {
        setDate(evt.target.value);
    }

    return (
        <div className="homepage-parent">
        <div className="homepage">
          <h2> Welcome back <span className="username">{props.userName} ! </span></h2>
          <h6>({quote})</h6> 
            <Form className="form-css">
                <Form.Control
                type="Date"
                placeholder="Enter the date for journal"
                value={date}
                onChange={handleDate}
                />
                <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Control as="textarea" rows={5} placeholder="Enter your journal for the day" className="journal-box" />
                </Form.Group>
            </Form>
                <div className="btn-grps">
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={handleReset}>Reset</Button>
                </div>
        </div>
        <div className="rhs-css">
        <div className="quick-stats">
            <h3>Quick Stats</h3>
            
        </div>
         <div className="quick-stats recently-added">
            <h3>Recent Entries</h3>
            
        </div>
        </div>
        </div>
    )
}
export default HomePage