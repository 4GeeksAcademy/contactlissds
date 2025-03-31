import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Estilos globales
import { RouterProvider } from 'react-router-dom';  // Importar RouterProvider para usar el enrutador
import { router } from './routes';  // Importar la configuración del enrutador
import { ContactProvider } from './store';  // Usar ContactProvider para el manejo de estado global

const Main = () => {
    return (
        <React.StrictMode>
            {/* Proporcionar el estado global de contactos a toda la aplicación */}
            <ContactProvider>
                {/* Configurar el enrutador para la aplicación */}
                <RouterProvider router={router} />
            </ContactProvider>
        </React.StrictMode>
    );
}

// Renderizar el componente Main en el elemento raíz del DOM.
ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
