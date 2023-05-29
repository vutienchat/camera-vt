import { TableBody } from "@material-ui/core";
import React from "react";
import { CustomerItemContent } from "./item";

const content = [
  {
    id: "1",
    type: "COMPANY",
    customer_name: "GiangVanMinh",
    address: "99 Kim Ma",
    phone: "0987654321",
    email: "gvm@mail.vn",
    access_key: "be0aoisud",
    secret_key: "be0aoisud",
    created_date: "10:11:12 19/08/2023",
    last_modified: "10:11:12 19/08/2023",
    children: [
      {
        id: "1_1",
        type: "COMPANY",
        customer_name: "GiangVanMinh",
        address: "99 Kim Ma",
        phone: "0987654321",
        email: "gvm@mail.vn",
        access_key: "be0aoisud",
        secret_key: "be0aoisud",
        created_date: "10:11:12 19/08/2023",
        last_modified: "10:11:12 19/08/2023",
        children: [
          {
            id: "1_1_1",
            type: "COMPANY",
            customer_name: "GiangVanMinh",
            address: "99 Kim Ma",
            phone: "0987654321",
            email: "gvm@mail.vn",
            access_key: "be0aoisud",
            secret_key: "be0aoisud",
            created_date: "10:11:12 19/08/2023",
            last_modified: "10:11:12 19/08/2023",
            children: [
              {
                id: "1_1_1_1",
                type: "COMPANY",
                customer_name: "GiangVanMinh",
                address: "99 Kim Ma",
                phone: "0987654321",
                email: "gvm@mail.vn",
                access_key: "be0aoisud",
                secret_key: "be0aoisud",
                created_date: "10:11:12 19/08/2023",
                last_modified: "10:11:12 19/08/2023",
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "2",
    type: "COMPANY",
    customer_name: "GiangVanMinh",
    address: "99 Kim Ma",
    phone: "0987654321",
    email: "gvm@mail.vn",
    access_key: "be0aoisud",
    secret_key: "be0aoisud",
    created_date: "10:11:12 19/08/2023",
    last_modified: "10:11:12 19/08/2023",
    children: [
      {
        id: "2_1",
        type: "COMPANY",
        customer_name: "GiangVanMinh",
        address: "99 Kim Ma",
        phone: "0987654321",
        email: "gvm@mail.vn",
        access_key: "be0aoisud",
        secret_key: "be0aoisud",
        created_date: "10:11:12 19/08/2023",
        last_modified: "10:11:12 19/08/2023",
        children: [
          {
            id: "2_1_1",
            type: "COMPANY",
            customer_name: "GiangVanMinh",
            address: "99 Kim Ma",
            phone: "0987654321",
            email: "gvm@mail.vn",
            access_key: "be0aoisud",
            secret_key: "be0aoisud",
            created_date: "10:11:12 19/08/2023",
            last_modified: "10:11:12 19/08/2023",
            children: [
              {
                id: "2_1_1_1",
                type: "COMPANY",
                customer_name: "GiangVanMinh",
                address: "99 Kim Ma",
                phone: "0987654321",
                email: "gvm@mail.vn",
                access_key: "be0aoisud",
                secret_key: "be0aoisud",
                created_date: "10:11:12 19/08/2023",
                last_modified: "10:11:12 19/08/2023",
                children: [],
              },
              {
                id: "2_1_1_2",
                type: "COMPANY",
                customer_name: "GiangVanMinh",
                address: "99 Kim Ma",
                phone: "0987654321",
                email: "gvm@mail.vn",
                access_key: "be0aoisud",
                secret_key: "be0aoisud",
                created_date: "10:11:12 19/08/2023",
                last_modified: "10:11:12 19/08/2023",
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
];

export const CustomerTableBody = () => {
  return (
    <TableBody>
      {content.map((co) => (
        <CustomerItemContent task={co} />
      ))}
    </TableBody>
  );
};
