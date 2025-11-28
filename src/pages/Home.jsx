import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { createUserProfile, getUserProfile, getFamilyLists, createList } from '../lib/db';
import Onboarding from '../components/Onboarding';
import { useNavigate } from 'react-router-dom';
import { Copy, Check } from 'lucide-react';

export default function Home() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState(null);
    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateList, setShowCreateList] = useState(false);
    const [newListName, setNewListName] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        async function init() {
            if (currentUser) {
                await createUserProfile(currentUser);
                const profile = await getUserProfile(currentUser.uid);
                setUserProfile(profile);
                if (profile?.familyId) {
                    loadLists(profile.familyId);
                }
                setLoading(false);
            }
        }
        init();
    }, [currentUser]);

    async function loadLists(familyId) {
        const familyLists = await getFamilyLists(familyId);
        setLists(familyLists);
    }

    const handleOnboardingComplete = (familyId) => {
        setUserProfile({ ...userProfile, familyId });
        loadLists(familyId);
    };

    async function handleCreateList(e) {
        e.preventDefault();
        if (!newListName) return;

        try {
            await createList({
                title: newListName,
                ownerId: currentUser.uid,
                ownerName: userProfile.name,
                familyId: userProfile.familyId,
                createdAt: new Date()
            });
            setNewListName('');
            setShowCreateList(false);
            loadLists(userProfile.familyId);
        } catch (error) {
            console.error("Error creating list:", error);
        }
    }

    async function copyFamilyId() {
        try {
            await navigator.clipboard.writeText(userProfile.familyId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }

    if (loading) return <div>Loading...</div>;

    if (!userProfile?.familyId) {
        return (
            <div className="container">
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1>Christmas List App</h1>
                    <button onClick={logout} style={{ backgroundColor: '#666' }}>Logout</button>
                </header>
                <Onboarding onComplete={handleOnboardingComplete} />
            </div>
        );
    }

    return (
        <div className="container">
            <header style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', gap: '10px' }}>
                    <div style={{ flex: '1 1 auto', minWidth: '200px' }}>
                        <h1 style={{ margin: '0 0 5px 0' }}>Christmas List App</h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#666' }}>
                            <span>Family ID:</span>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                backgroundColor: '#f0f0f0',
                                padding: '4px 6px',
                                borderRadius: '4px',
                                flex: '0 1 auto',
                                minWidth: 0
                            }}>
                                <code style={{
                                    fontSize: '0.7rem',
                                    whiteSpace: 'nowrap',
                                    overflow: 'auto',
                                    display: 'block',
                                    maxWidth: '150px',
                                    scrollbarWidth: 'none',
                                    msOverflowStyle: 'none'
                                }}>
                                    {userProfile.familyId}
                                </code>
                                <button
                                    onClick={copyFamilyId}
                                    title={copied ? "Copied!" : "Copy Family ID"}
                                    style={{
                                        backgroundColor: copied ? '#165b33' : 'transparent',
                                        color: copied ? '#fff' : '#666',
                                        border: 'none',
                                        padding: '4px',
                                        fontSize: '0.75rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        minWidth: 'auto',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        cursor: 'pointer'
                                    }}
                                >
                                    {copied ? <Check size={14} /> : <Copy size={14} />}
                                </button>
                            </div>
                        </div>
                    </div>
                    <button onClick={logout} style={{ backgroundColor: '#666', alignSelf: 'flex-start' }}>Logout</button>
                </div>
            </header>

            <div className="content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2>Family Lists</h2>
                    <button onClick={() => setShowCreateList(!showCreateList)}>
                        {showCreateList ? 'Cancel' : '+ New List'}
                    </button>
                </div>

                {showCreateList && (
                    <form onSubmit={handleCreateList} style={{ marginBottom: '20px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
                        <input
                            type="text"
                            placeholder="List Name (e.g. James's Wishlist)"
                            value={newListName}
                            onChange={(e) => setNewListName(e.target.value)}
                            style={{ padding: '10px', width: '100%', marginBottom: '10px', boxSizing: 'border-box' }}
                        />
                        <button type="submit">Create List</button>
                    </form>
                )}

                <div className="lists-grid" style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
                    {lists.map(list => (
                        <div key={list.id} style={{
                            padding: '20px',
                            backgroundColor: 'white',
                            borderRadius: '10px',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                            borderTop: `5px solid ${list.ownerId === currentUser.uid ? 'var(--primary-color)' : 'var(--secondary-color)'}`
                        }}>
                            <h3>{list.title}</h3>
                            <p style={{ color: '#666' }}>By {list.ownerName}</p>
                            <button
                                onClick={() => navigate(`/list/${list.id}`)}
                                style={{ width: '100%', marginTop: '10px', backgroundColor: 'transparent', border: '1px solid #ddd', color: '#333' }}
                            >
                                View List
                            </button>
                        </div>
                    ))}
                </div>

                {lists.length === 0 && !showCreateList && (
                    <p style={{ textAlign: 'center', color: '#666', marginTop: '40px' }}>No lists yet. Create one to get started!</p>
                )}
            </div>
        </div>
    );
}
