"use client"

import { useEffect, useState } from "react";
import { BarChartUsers } from "./bar-chart"
import { DataSummary, GetSummaryResponse } from "@/lib/interface/get-summary";
import { api } from "@/lib";
import formatToRupiah from "@/helper/formatRupiah";
import { DataChart, GetChartResponse } from "@/lib/interface/get-chart";

interface TopMenu {
  id_menu: number;
  total_qty: string;
  name: string;
  description: string;
  category: string;
}


const DashboardModules = () => {
  const [data, setData] = useState<DataSummary | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [emptyData, setEmptyData] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [dataChart, setDataChart] = useState<DataChart[]>([]);
  const [loadingChart, setLoadingChart] = useState<boolean>(true);
  const [emptyDataChart, setEmptyDataChart] = useState<boolean>(false);
  const [errorChart, setErrorChart] = useState<string | null>(null);



  const [topMenus, setTopMenus] = useState<TopMenu[]>([]);
  const [loadingTopMenus, setLoadingTopMenus] = useState<boolean>(true);
  const [errorTopMenus, setErrorTopMenus] = useState<string | null>(null);

  const fetchDataSummary = async () => {
    try {
      const response = await api.get<GetSummaryResponse>(`/order/total`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setData(response.data.data);
      if (response.data.data === null) {
        setEmptyData(true);
      } else {
        setEmptyData(false);
      }
    } catch (error) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }

  const fetchDataChart = async () => {
    try {
      const response = await api.get<GetChartResponse>(`/order/summary`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setDataChart(response.data.data);
      if (response.data.data === null) {
        setEmptyDataChart(true);
      } else {
        setEmptyDataChart(false);
      }
    } catch (error) {
      setErrorChart('Failed to fetch data');
    } finally {
      setLoadingChart(false);
    }
  }

  const fetchTopMenus = async () => {
    try {
      const response = await api.get<{ status: boolean; message: string; data: TopMenu[] }>(`/order/most-ordered`);
      setTopMenus(response.data.data);
    } catch (error) {
      setErrorTopMenus('Failed to fetch top menus');
    } finally {
      setLoadingTopMenus(false);
    }
  };

  useEffect(() => {
    fetchDataSummary();
    fetchDataChart();
    fetchTopMenus();
  }, []);

  if (loading) {
    return <p>Loading...</p>
  }

  return (

    <section>
      <div className="container">

        <div className="mt-14 grid gap-x-5 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
          <div
            className="border border-primary rounded-3xl p-5 shadow-lg overflow-hidden"
          >
            <div className="flex flex-col gap-5">
              <p className="truncate">Total {data?.transaction.name}</p> {/* Gunakan truncate jika teks panjang */}
              <div className="text-2xl font-bold break-words">
                {formatToRupiah(parseInt(data?.transaction.total ?? "0"))}
              </div>
            </div>
          </div>
          <div
            className="border border-primary rounded-3xl p-5 shadow-lg overflow-hidden"
          >
            <div className="flex flex-col gap-5">
              <p className="truncate">Total {data?.stok.name}</p> {/* Gunakan truncate jika teks panjang */}
              <div className="text-2xl font-bold break-words">
                {data?.stok.total}
              </div>
            </div>
          </div>
          <div
            className="border border-primary rounded-3xl p-5 shadow-lg overflow-hidden"
          >
            <div className="flex flex-col gap-5">
              <p className="truncate">Total {data?.menu.name}</p> {/* Gunakan truncate jika teks panjang */}
              <div className="text-2xl font-bold break-words">
                {data?.menu.total}
              </div>
            </div>
          </div>
          <div
            className="border border-primary rounded-3xl p-5 shadow-lg overflow-hidden"
          >
            <div className="flex flex-col gap-5">
              <p className="truncate">Total {data?.reservation.name}</p> {/* Gunakan truncate jika teks panjang */}
              <div className="text-2xl font-bold break-words">
                {data?.reservation.total}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <BarChartUsers
            title="Total transaction"
            description="Total transaction per month"
            items={dataChart}
            footer={{
              title: "Increased by 20%",
              description: "Compared to the previous period",
            }}
          />
        </div>

        <div className="mt-14">
          <h2 className="text-xl font-bold">List of Top Menu</h2>
          {loadingTopMenus ? (
            <p>Loading top menus...</p>
          ) : errorTopMenus ? (
            <p className="text-red-500">{errorTopMenus}</p>
          ) : (
            <div className="border border-gray-300 rounded-lg p-5 shadow-lg mt-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Name</th>
                    <th className="text-left p-2">Description</th>
                    <th className="text-left p-2">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {topMenus.map((menu) => (
                    <tr key={menu.id_menu} className="border-b">
                      <td className="p-2">{menu.name}</td>
                      <td className="p-2">{menu.description}</td>
                      <td className="p-2">{menu.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default DashboardModules