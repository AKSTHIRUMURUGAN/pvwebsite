import React, { Fragment, useEffect, useState } from 'react';
import MetaData from '../layouts/MetaData';
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom';

const UserOrders = () => {
    const [orders, setOrders] = useState([]);


    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/v1/myorders');
                const data = await response.json();

                if (data.success) {
                    setOrders(data.orders);
                } else {
                    console.error('Failed to fetch user orders');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchOrders();
    }, []);

    const mapOrdersToTableData = () => {
        return orders.map(order => ({
            id: order.id,
            user: order.name,
            slotNos: order.slotNos.join(', '),
            quantity: order.quantity,
            totalPrice: `$${order.totalPrice}`,
            status: order.status === 'success' ? (
                <p style={{ color: 'green' }}> {order.status} </p>
            ) : (
                <p style={{ color: 'red' }}> {order.status} </p>
            ),
            actions: (
                <Link to={`/order/${order.id}`} className="btn btn-primary">
                    <i className='fa fa-eye'></i>
                </Link>
            ),
        }));
    };

    const dataTable = {
        columns: [
            { label: 'Order ID', field: 'id', sort: 'asc' },
            { label: 'User', field: 'user', sort: 'asc' },
            { label: 'Slot Numbers', field: 'slotNos', sort: 'asc' },
            { label: 'Quantity', field: 'quantity', sort: 'asc' },
            { label: 'Total Price', field: 'totalPrice', sort: 'asc' },
            { label: 'Status', field: 'status', sort: 'asc' },
            { label: 'Actions', field: 'actions', sort: 'asc' },
        ],
        rows: mapOrdersToTableData(),
    };

    return (
        <Fragment>
            <MetaData title={'My Orders'} />
            <div className="container">
                <h1 className="my-5">My Orders</h1>
                <MDBDataTable
                    data={dataTable}
                    className="px-3"
                    bordered
                    striped
                    hover
                />
            </div>
        </Fragment>
    );
};
export default UserOrders;
