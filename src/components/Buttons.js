import React from 'react'
import './Button.css'

const STYLES=[
    'btn--primary',
    'btn--outline',
]

const SIZES=[
    'btn--medium',
    'btm--large'
]

export const Button=({
    children,
    type,
    onclick,
    buttonStyle,
    buttonSize
})=>{
    const checkButtonStyle=STYLES.includes(buttonStyle)?buttonStyle:STYLES[0]

    const checkButtonSize =SIZES.includes(buttonSize)?buttonSize:SIZES[0]

    return(
        <button className={`btn ${checkButtonStyle} ${checkButtonSize}`} onClick={onclick} type={type}>
            {children}
        </button>
    )
}
export const Button1=({
    children,
    type,
    onclick,
    buttonStyle,
    buttonSize
})=>{
    const checkButtonStyle=STYLES.includes(buttonStyle)?buttonStyle:STYLES[0]

    const checkButtonSize =SIZES.includes(buttonSize)?buttonSize:SIZES[0]

    return(
        <button className={`btn ${checkButtonStyle} ${checkButtonSize}`} onClick={onclick} type={type}>
            {children}
        </button>
    )
}

