import React, { Fragment } from 'react'

const Sushi = (props) => {
  const { sushi } = props
  
  // Same Thing:
  // const sushi = props.sushi
  // const onClick = props.onClick
  
  return (
    <div className="sushi">
      <div className="plate" 
           onClick={() => props.addToTable(sushi)}>
        {sushi.eaten ?
            null
          :
            <img src={sushi.img_url} width="100%" />
        }
      </div>
      <h4 className="sushi-details">
        {sushi.name} - ${sushi.price}
      </h4>
    </div>
  )
}

export default Sushi