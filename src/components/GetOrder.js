import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

function GetOrder() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ord, setOrd] = useState(null);
    const [error, setError] = useState(""); 

    const onSubmit = async (data) => {
        console.log("Order ID given: ", data.OrderID);
        try {
            const result = await axios.get(`http://localhost:3000/orders/${data.OrderID}`);
            console.log(result.data[0]);
            if (!result.data[0] || result.data[0].length === 0) {
                setError("Error: No order found with this ID.");
            } else {
                setOrd(result.data[0]); // Update the state with the fetched order
                setError(""); // Reset error state if data is found
            }
        } catch (err) {
            setError("Error: " + err.message); // Handle any errors in fetching the order
        }
    };

    return (
        <div>
            <h1>Get Order Details:</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Enter Order ID:</label>
                <input
                    type="text"
                    {...register("OrderID", { required: "Please enter Order ID" })}
                />
                <button type="submit">Submit</button>
            </form>

            {errors.OrderID && <p style={{ color: "red" }}>{errors.OrderID.message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>} {/* Display API error message */}

            {ord && ord.OrderID && (
                <div>
                    <h2>Order Details:</h2>
                    <p><strong>Order ID:</strong> {ord.OrderID}</p>
                    <p><strong>Customer Name:</strong> {ord.CustomerName}</p>
                    <p><strong>Product:</strong> {ord.Product}</p>
                    <p><strong>Quantity:</strong> {ord.Quantity}</p>
                    <p><strong>Order Date:</strong> {new Date(ord.OrderDate).toLocaleDateString()}</p>
                </div>
            )}
        </div>
    );
}

export default GetOrder;
