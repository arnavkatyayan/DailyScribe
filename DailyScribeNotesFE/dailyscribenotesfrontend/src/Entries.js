import React from "react";
import {useState, useEffect} from "react";
import { Form, Button } from "react-bootstrap";

function Entries(props) {

const [search , setSearch] = useState("");
console.log(props.entries);
const handleSearch = () => {

}
return (
    <div className="entries-page">
    <Form>
        <Form.Control
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search for your journals"
        style={{width:'25vw'}}
        />

    </Form>

    <div className="all-entries">
        {props.entries.map((journal)=> 
        <h1>{journal.title}</h1>
        )}
    </div>
    </div>
)
}
export default Entries;