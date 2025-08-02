import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)

if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register("/service-worker.js")
		.then(() => console.log("Service Worker registrado"))
		.catch(err => console.error("Error al registrar SW", err));
}
