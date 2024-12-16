import React, {useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function TextEditor({value, onChange}) {

    return <ReactQuill theme="snow"
                       value={value}
                       onChange={onChange}
                       style={{height: '300px'}}/>;
}