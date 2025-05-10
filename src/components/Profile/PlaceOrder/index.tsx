import { useEffect, useState, useTransition } from "react";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { TbViewfinder } from "react-icons/tb";

// components
import "./style.css";
import axiosInstance from "../../../axios/AxiosInstance";
import { getDate } from "../../../utils/Dates";
import Modal from "../../common/Modal";
import TrackOrder from "../TrackOrder";
import { DELIVERY_CHARGE } from "../../PlaceOrderProcess/OrderSummary";
import { ScreenLoading } from "../../Loaders";
import { handleAxiosError } from "../../../utils/HandleAxiosError";
import {
  IOpenTrackModal,
  IPlaceOrder,
} from "../../../types/interfaces/placeOrder.interface";

const paymentStatusStyle = (paymentStatus: string): React.CSSProperties => {
  return {
    padding: "0.35rem 0.8rem",
    marginLeft: "0.4rem",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    fontWeight: 600,
    borderRadius: "9999px",
    textTransform: "uppercase" as const,
    backgroundColor:
      paymentStatus === "success"
        ? "#C6F6D5"
        : paymentStatus === "pending"
        ? "#E2E8F0"
        : paymentStatus === "failed"
        ? "#FEB2B2"
        : "#F7FAFC",
    color:
      paymentStatus === "success"
        ? "#2F855A"
        : paymentStatus === "pending"
        ? "#1A202C"
        : paymentStatus === "failed"
        ? "#C53030"
        : "#A0AEC0",
  };
};

const paymentMethod = {
  cod: "Cash on Delivery",
  card: "Card",
};

const PlaceOrders = ({ totalHeight }: { totalHeight?: number }) => {
  const [allOrders, setAllOrders] = useState<IPlaceOrder[]>();
  const [isPending, startTransition] = useTransition();
  const [isPendingInvoice, startTransitionInvoice] = useTransition();

  const [trackOrderModal, setTrackOrderModal] = useState<IOpenTrackModal>({
    show: false,
    data: {},
  });

  const navigate = useNavigate();

  function downloadInvoice(orderId: string) {
    startTransitionInvoice(async () => {
      try {
        const res = await axiosInstance.get(
          `/order/generate-invoice/${orderId}`,
          {
            responseType: "blob",
          }
        );

        // const blob = await res.blob();
        const blob = new Blob([res.data, { type: "application/pdf" }]);
        const url = URL.createObjectURL(blob);
        // console.log(res.data, blob, url);

        const a = document.createElement("a");
        a.download = "invoice.pdf";
        a.href = url;
        a.click();
      } catch (error) {
        // extract an error object from a Blob API Response
        // const error = await err?.response?.data?.text();
        // if (error) {
        //   const parsedError = JSON.parse(error);
        //   toast.error(parsedError?.error);
        //   return;
        // }
        handleAxiosError({ error });
      }
    });
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.get("/order");
        setAllOrders(res.data.orders);
      } catch (error) {
        handleAxiosError({ error });
      }
    };

    startTransition(fetchOrders);
  }, []);

  if (isPending) {
    return (
      <div
        className="placeOrder-container"
        style={{
          minHeight: `calc(100vh - ${totalHeight ? totalHeight + 80 : 80}px)`,
        }}
      >
        <ScreenLoading position="absolute" />
      </div>
    );
  }

  if (!allOrders || (allOrders && allOrders?.length === 0)) {
    return (
      <div
        className="placeOrder-container"
        style={{
          paddingTop: "50px",
          minHeight: `calc(100vh - ${totalHeight ? totalHeight + 80 : 80}px)`,
        }}
      >
        <div className="placeorder-no-order">
          <MdOutlineRemoveShoppingCart className="placeorder-icon" />
          <div className="placeorder-no-order-content">
            <h3>You haven&apos;t placed any orders</h3>
            <span>All your orders will appear here</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="placeOrder-container"
      style={{
        minHeight: `calc(100vh - ${totalHeight ? totalHeight + 80 : 80}px)`,
      }}
    >
      {/* show loading icon after user click on download invoice button */}
      {isPendingInvoice && <ScreenLoading backgroundColor="rgba(0,0,0,0.5)" />}

      <div className="placeOrder_card_container">
        {allOrders.map((value, index) => (
          <div className="placeOrder_card" key={index}>
            <div className="placeOrder_top">
              <h3 className="placeOrder_Id">Order ID: {value.orderId}</h3>

              {/* only for large device */}
              <div className="placeOrder_hide_in_smalldevice">
                {value?.orderStatus === "failed" ? (
                  <span className="placeOrder-failed">Order Failed</span>
                ) : value?.orderStatus === "delivered" ? (
                  <div
                    className="placeOrder_delivered"
                    onClick={() => downloadInvoice(value?.orderId)}
                  >
                    <FaFileInvoiceDollar />
                    <span>Invoice</span>
                  </div>
                ) : (
                  <div
                    className="placeOrder_tack"
                    onClick={() =>
                      setTrackOrderModal({
                        show: true,
                        data: {
                          status: value?.orderStatus,
                          orderId: value?.orderId,
                        },
                      })
                    }
                  >
                    <span>Track Order</span>
                    <TbViewfinder />
                  </div>
                )}
              </div>
            </div>

            <div className="placeOrder_date">
              <p>Order Date: {getDate(value.orderDate)}</p>
            </div>

            {/* only for small device */}
            <div className="placeOrder_hide_in_largedevice">
              {value?.orderStatus === "failed" ? (
                <span className="placeOrder-failed">Order Failed</span>
              ) : value?.orderStatus === "delivered" ? (
                <div
                  className="placeOrder_delivered"
                  onClick={() => downloadInvoice(value?.orderId)}
                >
                  <FaFileInvoiceDollar />
                  <span>Invoice</span>
                </div>
              ) : (
                <div
                  className="placeOrder_tack"
                  onClick={() =>
                    setTrackOrderModal({
                      show: true,
                      data: {
                        status: value?.orderStatus,
                        orderId: value?.orderId,
                      },
                    })
                  }
                >
                  <span>Track Order</span>
                  <TbViewfinder />
                </div>
              )}
            </div>

            <div className="placeOrder_item_container">
              {value.items.map((item) => (
                <div key={item._id} className="placeOrder_item">
                  <img
                    src={item.product.productPictures[0]?.img}
                    alt={"order"}
                    onClick={() => navigate(`/preview/${item?.product?._id}`)}
                  />
                  <div>
                    <h3
                      className="placeOrder_product_name"
                      onClick={() => navigate(`/preview/${item?.product?._id}`)}
                    >
                      {item?.product?.productName}
                    </h3>

                    <div className="placeOrder_size_qty">
                      <span>Size: {item.size}</span>
                      <span style={{ color: "var(--secondary-color)" }}>|</span>
                      <span>Quantity: {item.qty}</span>
                    </div>

                    <h4 className="placeOrder-product-price">
                      Rs. {item.price}
                    </h4>
                  </div>
                </div>
              ))}
            </div>

            <div className="placeOrder_delivery_details">
              <div className="placeOrder_payment">
                <h4>
                  <span style={{ textDecoration: "underline" }}>Payment</span>{" "}
                  <span style={paymentStatusStyle(value.paymentStatus)}>
                    {value.paymentStatus}
                  </span>
                </h4>
                {/* price details */}
                <div className="placeOrder_item_price_container">
                  <p>{paymentMethod[value?.paymentMethod]} </p>
                  <div className="placeOrder_item_price">
                    <div>
                      <span>
                        Price (
                        {value?.items?.length > 0
                          ? value.items.reduce(
                              (total, item) => total + item.qty,
                              0
                            )
                          : 0}{" "}
                        items)
                      </span>
                      <span>
                        Rs.{" "}
                        {value?.items?.length > 0
                          ? value?.items.reduce(
                              (total, item) => total + item.price * item.qty,
                              0
                            )
                          : 0}
                      </span>
                    </div>
                    <div>
                      <span>Delivery Charges</span>
                      <span>Rs. {DELIVERY_CHARGE}</span>
                    </div>
                  </div>

                  <div className="placeOrder_total_price">
                    <span>Total Amount</span>
                    <span>Rs. {value?.totalPrice}</span>
                  </div>
                </div>
              </div>
              <div className="placeOrder_delivery">
                <h4 style={{ textDecoration: "underline" }}>Delivery</h4>
                {value?.orderStatus === "delivered" && value.deliveredDate && (
                  <div className="placeOrder_delivery_date">
                    <p>
                      Your package has been delivered on{" "}
                      {getDate(value.deliveredDate)}
                    </p>
                  </div>
                )}
                <div className="placeOrder_delivery_address">
                  {/* <span>ADDRESS</span> */}
                  <span>
                    ADDRESS: {value?.address?.address}
                    {", "}
                    {value?.address?.locality}
                    {", "}
                    {value?.address?.cityDistrictTown}
                    {"-"}
                    {value?.address?.pinCode}
                    {", "} {value?.address?.state}, India
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={trackOrderModal?.show}
        onClose={() => setTrackOrderModal({ show: false, data: {} })}
      >
        <TrackOrder
          onClose={() => setTrackOrderModal({ show: false, data: {} })}
          value={trackOrderModal.data}
        />
      </Modal>
    </div>
  );
};

export default PlaceOrders;
