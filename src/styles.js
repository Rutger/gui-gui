import { injectGlobal } from 'styled-components';

injectGlobal`
    body {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        margin: 0;
        box-sizing: border-box;
    }

    * {
        box-sizing: inherit;
    }

    input, button {
        font-family: inherit;
    }
`;
