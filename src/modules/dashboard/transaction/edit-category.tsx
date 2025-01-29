import { Button } from "@/components/atoms/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/atoms/dialog"
import { Input } from "@/components/atoms/input"
import { Label } from "@/components/atoms/label"
import { useEffect, useState } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select"
import { api } from "@/lib"
import { DataOrderById, GetOrdersByIdResponse } from "@/lib/interface/orders/get-orders-byId"
import { Card, CardContent } from "@/components/atoms"
import { Car } from "lucide-react"

interface DetailOrderDialogProps {
  isOpen: boolean
  id: number
}

const DetailOrderDialog: React.FC<DetailOrderDialogProps> = ({ isOpen, id }) => {
  const cdnImage = process.env.NEXT_PUBLIC_CDN_URL + "/assets/";
  const [orderStatus, setOrderStatus] = useState<string>('');
  const [orderTime, setOrderTime] = useState<string>('');
  const [qty, setQty] = useState<number>(0);
  const [grossAmount, setGrossAmount] = useState<number>(0);
  const [table, setTable] = useState<number>(0);

  const [response, setResponse] = useState<GetOrdersByIdResponse>();
  const [dataDetailOrderById, setDataDetailOrderById] = useState<DataOrderById | null>(null);
  const [loadingDetailOrderById, setLoadingDetailOrderById] = useState<boolean>(true);
  const [emptyDataDetailOrderById, setEmptyDataDetailOrderById] = useState<boolean>(false);
  const [errorDetailOrderById, setErrorDetailOrderById] = useState<string | null>(null);

  const fetchDataDetailOrderById = async () => {
    setLoadingDetailOrderById(true);
    try {
      const response = await api.get<GetOrdersByIdResponse>(`/order/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      }); // ganti '/endpoint' dengan endpoint yang sesuai
      setDataDetailOrderById(response.data.data);
      setOrderStatus(response.data.data.order_status);
      setOrderTime(response.data.data.order_time);
      setQty(response.data.data.qty);
      setGrossAmount(response.data.data.gross_amount);
      setTable(response.data.data.table);
    } catch (error) {
      setErrorDetailOrderById('Failed to fetch data');
    } finally {
      setLoadingDetailOrderById(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchDataDetailOrderById();
    }
  }, []);



  // const onSelect = (value: string) => {
  //   if (value === 'admin') {
  //     setRole(1)
  //   } else {
  //     setRole(2)
  //   }

  // }

  return (
    <DialogContent className="sm:max-w-6xl">
      <DialogHeader>
        <DialogTitle>Detail Order</DialogTitle>
      </DialogHeader>
      {
        loadingDetailOrderById ?
          <div>Loading...</div> :
          emptyDataDetailOrderById ?
            <div>No data</div> :
            errorDetailOrderById ?
              <div>{errorDetailOrderById}</div> :
              <div>
                <form

                >
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="order_status" className="text-right">
                        Order Status
                      </Label>
                      <Input
                        id="order_status"
                        disabled
                        defaultValue={orderStatus}
                        className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="order_time" className="text-right">
                        Order Time
                      </Label>
                      <Input
                        id="order_time"
                        disabled
                        defaultValue={orderTime}
                        className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="qty" className="text-right">
                        Qty
                      </Label>
                      <Input
                        id="qty"
                        disabled
                        defaultValue={qty}
                        className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="gross_amount" className="text-right">
                        Gross Amount
                      </Label>
                      <Input
                        id="gross_amount"
                        disabled
                        defaultValue={grossAmount}
                        className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="table" className="text-right">
                        Table
                      </Label>
                      <Input
                        id="table"
                        disabled
                        defaultValue={table}
                        className="col-span-3" />
                    </div>


                  </div>
                </form>
                <div className="pt-12 grid grid-cols-[1fr_5fr] items-center gap-4">
                  <Label htmlFor="items" className="text-right flex items-center">
                    Items
                  </Label>
                  <div className="flex flex-col">
                    {
                      dataDetailOrderById?.items.map((item, index) => {
                        return (
                          <Card key={index} className="border-solid shadow-none p-1 m-1">

                            <CardContent className="space-y-4 p-0">
                              <div
                                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                              >
                                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                                <div className="space-y-1">
                                  <p className="text-sm font-medium leading-none">
                                    {item.name}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {item.qty} pcs - ({item.total})
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
      }

      {/* <DialogFooter>
        <Button
          onClick={submitHandler}
        >Save changes</Button>
      </DialogFooter> */}
    </DialogContent>
  )
}


export default DetailOrderDialog