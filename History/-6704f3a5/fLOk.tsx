import { Button, Flex, useColorModeValue } from '@chakra-ui/react';
import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { SERVER_URI } from 'lib/constants';
import { Pr } from 'lib/types';
import dynamic from 'next/dynamic';
import { MouseEvent, useEffect, useState } from 'react';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

async function updatePrOnServer(updatedPr: Pr) {
  console.log("fetching url", `${SERVER_URI}/pr/${updatedPr.id}`)
  const response = await fetch(`${SERVER_URI}/pr/${updatedPr.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedPr),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
}

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((module) => module.Editor),
  { ssr: false }
);

const darkEditorColor = 'rgba(255, 255, 255, 0.08)';

export const PrEditor = ({ pr }: { pr: Pr }) => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );

  function handleSave(e: MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(rawContentState, {});

    const updatedPr = { ...pr, content: markup };

    updatePrOnServer(updatedPr as Pr);
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
};
