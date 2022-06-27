import NumberFormat from "react-number-format";
import * as React from 'react';

const PriceFormat = ({ price }) => {
    let entero = (price + "").split(".")[0];

    return (
        <>
            <NumberFormat
                value={entero}
                displayType="text"
                thousandSeparator="."
                decimalSeparator=","
                prefix="$"
            />
        </>
    );
}

export default PriceFormat;