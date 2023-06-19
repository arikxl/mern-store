import bcrypt from 'bcryptjs';
// instal bcryptjs

const data = {
    users: [
        {
            name: 'Arik Alexandrov',
            email: 'arikxl@gmail.com',
            password: bcrypt.hashSync('111'),
            isAdmin: true
      }  ,
        {
            name: 'Linoy Katz',
            email: 'linoy@gmail.com',
            password: bcrypt.hashSync('111'),
            isAdmin: false
      }  ,
    ],
    products: [
        {
            title: 'Nike Slim shirt',
            slug: 'nike-slim-shirt',
            category: 'Shirts',
            img1: '../img/p1.jpg',
            price: 100,
            stock: 10,
            brand: 'Nike',
            rating: 4.5,
            numOfReviews: 10,
            desc: 'High quality shirt'
        },
        {
            title: 'Adidas Fit pants',
            slug: 'adidas-fit-pants',
            category: 'Pants',
            img1: '../img/p3.jpg',
            price: 120,
            stock: 2,
            brand: 'Adidas',
            rating: 5,
            numOfReviews: 33,
            desc: 'Best pants in the world'
        },
        {
            title: 'Nike Slim pants',
            slug: 'nike-slim-pants',
            category: 'Pants',
            img1: '../img/p4.jpg',
            price: 80,
            stock: 8,
            brand: 'Nike',
            rating: 4,
            numOfReviews: 11,
            desc: 'High quality pants'
        },
        {
            title: 'Adidas Slim shirt',
            slug: 'adidas-slim-shirt',
            category: 'Shirts',
            img1: '../img/p2.jpg',
            price: 111,
            stock: 0,
            brand: 'Adidas',
            rating: 0,
            numOfReviews: 0,
            desc: 'great shirt'
        },
    ]
}


export default data