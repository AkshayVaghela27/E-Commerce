import React, { useContext } from 'react'
import AppContext from '../../context/AppContext'
import ShowOrderProduct from '../ShowOrderProduct';

const Profile = () => {
    const { user, userOrder } = useContext(AppContext);
  
    return (
      <>
        <div className="container mx-auto text-center my-3">
          <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
          <h3 className="text-xl">{user?.email}</h3>
          <h1 className="text-2xl mt-4 mb-2">Total Orders: {userOrder?.length}</h1>
        </div>
  
        <div className="container mx-auto my-5">
          <table className="table table-bordered border-primary bg-dark w-full">
            <thead className="bg-dark">
              <tr>
                <th scope="col" className="bg-dark text-light text-center py-2">
                  Order Items
                </th>
  
                <th scope="col" className="bg-dark text-light text-center py-2">
                  Order Details & Shipping Address
                </th>
              </tr>
            </thead>
            <tbody className="bg-dark">
              {userOrder && (
                <>
                  {userOrder?.map((product) => (
                    <tr key={product._id}>
                      <td className="bg-dark text-light">
                        <ShowOrderProduct items={product?.orderItems} />
                      </td>
                      <td className="bg-dark text-light">
                        <ul className="text-left">
                          <li className="mb-1">
                            <span className="font-semibold">Order ID:</span>{" "}
                            {product?.orderId}
                          </li>
                          <li className="mb-1">
                            <span className="font-semibold">Payment ID:</span>{" "}
                            {product?.paymentId}
                          </li>
                          <li className="mb-1">
                            <span className="font-semibold">Payment Status:</span>{" "}
                            {product?.payStatus}
                          </li>
                          <li className="mb-1">
                            <span className="font-semibold">Name:</span>{" "}
                            {product?.userShipping?.fullName}
                          </li>
                          <li className="mb-1">
                            <span className="font-semibold">Phone:</span>{" "}
                            {product?.userShipping?.phoneNumber}
                          </li>
                          <li className="mb-1">
                            <span className="font-semibold">Country:</span>{" "}
                            {product?.userShipping?.country}
                          </li>
                          <li className="mb-1">
                            <span className="font-semibold">State:</span>{" "}
                            {product?.userShipping?.state}
                          </li>
                          <li className="mb-1">
                            <span className="font-semibold">PinCode:</span>{" "}
                            {product?.userShipping?.pincode}
                          </li>
                          <li className="mb-1">
                            <span className="font-semibold">Near By:</span>{" "}
                            {product?.userShipping?.address}
                          </li>
                        </ul>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </>
    );
}

export default Profile;
