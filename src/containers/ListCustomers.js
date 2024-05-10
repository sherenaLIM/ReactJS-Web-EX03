// import statements
import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

function ListCustomers() {
    // define state variables
    const [customers, setCustomers] = useState([]);

    // used for navigating to other pages after adding/editing a record
    const navigate = useNavigate();

    // fetch customer data from API, 
    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const response = await fetch("http://localhost:3001/customers",); 
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json();
                setCustomers(data); // update state with fetched data
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchCustomerData(); // call the function to fetch data when the component mounts
    }, []);

    // map over customer data to render rows
    // complete implementation
    const rows = customers.map((customer) => {
        const { id, name, gender, address, phone } = customer;

        return (
            <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{gender}</td>
                <td>{address}</td>
                <td>{phone}</td>
                <td>
                    <button onClick={() => handleEdit(id)}>Edit</button>
                    <button onClick={() => handleDelete(id)}>Delete</button>
                </td>
            </tr>
        );
    });

    // navigate to edit customer page
    const handleEdit = async(id, customer) => {
        // implement edit logic here
    };

    // handle delete functionality
    const handleDelete = (id) => {
        // implement delete logic here
    };


    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    );
}

export default ListCustomers;