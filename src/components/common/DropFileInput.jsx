import React, { useRef, useState, useEffect } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
const DropFileInput = (props) => {
  const dataEdit = props.dataEdit;
  const wrapperRef = useRef(null);

  const [fileList, setFileList] = useState([]);

  const onDragEnter = () => wrapperRef.current.classList.add('dragover');

  const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

  const onDrop = () => wrapperRef.current.classList.remove('dragover');

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const updatedList = [...fileList, newFile];
      setFileList(updatedList);
      props.onFileChange(updatedList);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    props.onFileChange(updatedList);
  };

  useEffect(() => {
    if (dataEdit) {
      setFileList(
        dataEdit &&
          dataEdit.attachments &&
          dataEdit.attachments.map((item) => {
            return { name: item.filename, size: item.file_path };
          })
      );
    }
  }, [dataEdit]);

  useEffect(() => {
    if (props.clearData === true) {
      setFileList([]);
    }
  }, [props.clearData]);

  return (
    <>
      <div
        ref={wrapperRef}
        className='drop-file-input'
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className='drop-file-input__label'>
          <p>Drag & Drop your files here</p>
        </div>
        <input
          onChange={onFileDrop}
          type='file'
          accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
        />
      </div>
      {fileList.length > 0 ? (
        <div className='drop-file-preview'>
          {fileList.map((item, index) => (
            <div key={index} className='drop-file-preview__item'>
              <div className='drop-file-preview__item__info'>
                <p>{item.name}</p>
                <p>{item.size}B</p>
              </div>
              <span className='drop-file-preview__item__del' onClick={() => fileRemove(item)}>
                <span className='fa fa-trash'>
                  <FaRegTrashAlt style={{ color: '#fff', fontSize: 16 }} />
                </span>
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default DropFileInput;
