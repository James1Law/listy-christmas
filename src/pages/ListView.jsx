import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getList, getListItems, addItem, updateItem, deleteItem, deleteList } from '../lib/db';
import { Trash2, Gift, Check, ExternalLink, ArrowLeft } from 'lucide-react';
import './ListView.css';

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
            boughtByName: null,
            createdBy: currentUser.uid,
            createdByName: currentUser.displayName || currentUser.email
        });

        setNewItemName('');
        setNewItemLink('');
        setNewItemPrice('');
        loadData();
    }

    async function handleDeleteItem(itemId) {
        if (window.confirm('⚠ DELETE ITEM? This action cannot be undone.')) {
            await deleteItem(itemId);
            loadData();
        }
    }

    async function handleDeleteList() {
        if (window.confirm('⚠ DELETE ENTIRE LIST? This action cannot be undone.')) {
            await deleteList(listId);
            navigate('/');
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

    if (loading) {
        return (
            <>
                <div className="scan-lines"></div>
                <div className="loading-container">
                    <div className="retro-spinner"></div>
                    <p className="loading-text">Loading List...</p>
                </div>
            </>
        );
    }

    if (!list) {
        return (
            <>
                <div className="scan-lines"></div>
                <div className="listview-container">
                    <p className="empty-items">List not found</p>
                </div>
            </>
        );
    }

    const isOwner = currentUser.uid === list.ownerId;

    return (
        <>
            <div className="scan-lines"></div>
            <div className="listview-container">
                <button onClick={() => navigate('/')} className="back-btn">
                    <ArrowLeft size={16} />
                    Back to Lists
                </button>

                <header className="list-header">
                    <div className="list-header-top">
                        <div className="list-header-left">
                            <h1 className="list-title">{list.title}</h1>
                            <p className="list-owner">
                                Owned by {isOwner ? 'You' : list.ownerName}
                            </p>
                        </div>
                        {isOwner && (
                            <button
                                onClick={handleDeleteList}
                                className="retro-btn retro-btn-danger delete-list-btn"
                            >
                                Delete List
                            </button>
                        )}
                    </div>
                </header>

                {isOwner && (
                    <div className="add-item-form">
                        <h3 className="add-item-title">Add Item</h3>
                        <form onSubmit={handleAddItem}>
                            <input
                                type="text"
                                placeholder="Item Name (e.g. Red Sweater)"
                                value={newItemName}
                                onChange={(e) => setNewItemName(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Link (optional)"
                                value={newItemLink}
                                onChange={(e) => setNewItemLink(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Price (optional)"
                                value={newItemPrice}
                                onChange={(e) => setNewItemPrice(e.target.value)}
                            />
                            <button type="submit" className="retro-btn">
                                Add Wish
                            </button>
                        </form>
                    </div>
                )}

                <div className="items-list">
                    {items.map(item => (
                        <div
                            key={item.id}
                            className={`item-card ${item.isBought && !isOwner ? 'bought' : ''}`}
                        >
                            <div className="item-content">
                                <div className="item-header">
                                    <h3 className={`item-name ${item.isBought && !isOwner ? 'bought' : ''}`}>
                                        {item.name}
                                    </h3>
                                    {item.link && (
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="item-link"
                                        >
                                            <ExternalLink size={16} />
                                        </a>
                                    )}
                                </div>
                                {item.price && (
                                    <p className="item-price">{item.price}</p>
                                )}

                                {!isOwner && item.isBought && (
                                    <p className="item-bought-status">
                                        <Gift size={14} />
                                        Bought by {item.boughtByName}
                                    </p>
                                )}
                            </div>

                            <div className="item-actions">
                                {item.createdBy === currentUser.uid ? (
                                    <button
                                        onClick={() => handleDeleteItem(item.id)}
                                        className="delete-item-btn"
                                        title="Delete item"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => toggleBought(item)}
                                        className={`mark-bought-btn ${item.isBought ? 'bought' : ''}`}
                                    >
                                        {item.isBought ? (
                                            <>
                                                <Check size={20} />
                                                Bought
                                            </>
                                        ) : (
                                            'Mark Bought'
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}

                    {items.length === 0 && (
                        <p className="empty-items">
                            {isOwner ? "Your list is empty. Add some wishes!" : "This list is empty."}
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}
