import { useState, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [status, setStatus] = useState('Iniciando...');
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!API_URL) {
      setStatus('Modo Solo Frontend (Sin Backend configurado)');
      return;
    }

    setStatus('Intentando conectar al Backend...');
    
    fetch(`${API_URL}/`)
      .then(response => {
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        return response.json();
      })
      .then(json => {
        setStatus('Conexión Exitosa (Frontend + Backend)');
        setData(json);
      })
      .catch(error => {
        setStatus('Error de Conexión (Backend no responde o CORS)');
        console.error(error);
        setData(error.message);
      });
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Estado del Sistema</h1>
      
      {/* Tarjeta de Estado */}
      <div style={{ 
        padding: '1rem', 
        borderRadius: '8px', 
        backgroundColor: API_URL ? '#8bcfffff' : '#ffd186ff',
        border: '1px solid #ccc',
        marginBottom: '1rem'
      }}>
        <h3>{status}</h3>
        <p>
          <strong>Configuración Actual: </strong> 
          {API_URL ? `Conectado a ${API_URL}` : 'Modo Aislado (Solo Frontend)'}
        </p>
      </div>

      {/* Solo mostramos datos si existen */}
      {data && (
        <>
          <h3>Respuesta del Servidor:</h3>
          <pre style={{ background: '#282c34', color: 'white', padding: '1rem', borderRadius: '5px' }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </>
      )}
    </div>
  );
}

export default App