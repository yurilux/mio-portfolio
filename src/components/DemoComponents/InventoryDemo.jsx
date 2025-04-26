import React, { useState } from 'react';
import styles from './InventoryDemo.module.css'; // Creeremo questo file CSS

// Dati iniziali di esempio
const initialInventory = [
  { id: 1, type: 'Laptop', model: 'Dell Latitude 5400', serial: 'SN123ABC', status: 'In Use' },
  { id: 2, type: 'Monitor', model: 'Dell U2419H', serial: 'SN456DEF', status: 'In Use' },
  { id: 3, type: 'Printer', model: 'HP LaserJet M404', serial: 'SN789GHI', status: 'In Storage' },
  { id: 4, type: 'Laptop', model: 'Lenovo ThinkPad T480', serial: 'SN101JKL', status: 'Needs Repair' },
];

// Opzioni per i dropdown
const deviceTypes = ['Laptop', 'Desktop', 'Monitor', 'Printer', 'Keyboard', 'Mouse', 'Other'];
const deviceStatuses = ['In Use', 'In Storage', 'Needs Repair', 'Decommissioned'];

function InventoryDemo() {
  const [inventoryItems, setInventoryItems] = useState(initialInventory);
  const [nextId, setNextId] = useState(initialInventory.length + 1); // Per generare ID semplici

  // Stato per il form di aggiunta
  const [newItemType, setNewItemType] = useState(deviceTypes[0]); // Default al primo tipo
  const [newItemModel, setNewItemModel] = useState('');
  const [newItemSerial, setNewItemSerial] = useState('');
  const [newItemStatus, setNewItemStatus] = useState(deviceStatuses[0]); // Default al primo status

  const handleAddItem = (event) => {
    event.preventDefault(); // Previene ricaricamento pagina

    if (!newItemModel.trim() || !newItemSerial.trim()) {
      alert('Per favore, inserisci almeno Modello e Numero Seriale.');
      return;
    }

    const newItem = {
      id: nextId,
      type: newItemType,
      model: newItemModel.trim(),
      serial: newItemSerial.trim(),
      status: newItemStatus,
    };

    setInventoryItems([...inventoryItems, newItem]); // Aggiunge il nuovo item alla lista
    setNextId(nextId + 1); // Incrementa l'ID per il prossimo

    // Resetta il form
    setNewItemType(deviceTypes[0]);
    setNewItemModel('');
    setNewItemSerial('');
    setNewItemStatus(deviceStatuses[0]);
  };

  const handleDeleteItem = (idToDelete) => {
     // Chiedi conferma (buona pratica)
     if (window.confirm(`Sei sicuro di voler eliminare l'item con ID ${idToDelete}?`)) {
        setInventoryItems(inventoryItems.filter(item => item.id !== idToDelete));
     }
  };

  return (
    <div className={styles.demoContainer}>
      <h4 className={styles.demoTitle}>Simulatore Inventario IT Semplice</h4>

      {/* Tabella Inventario */}
      <div className={styles.tableContainer}>
        <table className={styles.inventoryTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Modello</th>
              <th>Seriale</th>
              <th>Stato</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {inventoryItems.length === 0 ? (
              <tr>
                <td colSpan="6" className={styles.emptyTable}>L'inventario è vuoto. Aggiungi un item!</td>
              </tr>
            ) : (
              inventoryItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.type}</td>
                  <td>{item.model}</td>
                  <td>{item.serial}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[`status${item.status.replace(/\s+/g, '')}`]}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className={styles.deleteButton}
                      title="Elimina Item"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Form Aggiunta Item */}
      <form onSubmit={handleAddItem} className={styles.addForm}>
        <h5 className={styles.formTitle}>Aggiungi Nuovo Dispositivo</h5>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="itemType">Tipo:</label>
            <select
              id="itemType"
              value={newItemType}
              onChange={(e) => setNewItemType(e.target.value)}
              required
            >
              {deviceTypes.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="itemModel">Modello:</label>
            <input
              type="text"
              id="itemModel"
              value={newItemModel}
              onChange={(e) => setNewItemModel(e.target.value)}
              placeholder="Es. Dell XPS 13"
              required
            />
          </div>
        </div>
        <div className={styles.formRow}>
           <div className={styles.formGroup}>
            <label htmlFor="itemSerial">Seriale:</label>
            <input
              type="text"
              id="itemSerial"
              value={newItemSerial}
              onChange={(e) => setNewItemSerial(e.target.value)}
              placeholder="Es. SNX YZ123"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="itemStatus">Stato:</label>
            <select
              id="itemStatus"
              value={newItemStatus}
              onChange={(e) => setNewItemStatus(e.target.value)}
              required
            >
               {deviceStatuses.map(status => <option key={status} value={status}>{status}</option>)}
            </select>
          </div>
        </div>
         <button type="submit" className={styles.addButton}>Aggiungi all'Inventario</button>
      </form>
    </div>
  );
}

export default InventoryDemo;