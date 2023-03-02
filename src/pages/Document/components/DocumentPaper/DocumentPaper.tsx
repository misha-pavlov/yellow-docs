import { FC, useCallback, useState } from 'react';
import ReactQuill from 'react-quill';
import { Container } from './styled-components';
// css
import 'react-quill/dist/quill.snow.css';
import './update-quill-styles.css';

type DocumentPaperProps = {
  content: string;
  width?: number;
  height?: number;
  isReadOnly?: boolean;
};

const DocumentPaper: FC<DocumentPaperProps> = ({ content, isReadOnly, width, height }) => {
  const [value, setValue] = useState(content);

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
    <Container width={width} height={height}>
      {isReadOnly && <div id="toolbar"></div>}
      <ReactQuill
        theme="snow"
        value={value}
        modules={modules}
        formats={formats}
        onChange={onChange}
        readOnly={isReadOnly}
        placeholder={isReadOnly ? 'Currently nothing' : 'Waiting for your text'}
      />
    </Container>
  );
};

export default DocumentPaper;
