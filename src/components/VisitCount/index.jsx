import React, { useEffect, useState } from 'react';

export default function VisitCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Ambil jumlah visit dari localStorage
    const storedCount = localStorage.getItem('visitCount');
    const newCount = storedCount ? parseInt(storedCount) + 1 : 1;

    // Update state dan simpan kembali ke localStorage
    setCount(newCount);
    localStorage.setItem('visitCount', newCount);
  }, []);

  return (
    <div className="p-4 bg-white rounded-xl shadow text-center">
      <h2 className="text-xl font-bold">Jumlah Kunjungan</h2>
      <p className="text-2xl mt-2">{count}</p>
    </div>
  );
};


