import React from "react"
import styled from "styled-components"
import { BounceLoader } from "react-spinners"

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
        <BounceLoader color="#36D7B7" size={60} />
      </div>
    </SpinnerContainer>
  )
}

export default Spinner
