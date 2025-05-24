import React from "react";
import {Form, Button} from "react-bootstrap";
import { quotes } from "./ReusableModalsAndMethods";
import {useState, useEffect} from "react";

function HomePage(props) {
    const [quote, setQuote] = useState("");

    useEffect(()=> {
        const num = Math.floor(Math.random()*quotes.length);
        setQuote(quotes[num]);
    },[]);

    return (
        <div className="homepage-parent">
        <div className="homepage">
          <h1> Welcome back {props.userName} !</h1>
          <h6>{quote}</h6> 
            <Form>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Control as="textarea" rows={5} placeholder="Enter your journal for the day" className="journal-box" />
                </Form.Group>
            </Form>
        </div>
        <div className="stats">
            <p>test</p>
        </div>
        </div>
    )
}
export default HomePage