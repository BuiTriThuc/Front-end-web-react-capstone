'use client';
import React, { useState } from 'react';

// PrimeReact editor built on top of quillJS editor, a lightweight editor easier to setup but less option
// QuillJS don't encourage arbitrary changes to it's content so change to TinyMCE, CKEditor or SummerNote for higher customization
import { Editor, EditorTextChangeEvent } from 'primereact/editor';

// Theme for Editor in case not custom theme - will be disable if use toolBarOptions
import 'primereact/resources/themes/tailwind-light/theme.css';
import { useRouter } from 'next/navigation';
import useWriteBlogModal from '@/app/hooks/useWriteBlogModal';

const PrimeReactEditor = () => {
  const router = useRouter();
  const writeBlogModal = useWriteBlogModal();
  const [blogContent, setBlogContent] = useState<string>('');

  const postBlog = () => {
    console.log('Posted: ');
    console.log(blogContent);
    localStorage.setItem('blogContent', blogContent);
    // navigate to /blog/demoDisplay
    router.push('/blog/demoDisplay');
    writeBlogModal.onClose();
  };

  const onTextChange = (e: EditorTextChangeEvent) => {
    setBlogContent(e.htmlValue ?? '');
  };

  var toolbarOptions = [
    // Display option in toolbar in same order as toolbarOptions array,
    ['image'],

    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ direction: 'rtl' }], // text direction

    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ['clean'], // remove formatting button
  ];

  function imageHandler(value: boolean) {
    // custom function for image option in toolbar, for more information read:
    // https://quilljs.com/docs/modules/toolbar/
    console.log(value);
  }

  return (
    <>
      <Editor
        value={blogContent}
        onTextChange={onTextChange}
        style={{ height: '320px' }}
        // uncomment 3 following lines to custom toolbar (will have to write custom css)
        theme="snow"
        showHeader={false}
        modules={{ toolbar: { container: toolbarOptions, handlers: { image: imageHandler } } }}
      />
      <div className="mt-2 flex flex-row justify-end">
        <button
          className="px-5 py-2 bg-common text-white hover:bg-blue-600 rounded-md"
          onClick={postBlog}
        >
          Post
        </button>
      </div>
    </>
  );
};

export default PrimeReactEditor;
