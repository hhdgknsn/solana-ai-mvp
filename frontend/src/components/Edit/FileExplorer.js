import React from 'react';

const FileExplorer = ({ files, onFileClick }) => {
  return (
    <div className="file-explorer">
      <ul>
        {files.map((file, index) => (
          <li key={index} onClick={() => onFileClick(file)}>
            {file}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileExplorer;
