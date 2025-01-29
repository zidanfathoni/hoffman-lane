import { Button, Card, CardContent, Separator } from "@/components/atoms";
import { Input } from "@/components/atoms/input";
import { ChevronRight, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { decrementOrderQty, deleteAllOrder, deleteOrder, getOrders, getTable, incrementOrderQty, Order, OrderItems } from "./order";
import formatToRupiah from "@/helper/formatRupiah";
import { api } from "@/lib";
import { ResponseOrder } from "./response-order";
import { toast } from "@/components/atoms/use-toast";




const OrderModules: React.FC = () => {
  const cdnImage = process.env.NEXT_PUBLIC_CDN_URL + "/assets/";
  const [ordersItems, setOrdersItems] = useState<OrderItems[]>([]);
  const [orders, setOrders] = useState<Order | null>(null);
  const [ordersResponse, setOrdersResponse] = useState<ResponseOrder | null>(null);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [ppn, setPpn] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [table, setTable] = useState(0);
  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // const [data]

  const setupPayment = () => {
    const snapScript: string = "https://app.sandbox.midtrans.com/snap/snap.js"
    const clientKey: any = process.env.MIDTRANS_CLIENT_KEY

    const script = document.createElement('script')
    script.src = snapScript

    script.setAttribute("data-client-key", clientKey)
    script.async = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
      // ; (window as any).snap.pay(
      //   'fsdfsfsfsf',
      //   {
      //     // Optional
      //     onSuccess: function (result: any) {
      //       console.log('success');
      //       /* You may add your own js here, this is just example */
      //       toast({
      //         title: 'Success',
      //         description: `Payment Success`,
      //       });
      //     },
      //     // Optional
      //     onPending: function (result: any) {
      //       console.log('pending');
      //       /* You may add your own js here, this is just example */
      //       toast({
      //         title: 'Pending',
      //         description: `Payment Pending`,
      //       });
      //     },
      //     // Optional
      //     onError: function (result: any) {
      //       console.log('error');
      //       /* You may add your own js here, this is just example */
      //       toast({
      //         variant: 'destructive',
      //         title: 'Error',
      //         description: `Payment Error`,
      //       });
      //     }
      //   }
      // )
    }
  }


  useEffect(() => {
    setupPayment();
    // Ambil data order dari localStorage saat komponen dimuat
    setOrdersItems(getOrders());
    setTable(getTable());
    setOrders(orders);
  }, []);

  const calculateTotal = () => {
    let total = 0;
    ordersItems.map(order => {
      total += order.price * order.quantity;
    });
    return total;
  }

  const calculatePpn = () => {
    return calculateTotal() * 0.1;
  }

  const calculateSubTotal = () => {
    return calculateTotal() - calculatePpn();
  }

  useEffect(() => {
    setTotal(calculateTotal());
    setPpn(calculatePpn());
    setSubTotal(calculateSubTotal());
  }, [ordersItems]);

  // Fungsi untuk handle penghapusan order
  const handleDeleteOrder = (id: number) => {
    deleteOrder(id);
    setOrdersItems(getOrders()); // Refresh data dari localStorage
  };

  // Fungsi untuk handle pengurangan quantity order
  const handleDecrementQty = (id: number) => {
    decrementOrderQty(id);
    setOrdersItems(getOrders()); // Refresh data dari localStorage
  };

  // Fungsi untuk handle penambahan quantity order
  const handleIncrementQty = (id: number) => {
    incrementOrderQty(id, 1); // Tambahkan qty sebanyak 1
    setOrdersItems(getOrders()); // Refresh data dari localStorage
  };


  const postOrder = async () => {
    setLoading(true);
    try {
      const response = await api.post(`/order/`,
        JSON.stringify({
          gross_amount: total,
          order_status: "pending",
          qty: ordersItems.length,
          table: table,
          items: ordersItems.map(order => ({
            id_menu: order.id,
            qty: order.quantity,
            total: order.price * order.quantity
          })),

        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }); // ganti '/endpoint' dengan endpoint yang sesuai
      ; (window as any).snap.pay(
        ordersResponse?.data.snapToken,
        {
          // Optional
          onSuccess: async function (result: any) {
            console.log('success');
            /* You may add your own js here, this is just example */
            await updateOrder();
            toast({
              title: 'Success',
              description: `Payment Success`,
            });
          },
          // Optional
          onPending: function (result: any) {
            console.log('pending');
            /* You may add your own js here, this is just example */
            toast({
              title: 'Pending',
              description: `Payment Pending`,
            });
          },
          // Optional
          onError: function (result: any) {
            console.log('error');
            /* You may add your own js here, this is just example */
            toast({
              variant: 'destructive',
              title: 'Error',
              description: `Payment Error`,
            });
          }
        }
      )
      setOrdersResponse(response.data);
    } catch (error) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
      // close dialog

    }
  };


  const updateOrder = async () => {
    setLoading(true);
    try {
      const response = await api.put(`/order/${ordersResponse?.data.order.id_order}`,
        JSON.stringify({
          order_status: "PAID"

        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }); // ganti '/endpoint' dengan endpoint yang sesuai
    } catch (error) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
      // close dialog

      deleteAllOrder();
      window.location.reload();

    }
  };

  const handleCheckout = async () => {
    //check table
    if (table === 0) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `Table number cannot be 0, please use real table number!`,
      });
    } else if (ordersItems.length === null || ordersItems.length === 0) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `Please Order`,
      });
    } else {
      postOrder();
    }
  }


  return (
    <div className=" mx-auto px-4 py-6 pt-10 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Cart and Checkout</h1>

      <div className="relative grid gap-6 lg:grid-cols-[2fr_1fr]">
        {/* Product Card */}
        <div className="space-y-6 flex flex-col gap-12 lg:gap-20">
          <Card>
            <CardContent className="p-6">
              {/* Product Details */}
              {
                ordersItems.map((order) => (
                  <div key={order.id}>
                    <div className="flex flex-col md:flex-row gap-6 py-1">
                      <div className="relative w-full md:w-[300px] h-[200px] rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={cdnImage + order.image}
                          alt={order.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 space-y-4">
                        <div>
                          <h2 className="text-2xl font-semibold">{order.name}</h2>
                          <p className="text-gray-600 mt-2">{order.description}</p>
                          <p className="text-sm text-gray-500 mt-2">Category : {order.category}</p>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xl font-semibold">{formatToRupiah(order.price)}</span>
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleDecrementQty(order.id)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{order.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleIncrementQty(order.id)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Separator />
                  </div>
                ))
              }

              {/* Empty Cart */}
              {
                ordersItems.length === 0 && (
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <p className="text-lg font-semibold">Your cart is empty</p>
                    <Button className="w-full">Explore Menu</Button>
                  </div>
                )
              }

            </CardContent>
          </Card>
        </div>

        {/* Price Summary and Checkout */}
        <div className="space-y-4 top-40 h-fit md:sticky">
          {/* Price Summary Card */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">
                    PRICE SUMMARY <span className="text-gray-500">
                      ({
                        ordersItems.length > 0 ? `${ordersItems.length} Items` : "0 Items"
                      })
                    </span>
                  </h2>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Sub Total</span>
                    <span>{formatToRupiah(subTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discount</span>
                    <span>{formatToRupiah(discount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>PPN 10%</span>
                    <span>{formatToRupiah(ppn)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatToRupiah(total)}</span>
                  </div>
                  <p className="text-sm text-gray-500 italic">The prices above include shipping costs</p>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Table Number</label>
                    <Input
                      type="number"
                      placeholder="Add your table number..."
                      className="w-full"
                      value={table}
                      onChange={(e) => setTable(parseInt(e.target.value))}
                    />
                    <p className="text-sm text-gray-500 italic">Make sure the table number is correct</p>
                  </div>
                  {/* Comment Section */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Add Comment</label>
                    <Input
                      placeholder="Add your comment here..."
                      className="w-full"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Checkout Button */}
          <Button
            className={
              `w-full h-14 ${ordersItems.length === 0 && "cursor-not-allowed bg-muted"}`

            }
            size="lg"
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OrderModules;