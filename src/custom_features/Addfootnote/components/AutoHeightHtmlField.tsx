import React from 'react';

const AutoHeightHtmlField = (props: any) => {
  const value = props.value;
  
  // Ensure value is a string and handle null/undefined
  const safeValue = typeof value === 'string' ? value : '';
  
  return (
    <div
      style={{
        width: '100%',
        minHeight: '40px',
        maxHeight: '600px',
        overflowY: 'auto',
        border: '1px solid #ccc',
        padding: '8px',
        background: '#fafafa',
        color: '#111',
        whiteSpace: 'pre-wrap',
        fontFamily: 'inherit',
        fontSize: '1rem',
      }}
      dangerouslySetInnerHTML={{ __html: safeValue }}
    />
  );
};

export default AutoHeightHtmlField; 