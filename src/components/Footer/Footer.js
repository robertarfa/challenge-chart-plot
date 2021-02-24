import React from 'react'

import { FooterContainer, Button } from '../../styled'

export default function Footer({ generateChart }) {
  return (
    <FooterContainer>
      <Button onClick={generateChart}>GENERATE CHART</Button>
    </FooterContainer>
  )
}
