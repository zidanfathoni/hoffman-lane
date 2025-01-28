
import { Storage } from "@/lib";


export interface Order {
  table: number;
  comment: string;
  items: OrderItems[];
}

export interface OrderItems {
  id: number;
  name: string;
  description: string;
  category: string;
  image: string;
  quantity: number;
  price: number;
}

// Mendapatkan semua data order dari localStorage
export const getOrders = (): OrderItems[] => {
  if (typeof window !== "undefined") {
    const orders = Storage.get("local", "orders");
    return typeof orders === 'string' ? JSON.parse(orders) : [];
  }
  return [];
};

//Menambahkan nomor table ke localStorage
export const addTable = (table: number): void => {
  Storage.set("local", "table", table);
};

// Mendapatkan nomor table dari localStorage
export const getTable = (): number => {
  const table = Storage.get("local", "table");
  return typeof table === 'number' ? table : 0;
};

// Menambahkan order baru ke localStorage
export const addOrder = (newOrder: OrderItems): void => {
  const currentOrders = getOrders();

  // Cek apakah item sudah ada di order
  const isExist = currentOrders.some(order => order.id === newOrder.id);

  if (isExist) {
    // Jika item sudah ada, tambahkan quantity
    const updatedOrders = currentOrders.map(order => {
      if (order.id === newOrder.id) {
        return { ...order, quantity: order.quantity + newOrder.quantity };
      }
      return order;
    });
    Storage.set("local", "orders", JSON.stringify(updatedOrders));
  } else {
    // Jika item belum ada, tambahkan item baru
    Storage.set("local", "orders", JSON.stringify([...currentOrders, newOrder]));
  }
};

// Menghapus order berdasarkan id
export const deleteOrder = (orderId: number): void => {
  const currentOrders = getOrders();
  const updatedOrders = currentOrders.filter(order => order.id !== orderId);
  Storage.set("local", "orders", JSON.stringify(updatedOrders));
};

// Mengupdate order berdasarkan id
export const updateOrder = (updatedOrder: OrderItems): void => {
  const currentOrders = getOrders();
  const updatedOrders = currentOrders.map(order =>
    order.id === updatedOrder.id ? updatedOrder : order
  );
  Storage.set("local", "orders", JSON.stringify(updatedOrders));
};

export const incrementOrderQty = (orderId: number, qtyToAdd: number): void => {
  const currentOrders = getOrders();

  const updatedOrders = currentOrders.map(order => {
    if (order.id === orderId) {
      return { ...order, quantity: order.quantity + qtyToAdd };
    }
    return order;
  });

  Storage.set("local", "orders", JSON.stringify(updatedOrders));
};

export const decrementOrderQty = (orderId: number): void => {
  const currentOrders = getOrders();

  const updatedOrders = currentOrders
    .map(order => {
      if (order.id === orderId) {
        if (order.quantity > 1) {
          return { ...order, quantity: order.quantity - 1 }; // Kurangi quantity
        }
        return null; // Hapus item jika quantity jadi 0
      }
      return order;
    })
    .filter(order => order !== null); // Hapus item null dari array

  Storage.set("local", "orders", JSON.stringify(updatedOrders));
};