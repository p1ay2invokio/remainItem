"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import { Product } from "./methods/product.methods";

export default function Home() {

  const product = new Product()

  const [products, setProducts] = useState<object[] | any>([])
  const [count, setCount] = useState<number>(5)

  const initial = async () => {

    const result = await product.getRemainItem()

    // console.log(result)
    setProducts(result)
  }

  useEffect(() => {
    initial()
  }, [])

  return (
    <div className="flex p-[50px] items-center flex-col">
      <table>
        <thead>
          <tr className="font-bold text-[20px] bg-black text-white text-center">
            <td>สินค้า</td>
            <td className="text-center">คงเหลือ</td>
          </tr>
        </thead>
        <tbody>

          {products && products.length > 0 ? products.map((item: { Message: string, Id: number }, index: number) => {
            let text = item.Message.split("คงเหลือ")
            // console.log(text)
            return (
              <tr className={`${index % 2 == 0 ? "bg-blue-500/30" : ""}`} key={item.Id}>
                <td><p className="w-[200px] text-nowrap overflow-hidden text-ellipsis">{text[0]}</p></td>
                <td className="w-[250px] text-center">{text[1]}</td>
              </tr>

            )
          }) : null}
        </tbody>
      </table>

      <button className="mb-[40px] mt-[20px]" onClick={async () => {
        setCount(count + 5)
        console.log(count)
        let data = await product.getMoreProduct(count)
        console.log(data)
        setProducts(data)
      }}>ดูเพิ่มเติม</button>
    </div>
  );
}
