import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getList, getListItems, addItem, updateItem, deleteItem } from '../lib/db';
import { Trash2, Gift, Check, ExternalLink } from 'lucide-react';

export default function ListView() {
    const { listId } = useParams();
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const [list, setList] = useState(null);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const [newItemName, setNewItemName] = useState('');
    const [newItemLink, setNewItemLink] = useState('');
    const [newItemPrice, setNewItemPrice] = useState('');

    useEffect(() => {
        loadData();
    }, [listId]);

    async function loadData() {
        const listData = await getList(listId);
        if (listData) {
            setList(listData);
            const itemsData = await getListItems(listId);
            setItems(itemsData);
        }
        setLoading(false);
    }

    async function handleAddItem(e) {
        e.preventDefault();
        if (!newItemName) return;

        await addItem({
            listId,
            name: newItemName,
            link: newItemLink,
            price: newItemPrice,
            isBought: false,
            boughtBy: null,
            boughtByName: null
        });

        setNewItemName('');
        setNewItemLink('');
        setNewItemPrice('');
        loadData();
    }

    async function handleDeleteItem(itemId) {
        if (window.confirm('Are you sure you want to delete this item?')) {
            await deleteItem(itemId);
            loadData();
        }
    }

    async function toggleBought(item) {
        if (item.isBought && item.boughtBy !== currentUser.uid) {
            alert(`This item was bought by ${item.boughtByName}. You cannot unmark it.`);
            return;
        }

        const newStatus = !item.isBought;
        await updateItem(item.id, {
            isBought: newStatus,
            boughtBy: newStatus ? currentUser.uid : null,
            boughtByName: newStatus ? (currentUser.displayName || currentUser.email) : null
        });
        loadData();
    }

    if (loading) return <div>Loading...</div>;
    if (!list) return <div>List not found</div>;

    const isOwner = currentUser.uid === list.ownerId;

    return (
        <div className="container">
            <button onClick={() => navigate('/')} style={{ marginBottom: '20px', backgroundColor: 'transparent', color: '#666', padding: '5px 0' }}>
                &larr; Back to Lists
            </button>

            <header style={{ marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
                <h1>{list.title}</h1>
                <p style={{ color: '#666' }}>Owned by {isOwner ? 'You' : list.ownerName}</p>
            </header>

            {isOwner && (
                <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <h3>Add Item</h3>
                    <form onSubmit={handleAddItem} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <input
                            type="text"
                            placeholder="Item Name (e.g. Red Sweater)"
                            value={newItemName}
                            onChange={(e) => setNewItemName(e.target.value)}
                            style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
                        />
                        <input
                            type="text"
                            placeholder="Link (optional)"
                            value={newItemLink}
                            onChange={(e) => setNewItemLink(e.target.value)}
                            style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
                        />
                        <input
                            type="text"
                            placeholder="Price (optional)"
                            value={newItemPrice}
                            onChange={(e) => setNewItemPrice(e.target.value)}
                            style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
                        />
                        <button type="submit" style={{ marginTop: '10px' }}>Add Wish</button>
                    </form>
                </div>
            )}

            <div className="items-list" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {items.map(item => (
                    <div key={item.id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '20px',
                        backgroundColor: '#fff',
                        borderRadius: '10px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                        opacity: (item.isBought && !isOwner) ? 0.7 : 1
                    }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <h3 style={{ margin: '0 0 5px 0', textDecoration: (item.isBought && !isOwner) ? 'line-through' : 'none' }}>
                                    {item.name}
                                </h3>
                                {item.link && (
                                    <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ color: '#666' }}>
                                        <ExternalLink size={16} />
                                    </a>
                                )}
                            </div>
                            {item.price && <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>{item.price}</p>}

                            {!isOwner && item.isBought && (
                                <p style={{ margin: '5px 0 0 0', color: 'var(--secondary-color)', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                    <Gift size={14} style={{ marginRight: '5px', verticalAlign: 'text-bottom' }} />
                                    Bought by {item.boughtByName}
                                </p>
                            )}
                        </div>

                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            {isOwner ? (
                                <button
                                    onClick={() => handleDeleteItem(item.id)}
                                    style={{ backgroundColor: '#fff', color: '#d42426', padding: '8px', border: '1px solid #d42426' }}
                                >
                                    <Trash2 size={20} />
                                </button>
                            ) : (
                                <button
                                    onClick={() => toggleBought(item)}
                                    style={{
                                        backgroundColor: item.isBought ? '#165b33' : '#fff',
                                        color: item.isBought ? '#fff' : '#165b33',
                                        border: '2px solid #165b33',
                                        padding: '8px 15px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '5px'
                                    }}
                                >
                                    {item.isBought ? <Check size={20} /> : 'Mark Bought'}
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                {items.length === 0 && (
                    <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>
                        {isOwner ? "Your list is empty. Add some wishes!" : "This list is empty."}
                    </p>
                )}
            </div>
        </div>
    );
}
