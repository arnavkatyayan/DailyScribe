import React from "react";
import { Form, Button } from "react-bootstrap";
import { quotes } from "./ReusableModalsAndMethods";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { getDate } from "./ReusableModalsAndMethods";

function HomePage(props) {
    const [quote, setQuote] = useState("");
    const [journal, setJournal] = useState("");
    const [date, setDate] = useState("");
    const [title, setTitle] = useState("");
    const [recentEntries, setRecentEntries] = useState([]);
    const [days, setDays] = useState(-1);
    const [daysForMonth, setDaysForMonth] = useState(-1);

    useEffect(() => {
        const num = Math.floor(Math.random() * quotes.length);
        setQuote(quotes[num]);
        const d1 = new Date();
        const formattedDate = d1.toISOString().split('T')[0];
        setDate(formattedDate);
        getEntries();
    }, []);

    const getJournalsForThisWeek = (data, today = new Date()) => {
        const dayOfWeek = today.getDay();              // 0=Sun … 6=Sat
        const msPerDay = 24 * 60 * 60 * 1000;

        // Monday of this week (00:00 local)
        const monday = new Date(today.getTime() - ((dayOfWeek + 6) % 7) * msPerDay);
        monday.setHours(0, 0, 0, 0);

        // Sunday of this week (23:59:59.999 local)
        const sunday = new Date(monday.getTime() + 6 * msPerDay);
        sunday.setHours(23, 59, 59, 999);

        // Filter entries inside the range [monday, sunday]
        const journals = data.filter(item => {
            const journalDate = new Date(item.date);
            return journalDate >= monday && journalDate <= sunday;
        });
        setDays(journals.length);        
    };

    const getJournalsForThisMonth = (data, today = new Date()) => {
        const year = today.getFullYear();
        const month = today.getMonth();          // 0‑based (0 = Jan)

        const journalsThisMonth = data.filter(item => {
            const d = new Date(item.date);
            return d.getFullYear() === year && d.getMonth() === month;
        });

        setDaysForMonth(journalsThisMonth.length);
    };


    const getEntries = async () => {
        try {
            const response = await axios.get("http://localhost:9090/dailyScribe-journal/getJournals", { params: { userName: props.userName } });
            props.setEntries(response.data);
            sessionStorage.setItem("entries", JSON.stringify(response.data));
            if (response.data) {
                const resp = [...response.data].sort(
                    (a, b) => new Date(b.date) - new Date(a.date)
                );
                prepareList(resp);
                getJournalsForThisWeek(resp);
                getJournalsForThisMonth(resp);
            }
        }
        catch (error) {
            console.log("Error fetching entries", error);
        }
    }

    const prepareList = (journals) => {
        let list = journals.slice(0, 3);
        setRecentEntries(list);
    }

    const handleTitle = (evt) => {
        setTitle(evt.target.value);
    }

    const handleSave = async () => {
        if (date === "") {
            Swal.fire({
                title: 'Error!',
                text: 'Please enter the date.',
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'my-confirm-button'
                }
            });
            return;
        }
        if (title === "") {
            Swal.fire({
                title: 'Error!',
                text: 'Please enter the title.',
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'my-confirm-button'
                }
            });
            return;
        }
        if (title.length > 50) {
            Swal.fire({
                title: 'Error!',
                text: 'Title length should be within 50 characters.',
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'my-confirm-button'
                }
            });
            return;
        }
        if (journal === "") {
            Swal.fire({
                title: 'Error!',
                text: 'Please enter something in journal section.',
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'my-confirm-button'
                }
            });
            return;
        }

        const journalRequestBody = {
            userName: props.userName,
            title: title,
            journal: journal,
            date: date
        };

        try {
            const response = await axios.post("http://localhost:9090/dailyScribe-journal/addJournal", journalRequestBody);
            if (response.data === true) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Journal Saved!.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    customClass: {
                        confirmButton: 'my-confirm-button'
                    }
                });
                handleReset();
                await getEntries();
            }

        }
        catch (error) {
            console.log("Getting error while saving the journal", error);
        }
    }

    const handleReset = () => {
        setJournal("");
        setTitle("");
    }

    const handleDate = (evt) => {
        setDate(evt.target.value);
    }

    const handleJournal = (evt) => {
        setJournal(evt.target.value)
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
                    <Form.Control
                        type="text"
                        placeholder="Enter the title for journal"
                        value={title}
                        onChange={handleTitle}
                    />
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control as="textarea" rows={5} placeholder="Enter your journal for the day" className="journal-box" value={journal} onChange={handleJournal} />
                    </Form.Group>
                </Form>
                <div className="btn-grps">
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={handleReset}>Reset</Button>
                </div>
            </div>
            <div className="rhs-css">
                <div className="quick-stats">
                    <h3>Quick stats</h3>
                    <h5 className="entries">This week: {days}</h5>
                    <h5 className="entries">This month: {daysForMonth}</h5>
                </div>
                <div className="quick-stats recently-added">
                    <h3>Recent Entries</h3>
                    {recentEntries.length ? (
                        recentEntries.map((entry) => (
                            <div key={entry.id} className="entries">
                                <h5 className="journals">
                                    {entry.title} ({getDate(entry.date)})
                                </h5>
                                <p className="journals">{entry.journal}</p>
                            </div>
                        ))
                    ) : (
                        <p className="no-journal-css">No journals found.</p>
                    )}

                </div>
            </div>
        </div>
    )
}
export default HomePage