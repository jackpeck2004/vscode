import dynamic from 'next/dynamic';
import { useState, useEffect, useRef, MouseEvent } from 'react';
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from 'draft-js';
import { Button, Flex, useColorModeValue } from '@chakra-ui/react';
import { Pr } from 'lib/types';
import draftToHtml from 'draftjs-to-html';
import { SERVER_URI } from 'lib/constants';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((module) => module.Editor),
  { ssr: false }
);

const darkEditorColor = 'rgba(255, 255, 255, 0.08)';

export const PrEditor = ({
  pr,
}: {
  pr: Pr;
}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const ref = useRef();

  function handleSave(e: MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(rawContentState, {});

    const updatedPr = { ...pr, content: markup };

    //fetch(`${SERVER_URI}/prs`).then((res) => res.json()).then((res) => console.log(res));
    fetch(`${SERVER_URI}/pr/${pr.id}`, { method: 'PATCH', body: JSON.stringify(updatedPr) }).then(res => res.json()).then(res => console.log(res));

  }

  function onEditorStateChange(state: EditorState) {
    setEditorState(state);
  }

  useEffect(() => {
    if (pr.content) {
      const editorBlocksFromHTML = convertFromHTML(pr.content);
      const contentStateFromHTML = ContentState.createFromBlockArray(
        editorBlocksFromHTML.contentBlocks,
        editorBlocksFromHTML.entityMap
      );

      const editorStateFromHTML =
        EditorState.createWithContent(contentStateFromHTML);

      setEditorState(editorStateFromHTML);
    }

  }, []);

  return (
    <div>
      <Flex py={4}>
        <Button colorScheme={'twin'} onClick={(e) => handleSave(e)}>
          Save
        </Button>
      </Flex>
      <Editor
        ref={ref}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbarStyle={{
          display: 'flex',
          justifyContent: 'center',
          background: useColorModeValue('white', darkEditorColor),
          color: 'black',
          border: 0,
        }}
        editorStyle={{
          background: useColorModeValue('white', darkEditorColor),
          padding: '0 20px',
          color: useColorModeValue('black', 'white'),
        }}
      />
    </div>
  );
}

