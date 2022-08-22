import React, { Component } from "react";
import "../../styles/footer.css";

export const Footer = () => (
	<footer className="footer bg-light mt-auto py-3 text-center">
		<p>
			Made with <i className="fa fa-heart text-danger" /> {" "}
			<i className="fa fa-coffee" /> by{" "} 
			
			<a href="https://github.com/Vero2112?tab=repositories">Vero</a>
		</p>
	</footer>
);
