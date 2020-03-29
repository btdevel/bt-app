import Layout from 'components/Layout'
import processText, { testText } from 'components/bt1_text'

import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';

import React, { Component, useState, useRef } from 'react'
import { TextField, TextareaAutosize, Button, Input, Box } from '@material-ui/core';

import { spacing } from '@material-ui/core'
import { Formik, Form } from 'formik'


const MyDropTarget = ({ setter, children }) => {
    const [isInside, setIsInside] = useState(false)

    return <div id="drop_zone"
        style = {{position: "relative"}}
        onDrop={event => {
            event.preventDefault();
            event.stopPropagation();
            console.log(event);

            console.group("Drop Event")
            const items = event.dataTransfer.items;
            console.log(items);
            const item = items[0]
            console.log(item)
            const file = item.getAsFile()
            file.text().then(res => setter(res))
            console.groupEnd();
            setIsInside(false)

        }}
        onDragOver={event => { 
            event.preventDefault(); 
            event.stopPropagation(); 
            setIsInside(true)
        }}
        onDragEnter={event => {
            setIsInside(true)
        }}
        onDragExit={event => {
            setIsInside(false)
        }}
    >

        <div style={{
            backgroundColor: "black", 
            position: "absolute",
            zIndex: 2,
            width: "100%",
            height: "100%",
            opacity: "40%",
            visibility: isInside ? "visible" : "hidden",
            }}>
                    <div style={{position: "relative", margin: "auto"}}>
                <div style={{position: "absolute", top: 0, bottom: 0, left: 0, right: 0, margin: "auto", textAlign: "center"}}>
                    <Typography variant="h1" style={{color: "red", margin: "auto"}}>Drop here...</Typography>
                    </div>
                </div>
        </div>
        {children}
    </div>
}
const SimpleForm = ({ onTranslate, initialText }) => {
    const [text, setText] = useState(initialText)

    return (
        <MyDropTarget setter={text => { setText(text); onTranslate(text); }}>
            <Paper style={{ padding: "2em" }}>
                <Formik
                    initialValues={{}}
                    onSubmit={(values, actions) => onTranslate(text)}
                >
                    <Form>
                        <div>
                            <TextField rows={10} name="Foo" margin={"normal"}
                                type="text"
                                variant="outlined"
                                multiline
                                fullWidth
                                placeholder="Enter ASM code..."
                                value={text}
                                onChange={event => setText(event.target.value)}
                            />
                            <Button type="submit" variant="contained" color="primary" p={1}>Translate</Button>
                            &nbsp; You can drop ASM files anywhere in this form and they'll get translated automatically.
                        </div>
                    </Form>
                </Formik>
            </Paper>
        </MyDropTarget>)
}



const formatText = text => (
    text.split("\n").map((line, index) =>
        <span key={index}>{line}<br /></span>
    )
)

const TextProcessor = ({ text }) => {
    return <Paper style={{ paddingTop: "2em" }}>
        <ul>
            {processText(text).map((line, index) =>
                <ExpansionPanel key={index} margin="normal">
                    {/* <ExpansionPanelSummary>Message {index}</ExpansionPanelSummary> */}
                    <ExpansionPanelDetails>
                        <Typography>
                            {formatText(line)}
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>)
                // <li key={index}>{formatText(line)}</li>)
            }
        </ul>
    </Paper>

}

const Decoder = () => {
    const [text, setText] = useState(testText);

    return <Layout title="ASM Decoder">
        <SimpleForm onTranslate={setText} initialText={""} />
        <TextProcessor text={text} />
    </Layout>
}

export default Decoder
