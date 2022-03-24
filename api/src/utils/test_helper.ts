import User from '../models/User'

const initialProducts = [
    {
        title: "Timberland Core Tree Logo hoodie in dark blue",
        desc: "Act casual, Drawstring hood, Large logo print to chest, Pouch pocket, Regular fit",
        img: [
            "https://images.asos-media.com/products/timberland-core-tree-logo-hoodie-in-dark-blue/200615178-1-midblue?$n_640w$&wid=513&fit=constrain",
            "https://images.asos-media.com/products/timberland-core-tree-logo-hoodie-in-dark-blue/200615178-2?$n_640w$&wid=513&fit=constrain"
        ],
        categories: ["Hoodie", "Men"],
        size: ["XS", "S", "M", "L", "XL", "XXL"],
        color: ["darkblue"],
        price: 79.90
    },
    {
        title: "Timberland Core Tree Logo hoode",
        desc: "Act casual, Drawstring hood, Large logo pregular fit",
        img: [
            "https://images.asos-media.com/products/timberland-core-tree-log-blue/200615178-1-midblue?$n_640w$&wid=513&fit=constrain",
            "https://images.asos-media.com/products/timberland-core-tree-logo-hood/200615178-2?$n_640w$&wid=513&fit=constrain"
        ],
        categories: ["Hoodie", "Men"],
        size: ["XS", "S", "M", "L", "XL", "XXL"],
        color: ["darkblue"],
        price: 50
    }
]

const usersInDb = async () => {
    const users = await User.find({});
    return users.map(u => u.toJSON())
}

export default {
    initialProducts,
    usersInDb
}