import styled from 'styled-components'



export const HeaderContainer = styled.div`
      background-color: var(--bg-header-footer-color);
    padding: 0.5px 0 0.5px 40px;
`

export const FooterContainer = styled.div`
      background-color: var(--bg-header-footer-color);
      position: fixed;
    width: 100vw;
    bottom: 0px;
    display: block;
    padding: 16px 0 16px 40px;
`
export const Button = styled.button`
display: inline-block;

padding: 12px 20px;
margin:0 0.3em 0.3em 0;
border-radius:0.15em;
border: none;
border-radius: 2px;
box-sizing: border-box;
text-decoration:none;
color: white;
background-color:#017EFF;
box-shadow:inset 0 -0.6em 0 -0.35em rgba(0,0,0,0.17);
text-align:center;
position:relative;
font-size: 10px;
outline:none;
transition-duration: 0.3s;

:hover{
  background-color: #097aef;
  cursor: pointer;
}

:active{
    top:0.1em;
  }
`
