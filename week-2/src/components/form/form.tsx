import React from 'react'
import './form.css'

interface Props {
    formName:string,
    onSubmit:(event:React.FormEvent<HTMLFormElement>)=>void
    inputName:string,
    inputType:string,
    inputPlaceholder:string,
    textareaPlaceholder:string,
    textareaName:string,
    buttonType:string,
    buttonName:string,
}

 function form(
    formName,
    onSubmit,
    inputName,
    inputType,
    inputPlaceholder,
    textareaName,
    textareaPlaceholder,
    buttonType,
    buttonName;
 ):Props {
  return (
    <div>
    <form className={formName} onSubmit={handleFormSubmit}>
	<input name={inputName} type={inputType} placeholder={inputPlaceholder} required />
	<textarea name={textareaName} placeholder={textareaPlaceholder} />
	<button type={buttonType} className={buttonName}>
	Post
	</button>
	</form>

    </div>
  )
}
export default form;