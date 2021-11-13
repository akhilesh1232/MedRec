import React, {useEffect} from 'react';
import {getPatientRecord} from './SmartContract';
export default function BloackChainData() {
    useEffect(() => {
        getPatientRecord();
    }, [])
    return (
        <div>
            <h1>
                hello world
            </h1>
        </div>
    )
}
