import {chartsConfig} from "../configs/charts-config";
import {useGetCountUserByWeekQuery} from "@/services/user.service.js";
import {useGetAuctionCreatedMonthQuery} from "@/services/auction.service.js";

export const StatisticsChartsData = () => {
    // Lấy dữ liệu từ API
    const { data: countUser, isLoading: isLoadingCountUser } = useGetCountUserByWeekQuery();
    const { data: auctionMonth, isLoading: isLoadingAuctionMonth } = useGetAuctionCreatedMonthQuery();

    // Kiểm tra trạng thái loading
    if (isLoadingCountUser || isLoadingAuctionMonth) {
        return <div>Loading...</div>;
    }

    // Cấu hình biểu đồ "Số lượng người bán"
    const websiteViewsChart = {
        type: "bar",
        height: 220,
        series: [
            {
                name: "Views",
                data: countUser?.data?.data || [], // Dữ liệu từ API hoặc giá trị mặc định
            },
        ],
        options: {
            ...chartsConfig,
            colors: ["#388e3c"],
            plotOptions: {
                bar: {
                    columnWidth: "16%",
                    borderRadius: 5,
                },
            },
            xaxis: {
                ...chartsConfig.xaxis,
                categories: ["M", "T", "W", "T", "F", "S", "S"], // Cần khớp với dữ liệu `countUser`
            },
        },
    };

    // Cấu hình biểu đồ "Daily Sales"
    const dailySalesChart = {
        type: "line",
        height: 220,
        series: [
            {
                name: "Sales",
                data: auctionMonth?.data?.data || [], // Dữ liệu từ API hoặc giá trị mặc định
            },
        ],
        options: {
            ...chartsConfig,
            colors: ["#4ade80"],
            stroke: {
                lineCap: "round",
            },
            markers: {
                size: 5,
            },
            xaxis: {
                ...chartsConfig.xaxis,
                categories: [
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                ], // Điều chỉnh nếu cần khớp với dữ liệu `auctionMonth`
            },
        },
    };

    // Cấu hình biểu đồ "Completed Tasks"
    const completedTaskChart = {
        type: "line",
        height: 220,
        series: [
            {
                name: "Tasks",
                data: [50, 40, 300, 320, 500, 350, 200, 230, 500], // Dữ liệu giả hoặc có thể cập nhật động
            },
        ],
        options: {
            ...chartsConfig,
            colors: ["#388e3c"],
            stroke: {
                lineCap: "round",
            },
            markers: {
                size: 5,
            },
            xaxis: {
                ...chartsConfig.xaxis,
                categories: [
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                ],
            },
        },
    };

    // Dữ liệu bảng thống kê
    return [
        {
            color: "white",
            title: "Số lượng người bán",
            description: "Last Campaign Performance",
            footer: "",
            chart: websiteViewsChart,
        },
        {
            color: "white",
            title: "Daily Sales",
            description: "15% increase in today's sales",
            footer: "",
            chart: dailySalesChart,
        },
        {
            color: "white",
            title: "Completed Tasks",
            description: "Last Campaign Performance",
            footer: "",
            chart: completedTaskChart,
        },
    ];
};

export default StatisticsChartsData;
