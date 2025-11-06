import React from "react";
import VerifyCCCD from "../VerifyCCCD";

const VerifyCCCDTab = ({ onVerifySuccess }) => {
    return (
        <div>
            <VerifyCCCD
                onSubmit={(data) => {
                    console.log("CCCD verification submitted:", data);
                    if (onVerifySuccess) {
                        onVerifySuccess();
                    }
                }}
            />
        </div>
    );
};

export default VerifyCCCDTab;

