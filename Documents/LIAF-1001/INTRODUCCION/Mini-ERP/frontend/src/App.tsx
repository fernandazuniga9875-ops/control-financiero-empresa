import { useState, useEffect } from 'react';
import './App.css';

interface Producto {
  id: number;
  nombre: string;
  codigo: string;
  precio: number;
  stock: number;
  categoria: string;
}

function App() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [form, setForm] = useState({ nombre: '', codigo: '', precio: 0, stock: 0, categoria: '' });

  // 1. Función para obtener los productos (GET)
  const cargarProductos = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/productos', {
        headers: {
          'Authorization': 'Bearer mi-token-secreto' // <--- LÍNEA AGREGADA
        }
      });
      const datos = await respuesta.json();
      setProductos(datos.data);
    } catch (error) {
      console.error("Error al cargar productos", error);
    }
  };

  // Cargar productos al iniciar
  useEffect(() => {
    cargarProductos();
  }, []);

  // 2. Función para guardar un producto (POST)
  const guardarProducto = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const respuesta = await fetch('http://localhost:3000/api/productos', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer mi-token-secreto' // <--- LÍNEA AGREGADA
        },
        body: JSON.stringify(form)
      });
      
      if (respuesta.ok) {
        setForm({ nombre: '', codigo: '', precio: 0, stock: 0, categoria: '' });
        cargarProductos(); // Recargar la tabla
      } else {
        alert("Error al guardar. Revisa los datos (el precio debe ser mayor a 0).");
      }
    } catch (error) {
      console.error("Error al guardar", error);
    }
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>MINI ERP</h2>
        <ul>
          <li>Dashboard</li>
          <li style={{ backgroundColor: '#1abc9c' }}>Productos</li>
          <li>Clientes</li>
          <li>Ventas</li>
        </ul>
      </aside>

      <main className="main-content">
        <h1>Gestión de Productos</h1>
        
        {/* Formulario para agregar */}
        <form className="formulario" onSubmit={guardarProducto}>
          <input type="text" placeholder="Nombre" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} required />
          <input type="text" placeholder="Código" value={form.codigo} onChange={e => setForm({...form, codigo: e.target.value})} required />
          <input type="number" placeholder="Precio" value={form.precio || ''} onChange={e => setForm({...form, precio: Number(e.target.value)})} required />
          <input type="number" placeholder="Stock" value={form.stock || ''} onChange={e => setForm({...form, stock: Number(e.target.value)})} required />
          <input type="text" placeholder="Categoría" value={form.categoria} onChange={e => setForm({...form, categoria: e.target.value})} required />
          <button type="submit">Agregar Producto</button>
        </form>

        {/* Tabla de productos */}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Código</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoría</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td>{prod.nombre}</td>
                <td>{prod.codigo}</td>
                <td>${prod.precio}</td>
                <td>{prod.stock}</td>
                <td>{prod.categoria}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default App;