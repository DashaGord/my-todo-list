import React from "react"
import styled from "styled-components"

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`

const Spinner: React.FC = () => {
  return (
    <SpinnerContainer>
      <div className="spinner">
        <h1>Спиннер !!!</h1>
      </div>
    </SpinnerContainer>
  )
}

export default Spinner
