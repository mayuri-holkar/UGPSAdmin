import React from 'react';


const InFoWithBgImage = ({data, styleName}) => {
    return (
        <div className="img-overlay-card shadow ripple-effect">
            <div className="center-crop-img">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqxv4mjjMtz39LGg7qTqaiZoD_SCBwwp6Mf_eywazQI2g9UPtS"  />
            </div>

            <div className="jr-cart-ab layer">
                <div className="row text-center w-100">
                    <div className="col-sm-6 text-truncate">
                        <i className="zmdi zmdi-pin text-white mr-2" />
                        <span>11 male </span>
                    </div>
                    <div className="col-sm-6 text-truncate">
                        <i className="zmdi zmdi-coffee text-white mr-2" />
                        <span>10 female </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InFoWithBgImage;
