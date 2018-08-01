import React from "react"
import Select from 'react-select'

class CustomSelect extends React.Component {
    handleChange = value => {
        // this is going to call setFieldValue and manually update
        this.props.onChange(this.props.fieldName, value)
    }

    handleBlur = () => {
        // this is going to call setFieldTouched and manually update
        this.props.onBlur(this.props.fieldName, true)
    }

    render() {
        return (
            <Select
                id="color"
                options={this.props.options}
                isMulti={true}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                value={this.props.value}
                placeholder={this.props.placeholder}
            />
        )
    }
}

export default CustomSelect