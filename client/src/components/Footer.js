import React from 'react'

export default function Footer() {
    return (
        <footer>

        <div className="container d-flex justify-content-between">

        <div className="footer-logo">
            <img src="../img/voda delivery logo white.png" width="100" />
            <text>Delivering water to you since 2020!</text>
        </div>

        <div className="footer-nav">
            <text className="footer-titles"> Navigation </text>
            <a href="/"> Home </a>
            <a href="/items"> Items </a>
            <a href="/basket"> Cart </a>
        </div>

        <div className="footer-contacts">
            <text className="footer-titles"> Contacts </text>
            <text>2390  Lonely Oak Drive, Birmingham, EN</text>
            <text>205-500-8269</text>
            <text>voda-delivery@voda.com</text>
        </div>

        </div>

        </footer>
    )
}
