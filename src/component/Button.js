import styled from 'styled-components';

export default styled.button`
    background: none;
    border: 0;
    cursor: pointer;
    font-size: 16px;
    outline: none;

    ${props => !props.bold ? '' : `
        font-weight: bolder;
    `}
`;
