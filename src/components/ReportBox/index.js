import React from 'react';
import {ResponsiveContainer} from 'recharts';

const ReportBox = ({styleName, heading, title, detail, children, subHeadingColor}) => {
    if (!styleName)
        styleName = "";
    if (!subHeadingColor)
        subHeadingColor = "";
    return (
        <div className={`jr-card ${styleName}`}>
            {heading && <div className="jr-card-header">
                <h3 className="mb-0">{heading}</h3>
            </div>}
            <div className="row align-items-center">
                <div className="col-2">
                    <h1 className="chart-f30 font-weight-light mb-1">{title}</h1>
                </div>
                <div className="col-10">
                    <ResponsiveContainer height={100}>
                        {children}
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default ReportBox;