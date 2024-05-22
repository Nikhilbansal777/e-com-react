import '../../styles/address.css';

const Checkout = () => {
    return (<>
        <div className="container-checkout">
            <h1>Shipping</h1>
            <p>Please enter your shipping details.</p>
            <hr />
            <div className="form-checkout">

                <div className="fields-checkout ">
                    <label className="field-checkout">
                        <span className="field__label" for="fullName">First name</span>
                        <input className="field__input-checkout" type="text" id="fullName" placeholder='Full Name'/>
                    </label>
                </div>
                <label className="field-checkout">
                    <span className="field__label" for="address">Address</span>
                    <input className="field__input-checkout" type="text" id="address" />
                </label>
                <label className="field-checkout">
                    <span className="field__label" for="country">Country</span>
                    <select className="field__input-checkout" id="country">
                        <option value=""></option>
                        <option value="unitedstates">United States</option>
                    </select>
                </label>
                <div className="fields-checkout fields--3">
                    <label className="field-checkout">
                        <span className="field__label" for="zipcode">Zip code</span>
                        <input className="field__input-checkout" type="text" id="zipcode" />
                    </label>
                    <label className="field-checkout">
                        <span className="field__label" for="city">City</span>
                        <input className="field__input-checkout" type="text" id="city" />
                    </label>
                    <label className="field-checkout">
                        <span className="field__label" for="state">State</span>
                        <select className="field__input-checkout" id="state">
                            <option value=""></option>
                        </select>
                    </label>
                </div>
            </div>
            <hr />
            <button className="button">Checkout</button>
        </div>
    </>);
};

export default Checkout;