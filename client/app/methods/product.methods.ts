import axios from "axios"

const ip = "localhost"

export class Product {

    constructor() {

    }

    public getRemainItem = () => {
        return new Promise((resolve) => {
            axios.get("http://" + ip + ":3001/api/remainItem").then((res) => {
                resolve(res.data)
            })
        })
    }

    public getMoreProduct = (count: number) => {
        return new Promise((resolve) => {
            axios.post("http://" + ip + ":3001/api/moreItem", {
                count: count
            }).then((res) => {
                resolve(res.data)
            })
        })
    }
}