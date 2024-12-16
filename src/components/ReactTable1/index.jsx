import React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table";

const sizes = {
  xs: "py-[18px]",
};

const ReactTable1 = ({
  columns,
  data = [],
  headerProps = {},
  headerCellProps = {},
  bodyProps = {},
  className = "",
  rowDataProps = { className: "" },
  cellProps = { className: "" },
  size,
  ...restConfig
}) => {
  const tableConfig = {
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    ...restConfig,
  };

  const table = useReactTable(tableConfig);

  // Render the UI for your table
  return (
    <table
      className={`${className}`}
      style={{
        width: "100%", // Đảm bảo bảng sử dụng toàn bộ chiều rộng
      }}
    >
      <thead {...headerProps}>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr
            key={headerGroup.id}
            style={{
              backgroundColor: "#d1d5db", // Thay đổi màu nền thành màu đậm hơn
            }}
          >
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                {...header.column.columnDef?.meta}
                {...headerCellProps}
                style={{
                  padding: "8px", // Giữ khoảng cách hợp lý trong header
                  textAlign: "left",
                }}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...bodyProps}>
        {table.getRowModel().rows.map((row) => (
          <tr
            {...rowDataProps}
            className={`${rowDataProps?.className}`}
            key={row.id}
          >
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className={`${size ? sizes[size] : ""} ${cellProps?.className}`}
                style={{
                  padding: "8px", // Giữ khoảng cách hợp lý trong dữ liệu
                  textAlign: "left",
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { ReactTable1 };
