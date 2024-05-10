// import statements
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom'; // import useParams and useNavigate hooks
import FormSelect from "../components/FormSelect";
import FormText from "../components/FormText";


function ManageCustomer() {
    // used to capture id for edit case
    const {id} = useParams();

    // used for navigating to other pages after adding/editing a record
    const navigate = useNavigate();

    // define all state variables
    const [name, setName] = useState('');
    const [gender, setGender] = useState("Female");
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    // define the buttonLabel
    const buttonLabel = id === 0 ? "Edit" : "Add";

    // integrate with API
    useEffect(() => {
        // fetch customer data if editing existing customer, id already exists
        if (id !== "0") {
            fetchCustomerData(id); // call fetchCustomerData function to fetch customer data using id
        }
    }, [id]); // useEffect hook with id as dependency

    // fetch customer data from API for edit purposes
    const fetchCustomerData = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/customers/${id}`); // fetch customer data from API
            if (!response.ok) {
                throw new Error("Failed to fetch customer data"); // handle fetch error
            }
            const data = await response.json(); // parse response data
            setName(data.name); // set customer name state variable
            setGender(data.gender); // set customer gender state variable
            setAddress(data.address); // set customer address state variable
            setPhone(data.phone); // set customer phone state variable
        } catch (error) {
            console.error("Error fetching customer data:", error); // log error to console
        }
    };

    // function to validate form inputs
    function validate() {
        if (name.trim().length <= 0) {
            alert("Please enter a name"); // display alert is name is empty
            return false; // return false if validation fails
        }
        // add in additional validation logic
        return true; // return true if validation succeeds
    }

    function handleAddEditAction(e) {
        e.preventDefault(); // prevent default form submission behaviour
        if (validate()) { // validate form inputs
            const customer = {name, gender, address, phone}
            if (id !== "0") {
                // call addCustomer function if in add mode
                addCustomer(customer)
            } else {
                // call editCustomer function if in edit mode
                editCustomer(id, customer)
            }
        } // end if statement
    };

    // function to add new customer
    const addCustomer = async (customer) => {
        try {
            const response = await fetch(`http://localhost:3001/customers`);
            if (!response.ok) {
                throw new Error ("Failed to fetch customer data");
            }
            const data = await response.json();
            const highestId = Math.max(...data.map(customer => customer.id));
            console.log(highestId);

            // increment the highestId by 1
            const newId = highestId + 1;
            console.log(newId);

            // assign the new id to the new customer
            customer.id = newId;
            console.log(customer.id);

            // send POST request to add new customer
            const addResponse = await fetch(`http://localhost:3001/customers`, 
            {   
                method: "POST",
                headers: {"Content-Type" : "application/json",},
                body: JSON.stringify(customer),
            }); 
            if (!addResponse.ok) {
                throw new Error("Failed to add new customer") // handle add customer error message
            }
            // alternatively, you handle the success response
            navigate("/customers"); // navigate to customer list page after adding
        } 
        catch (error) {
            console.error("Error handling customer:", error); // log error in console
        }
    };

    // function to edit existing customer
    const editCustomer = async (id, customer) => {
        try {
            const response = await fetch(`http://localhost:3001/customers/${id}`,
            {
                // send a PUT request to update attributes of existing customer
                method: "PUT",
                headers: {"Content-Type" : "application/json",},
                body: JSON.stringify(customer),
            });
            if (!response.ok) {
                throw new Error("Failed to update existing customer") // handle edit customer error message
            }
            // alternatively, if the update was a success, handle success response
            navigate("/customers"); // navigate to customer list page after updating
        }
        catch (error) {
            console.error("Error handling customer:", error); // log error in console
        }
    };

    return (
        <div className="form-container">
            <h2>{buttonLabel} Customer</h2> {/* display dynamic heading based on add/edit mode */}
            <form onSubmit={handleAddEditAction}>

                {/* FormText and FormSelect implementations, Form inputs for customer details */}

                <div className="form-group">
                    <FormText  labelId="name" labelCaption="Name" inputText={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <FormSelect labelId="gender" labelCaption="Gender" selectedValue={gender} onChange={(e) => setGender(e.target.value)} />
                </div>
                <div className="form-group">
                    <FormText labelId="address" labelCaption="Address" inputText={address} onChange={(e) => setAddress(e.target.value)}/>
                </div>
                <div className="form-group">
                    <FormText labelId="phone" labelCaption="Phone" inputText={phone} onChange={(e) => setPhone(e.target.value)}/>
                </div>

                {/* Submit button */}

                <div className="row align-right">
                    <input type="submit" value={buttonLabel} className="btn btn-blue" />
                </div>
            </form>
        </div>
    );
}

export default ManageCustomer;