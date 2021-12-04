import React from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export default function Converter(props) {
    const {
        options,
        selectedCurrency,
        onChangeCurrency,
        onChangeAmount,
        amount
    } = props
    return (
        <div>
            <input type="number" className="input" value={amount} onChange={onChangeAmount} />
            <Select
                value={selectedCurrency}
                onChange={onChangeCurrency}
            >
                 {
                    options.map(el=>(
                        <MenuItem value={el}>{el}</MenuItem>

                    ))
                }
            </Select>
        </div>
    )
}
