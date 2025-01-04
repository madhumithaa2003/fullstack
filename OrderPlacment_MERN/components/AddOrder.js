import {useForm} from 'react-hook-form';
import axios from 'axios';

function AddOrder()
{
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        console.log("Form Data Submitted:", data);
        try {
            const response = await axios.post("http://localhost:3000/orders", data);
            console.log("Server Response:", response.data);
            alert("Order added successfully!");
        } catch (err) {
            console.error("Error submitting form:", err.message);
            alert("Error submitting form: " + (err.response?.data || err.message));
        }
    };

    return (
        <div>
            <h1>Order Form</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* OrderID */}
                <label>Order ID:</label>
                <input
                    type="text"
                    {...register("OrderID", { required: "Order ID is required" })}
                />
                {errors.OrderID && <p>{errors.OrderID.message}</p>}
                <br />

                {/* CustomerName */}
                <label>Customer Name:</label>
                <input
                    type="text"
                    {...register("CustomerName", { required: "Customer Name is required" })}
                />
                {errors.CustomerName && <p>{errors.CustomerName.message}</p>}
                <br />

                {/* Product */}
                <label>Product:</label>
                <input
                    type="text"
                    {...register("Product", { required: "Product is required" })}
                />
                {errors.Product && <p>{errors.Product.message}</p>}
                <br />

                {/* Quantity */}
                <label>Quantity:</label>
                <input
                    type="text"
                    {...register("Quantity", { required: "Quantity is required" })}
                />
                {errors.Quantity && <p>{errors.Quantity.message}</p>}
                <br />

                {/* OrderDate */}
                <label>Order Date:</label>
                <input
                    type="date"
                    {...register("OrderDate", { required: "Order Date is required" })}
                />
                {errors.OrderDate && <p>{errors.OrderDate.message}</p>}
                <br />

                {/* Submit Button */}
                <button type="submit">Submit Order</button>
            </form>
        </div>
    );
}

export default AddOrder;