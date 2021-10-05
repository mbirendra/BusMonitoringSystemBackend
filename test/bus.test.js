const Registration = require('../models/accountModule');
const Product = require('../models/productModel')
const Booking = require('../models/bookingModel')
const mongoose = require('mongoose');


const url = 'mongodb://localhost:27017/busmonitor';

beforeAll(async()=>{
    await mongoose.connect(url,
        {
            useNewUrlParser:true,
            useCreateIndex:true
        }
    )
})

afterAll(async()=>{
    await mongoose.connection.close();
})

describe("User Testing",()=>{
    
    it("User Registration Testing",()=>{
        const user = {
            fullname: "test5",
            username: "test5",
            email: "test5@gmail.com",
            phone: "789563210",
            password: "123456",
            Usertype: "Admin"
        }

        return Registration.create(user)
        .then((reg_ret)=>{
            expect(reg_ret.fullname).toEqual("test5")
        })
    })

    
    it("Product Addition Testing",()=>{
        const product = {
           
            pName: "Glass1",
            pDesc: "Clean",
            pPrice: 2351,
            pImage: "No-img.jpg",
            pRating: 5


        }

        return Product.create(product)
        .then((product_ret)=>{
            expect(product_ret.pName).toEqual("Glass1")
        })
    })



    it("Testing Product update",async ()=>{
       const status = await Product.updateOne({_id:Object("607eb6cc38ffca2698441110")},{
            $set:{
                "pName":"Rayban"
            }
        })
     
        expect(status.ok).toBe(1)
    })


    it("Testing for Product Delete",async ()=>{
        const status = await Product.deleteOne({
            "_id":Object("607eb6cc38ffca2698441110")
        })
     expect(status.ok).toBe(1);
        
    })


    it("Testing for product booking",()=>{
            const booking = {
                "user_id": "606a0f95750cef28d09b3991",
                "product_id": "607c599c3e3e5d0ffc8e0822",
                "quantity": 6,
                "price": 1250,
                "booked_At": "2021-04-16"
            
            }

            return Booking.create(booking)
            .then((booking_ret)=>{
                expect(booking_ret.quantity).toEqual(6)
            })
    })


    it("Testing for Booking Delete",async ()=>{
        const status = await Booking.deleteOne({
            "_id": Object("607eb6cc38ffca2698441110")
        })
        expect(status.ok).toBe(1);
    })


    
    it("Testing Booking update",async ()=>{
       const status = await Booking.updateOne({_id:Object("607c9c604e6a1f0d4c2d09b5")},{
            $set:{
                "quantity":3
            }
        })
     
        expect(status.ok).toBe(1)
    })



    it("Testing user details update",async ()=>{
        const status = await Registration.updateOne({
            "_id":Object("606a0f95750cef28d09b3991")
        },
        {
            $set:{
                "accFN":"usertest",
                "accUN":"tester"
            }
        })

        expect(status.ok).toBe(0)
        
    })
})