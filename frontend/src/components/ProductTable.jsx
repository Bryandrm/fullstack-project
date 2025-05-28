import React from 'react';

export default function ProductTable({ products }) {
  const total = products.reduce((sum, p) => sum + p.price, 0);
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Precio</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p, i) => (
          <tr key={i}>
            <td>{p.name}</td>
            <td>${p.price.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td><strong>Total</strong></td>
          <td><strong>${total.toFixed(2)}</strong></td>
        </tr>
      </tfoot>
    </table>
  );
}