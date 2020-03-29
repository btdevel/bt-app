import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';

const DropTarget = ({ setter, children, text }) => {

    const [isInside, setIsInside] = useState(false);

    return <div id="drop_zone" style={{ position: "relative" }}
        onDrop={event => {
            event.preventDefault();
            event.stopPropagation();
            console.log(event);
            console.group("Drop Event");
            const items = event.dataTransfer.items;
            console.log(items);
            const item = items[0];
            console.log(item);
            const file = item.getAsFile();
            file.text().then(res => setter(res));
            console.groupEnd();
            setIsInside(false);
        }}
        onDragOver={event => {
            event.preventDefault();
            event.stopPropagation();
            setIsInside(true);
        }}
        onDragEnter={event => {
            setIsInside(true);
        }}
        onDragExit={event => {
            setIsInside(false);
        }}>

        <div style={{
            backgroundColor: "black",
            position: "absolute",
            zIndex: 2,
            width: "100%",
            height: "100%",
            opacity: "40%",
            visibility: isInside ? "visible" : "hidden",
        }}>
            <div style={{ position: "relative", margin: "auto" }}>
                <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, margin: "auto", textAlign: "center" }}>
                    <Typography variant="h1" style={{ color: "red", margin: "auto" }}>{text}</Typography>
                </div>
            </div>
        </div>
        {children}
    </div>;
};

export default DropTarget;
