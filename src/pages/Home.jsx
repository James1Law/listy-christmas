import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { createUserProfile, getUserProfile, getFamilyLists, createList } from '../lib/db';
import Onboarding from '../components/Onboarding';
import { useNavigate } from 'react-router-dom';
import { Copy, Check } from 'lucide-react';
import './Home.css';

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

    if (loading) {
        return (
            <div className="home-container flex items-center justify-center">
                <div className="retro-spinner"></div>
            </div>
        );
    }

    if (!userProfile?.familyId) {
        return (
            <>
                <div className="scan-lines"></div>
                <div className="home-container">
                    <header className="home-header">
                        <div className="home-header-top">
                            <h1 className="home-title">▲ Listy ▲</h1>
                            <button onClick={logout} className="retro-btn retro-btn-secondary logout-btn">
                                Logout
                            </button>
                        </div>
                    </header>
                    <Onboarding onComplete={handleOnboardingComplete} />
                </div>
            </>
        );
    }

    return (
        <>
            <div className="scan-lines"></div>
            <div className="home-container">
                <header className="home-header">
                    <div className="home-header-top">
                        <div className="home-header-left">
                            <h1 className="home-title">▲ Listy ▲</h1>
                            <div className="family-id-container">
                                <span>Family ID:</span>
                                <div className="family-id-box">
                                    <code className="family-id-code">
                                        {userProfile.familyId}
                                    </code>
                                    <button
                                        onClick={copyFamilyId}
                                        title={copied ? "Copied!" : "Copy Family ID"}
                                        className={`copy-btn ${copied ? 'copied' : ''}`}
                                    >
                                        {copied ? <Check size={14} /> : <Copy size={14} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button onClick={logout} className="retro-btn retro-btn-secondary logout-btn">
                            Logout
                        </button>
                    </div>
                </header>

                <div className="content">
                    <div className="section-header">
                        <h2 className="section-title">Family Lists</h2>
                        <button
                            onClick={() => setShowCreateList(!showCreateList)}
                            className="retro-btn"
                        >
                            {showCreateList ? 'Cancel' : '+ New List'}
                        </button>
                    </div>

                    {showCreateList && (
                        <form onSubmit={handleCreateList} className="create-list-form">
                            <input
                                type="text"
                                placeholder="List Name (e.g. James's Wishlist)"
                                value={newListName}
                                onChange={(e) => setNewListName(e.target.value)}
                            />
                            <button type="submit" className="retro-btn">
                                Create List
                            </button>
                        </form>
                    )}

                    <div className="lists-grid">
                        {lists.map(list => (
                            <div
                                key={list.id}
                                className={`list-card ${list.ownerId === currentUser.uid ? '' : 'other-owner'}`}
                            >
                                <h3 className="list-card-title">{list.title}</h3>
                                <p className="list-card-owner">By {list.ownerName}</p>
                                <button
                                    onClick={() => navigate(`/list/${list.id}`)}
                                    className="view-list-btn"
                                >
                                    View List →
                                </button>
                            </div>
                        ))}
                    </div>

                    {lists.length === 0 && !showCreateList && (
                        <p className="empty-state">
                            No lists yet. Create one to get started!
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}
