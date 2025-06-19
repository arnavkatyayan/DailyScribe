import React from "react";
import {useState, useEffect} from "react";
import { Form, Button } from "react-bootstrap";
import { getDate } from "./ReusableModalsAndMethods";
import Edit from "./editJournal.png";
import Delete from "./deleteJournal.png";
import View from './view.png';
import axios from "axios";
import Swal from "sweetalert2";
import { ViewAndEdit } from "./ReusableModalsAndMethods";

function Entries(props) {
const [search , setSearch] = useState("");
const [show, setShow] = useState(false);
const [title, setTitle] = useState("");
const [journal, setJournal] = useState(null);
const [isEdit, setIsEdit] = useState(false);
const [editableId, setEditableId] = useState(null);

const handleSearch = (evt) => {
    setSearch(evt.target.value);
}

const handleDelete = async (id) => {
    try {
        const response = await axios.delete("http://localhost:9090/dailyScribe-journal/deleteJournal", {
            params: {
                id: id,
                userName: props.userName
            }
        });

        if(response.data === true) {
            props.fetchEntries();
        }
    } catch (error) {
        console.log("error deleting the journal", error);
    }
}

    const handleDeleteAlert = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#282c34',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        });
        if (result.isConfirmed) {
            await handleDelete(id);
        }
    }

const handleEdit = (id,journalId) => {
    setTitle("Edit your journal");
    setIsEdit(true);
    setShow(true);
    setEditableId(journalId);
}

const handleJournal = (evt) => {
    setJournal(evt.target.value);
}

const handleEditAPI = async () => {
        if (journal === null) {
            Swal.fire({
                title: 'Error!',
                text: 'Please enter something in journal section.',
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'my-confirm-button'
                }
            });
        }
        const editJournalRequestBody = {
            id: editableId,
            userName: props.userName,
            journal: journal
        }
        try {
            const response = await axios.post("http://localhost:9090/dailyScribe-journal/editJournal", editJournalRequestBody);
            if (response.data) {
                const resp = await Swal.fire({
                    title: 'Success!',
                    text: 'Journal Updated!.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    customClass: {
                        confirmButton: 'my-confirm-button'
                    }
                });
                if(resp.isConfirmed) {
                    setShow(false);
                }
            }
            else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Error Updating the journal!.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    customClass: {
                        confirmButton: 'my-confirm-button'
                    }
                });
            }
        } catch (error) {
            console.log("Error editing the journal", error);
        }
} 

const handleReset = () => {
    setJournal(null);
}

const handleView = (index,id) => {
    setShow(true);
    setTitle("Your Journal");
    setJournal(props.entries[index].journal);
}

const onClose = () => {
    setShow(false);
    setIsEdit(false);
}

const filteredEntries = props.entries.filter((journal) =>
    journal.title.toLowerCase().includes(search.toLowerCase()) ||
    journal.journal.toLowerCase().includes(search.toLowerCase())
);


return (
    <div className="entries-page">
         <h3>Entries</h3>
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
                                onClick={() => handleEdit(index,journal.id)}
                                className="journal-icons-size"
                                title="Edit your journal"
                            />
                            <img
                                src={Delete}
                                onClick={() => handleDeleteAlert(journal.id)}
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
            <ViewAndEdit
            show={show}
            title={title}
            onClose={onClose}
            journal={journal}
            isEdit={isEdit}
            handleJournal={handleJournal}
            handleReset={handleReset}
            handleEditAPI={handleEditAPI}
            />

    
    </div>
)
}
export default Entries;
//Todo for tomorrow-
//1)handle for title for both view and edit.
//2)refreshEntries call handle
//3)UI changes and label changes