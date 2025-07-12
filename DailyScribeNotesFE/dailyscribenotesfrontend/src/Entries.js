import React from "react";
import {useState, useEffect} from "react";
import { Form, Button } from "react-bootstrap";
import { getDate } from "./ReusableModalsAndMethods";
import Edit from "./editJournal.png";
import Delete from "./deleteJournal.png";
import starSelectedImg from "./starSelected.png";
import starUnselectedImg from "./starUnselected.png";
import View from './view.png';
import axios from "axios";
import Swal from "sweetalert2";
import { ViewAndEdit } from "./ReusableModalsAndMethods";
import ReactSwitch from "react-switch";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

function Entries(props) {
const [search , setSearch] = useState("");
const [show, setShow] = useState(false);
const [title, setTitle] = useState("");
const [journal, setJournal] = useState(null);
const [isEdit, setIsEdit] = useState(false);
const [editableId, setEditableId] = useState(null);
const [sortEnabled, setSortEnabled] = useState(false);
const [journalTitle, setJournalTitle] = useState("");
const [selectedStars, setSelectedStars] = useState(
  props.entries?.filter(entry => entry.star === true).map(entry => entry.id) || []
);
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
    setJournal(props.entries[id].journal);
    setIsEdit(true);
    setShow(true);
    setEditableId(journalId);
    setJournalTitle(props.entries[id].title);
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
            journal: journal,
            title:journalTitle
        }
        try {
            const response = await axios.post("http://localhost:9090/dailyScribe-journal/editJournal", editJournalRequestBody);
            if (response.data) {
                await props.fetchEntries();
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

const handleView = (index) => {
    setShow(true);
    setTitle(props.entries[index].title);
    setJournal(props.entries[index].journal);
}

const onClose = () => {
    setShow(false);
    setIsEdit(false);
}

const handleSorting = ()=> {
    setSortEnabled(!sortEnabled);
}

const handleJournalTitle = (evt) => {
    setJournalTitle(evt.target.value);
}

const handleStar = async (index) => {
    const isSelected = selectedStars.includes(index);
    setSelectedStars((prev) => {
        if (prev.includes(index)) {
            return prev.filter((i) => i !== index);
        } else {
            return [...prev, index];
        }
    });
    try {
        await axios.post("http://localhost:9090/dailyScribe-journal/starRating", {
            userName: props.userName,
            starIndex: index,
            isSelected: !isSelected

        });
        console.log("Your journal is highlighted");
    }
    catch (error) {
        console.log("error saving stars",error);
    }
};

const filteredEntries = [...props.entries]
    .filter((journal) =>
        journal.title.toLowerCase().includes(search.toLowerCase()) ||
        journal.journal.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
        if (!sortEnabled) return 0; 
        return new Date(b.date) - new Date(a.date); 
    });

return (
    <div className="entries-page">
    <div className="searching-sorting">     
    <Form>
        <Form.Control
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search for your journals"
        style={{width:'15vw'}}
        />

    </Form>
    
    <ReactSwitch id="my-switch" checked={sortEnabled} onChange={handleSorting}/>
    <Tooltip anchorSelect="#my-switch" content="Sort your journals by date" place="top"  style={{ marginTop: '-30px', marginLeft: '35px' }}/>
    </div>

        <div className="all-entries">
            {filteredEntries.length ? (
                filteredEntries.map((journal, index) => (
                    <div className="journal-position" key={index}>
                        <h4 className="journals journals-entry-section">{journal.title}</h4>
                        <h5 className="journals journals-entry-section">({getDate(journal.date)})</h5>
                        <p className="journals journals-entry-section">{journal.journal}</p>
                        <div className="journal-icons">
                            <img
                                src={selectedStars.includes(journal.id) ? starSelectedImg : starUnselectedImg}
                                onClick={() => handleStar(journal.id)}
                                className="journal-icons-size"
                                title="Highlight your favourite journal"
                            />
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
            journalTitle={journalTitle}
            handleJournalTitle={handleJournalTitle}
            />

    
    </div>
)
}
export default Entries;