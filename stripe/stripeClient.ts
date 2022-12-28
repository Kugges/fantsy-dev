import React from 'react'
import { getApp } from "@firebase/app"
import { getStripePayments, getProducts, createCheckoutSession } from '@stripe/firestore-stripe-payments'

const stripeClient = () => {
}

const gotApp = getApp();

const payments = getStripePayments(gotApp, {
    productsCollection: "subscriptions",
    customersCollection: "users",
})

// const products = getProducts(payments, {
//     indludePrices: true,
//     activeOnly: true,
// })

const session = await createCheckoutSession(payments, {
    price: "price_1MEauJCOMPrKhD3nDi3pDnS3",
    success_url: window.location.origin,
    cancel_url: window.location.origin,
})
export default stripeClient