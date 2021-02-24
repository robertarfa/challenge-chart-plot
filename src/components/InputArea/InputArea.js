import React from 'react'
import { UnControlled as CodeMirror } from 'react-codemirror2';


require('codemirror/lib/codemirror.css');
require('codemirror/theme/dracula.css');
require('codemirror/mode/javascript/javascript.js');

export default function InputArea({ inputAreaDataChart, getInputValue }) {


  return (
    //https://www.npmjs.com/package/react-codemirror2
    <CodeMirror

      value={inputAreaDataChart}
      options={{
        mode: 'javascript',
        theme: 'dracula',
        lineNumbers: true
      }}
      onChange={(editor, data, value) => {
        getInputValue(value)
      }}
    />
  )
}
