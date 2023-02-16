import { useCallback, useState } from 'react';
import ReactQuill from 'react-quill';
import { Container } from './styled-components';
import 'react-quill/dist/quill.snow.css';
import './update-quill-styles.css';

const DocumentPaper = () => {
  const [value, setValue] = useState('');
  console.log('🚀 ~ file: DocumentPaper.tsx:9 ~ DocumentPaper ~ value', value);

  const onChange = useCallback((html: string) => {
    setValue(html);
  }, []);

  const modules = {
    toolbar: {
      container: '#toolbar',
    },

    clipboard: {
      matchVisual: true,
      matchers: [],
    },
  };

  const formats = [
    'list',
    'font',
    'size',
    'bold',
    'link',
    'align',
    'image',
    'color',
    'video',
    'header',
    'italic',
    'strike',
    'script',
    'bullet',
    'indent',
    'underline',
    'background',
    'code-block',
    'blockquote',
  ];

  const Quill = ReactQuill.Quill;
  const Font = Quill.import('formats/font');
  Font.whitelist = ['mirza', 'roboto', 'rubik'];
  Quill.register(Font, true);

  return (
    <Container>
      <ReactQuill
        theme="snow"
        value={value}
        modules={modules}
        formats={formats}
        onChange={onChange}
        placeholder="Waiting for your text"
      />
    </Container>
  );
};

export default DocumentPaper;
