import React from "react"
import { Form, Field } from "react-final-form";
import classNames from "classnames"
import { CustomInput } from "./FormInput";
import CustomBtn from "./FormBtn";



export default function OpacityForm({ inputsData, formValidate, formSubmit, inputContainerStyle, submitBtnContainer, submitBtnStyle }) {

  const [submit, isSubmitTime] = React.useState(false)
  const [activeList, changeActiveList] = React.useState([])
  const [activeInput, changeActiveInput] = React.useState(inputsData[0].name)
  const [errorActive, changeErrorActive] = React.useState("")

  const isFieldActive = (name) => {
    let isActive = activeList.find((active) => active === name)
    if (isActive) {
      return true
    } else {
      return false
    }
  }

  return (
    <>
      <div className="flex justify-center mt-8 gap-4 items-center">
        {inputsData.map((inputInfo, index) => (
          <div key={index} className={classNames("w-[30px] h-[6px] bg-primary", { "!bg-green-500": isFieldActive(inputInfo.name) })}></div>
        ))}
      </div>

      <Form
        onSubmit={formSubmit}
        validate={(values) => {
          return formValidate(values, isSubmitTime)
        }}
        render={({ handleSubmit, dirtyFields, modified, submitting, errors }) => (
          <form onSubmit={handleSubmit}>
            <div className={`flex-auto  max-h-96 min-h-[150px] overflow-auto ${inputContainerStyle}`}>
              <div className="relative min-h-[150px] overflow-hidden flex items-center py-5">

                {
                  inputsData.map((inputInfo, index) => {
                    return (
                      <Field name={inputInfo.name} key={index}>
                        {({ input, meta }) => (
                          <CustomInput
                            type={inputInfo.type}
                            className={classNames(
                              { "!border-b-red-500": (errorActive === input.name && meta.error), "focus:!border-b-red-500": (errorActive === input.name && meta.error) })}
                            placeholder={inputInfo.placeholder}
                            errorActive={errorActive}
                            error={meta.error}
                            touched={meta.touched}
                            containerStyle={classNames("absolute w-full transition-all duration-300 opacity-0 !mt-0 top-1/2 left-0 translate-y-[200px]", { "!-translate-y-1/2": activeInput == input.name, "!opacity-100": activeInput == input.name, "!opacity-0": activeInput !== input.name, "!-translate-y-[200px]": isFieldActive(input.name) })}
                            {...input}
                          />
                        )}
                      </Field>
                    )
                  })
                }
              </div>
            </div>

            <div className={`flex items-center justify-center w-full ${submitBtnContainer}`}>
              <CustomBtn type="submit" disabled={submitting}
                onClick={() => {
                  if (modified) {
                    let inputs = Object.keys(modified)
                    inputs.forEach((key, index) => {
                      if (activeInput === key && errors[key]) {
                        changeErrorActive(key)
                      }
                      if (!errors[key]) {
                        changeActiveInput(inputs[index + 1])
                        changeActiveList([...activeList, key])
                      }
                    })
                  }


                }}>
                {submit ? "submit" : "Next"}
              </CustomBtn>
            </div>
          </form>
        )}
      ></Form>
    </>
  );
}

