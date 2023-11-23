import { useState } from 'react';
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  Editor,
  EditorProvider,
  HtmlButton,
  Separator,
  Toolbar,
} from 'react-simple-wysiwyg';

export default function RichTextComponent() {
  const [value, setValue] = useState('hello world!');
  function onsubmit() {
    console.log(value);
  }
  function onChange(e: any) {
    setValue(e.target.value);
  }

  return (
    <>
      <EditorProvider>
        <Editor
          className=" pt-5 flex flex-col overflow-x-hidden overflow-y-auto h-[75vh]"
          value={value}
          onChange={onChange}
        >
          <Toolbar>
            <BtnUndo />
            <BtnRedo />
            <Separator />
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnClearFormatting />
            <HtmlButton />
            <Separator />
            <BtnStyles />
          </Toolbar>
        </Editor>
      </EditorProvider>
      <div className='mt-2 flex flex-row justify-end'>
        <button className='px-5 py-2 bg-common text-white hover:bg-blue-600 rounded-md' onClick={onsubmit}>Post</button>
      </div>
    </>
  );
}
