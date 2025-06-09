import React from "react";
import {useState, useEffect} from "react";
import { Form, Button } from "react-bootstrap";
import { getDate } from "./ReusableModalsAndMethods";
import Edit from "./editJournal.png";
import Delete from "./deleteJournal.png";
import View from './view.png';

function Entries(props) {

const [search , setSearch] = useState("");

const handleSearch = (evt) => {
    setSearch(evt.target.value);
}

const handleDelete = (id) => {

}

const handleEdit = (id) => {
    console.log(id);
}

const handleView = (id) => {

}

const filteredEntries = props.entries.filter((journal) =>
    journal.title.toLowerCase().includes(search.toLowerCase()) ||
    journal.journal.toLowerCase().includes(search.toLowerCase())
);


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
            {filteredEntries.length ? (
                filteredEntries.map((journal, index) => (
                    <div className="journal-position" key={index}>
                        <h4 className="journals">{journal.title}</h4>
                        <h5 className="journals">({getDate(journal.date)})</h5>
                        <p className="journals">{journal.journal}</p>
                        <div className="journal-icons">
                            <img
                                src={View}
                                onClick={() => handleView(index)}
                                className="journal-icons-size"
                                title="View your journal"
                            />
                            <img
                                src={Edit}
                                onClick={() => handleEdit(index)}
                                className="journal-icons-size"
                                title="Edit your journal"
                            />
                            <img
                                src={Delete}
                                onClick={() => handleDelete(index)}
                                className="journal-icons-size"
                                title="Delete your journal"
                            />
                        </div>
                        <hr />
                    </div>
                ))
            ) : (
                <p className="no-journal-css">No journal entries found.</p>
            )}
        </div>

    </div>
)
}
export default Entries;