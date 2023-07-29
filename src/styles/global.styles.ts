import { createGlobalStyle } from 'styled-components'

const StyledGlobal = createGlobalStyle`
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        vertical-align: baseline;
    }

    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }

    ol, ul {
        list-style: none;
    }

    blockquote, q {
        quotes: none;
    }

    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    :root {
        font-size: 62.5%;

        --font-family-1: 'Roboto', sans-serif;
        --font-family-2: 'Neucha', cursive;
        --font-family-3: 'Annie Use Your Telescope', cursive;

        --color-grey-0: #d32f2f;
        --color-grey-1: #212529;
        --color-grey-2: #495057;
        --color-grey-3: #868E96;
        --color-grey-4: #ADB5BD;
        --color-grey-5: #CED4DA;
        --color-grey-6:#ffe4e4;
        --color-grey-7:#E9ECEF;
        --color-grey-8:#F1F3F5;
        --color-grey-9:#F8F9FA;
        --color-grey-10:#FDFDFD;

        --color-whiteFixed: #FFFFFF;

        --color-primary: #d32f2f;

        --color-secundary: #f9dede;

        --color-hover: #f9dede;

        .my-toast {
            margin-top: 2rem;
            font-size: 1.6rem;
            padding: 2rem;
        }

        .my-toast-sucess {
            border: .05rem solid var(--color-fourth);
        }

        .my-toast-error {
            border: .05rem solid var(--toastify-color-error);
        }
    }

    body {
        font-family: var(--font-family-1);  
        background-color: var(--color-grey-10);
        min-width: 42.5rem;
        height: 100%;
    }
    
    .container {
        max-width: 110rem;
        margin: 0 auto;
    }
`

export default StyledGlobal
