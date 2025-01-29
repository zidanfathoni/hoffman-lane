const formatToRupiah = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,  // Menentukan jumlah digit desimal
  }).format(amount);
};

export default formatToRupiah;