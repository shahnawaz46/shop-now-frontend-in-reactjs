import { useEffect, useState } from 'react';
import { MdOutlineRemoveShoppingCart } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { TbViewfinder } from 'react-icons/tb';
import { toast } from 'react-toastify';

// components
import './style.css';
import axiosInstance from '../../../axios/AxiosInstance';
import { getDate } from '../../../utils/Date';
import Modal from '../../common/Modal';
import TrackOrder from '../TrackOrder';
import { DELIVERY_CHARGE } from '../../PlaceOrderProcess/OrderSummary';
import { ScreenLoading } from '../../Loaders';
import { API_STATUS } from '../../../utils/Constants';

const paymentMethod = {
  cod: 'Cash on Delivery',
  card: 'Card',
};

const PlaceOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trackOrderModal, setTrackOrderModal] = useState({
    show: false,
    data: {},
  });
  const [downloadInvoiceStatus, setDownloadInvoiceStatus] = useState(
    API_STATUS.IDLE
  );
  const navigate = useNavigate();

  const downloadInvoice = async (orderId) => {
    try {
      setDownloadInvoiceStatus(API_STATUS.LOADING);
      const res = await axiosInstance.get(
        `/order/generate-invoice/${orderId}`,
        {
          responseType: 'blob',
        }
      );

      // const blob = await res.blob();
      const blob = new Blob([res.data, { type: 'application/pdf' }]);
      const url = URL.createObjectURL(blob);
      // console.log(res.data, blob, url);

      const a = document.createElement('a');
      a.download = 'invoice.pdf';
      a.href = url;
      a.click();
      setDownloadInvoiceStatus(API_STATUS.SUCCESS);
    } catch (err) {
      setDownloadInvoiceStatus(API_STATUS.FAILED);
      // extract an error object from a Blob API Response
      const error = await err?.response?.data?.text();
      if (error) {
        const parsedError = JSON.parse(error);
        toast.error(parsedError?.error);
        return;
      }

      toast.error(err?.response?.data?.error || err?.message);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.get('/order');
        setAllOrders(res.data.orders);
        setLoading(false);
      } catch (err) {
        toast.error(err?.response?.data?.error || err?.message);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div
      className="placeOrder_container"
      style={{ height: loading ? '120px' : '100%' }}
    >
      {/* show loading icon after user click on download invoice button */}
      {downloadInvoiceStatus === API_STATUS.LOADING && (
        <ScreenLoading backgroundColor="rgba(0,0,0,0.5)" />
      )}

      {loading ? (
        <ScreenLoading />
      ) : !allOrders.length ? (
        <div className="placeorder-no-order">
          <MdOutlineRemoveShoppingCart className="placeorder-icon" />
          <div className="placeorder-no-order-content">
            <h3>You haven&apos;t placed any orders</h3>
            <h4>All your orders will appear here</h4>
          </div>
        </div>
      ) : (
        <div className="placeOrder_card_container">
          {allOrders.map((value, index) => (
            <div className="placeOrder_card" key={index}>
              <div className="placeOrder_top">
                <span className="placeOrder_Id">Order ID: {value.orderId}</span>

                {/* only for large device */}
                <div className="placeOrder_hide_in_smalldevice">
                  {value?.orderStatus === 'failed' ? (
                    <span
                      style={{
                        fontSize: '1.125rem',
                        fontWeight: 700,
                        color: 'var(--secondary-color)',
                      }}
                    >
                      Order Failed
                    </span>
                  ) : value?.orderStatus === 'delivered' ? (
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
                {value?.orderStatus === 'failed' ? (
                  <span
                    style={{
                      fontSize: '1.125rem',
                      fontWeight: 700,
                      color: 'var(--secondary-color)',
                    }}
                  >
                    Order Failed
                  </span>
                ) : value?.orderStatus === 'delivered' ? (
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
                  <div key={item?._id} className="placeOrder_item">
                    <img
                      src={item?.product?.productPictures[0]?.img}
                      alt={'order'}
                      onClick={() => navigate(`/preview/${item?.product?._id}`)}
                    />
                    <div>
                      <h3
                        className="placeOrder_product_name"
                        onClick={() =>
                          navigate(`/preview/${item?.product?._id}`)
                        }
                      >
                        {item?.product?.productName}
                      </h3>

                      <div className="placeOrder_size_qty">
                        <span>Size: {item.size}</span>
                        <span style={{ color: 'rgb(212 212 207)' }}>|</span>
                        <span>Quantity: {item.qty}</span>
                      </div>

                      <h4 style={{ fontWeight: '500' }}>Rs. {item.price}</h4>
                    </div>
                  </div>
                ))}
              </div>

              <div className="placeOrder_delivery_details">
                <div className="placeOrder_payment">
                  <h4>
                    <span style={{ textDecoration: 'underline' }}>Payment</span>{' '}
                    {value?.paymentStatus === 'failed' && (
                      <span style={{ color: 'var(--secondary-color)' }}>
                        (Failed)
                      </span>
                    )}
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
                            : 0}{' '}
                          items)
                        </span>
                        <span>
                          Rs.{' '}
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
                  <h4 style={{ textDecoration: 'underline' }}>Delivery</h4>
                  {value?.orderStatus === 'delivered' && (
                    <div className="placeOrder_delivery_date">
                      <p>
                        Your package has been delivered on{' '}
                        {getDate(value?.deliveredDate, false)}
                      </p>
                    </div>
                  )}
                  <div className="placeOrder_delivery_address">
                    {/* <span>ADDRESS</span> */}
                    <span>
                      ADDRESS: {value?.address?.address}
                      {', '}
                      {value?.address?.locality}
                      {', '}
                      {value?.address?.cityDistrictTown}
                      {'-'}
                      {value?.address?.pinCode}
                      {', '} {value?.address?.state}, India
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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
