import { Button, ExpansionPanel, ExpansionPanelDetails, Paper, TextField, Typography, Box } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useRef, useState, Fragment } from 'react';
import processText, { testText } from '../../../components/bt1_text';
import DropTarget from '../../../components/DropTarget';
import Layout from '../../../components/Layout';








const SimpleForm = ({ onTranslate, initialText }) => {
    const [text, setText] = useState(initialText)
    const textfieldRef = useRef();

    return (
        <DropTarget text={<span>Drop ASM file<br />here to translate...</span>}
            setter={text => {
                setText(text);
                onTranslate(text);
                const tf = textfieldRef.current;
                tf.scrollTo(0, 0)
            }}>
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
                                inputRef={textfieldRef}
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
        </DropTarget>)
}



const formatText = text => (
    text.split("\n").map((line, index) =>
        <span key={index}>{line}<br /></span>
    )
)

const TextProcessor = ({ text }) => {
    return <Fragment>
        <Box paddingTop={2} paddingBottom={2}>
        {processText(text).map((line, index) =>
            <ExpansionPanel key={index} margin="normal">
                {/* <ExpansionPanelSummary>Message {index}</ExpansionPanelSummary> */}
                <ExpansionPanelDetails>
                    <Typography>
                        {formatText(line)}
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>)
        }
        </Box>
    </Fragment>

}

const Decoder = () => {
    const [text, setText] = useState(testText);

    return <Layout title="ASM Decoder">
        <SimpleForm onTranslate={setText} initialText={""} />
        <TextProcessor text={text} />
    </Layout>
}

export default Decoder
